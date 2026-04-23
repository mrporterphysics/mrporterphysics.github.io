/**
 * PhysicsQuizApp - Main application controller and CSV parser
 */

const PhysicsQuizApp = {
    // Application state
    isInitialized: false,
    currentQuestion: null,
    currentQuestionIndex: 0,
    questionsLoaded: false,

    // Configuration
    config: {
        csvPath: 'data/ap-physics-questions.csv',
        enableEarthScience: false, // Disabled for initial release
        defaultMode: 'learning'
    },

    // Initialize the application
    init: function () {
        console.log('Initializing Physics Quiz App...');
        Utils.performance.start('appInit');

        try {
            // Application health check
            const healthReport = Utils.validateApplicationHealth();
            if (healthReport.overall === 'critical') {
                this.showCriticalError('Application Health Check Failed',
                    'Critical system components are not available. Please refresh the page.',
                    () => window.location.reload());
                return;
            }

            // Show loading state
            this.showLoadingState('Initializing application...');

            // Initialize storage with error handling
            this.initializeStorageWithErrorHandling();

            // Initialize network monitoring
            Utils.networkStatus.init();
            Utils.networkStatus.addListener((isOnline) => {
                if (isOnline) {
                    this.showMessage('Network connection restored', 'success');
                } else {
                    this.showMessage('Network connection lost - some features may not work', 'warning');
                }
            });

            // Load questions
            this.loadQuestions()
                .then(() => {
                    this.setupEventListeners();
                    this.initializeUI();
                    this.initializeFactSheetIntegration();
                    this.initializeOptionalModules();

                    this.isInitialized = true;
                    this.hideLoadingState();
                    console.log('Physics Quiz App initialized successfully');
                    Utils.performance.end('appInit');
                })
                .catch(error => {
                    this.hideLoadingState();
                    Utils.handleError(error, 'PhysicsQuizApp.init');
                    this.showCriticalError('Failed to load questions',
                        'Please check your connection and refresh the page to try again.',
                        () => window.location.reload());
                });
        } catch (error) {
            this.hideLoadingState();
            Utils.handleError(error, 'PhysicsQuizApp.init');
            this.showCriticalError('Application failed to initialize',
                'There was a critical error. Please refresh the page.',
                () => window.location.reload());
        }
    },

    // Initialize storage with comprehensive error handling
    initializeStorageWithErrorHandling: function () {
        try {
            QuizStorage.init();
        } catch (error) {
            Utils.handleError(error, 'Storage initialization');

            // Try to clear corrupted storage
            try {
                localStorage.clear();
                QuizStorage.init();
                this.showMessage('Storage was reset due to corruption. Your previous progress has been lost.', 'warning');
            } catch (secondError) {
                Utils.handleError(secondError, 'Storage recovery');
                throw new Error('Unable to initialize storage. Local storage may be disabled.');
            }
        }
    },

    // Load questions from CSV file with comprehensive error handling
    loadQuestions: function () {
        return new Promise((resolve, reject) => {
            Utils.performance.start('loadCSV');

            // Network timeout handler
            const timeoutController = new AbortController();
            const timeoutId = setTimeout(() => {
                timeoutController.abort();
            }, 15000); // 15 second timeout

            fetch(this.config.csvPath, {
                signal: timeoutController.signal,
                cache: 'no-cache' // Ensure fresh data
            })
                .then(response => {
                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        const errorMsg = response.status === 404
                            ? 'Question file not found. Please check the installation.'
                            : `Server error (${response.status}). Please try again later.`;
                        throw new Error(errorMsg);
                    }

                    if (!response.headers.get('content-type')?.includes('text')) {
                        throw new Error('Invalid file format. Expected CSV file.');
                    }

                    return response.text();
                })
                .then(csvData => {
                    this.showLoadingState('Processing questions...');

                    // Validate CSV data
                    if (!csvData || csvData.trim().length === 0) {
                        throw new Error('CSV file is empty or corrupted');
                    }

                    const questions = this.parseCSVDirectly(csvData);

                    if (questions.length === 0) {
                        throw new Error('No valid questions found in CSV file');
                    }

                    // Validate question data quality
                    const validation = this.validateQuestionsData(questions);
                    if (validation.criticalErrors > 0) {
                        throw new Error(`${validation.criticalErrors} questions have critical errors. Data integrity compromised.`);
                    }

                    // Load questions with error handling
                    const loadSuccess = QuizData.loadQuestions(questions);
                    if (!loadSuccess) {
                        throw new Error('Failed to process question data');
                    }

                    this.questionsLoaded = true;

                    // Show warnings for non-critical issues
                    if (validation.warnings > 0) {
                        this.showMessage(`Loaded ${questions.length} questions (${validation.warnings} minor issues detected)`, 'warning');
                    } else {
                        console.log(`✅ Loaded ${questions.length} questions successfully`);
                    }

                    Utils.performance.end('loadCSV');
                    resolve(questions);
                })
                .catch(error => {
                    clearTimeout(timeoutId);

                    if (error.name === 'AbortError') {
                        Utils.handleError(new Error('Request timeout'), 'PhysicsQuizApp.loadQuestions');
                        // Try fallback data for timeout as well
                        if (window.FallbackData) {
                            console.warn('CSV loading timed out, using fallback data');
                            try {
                                const fallbackQuestions = FallbackData.getFallbackQuestions();
                                FallbackData.showFallbackNotification();
                                resolve(fallbackQuestions);
                                return;
                            } catch (fallbackError) {
                                console.error('Fallback data also failed:', fallbackError);
                            }
                        }
                        reject(new Error('Loading timeout. Please check your connection and try again.'));
                    } else {
                        Utils.handleError(error, 'PhysicsQuizApp.loadQuestions');
                        // Try fallback data if CSV loading fails
                        if (window.FallbackData) {
                            console.warn('CSV loading failed, using fallback data', error.message);
                            try {
                                const fallbackQuestions = FallbackData.getFallbackQuestions();
                                FallbackData.showFallbackNotification();
                                resolve(fallbackQuestions);
                                return;
                            } catch (fallbackError) {
                                console.error('Fallback data also failed:', fallbackError);
                            }
                        }
                        reject(error);
                    }
                });
        });
    },

    // Validate questions data for quality and integrity
    validateQuestionsData: function (questions) {
        let criticalErrors = 0;
        let warnings = 0;
        const validTypes = ['tf', 'mc', 'fill', 'matching'];

        questions.forEach((question, index) => {
            // Critical validations - these prevent the app from working
            if (!question.question || question.question.trim().length === 0) {
                console.error(`Line ${index + 1}: Missing question text`);
                criticalErrors++;
            }

            if (!question.answer || question.answer.toString().trim().length === 0) {
                console.error(`Line ${index + 1}: Missing answer`);
                criticalErrors++;
            }

            if (!question.type || !validTypes.includes(question.type.toLowerCase())) {
                console.error(`Line ${index + 1}: Invalid question type: ${question.type}`);
                criticalErrors++;
            }

            // Warning validations - these affect quality but don't break functionality
            if (!question.explanation || question.explanation.trim().length === 0) {
                console.warn(`Line ${index + 1}: Missing explanation`);
                warnings++;
            }

            if (question.type === 'mc' && !(question.optiona || question.optionA) ) {
                console.warn(`Line ${index + 1}: Multiple choice question missing options`);
                warnings++;
            }

            if (!question.topic || question.topic === 'undefined' || question.topic.trim().length === 0) {
                console.warn(`Line ${index + 1}: Missing or invalid topic`);
                warnings++;
            }

            if (question.difficulty && isNaN(parseInt(question.difficulty))) {
                console.warn(`Line ${index + 1}: Invalid difficulty level: "${question.difficulty}"`);
                warnings++;
            }
        });

        console.log(`Validation complete: ${criticalErrors} critical errors, ${warnings} warnings`);
        return { criticalErrors, warnings, total: questions.length };
    },
    // Parse CSV text directly
    parseCSVDirectly: function (csvText) {
        const lines = [];
        let currentLine = [];
        let currentField = '';
        let inQuotes = false;

        // Normalize line endings
        const text = csvText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            if (inQuotes) {
                if (char === '"') {
                    if (nextChar === '"') {
                        // Escaped quote
                        currentField += '"';
                        i++;
                    } else {
                        // End of quotes
                        inQuotes = false;
                    }
                } else {
                    currentField += char;
                }
            } else {
                if (char === '"') {
                    inQuotes = true;
                } else if (char === ',') {
                    currentLine.push(currentField.trim());
                    currentField = '';
                } else if (char === '\n') {
                    currentLine.push(currentField.trim());
                    if (currentLine.some(field => field !== '')) {
                        lines.push(currentLine);
                    }
                    currentLine = [];
                    currentField = '';
                } else {
                    currentField += char;
                }
            }
        }

        // Handle last field/line
        if (currentField || currentLine.length > 0) {
            currentLine.push(currentField.trim());
            if (currentLine.some(field => field !== '')) {
                lines.push(currentLine);
            }
        }

        if (lines.length < 2) {
            Utils.performance.end('parseCSV');
            return []; // Need at least header and one row
        }

        const headers = lines[0].map(h => h.toLowerCase().trim());
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const row = lines[i];
            // Allow for some flexibility in row length, but warn if significantly off
            if (row.length < headers.length - 2) {
                console.warn(`Skipping malformed CSV line ${i + 1}: Not enough fields`);
                continue;
            }

            const obj = {};
            headers.forEach((header, index) => {
                if (index < row.length) {
                    obj[header] = row[index];
                }
            });
            result.push(obj);
        }

        Utils.performance.end('parseCSV');
        return result;
    },

    // Helper not strictly needed with new parser but kept for compatibility if called elsewhere
    parseCSVLine: function (text) {
        // This is a simplified version of the logic above for a single line
        // But since we parse the whole text at once now, this might be unused
        // We'll keep a basic implementation just in case
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (inQuotes) {
                if (char === '"' && text[i + 1] === '"') {
                    current += '"';
                    i++;
                } else if (char === '"') {
                    inQuotes = false;
                } else {
                    current += char;
                }
            } else {
                if (char === '"') {
                    inQuotes = true;
                } else if (char === ',') {
                    result.push(current.trim());
                    current = '';
                } else {
                    current += char;
                }
            }
        }
        result.push(current.trim());
        return result;
    },

    // Setup event listeners
    setupEventListeners: function () {
        // Course selection buttons
        document.querySelectorAll('.course-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchCourse(e.target.dataset.course);
            });
        });

        // Mode selection buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all mode buttons
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.currentTarget.classList.add('active');
                this.switchMode(e.currentTarget.dataset.mode);
            });
        });

        // Subject selection buttons
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all subject buttons
                document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.currentTarget.classList.add('active');
                // Update filter and refresh stats display
                const subject = e.currentTarget.dataset.subject;
                QuizData.setFilters({ subject: subject });
                this.updateStartScreenStats();
            });
        });

        // Question count buttons
        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Track answered questions for the results screen
        document.addEventListener('questionAnswered', (event) => {
            if (!this.sessionAnswers) this.sessionAnswers = [];
            this.sessionAnswers.push({
                question: event.detail.question,
                userAnswer: event.detail.userAnswer,
                isCorrect: event.detail.isCorrect
            });
        });

        // Start quiz button
        const startBtn = document.getElementById('start-quiz');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startQuiz();
            });
        }

        // Navigation buttons
        const nextBtn = document.getElementById('next-question');
        const prevBtn = document.getElementById('prev-question');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextQuestion();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousQuestion();
            });
        }

        // Reset quiz button
        const resetBtn = document.getElementById('reset-quiz');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetQuiz();
            });
        }
        // Keyboard shortcuts are handled centrally in index.html to avoid duplicate listeners
    },

    // Initialize fact sheet integration
    initializeFactSheetIntegration: function () {
        if (typeof FactSheetIntegration !== 'undefined') {
            FactSheetIntegration.init().then(success => {
                if (success) {
                    console.log('Fact sheet integration ready');
                } else {
                    console.warn('Fact sheet integration failed to initialize');
                }
            });
        } else {
            console.log('Fact sheet integration not available');
        }
    },

    // Initialize optional modules (bookmarks, hints, fact sheet links)
    initializeOptionalModules: function () {
        ['BookmarkSystem', 'HintSystem', 'FactSheetLinks'].forEach(name => {
            try {
                if (typeof window[name] !== 'undefined' && typeof window[name].init === 'function') {
                    window[name].init();
                    console.log(`✅ ${name} initialized`);
                }
            } catch (error) {
                console.warn(`${name} failed to initialize:`, error);
            }
        });
    },

    // Initialize UI
    initializeUI: function () {
        this.updateQuestionCounter();
        this.updateProgressBar();
        this.updateStartScreenStats();

        // Initialize QuizUI if available
        if (typeof QuizUI !== 'undefined') {
            QuizUI.init();
        }

        // Load user settings
        const settings = QuizStorage.getSettings();
        this.applySavedSettings(settings);
    },

    // Update stats display on start screen
    updateStartScreenStats: function () {
        const statsDisplay = document.getElementById('stats-display');
        if (!statsDisplay) return;

        const filteredQuestions = QuizData.filteredQuestions.length;
        const stats = QuizData.getDataStats();
        const userStats = QuizStorage.getStatistics();

        // Build topic breakdown
        const topicCounts = Object.entries(stats.byTopic)
            .map(([topic, count]) => `${topic.charAt(0).toUpperCase() + topic.slice(1)}: ${count}`)
            .join(' • ');

        // Calculate user accuracy if they've answered questions
        let accuracyText = '';
        if (userStats.totalQuestions > 0) {
            const accuracy = ((userStats.correctAnswers / userStats.totalQuestions) * 100).toFixed(0);
            accuracyText = `<p><strong>Your accuracy:</strong> ${accuracy}% (${userStats.correctAnswers}/${userStats.totalQuestions})</p>`;
        }

        statsDisplay.innerHTML = `
            <p><strong>${filteredQuestions}</strong> questions available</p>
            <p class="text-muted" style="font-size: 0.9em;">${topicCounts}</p>
            ${accuracyText}
        `;
    },

    // Apply saved user settings — activate the button matching the saved mode
    applySavedSettings: function (settings) {
        if (!settings || !settings.mode) return;
        const modeBtn = document.querySelector(`.mode-btn[data-mode="${settings.mode}"]`);
        if (modeBtn) {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            modeBtn.classList.add('active');
        }
    },

    // Switch between courses
    switchCourse: function (course) {
        console.log(`Switching to course: ${course}`);

        // Update active course button
        document.querySelectorAll('.course-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.course === course);
        });

        // Update settings
        QuizStorage.updateSetting('course', course);

        // Update filters
        QuizData.setFilters({ course: course });

        // Reset quiz
        this.resetQuiz();
    },

    // Switch quiz modes
    switchMode: function (mode) {
        console.log(`Switching to mode: ${mode}`);
        QuizStorage.updateSetting('mode', mode);

        // Update UI based on mode
        const explanationElements = document.querySelectorAll('.explanation');
        const shouldShowExplanations = mode === 'learning';

        explanationElements.forEach(el => {
            el.style.display = shouldShowExplanations ? 'block' : 'none';
        });
    },

    // Get current form settings
    getCurrentFormSettings: function () {
        const activeMode = document.querySelector('.mode-btn.active');
        const activeSubject = document.querySelector('.subject-btn.active');
        const activeCount = document.querySelector('.count-btn.active');

        return {
            mode: activeMode ? activeMode.dataset.mode : 'learning',
            subject: activeSubject ? activeSubject.dataset.subject : 'all',
            questionCount: activeCount ? activeCount.dataset.count : 'all'
        };
    },

    // Start the quiz
    startQuiz: function () {
        console.log('Starting quiz...');

        // Get current settings from form and save them
        const formSettings = this.getCurrentFormSettings();
        QuizStorage.updateSetting('mode', formSettings.mode);
        QuizStorage.updateSetting('subject', formSettings.subject);

        // Apply subject filter to question data
        QuizData.setFilters({ subject: formSettings.subject });

        const settings = QuizStorage.getSettings();
        let questionsToUse;

        if (settings.mode === 'review') {
            questionsToUse = QuizData.getReviewQuestions();
            if (questionsToUse.length === 0) {
                this.showMessage('No missed questions to review!', 'success');
                return;
            }
        } else {
            // Always shuffle so a 20-question quiz samples across the topic
            QuizData.shuffle();
            questionsToUse = QuizData.filteredQuestions;
        }

        if (questionsToUse.length === 0) {
            this.showMessage('No questions available with current filters.', 'warning');
            return;
        }

        // Apply question count limit (20 / 50 / all)
        const limit = parseInt(formSettings.questionCount, 10);
        if (settings.mode !== 'review' && !isNaN(limit) && limit > 0 && limit < questionsToUse.length) {
            QuizData.filteredQuestions = questionsToUse.slice(0, limit);
        }

        // Track the session's question set so results can be computed
        this.sessionAnswers = [];

        // Reset progress
        QuizStorage.resetProgress();
        this.currentQuestionIndex = 0;

        // Show first question
        this.showQuestion(0);

        // Update UI
        this.hideStartScreen();
        this.showQuizScreen();
    },

    // End quiz and show results screen
    finishQuiz: function () {
        const total = this.sessionAnswers ? this.sessionAnswers.length : 0;
        const correct = this.sessionAnswers ? this.sessionAnswers.filter(a => a.isCorrect).length : 0;
        const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

        // Build results HTML
        const missed = this.sessionAnswers ? this.sessionAnswers.filter(a => !a.isCorrect) : [];
        let missedHtml = '';
        if (missed.length > 0) {
            missedHtml = '<h3>Missed Questions</h3><ol class="results-missed">' +
                missed.map(m => `<li>${m.question.question}</li>`).join('') +
                '</ol>';
        }

        const quizScreen = document.getElementById('quiz-screen');
        if (quizScreen) {
            quizScreen.innerHTML = `
                <div class="results-screen">
                    <h2>Quiz Complete!</h2>
                    <div class="results-score">
                        <div class="score-big">${correct} / ${total}</div>
                        <div class="score-pct">${pct}%</div>
                    </div>
                    ${missedHtml}
                    <div class="results-actions">
                        <button id="results-review-btn" class="btn btn-primary">Review Missed Questions</button>
                        <button id="results-restart-btn" class="btn btn-secondary">Back to Start</button>
                    </div>
                </div>
            `;

            const restartBtn = document.getElementById('results-restart-btn');
            if (restartBtn) {
                restartBtn.onclick = () => window.location.reload();
            }

            const reviewBtn = document.getElementById('results-review-btn');
            if (reviewBtn) {
                if (missed.length === 0) {
                    reviewBtn.disabled = true;
                    reviewBtn.title = 'No missed questions';
                } else {
                    reviewBtn.onclick = () => window.location.reload();
                }
            }
        }
    },

    // Show a specific question
    showQuestion: function (index) {
        const questions = this.getActiveQuestions();

        if (questions.length === 0) {
            console.error('No questions available for current filters');
            this.showCriticalError('No questions available',
                'No questions match the current filters. Please try a different subject or refresh the page.',
                () => window.location.reload());
            return;
        }

        if (index < 0 || index >= questions.length) {
            console.error(`Invalid question index: ${index} (total: ${questions.length})`);
            return;
        }

        this.currentQuestionIndex = index;
        this.currentQuestion = questions[index];

        // Use QuizUI to display question if available
        if (typeof QuizUI !== 'undefined') {
            QuizUI.displayQuestion(this.currentQuestion);
        } else {
            this.displayQuestionFallback(this.currentQuestion);
        }

        this.updateQuestionCounter();
        this.updateProgressBar();
    },

    // Fallback question display (basic HTML)
    displayQuestionFallback: function (question) {
        const container = document.getElementById('question-container');
        if (!container) return;

        let html = `
            <div class="question-header">
                <span class="question-type">${QuizData.QUESTION_TYPES[question.type]?.name || question.type}</span>
                <span class="question-topic">${question.topic}</span>
                <span class="question-difficulty">Difficulty: ${question.difficulty}/3</span>
            </div>
            <div class="question-text">${question.question}</div>
        `;

        if (question.type === 'mc' && question.options.length > 0) {
            html += '<div class="options">';
            question.options.forEach((option, index) => {
                const letter = String.fromCharCode(65 + index);
                html += `
                    <label class="option">
                        <input type="radio" name="answer" value="${letter}">
                        ${letter}) ${option}
                    </label>
                `;
            });
            html += '</div>';
        } else if (question.type === 'fill') {
            html += '<input type="text" id="fill-answer" placeholder="Enter your answer...">';
        } else if (question.type === 'tf') {
            html += `
                <div class="tf-options">
                    <label><input type="radio" name="answer" value="true"> True</label>
                    <label><input type="radio" name="answer" value="false"> False</label>
                </div>
            `;
        }

        container.innerHTML = html;
    },

    // Get currently active questions based on mode
    getActiveQuestions: function () {
        const settings = QuizStorage.getSettings();

        if (settings.mode === 'review') {
            return QuizData.getReviewQuestions();
        }

        return QuizData.filteredQuestions;
    },

    // Navigate to next question
    nextQuestion: function () {
        const questions = this.getActiveQuestions();
        if (this.currentQuestionIndex < questions.length - 1) {
            this.showQuestion(this.currentQuestionIndex + 1);
        }
    },

    // Navigate to previous question
    previousQuestion: function () {
        if (this.currentQuestionIndex > 0) {
            this.showQuestion(this.currentQuestionIndex - 1);
        }
    },

    // Reset quiz to beginning
    resetQuiz: function () {
        this.currentQuestionIndex = 0;
        this.currentQuestion = null;
        QuizStorage.resetProgress();
        this.showStartScreen();
        this.hideQuizScreen();
    },

    // Update question counter display
    updateQuestionCounter: function () {
        const counter = document.getElementById('question-counter');
        if (counter) {
            const questions = this.getActiveQuestions();
            counter.textContent = `Question ${this.currentQuestionIndex + 1} of ${questions.length}`;
        }
    },

    // Update progress bar
    updateProgressBar: function () {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const questions = this.getActiveQuestions();
            const progress = questions.length > 0 ? ((this.currentQuestionIndex + 1) / questions.length) * 100 : 0;
            progressBar.style.width = `${progress}%`;
        }
    },

    // UI state management
    showStartScreen: function () {
        const startScreen = document.getElementById('start-screen');
        if (startScreen) startScreen.style.display = 'block';
    },

    hideStartScreen: function () {
        const startScreen = document.getElementById('start-screen');
        if (startScreen) startScreen.style.display = 'none';
    },

    showQuizScreen: function () {
        const quizScreen = document.getElementById('quiz-screen');
        if (quizScreen) quizScreen.style.display = 'block';
    },

    hideQuizScreen: function () {
        const quizScreen = document.getElementById('quiz-screen');
        if (quizScreen) quizScreen.style.display = 'none';
    },

    // Show settings modal
    showSettings: function () {
        console.log('Opening settings...');
        // Implementation for settings modal
    },

    // Display messages to user
    showMessage: function (message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);

        // You can implement a toast notification system here
        const messageEl = document.getElementById('message-display');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = `message ${type}`;
            messageEl.style.display = 'block';

            setTimeout(() => {
                messageEl.style.display = 'none';
            }, 3000);
        }
    },

    // Show error messages
    showError: function (message) {
        this.showMessage(message, 'error');
    },

    // Show loading state with message
    showLoadingState: function (message = 'Loading...') {
        const loadingEl = document.getElementById('loading-state') || this.createLoadingElement();
        const messageEl = loadingEl.querySelector('.loading-message');

        if (messageEl) {
            messageEl.textContent = message;
        }

        loadingEl.style.display = 'flex';

        // Disable interactions
        document.body.style.pointerEvents = 'none';
        loadingEl.style.pointerEvents = 'auto';
    },

    // Hide loading state
    hideLoadingState: function () {
        const loadingEl = document.getElementById('loading-state');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }

        // Re-enable interactions
        document.body.style.pointerEvents = 'auto';
    },

    // Create loading element if it doesn't exist
    createLoadingElement: function () {
        let loadingEl = document.getElementById('loading-state');

        if (!loadingEl) {
            loadingEl = document.createElement('div');
            loadingEl.id = 'loading-state';
            loadingEl.className = 'loading-overlay';
            loadingEl.innerHTML = `
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <div class="loading-message">Loading...</div>
                </div>
            `;
            document.body.appendChild(loadingEl);
        }

        return loadingEl;
    },

    // Show critical error with recovery options
    showCriticalError: function (title, message, recoveryAction = null) {
        const errorModal = this.createErrorModal(title, message, recoveryAction);
        document.body.appendChild(errorModal);
        errorModal.style.display = 'flex';

        // Disable other interactions
        document.body.style.pointerEvents = 'none';
        errorModal.style.pointerEvents = 'auto';
    },

    // Create error modal
    createErrorModal: function (title, message, recoveryAction) {
        const modal = document.createElement('div');
        modal.className = 'error-modal-overlay';

        const recoveryButton = recoveryAction ? `
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove(); document.body.style.pointerEvents = 'auto';">
                Try Again
            </button>
        ` : '';

        modal.innerHTML = `
            <div class="error-modal">
                <div class="error-modal-header">
                    <span class="error-icon">⚠️</span>
                    <h3>${title}</h3>
                </div>
                <div class="error-modal-body">
                    <p>${message}</p>
                </div>
                <div class="error-modal-actions">
                    ${recoveryButton}
                    <button class="btn btn-secondary" onclick="window.location.reload();">
                        Refresh Page
                    </button>
                </div>
            </div>
        `;

        if (recoveryAction) {
            modal.querySelector('.btn-primary').onclick = () => {
                modal.remove();
                document.body.style.pointerEvents = 'auto';
                recoveryAction();
            };
        }

        return modal;
    },

    // Enhanced input validation
    validateUserInput: function (input, type = 'text') {
        if (input === null || input === undefined) return { valid: false, error: 'Input is required' };

        const trimmed = String(input).trim();

        switch (type) {
            case 'answer':
                if (trimmed.length === 0) return { valid: false, error: 'Answer cannot be empty' };
                if (trimmed.length > 500) return { valid: false, error: 'Answer is too long (max 500 characters)' };
                return { valid: true, value: trimmed };

            case 'number':
                const num = parseFloat(trimmed);
                if (isNaN(num)) return { valid: false, error: 'Must be a valid number' };
                if (!isFinite(num)) return { valid: false, error: 'Number must be finite' };
                return { valid: true, value: num };

            case 'text':
            default:
                if (trimmed.length === 0) return { valid: false, error: 'Input cannot be empty' };
                return { valid: true, value: trimmed };
        }
    },

    // Safe DOM manipulation with error handling
    safeElementOperation: function (elementId, operation, fallback = null) {
        try {
            const element = document.getElementById(elementId);
            if (!element) {
                console.warn(`Element with ID '${elementId}' not found`);
                return fallback;
            }

            return operation(element);
        } catch (error) {
            Utils.handleError(error, `safeElementOperation(${elementId})`);
            return fallback;
        }
    },

    // Get application statistics
    getAppStats: function () {
        return {
            questionsLoaded: this.questionsLoaded,
            totalQuestions: QuizData.questions.length,
            filteredQuestions: QuizData.filteredQuestions.length,
            currentIndex: this.currentQuestionIndex,
            isInitialized: this.isInitialized,
            userProgress: QuizStorage.getProgress(),
            userStats: QuizStorage.getStatistics()
        };
    }
};

// Note: Initialization is handled by the inline script in index.html
// to ensure all modules are loaded first

// Global access for debugging
window.PhysicsQuizApp = PhysicsQuizApp;

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhysicsQuizApp;
}