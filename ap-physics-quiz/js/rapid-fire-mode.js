/**
 * Rapid Fire Mode for AP Physics Quiz
 * Fast-paced formula and fact memorization system
 */

const RapidFireMode = {
    // Rapid fire settings
    settings: {
        timePerQuestion: 10, // seconds
        questionsPerRound: 20,
        showTimer: true,
        autoAdvance: true,
        pauseOnIncorrect: false
    },

    // Current rapid fire session data
    session: {
        active: false,
        startTime: null,
        currentQuestionIndex: 0,
        questions: [],
        answers: [],
        timeRemaining: 0,
        timerInterval: null,
        score: 0,
        streak: 0,
        bestStreak: 0
    },

    // Initialize rapid fire mode
    init: function() {
        this.addRapidFireModeToUI();
        this.setupEventListeners();
    },

    // Add rapid fire mode to the mode selection
    addRapidFireModeToUI: function() {
        const modeOptions = document.querySelector('.mode-options');
        if (modeOptions && !document.querySelector('[data-mode="rapid-fire"]')) {
            const rapidFireButton = document.createElement('button');
            rapidFireButton.className = 'mode-btn';
            rapidFireButton.dataset.mode = 'rapid-fire';
            
            rapidFireButton.innerHTML = `
                <div class="btn-emoji">⚡</div>
                <div class="btn-content">
                    <strong>Rapid Fire</strong>
                    <span>Fast-paced formula memorization</span>
                </div>
            `;
            
            modeOptions.appendChild(rapidFireButton);
            
            // Add click handler
            rapidFireButton.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
                rapidFireButton.classList.add('active');
            });
        }
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Listen for quiz start to check if rapid fire mode is selected
        document.addEventListener('quizStartRequested', (event) => {
            const activeMode = document.querySelector('.mode-btn.active');
            if (activeMode && activeMode.dataset.mode === 'rapid-fire') {
                event.preventDefault();
                this.showRapidFireSetup();
            }
        });

        // Keyboard shortcuts for rapid fire mode
        document.addEventListener('keydown', (event) => {
            if (this.session.active) {
                this.handleRapidFireKeyboard(event);
            }
        });
    },

    // Show rapid fire setup modal
    showRapidFireSetup: function() {
        const modal = document.createElement('div');
        modal.className = 'rapid-fire-modal';
        modal.innerHTML = `
            <div class="rapid-fire-setup">
                <div class="setup-header">
                    <h3>⚡ Rapid Fire Setup</h3>
                    <button class="close-setup">×</button>
                </div>
                
                <div class="setup-body">
                    <div class="setup-section">
                        <h4>🎯 Focus Area</h4>
                        <div class="focus-options">
                            <label class="focus-option">
                                <input type="radio" name="focus" value="formulas" checked>
                                <span>Physics Formulas</span>
                                <small>Key equations and relationships</small>
                            </label>
                            <label class="focus-option">
                                <input type="radio" name="focus" value="definitions">
                                <span>Definitions & Concepts</span>
                                <small>Terms and fundamental ideas</small>
                            </label>
                            <label class="focus-option">
                                <input type="radio" name="focus" value="units">
                                <span>Units & Conversions</span>
                                <small>SI units and unit analysis</small>
                            </label>
                            <label class="focus-option">
                                <input type="radio" name="focus" value="mixed">
                                <span>Mixed Review</span>
                                <small>All types of questions</small>
                            </label>
                        </div>
                    </div>

                    <div class="setup-section">
                        <h4>⏱️ Timing</h4>
                        <div class="timing-options">
                            <label>
                                Time per question:
                                <select id="rf-time-per-question">
                                    <option value="5">5 seconds (Lightning)</option>
                                    <option value="8">8 seconds (Fast)</option>
                                    <option value="10" selected>10 seconds (Standard)</option>
                                    <option value="15">15 seconds (Relaxed)</option>
                                </select>
                            </label>
                            <label>
                                Questions per round:
                                <select id="rf-questions-count">
                                    <option value="10">10 questions</option>
                                    <option value="15">15 questions</option>
                                    <option value="20" selected>20 questions</option>
                                    <option value="30">30 questions</option>
                                    <option value="50">50 questions</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div class="setup-section">
                        <h4>⚙️ Options</h4>
                        <div class="option-toggles">
                            <label class="toggle-option">
                                <input type="checkbox" id="rf-show-timer" checked>
                                <span>Show countdown timer</span>
                            </label>
                            <label class="toggle-option">
                                <input type="checkbox" id="rf-auto-advance" checked>
                                <span>Auto-advance on timeout</span>
                            </label>
                            <label class="toggle-option">
                                <input type="checkbox" id="rf-pause-on-wrong">
                                <span>Pause briefly on incorrect answers</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="setup-footer">
                    <button class="btn btn-secondary cancel-rf">Cancel</button>
                    <button class="btn btn-primary start-rf">Start Rapid Fire! ⚡</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event handlers
        modal.querySelector('.close-setup').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('.cancel-rf').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('.start-rf').addEventListener('click', () => {
            this.startRapidFire(modal);
        });
    },

    // Start rapid fire session
    startRapidFire: function(setupModal) {
        // Get settings from setup modal
        const focus = setupModal.querySelector('input[name="focus"]:checked').value;
        this.settings.timePerQuestion = parseInt(setupModal.querySelector('#rf-time-per-question').value);
        this.settings.questionsPerRound = parseInt(setupModal.querySelector('#rf-questions-count').value);
        this.settings.showTimer = setupModal.querySelector('#rf-show-timer').checked;
        this.settings.autoAdvance = setupModal.querySelector('#rf-auto-advance').checked;
        this.settings.pauseOnIncorrect = setupModal.querySelector('#rf-pause-on-wrong').checked;

        document.body.removeChild(setupModal);

        // Generate rapid fire questions
        const questions = this.generateRapidFireQuestions(focus);
        if (questions.length === 0) {
            this.showMessage('No questions available for rapid fire mode', 'error');
            return;
        }

        // Initialize session
        this.session = {
            active: true,
            startTime: Date.now(),
            currentQuestionIndex: 0,
            questions: questions.slice(0, this.settings.questionsPerRound),
            answers: [],
            timeRemaining: this.settings.timePerQuestion,
            timerInterval: null,
            score: 0,
            streak: 0,
            bestStreak: 0
        };

        // Show rapid fire interface
        this.showRapidFireInterface();
        this.displayRapidFireQuestion();
        this.startTimer();
    },

    // Generate questions for rapid fire based on focus area
    generateRapidFireQuestions: function(focus) {
        let questions = [];

        switch (focus) {
            case 'formulas':
                questions = this.createFormulaQuestions();
                break;
            case 'definitions':
                questions = this.createDefinitionQuestions();
                break;
            case 'units':
                questions = this.createUnitQuestions();
                break;
            case 'mixed':
            default:
                // Try to get questions from main app, fallback to custom questions
                const allQuestions = (window.PhysicsQuizApp && window.PhysicsQuizApp.questions) ? 
                    window.PhysicsQuizApp.questions : [];
                
                if (allQuestions.length > 0) {
                    // Mix of all available questions, prioritizing shorter ones
                    questions = allQuestions.filter(q => 
                        q.type === 'tf' || 
                        (q.type === 'fill' && q.question.length < 150) ||
                        (q.type === 'mc' && q.question.length < 200)
                    );
                } else {
                    // Fallback: combine all custom rapid fire questions
                    questions = [
                        ...this.createFormulaQuestions(),
                        ...this.createDefinitionQuestions(),
                        ...this.createUnitQuestions()
                    ];
                }
                break;
        }

        // Shuffle questions
        return this.shuffleArray(questions);
    },

    // Create formula-focused rapid fire questions
    createFormulaQuestions: function() {
        const formulas = [
            { question: 'What is the formula for velocity?', answer: 'v = d/t', type: 'fill' },
            { question: 'What is the formula for acceleration?', answer: 'a = Δv/Δt', type: 'fill' },
            { question: 'What is Newton\'s second law formula?', answer: 'F = ma', type: 'fill' },
            { question: 'What is the kinetic energy formula?', answer: 'KE = ½mv²', type: 'fill' },
            { question: 'What is the potential energy formula?', answer: 'PE = mgh', type: 'fill' },
            { question: 'What is the momentum formula?', answer: 'p = mv', type: 'fill' },
            { question: 'What is the work formula?', answer: 'W = Fd', type: 'fill' },
            { question: 'What is the power formula?', answer: 'P = W/t', type: 'fill' },
            { question: 'What is the centripetal force formula?', answer: 'Fc = mv²/r', type: 'fill' },
            { question: 'What is the period of circular motion formula?', answer: 'T = 2πr/v', type: 'fill' },
            { question: 'What is the spring force formula?', answer: 'F = kx', type: 'fill' },
            { question: 'What is the gravitational force formula?', answer: 'F = GMm/r²', type: 'fill' },
        ];

        return formulas.map((f, index) => ({
            id: `rf-formula-${index}`,
            ...f,
            topic: 'formulas',
            difficulty: 1
        }));
    },

    // Create definition-focused questions
    createDefinitionQuestions: function() {
        const definitions = [
            { question: 'True or False: Velocity is a vector quantity', answer: 'true', type: 'tf' },
            { question: 'True or False: Speed is the same as velocity', answer: 'false', type: 'tf' },
            { question: 'True or False: Acceleration can be negative', answer: 'true', type: 'tf' },
            { question: 'What is the rate of change of velocity?', answer: 'acceleration', type: 'fill' },
            { question: 'What is the product of mass and velocity?', answer: 'momentum', type: 'fill' },
            { question: 'What is the ability to do work?', answer: 'energy', type: 'fill' },
            { question: 'True or False: Energy can be created or destroyed', answer: 'false', type: 'tf' },
            { question: 'What is the SI unit of force?', answer: 'Newton', type: 'fill' },
            { question: 'What is the SI unit of energy?', answer: 'Joule', type: 'fill' },
            { question: 'What is the SI unit of power?', answer: 'Watt', type: 'fill' },
        ];

        return definitions.map((d, index) => ({
            id: `rf-definition-${index}`,
            ...d,
            topic: 'definitions',
            difficulty: 1
        }));
    },

    // Create unit-focused questions
    createUnitQuestions: function() {
        const units = [
            { question: 'What are the SI units of velocity?', answer: 'm/s', type: 'fill' },
            { question: 'What are the SI units of acceleration?', answer: 'm/s²', type: 'fill' },
            { question: 'What are the SI units of momentum?', answer: 'kg⋅m/s', type: 'fill' },
            { question: 'What are the SI units of force?', answer: 'N', type: 'fill' },
            { question: 'What are the SI units of work?', answer: 'J', type: 'fill' },
            { question: 'What are the SI units of power?', answer: 'W', type: 'fill' },
            { question: 'True or False: 1 Newton = 1 kg⋅m/s²', answer: 'true', type: 'tf' },
            { question: 'True or False: 1 Joule = 1 N⋅m', answer: 'true', type: 'tf' },
            { question: 'True or False: 1 Watt = 1 J/s', answer: 'true', type: 'tf' },
        ];

        return units.map((u, index) => ({
            id: `rf-unit-${index}`,
            ...u,
            topic: 'units',
            difficulty: 1
        }));
    },

    // Show rapid fire interface
    showRapidFireInterface: function() {
        const startScreen = document.getElementById('start-screen');
        const quizScreen = document.getElementById('quiz-screen');
        
        if (startScreen) startScreen.style.display = 'none';
        if (quizScreen) {
            quizScreen.style.display = 'block';
            quizScreen.classList.add('rapid-fire-mode');
        }

        // Add rapid fire specific elements
        this.addRapidFireElements();
    },

    // Add rapid fire specific UI elements
    addRapidFireElements: function() {
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer) {
            // Add rapid fire timer and stats
            const rfStats = document.createElement('div');
            rfStats.id = 'rapid-fire-stats';
            rfStats.className = 'rapid-fire-stats';
            rfStats.innerHTML = `
                <div class="rf-timer-container">
                    <div class="rf-timer" id="rf-timer">⏱️ ${this.settings.timePerQuestion}</div>
                    <div class="rf-timer-bar">
                        <div class="rf-timer-fill" id="rf-timer-fill"></div>
                    </div>
                </div>
                <div class="rf-score">
                    <div class="rf-current-score">Score: <span id="rf-score">0</span></div>
                    <div class="rf-streak">Streak: <span id="rf-streak">0</span></div>
                </div>
            `;
            
            progressContainer.appendChild(rfStats);
        }

        // Modify question controls for rapid fire
        const controls = document.querySelector('.quiz-controls');
        if (controls) {
            controls.innerHTML = `
                <button id="rf-pause" class="btn btn-secondary">⏸️ Pause</button>
                <div class="control-center">
                    <button id="rf-skip" class="btn btn-secondary">Skip ⏭️</button>
                    <button id="submit-answer" class="btn btn-primary">Submit ⚡</button>
                </div>
                <button id="rf-quit" class="btn btn-secondary">🚪 Quit Round</button>
            `;

            // Add rapid fire control handlers
            controls.querySelector('#rf-pause').addEventListener('click', () => this.togglePause());
            controls.querySelector('#rf-skip').addEventListener('click', () => this.skipQuestion());
            controls.querySelector('#rf-quit').addEventListener('click', () => this.quitRapidFire());
        }
    },

    // Display current rapid fire question
    displayRapidFireQuestion: function() {
        const question = this.session.questions[this.session.currentQuestionIndex];
        if (!question) {
            this.endRapidFire();
            return;
        }

        // Update progress
        const counter = document.getElementById('question-counter');
        if (counter) {
            counter.textContent = `Question ${this.session.currentQuestionIndex + 1} of ${this.session.questions.length}`;
        }

        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const progress = ((this.session.currentQuestionIndex + 1) / this.session.questions.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Display question using existing UI components
        if (window.QuizUI) {
            window.QuizUI.displayQuestion(question);
        }

        // Update breadcrumb for rapid fire
        const breadcrumbTopic = document.getElementById('breadcrumb-topic');
        if (breadcrumbTopic) {
            breadcrumbTopic.textContent = 'Rapid Fire';
        }

        // Reset and start timer
        this.resetTimer();
    },

    // Start/reset the countdown timer
    startTimer: function() {
        if (!this.settings.showTimer) return;

        this.clearTimer();
        this.session.timeRemaining = this.settings.timePerQuestion;
        
        this.session.timerInterval = setInterval(() => {
            this.session.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.session.timeRemaining <= 0) {
                this.timeUp();
            }
        }, 1000);
    },

    // Reset timer for new question
    resetTimer: function() {
        this.session.timeRemaining = this.settings.timePerQuestion;
        this.updateTimerDisplay();
        if (this.session.active) {
            this.startTimer();
        }
    },

    // Update timer display
    updateTimerDisplay: function() {
        const timer = document.getElementById('rf-timer');
        const timerFill = document.getElementById('rf-timer-fill');
        
        if (timer) {
            timer.textContent = `⏱️ ${this.session.timeRemaining}`;
            
            // Color coding for urgency
            if (this.session.timeRemaining <= 3) {
                timer.classList.add('urgent');
            } else {
                timer.classList.remove('urgent');
            }
        }
        
        if (timerFill) {
            const percentage = (this.session.timeRemaining / this.settings.timePerQuestion) * 100;
            timerFill.style.width = `${percentage}%`;
        }
    },

    // Handle time up
    timeUp: function() {
        this.clearTimer();
        
        if (this.settings.autoAdvance) {
            this.recordAnswer(null, false); // Record as incorrect
            this.nextQuestion();
        } else {
            this.showTimeUpMessage();
        }
    },

    // Clear timer
    clearTimer: function() {
        if (this.session.timerInterval) {
            clearInterval(this.session.timerInterval);
            this.session.timerInterval = null;
        }
    },

    // Handle rapid fire keyboard shortcuts
    handleRapidFireKeyboard: function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            this.submitCurrentAnswer();
        } else if (event.code === 'ArrowRight') {
            event.preventDefault();
            this.skipQuestion();
        } else if (event.code === 'Escape') {
            event.preventDefault();
            this.togglePause();
        }
    },

    // Submit current answer in rapid fire mode
    submitCurrentAnswer: function() {
        if (window.QuizUI && typeof window.QuizUI.getUserAnswer === 'function') {
            const userAnswer = window.QuizUI.getUserAnswer();
            if (userAnswer !== null) {
                const question = this.session.questions[this.session.currentQuestionIndex];
                const isCorrect = window.QuizUI.checkAnswer(userAnswer, question);
                
                this.recordAnswer(userAnswer, isCorrect);
                
                if (this.settings.pauseOnIncorrect && !isCorrect) {
                    this.showIncorrectFeedback(() => this.nextQuestion());
                } else {
                    this.nextQuestion();
                }
            }
        }
    },

    // Record answer and update stats
    recordAnswer: function(userAnswer, isCorrect) {
        this.session.answers.push({
            questionIndex: this.session.currentQuestionIndex,
            userAnswer: userAnswer,
            isCorrect: isCorrect,
            timeSpent: this.settings.timePerQuestion - this.session.timeRemaining
        });

        if (isCorrect) {
            this.session.score++;
            this.session.streak++;
            this.session.bestStreak = Math.max(this.session.bestStreak, this.session.streak);
        } else {
            this.session.streak = 0;
        }

        this.updateRapidFireStats();
    },

    // Update rapid fire statistics display
    updateRapidFireStats: function() {
        const scoreDisplay = document.getElementById('rf-score');
        const streakDisplay = document.getElementById('rf-streak');
        
        if (scoreDisplay) {
            scoreDisplay.textContent = this.session.score;
        }
        
        if (streakDisplay) {
            streakDisplay.textContent = this.session.streak;
        }
    },

    // Move to next question
    nextQuestion: function() {
        this.clearTimer();
        this.session.currentQuestionIndex++;
        
        if (this.session.currentQuestionIndex >= this.session.questions.length) {
            this.endRapidFire();
        } else {
            this.displayRapidFireQuestion();
        }
    },

    // Skip current question
    skipQuestion: function() {
        this.recordAnswer(null, false);
        this.nextQuestion();
    },

    // Toggle pause
    togglePause: function() {
        const pauseBtn = document.getElementById('rf-pause');
        if (!pauseBtn) return;

        if (this.session.timerInterval) {
            // Currently running, pause it
            this.clearTimer();
            pauseBtn.textContent = '▶️ Resume';
            pauseBtn.classList.add('paused');
            this.showPauseOverlay();
        } else if (this.session.active) {
            // Currently paused, resume it
            this.startTimer();
            pauseBtn.textContent = '⏸️ Pause';
            pauseBtn.classList.remove('paused');
            this.hidePauseOverlay();
        }
    },

    // Show pause overlay
    showPauseOverlay: function() {
        const overlay = document.createElement('div');
        overlay.id = 'rf-pause-overlay';
        overlay.className = 'rf-pause-overlay';
        overlay.innerHTML = `
            <div class="pause-content">
                <h3>⏸️ Paused</h3>
                <p>Click Resume to continue</p>
                <button class="btn btn-primary" onclick="RapidFireMode.togglePause()">▶️ Resume</button>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    // Hide pause overlay
    hidePauseOverlay: function() {
        const overlay = document.getElementById('rf-pause-overlay');
        if (overlay) {
            document.body.removeChild(overlay);
        }
    },

    // End rapid fire session
    endRapidFire: function() {
        this.clearTimer();
        this.session.active = false;
        
        const endTime = Date.now();
        const totalTime = endTime - this.session.startTime;
        
        this.showRapidFireResults(totalTime);
    },

    // Show rapid fire results
    showRapidFireResults: function(totalTime) {
        const accuracy = ((this.session.score / this.session.questions.length) * 100).toFixed(1);
        const avgTimePerQuestion = (totalTime / this.session.questions.length / 1000).toFixed(1);
        
        const modal = document.createElement('div');
        modal.className = 'rapid-fire-results-modal';
        modal.innerHTML = `
            <div class="rf-results">
                <div class="results-header">
                    <h3>⚡ Rapid Fire Complete!</h3>
                </div>
                
                <div class="results-stats">
                    <div class="stat-item">
                        <div class="stat-value">${this.session.score}/${this.session.questions.length}</div>
                        <div class="stat-label">Questions Correct</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${accuracy}%</div>
                        <div class="stat-label">Accuracy</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${this.session.bestStreak}</div>
                        <div class="stat-label">Best Streak</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${avgTimePerQuestion}s</div>
                        <div class="stat-label">Avg Time/Question</div>
                    </div>
                </div>
                
                <div class="results-actions">
                    <button class="btn btn-secondary" id="rf-review-answers">📋 Review Answers</button>
                    <button class="btn btn-primary" id="rf-play-again">⚡ Play Again</button>
                    <button class="btn btn-secondary" id="rf-back-to-menu">🏠 Main Menu</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event handlers
        modal.querySelector('#rf-play-again').addEventListener('click', () => {
            document.body.removeChild(modal);
            this.showRapidFireSetup();
        });
        
        modal.querySelector('#rf-back-to-menu').addEventListener('click', () => {
            document.body.removeChild(modal);
            this.returnToMainMenu();
        });
        
        modal.querySelector('#rf-review-answers').addEventListener('click', () => {
            this.showAnswerReview(modal);
        });
        
        // Save rapid fire stats
        this.saveRapidFireStats();
    },

    // Quit rapid fire session
    quitRapidFire: function() {
        if (confirm('Are you sure you want to quit this Rapid Fire round?')) {
            this.endRapidFire();
        }
    },

    // Return to main menu
    returnToMainMenu: function() {
        const startScreen = document.getElementById('start-screen');
        const quizScreen = document.getElementById('quiz-screen');
        
        if (quizScreen) {
            quizScreen.style.display = 'none';
            quizScreen.classList.remove('rapid-fire-mode');
        }
        
        if (startScreen) {
            startScreen.style.display = 'block';
        }
        
        // Clean up rapid fire elements
        const rfStats = document.getElementById('rapid-fire-stats');
        if (rfStats) rfStats.remove();
        
        // Reset session
        this.session = {
            active: false,
            startTime: null,
            currentQuestionIndex: 0,
            questions: [],
            answers: [],
            timeRemaining: 0,
            timerInterval: null,
            score: 0,
            streak: 0,
            bestStreak: 0
        };
    },

    // Save rapid fire statistics
    saveRapidFireStats: function() {
        try {
            let rfStats = Utils.storage.get('rapid_fire_stats', {
                totalRounds: 0,
                totalQuestions: 0,
                totalCorrect: 0,
                bestStreak: 0,
                bestAccuracy: 0,
                fastestAvgTime: Infinity,
                recentScores: []
            });

            const accuracy = (this.session.score / this.session.questions.length) * 100;
            const totalTime = Date.now() - this.session.startTime;
            const avgTime = totalTime / this.session.questions.length / 1000;

            rfStats.totalRounds++;
            rfStats.totalQuestions += this.session.questions.length;
            rfStats.totalCorrect += this.session.score;
            rfStats.bestStreak = Math.max(rfStats.bestStreak, this.session.bestStreak);
            rfStats.bestAccuracy = Math.max(rfStats.bestAccuracy, accuracy);
            rfStats.fastestAvgTime = Math.min(rfStats.fastestAvgTime, avgTime);

            // Keep recent 10 scores
            rfStats.recentScores.unshift({
                score: this.session.score,
                total: this.session.questions.length,
                accuracy: accuracy,
                streak: this.session.bestStreak,
                date: new Date().toISOString()
            });
            rfStats.recentScores = rfStats.recentScores.slice(0, 10);

            Utils.storage.set('rapid_fire_stats', rfStats);
            
        } catch (error) {
            Utils.handleError(error, 'RapidFireMode.saveRapidFireStats');
        }
    },

    // Utility functions
    shuffleArray: function(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    showMessage: function(message, type) {
        if (window.QuizUI && typeof window.QuizUI.showFeedback === 'function') {
            window.QuizUI.showFeedback(message, type);
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => RapidFireMode.init());
} else {
    RapidFireMode.init();
}