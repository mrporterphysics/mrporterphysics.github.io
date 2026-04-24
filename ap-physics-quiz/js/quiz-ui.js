/**
 * QuizUI - User interface management and DOM manipulation
 */

const QuizUI = {
    // UI elements cache
    elements: {
        displays: {},
        controls: {},
        modals: {}
    },

    // Current question reference
    currentQuestion: null,
    isInitialized: false,

    // Initialize UI components
    init: function () {
        console.log('Initializing Quiz UI...');
        this.cacheElements();
        this.setupMathRendering();
        this.setupAnswerHandlers();
        this.isInitialized = true;
    },

    // Get readable name for question type
    getQuestionTypeName: function (type) {
        const typeNames = {
            'tf': 'True/False',
            'mc': 'Multiple Choice',
            'fill': 'Fill in the Blank',
            'matching': 'Matching'
        };
        return typeNames[type] || type;
    },

    // Cache DOM elements for performance
    cacheElements: function () {
        this.elements.displays = {
            question: document.getElementById('question-text'),
            questionType: document.getElementById('question-type'),
            questionTopic: document.getElementById('question-topic'),
            questionDifficulty: document.getElementById('question-difficulty'),
            breadcrumbTopic: document.getElementById('breadcrumb-topic'),
            breadcrumbType: document.getElementById('breadcrumb-type'),
            options: document.getElementById('answer-options'),
            explanation: document.getElementById('explanation'),
            feedback: document.getElementById('feedback'),
            counter: document.getElementById('question-counter'),
            progress: document.getElementById('progress-bar')
        };

        this.elements.controls = {
            submitBtn: document.getElementById('submit-answer'),
            nextBtn: document.getElementById('next-question'),
            prevBtn: document.getElementById('prev-question'),
            resetBtn: document.getElementById('reset-quiz'),
            bookmarkBtn: document.getElementById('bookmark-question')
        };
    },

    // Display a question in the UI

    // Validate required DOM elements exist
    validateRequiredElements: function () {
        const requiredElements = [
            'question-text', 'answer-options', 'question-counter',
            'submit-answer', 'feedback', 'explanation'
        ];

        const missingElements = requiredElements.filter(id => !document.getElementById(id));

        if (missingElements.length > 0) {
            console.error('Missing critical DOM elements:', missingElements);
            this.showError('Critical UI elements are missing. Please refresh the page.');
            return false;
        }
        return true;
    },

    // Show error message to user
    showError: function (message) {
        const errorContainer = document.querySelector('.app-container') || document.body;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'background: #ff4444; color: white; padding: 15px; margin: 10px; border-radius: 5px; text-align: center;';
        errorDiv.textContent = message;
        errorContainer.insertBefore(errorDiv, errorContainer.firstChild);

        setTimeout(() => errorDiv.remove(), 5000);
    },
    displayQuestion: function (question) {
        // Validate DOM elements first
        if (!this.validateRequiredElements()) {
            return false;
        }

        if (!question) {
            console.error('No question provided to display');
            this.showError('Unable to load question - please try again');
            return false;
        }

        this.currentQuestion = question;

        // Clear previous content
        this.clearQuestionDisplay();

        // Display question metadata
        this.displayQuestionHeader(question);

        // Display question text
        this.displayQuestionText(question);

        // Display answer interface based on question type
        this.displayAnswerInterface(question);

        // Add fact sheet integration if available
        this.addFactSheetIntegration(question);

        // Add report issue button
        this.addReportButton(question);

        // Update UI state
        this.updateUIState(question);

        // Render any math content
        this.renderMathContent();

        // Dispatch event for fact sheet links integration
        document.dispatchEvent(new CustomEvent('questionDisplayed', {
            detail: { question: question }
        }));
    },

    // Clear previous question display
    clearQuestionDisplay: function () {
        if (this.elements.displays.options) {
            this.elements.displays.options.innerHTML = '';
        }
        if (this.elements.displays.feedback) {
            this.elements.displays.feedback.innerHTML = '';
            this.elements.displays.feedback.style.display = 'none';
        }
        if (this.elements.displays.explanation) {
            this.elements.displays.explanation.style.display = 'none';
        }
    },

    // Display question header information
    displayQuestionHeader: function (question) {
        // Question type
        if (this.elements.displays.questionType) {
            const typeInfo = QuizData.QUESTION_TYPES[question.type];
            this.elements.displays.questionType.innerHTML = `
                <span class="type-icon">${typeInfo?.icon || '❓'}</span>
                <span class="type-name">${typeInfo?.name || question.type}</span>
            `;
        }

        // Question topic
        const topicName = question.topic.charAt(0).toUpperCase() + question.topic.slice(1);
        if (this.elements.displays.questionTopic) {
            this.elements.displays.questionTopic.textContent = topicName;
        }

        // Update breadcrumbs
        if (this.elements.displays.breadcrumbTopic) {
            this.elements.displays.breadcrumbTopic.textContent = topicName;
        }
        if (this.elements.displays.breadcrumbType) {
            this.elements.displays.breadcrumbType.textContent = this.getQuestionTypeName(question.type);
        }

        // Question difficulty with enhanced styling
        if (this.elements.displays.questionDifficulty) {
            const stars = '★'.repeat(question.difficulty) + '☆'.repeat(3 - question.difficulty);
            this.elements.displays.questionDifficulty.innerHTML = `
                <span class="stars">${stars}</span>
                <span class="difficulty-text">Level ${question.difficulty}</span>
            `;

            // Add difficulty class for color coding
            this.elements.displays.questionDifficulty.className = `question-difficulty difficulty-${question.difficulty}`;
        }
    },


    // Display question text
    displayQuestionText: function (question) {
        const questionElement = this.elements.displays.question;

        if (questionElement) {
            if (Utils.renderMarkdown) {
                questionElement.innerHTML = Utils.renderMarkdown(question.question);
            } else {
                questionElement.innerHTML = question.question;
            }
        } else {
            console.error('Question text element not found');
        }
    },

    // Display answer interface based on question type
    displayAnswerInterface: function (question) {
        const container = this.elements.displays.options;
        if (!container) return;

        let html = '';

        switch (question.type) {
            case 'mc':
            case 'matching':
                html = this.createMultipleChoiceInterface(question);
                break;
            case 'tf':
                html = this.createTrueFalseInterface(question);
                break;
            case 'fill':
                html = this.createFillInBlankInterface(question);
                break;
            default:
                html = '<p class="error">Unknown question type</p>';
        }

        container.innerHTML = html;
        this.setupAnswerHandlers();
    },

    // Create multiple choice interface
    createMultipleChoiceInterface: function (question) {
        if (!question.options || question.options.length === 0) {
            return '<p class="error">No options available for this question</p>';
        }

        let html = '<div class="mc-options">';
        question.options.forEach((option, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, D, E
            html += `
                <label class="option-label" data-value="${letter}">
                    <input type="radio" name="mc-answer" value="${letter}" class="option-input">
                    <span class="option-letter">${letter})</span>
                    <span class="option-text">${option}</span>
                </label>
            `;
        });
        html += '</div>';

        return html;
    },

    // Create true/false interface
    createTrueFalseInterface: function (question) {
        return `
            <div class="tf-options">
                <label class="option-label" data-value="true">
                    <input type="radio" name="tf-answer" value="true" class="option-input">
                    <span class="tf-option true">True</span>
                </label>
                <label class="option-label" data-value="false">
                    <input type="radio" name="tf-answer" value="false" class="option-input">
                    <span class="tf-option false">False</span>
                </label>
            </div>
        `;
    },

    // Create fill-in-the-blank interface
    createFillInBlankInterface: function (question) {
        const vars = Array.isArray(question.variables) ? question.variables : [];
        const varsHtml = vars.length
            ? `<div class="fill-variables"><strong>Express your answer in terms of:</strong> ${vars.map(v => `<code>${Utils.sanitizeString(v)}</code>`).join(', ')}</div>`
            : '';
        return `
            <div class="fill-interface">
                ${varsHtml}
                <input type="text" id="fill-answer" class="fill-input"
                       placeholder="Enter your answer..."
                       autocomplete="off">
                <div class="fill-hints">
                    <small>Tip: Equations accept either side of <code>=</code>. Multiple equivalent forms are accepted.</small>
                </div>
            </div>
        `;
    },


    // Add fact sheet integration if available
    addFactSheetIntegration: function (question) {
        // Use the specific ID to find the fact sheet container
        let factSheetSection = document.getElementById('fact-sheet-container');

        // Fallback to class-based search within question container
        if (!factSheetSection) {
            const questionContainer = this.elements.displays.question?.parentElement;
            if (questionContainer) {
                factSheetSection = questionContainer.querySelector('.fact-sheet-section');
            }
        }

        if (!factSheetSection) return;

        // Clear existing content but don't remove the element
        factSheetSection.innerHTML = '';

        // Add new fact sheet integration if available
        if (typeof FactSheetIntegration !== 'undefined') {
            const factSheetButton = FactSheetIntegration.createFactSheetButton(question);
            if (factSheetButton) {
                factSheetSection.appendChild(factSheetButton);
            }
        }
    },

    // Add report issue button
    addReportButton: function (question) {
        const container = document.querySelector('.question-header') || this.elements.displays.question?.parentElement;
        if (!container) return;

        // Remove existing button if any
        const existingBtn = document.getElementById('report-issue-btn');
        if (existingBtn) existingBtn.remove();

        const reportBtn = document.createElement('button');
        reportBtn.id = 'report-issue-btn';
        reportBtn.className = 'report-btn';
        reportBtn.innerHTML = '🚩 Report';
        reportBtn.title = 'Report an issue with this question';
        reportBtn.style.cssText = 'background:none; border:none; color:var(--tx-3, #888); cursor:pointer; font-size:0.8em; margin-left:10px; opacity:0.7; transition:opacity 0.2s;';

        reportBtn.onmouseover = () => reportBtn.style.opacity = '1';
        reportBtn.onmouseout = () => reportBtn.style.opacity = '0.7';

        reportBtn.onclick = () => {
            const subject = encodeURIComponent(`Issue with Question ${question.id}`);
            const body = encodeURIComponent(`Question ID: ${question.id}\nType: ${question.type}\nTopic: ${question.topic}\n\nIssue description:\n`);
            window.open(`https://github.com/mrporterphysics/mrporterphysics.github.io/issues/new?title=${subject}&body=${body}`, '_blank');
        };

        // Try to append to difficulty container for better layout
        const difficultyEl = this.elements.displays.questionDifficulty;
        if (difficultyEl && difficultyEl.parentNode) {
            difficultyEl.parentNode.appendChild(reportBtn);
        } else {
            container.appendChild(reportBtn);
        }
    },

    // Setup answer handling
    setupAnswerHandlers: function () {
        // Submit answer button
        if (this.elements.controls.submitBtn) {
            this.elements.controls.submitBtn.onclick = () => {
                this.submitAnswer();
            };
        }

        // Auto-submit for multiple choice (optional)
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', () => {
                if (QuizStorage.getSettings().autoSubmit) {
                    this.submitAnswer();
                }
            });
        });

        // Submit on Enter for text inputs
        document.querySelectorAll('input[type="text"]').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.submitAnswer();
                }
            });
        });

        // Bookmark button
        if (this.elements.controls.bookmarkBtn) {
            this.elements.controls.bookmarkBtn.onclick = () => {
                this.toggleBookmark();
            };
        }
    },

    // Submit the current answer with comprehensive error handling
    submitAnswer: function () {
        try {
            if (!this.currentQuestion) {
                console.error('No current question to submit answer for');
                this.showFeedback('Error: No question available to submit', 'error');
                return;
            }

            // Validate user input with enhanced validation
            const userAnswer = this.getUserAnswer();
            const validation = Utils.validateUserInput(userAnswer, 'answer');

            if (!validation.isValid) {
                this.showFeedback(`Input Error: ${validation.errors.join(', ')}`, 'warning');
                return;
            }

            const cleanAnswer = validation.value;
            const isCorrect = this.checkAnswer(cleanAnswer, this.currentQuestion);

            // Update storage with error handling
            try {
                QuizStorage.updateProgress(this.currentQuestion.id, isCorrect);

                if (!isCorrect) {
                    QuizStorage.addMissedQuestion(this.currentQuestion.id);
                }
            } catch (storageError) {
                Utils.handleError(storageError, 'QuizUI.submitAnswer - storage');
                this.showFeedback('Warning: Progress may not be saved due to storage issues', 'warning');
            }

            // Show feedback
            this.showAnswerFeedback(isCorrect, cleanAnswer, this.currentQuestion);

            // Explanation is now shown in the feedback modal, no need for separate call

            // Dispatch event for other components (streak tracker, topic mastery)
            document.dispatchEvent(new CustomEvent('questionAnswered', {
                detail: {
                    isCorrect: isCorrect,
                    question: this.currentQuestion,
                    userAnswer: cleanAnswer
                }
            }));

            // Update UI state
            this.disableAnswerInputs();
            this.showNextButton();
        } catch (error) {
            Utils.handleError(error, 'QuizUI.submitAnswer');
            this.showFeedback('An error occurred while submitting your answer. Please try again.', 'error');
        }
    },

    // Get user's answer from the UI
    getUserAnswer: function () {
        const question = this.currentQuestion;
        if (!question) return null;

        switch (question.type) {
            case 'mc':
            case 'matching':
                const mcChecked = document.querySelector('input[name="mc-answer"]:checked');
                return mcChecked ? mcChecked.value : null;

            case 'tf':
                const tfChecked = document.querySelector('input[name="tf-answer"]:checked');
                return tfChecked ? tfChecked.value : null; // string "true" or "false"

            case 'fill':
                const fillInput = document.getElementById('fill-answer');
                return fillInput ? fillInput.value.trim() : null;

            default:
                return null;
        }
    },

    // Check if answer is correct
    checkAnswer: function (userAnswer, question) {
        if (userAnswer === null || userAnswer === undefined) return false;

        if (question.type === 'tf') {
            return String(userAnswer).toLowerCase().trim() === String(question.answer).toLowerCase().trim();
        }

        if (question.type === 'fill') {
            // Strip trailing punctuation (period, comma, semicolon) that a
            // student may append by sentence habit.
            const cleaned = String(userAnswer).replace(/[.,;]+\s*$/, '').trim();
            return Utils.answersMatch(cleaned, question.answer, question.alternateAnswers);
        }

        if (question.type === 'mc' || question.type === 'matching') {
            return String(userAnswer).toUpperCase().trim() === String(question.answer).toUpperCase().trim();
        }

        return false;
    },

    // Show answer feedback
    showAnswerFeedback: function (isCorrect, userAnswer, question) {
        const feedbackEl = this.elements.displays.feedback;
        if (!feedbackEl) return;

        // Add correct/incorrect class to feedback element
        feedbackEl.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');

        let html = `
            <div class="feedback-header ${isCorrect ? 'correct' : 'incorrect'}">
                <span class="feedback-icon">${isCorrect ? '✅' : '❌'}</span>
                <span class="feedback-text">${isCorrect ? 'Correct!' : 'Incorrect'}</span>
            </div>
        `;

        if (!isCorrect) {
            let displayUserAnswer = userAnswer;
            let displayCorrectAnswer = question.answer;

            if (question.type === 'tf') {
                displayUserAnswer = String(userAnswer).toLowerCase() === 'true' ? 'True' : 'False';
                displayCorrectAnswer = String(question.answer).toLowerCase().trim() === 'true' ? 'True' : 'False';
            } else if ((question.type === 'mc' || question.type === 'matching') && question.options) {
                // Show letter + option text for MC/matching
                const userIdx = String(userAnswer).toUpperCase().charCodeAt(0) - 65;
                const correctIdx = String(question.answer).toUpperCase().charCodeAt(0) - 65;
                if (question.options[userIdx]) {
                    displayUserAnswer = `${String(userAnswer).toUpperCase()}) ${question.options[userIdx]}`;
                }
                if (question.options[correctIdx]) {
                    displayCorrectAnswer = `${String(question.answer).toUpperCase()}) ${question.options[correctIdx]}`;
                }
            }

            html += `
                <div class="feedback-details">
                    <p><strong>Your answer:</strong> ${displayUserAnswer}</p>
                    <p><strong>Correct answer:</strong> ${displayCorrectAnswer}</p>
                </div>
            `;
        }

        // Add explanation if available (in learning mode)
        const settings = QuizStorage.getSettings();
        if (settings.mode === 'learning' && question.explanation) {
            const explanationContent = Utils.renderMarkdown ? Utils.renderMarkdown(question.explanation) : question.explanation;
            html += `
                <div class="feedback-explanation">
                    <h4 style="color: var(--bg-primary); margin: 16px 0 8px 0; font-size: 1.1rem;">Explanation:</h4>
                    <div class="markdown-content" style="color: var(--bg-primary); opacity: 0.95;">${explanationContent}</div>
                </div>
            `;
        }

        // Add Next button in the modal (label depends on whether it's the last question)
        const app = window.PhysicsQuizApp;
        const isLast = app && app.getActiveQuestions
            ? app.currentQuestionIndex >= app.getActiveQuestions().length - 1
            : false;
        const btnLabel = isLast ? 'Finish Quiz' : 'Next Question →';
        html += `
            <div class="feedback-actions" style="margin-top: 20px; display: flex; justify-content: center;">
                <button id="feedback-next-btn" class="btn btn-primary" style="padding: 12px 32px; font-size: 1rem;">
                    ${btnLabel}
                </button>
            </div>
        `;

        feedbackEl.innerHTML = html;
        feedbackEl.style.display = 'block';

        // Add animation
        feedbackEl.classList.add('feedback-show');
        setTimeout(() => {
            feedbackEl.classList.remove('feedback-show');
        }, 100);

        // Render math in explanation if present
        this.renderMathContent();

        // Setup Next button click handler
        const nextBtn = document.getElementById('feedback-next-btn');
        if (nextBtn) {
            nextBtn.onclick = () => {
                this.closeFeedbackModal();
                if (isLast && app && typeof app.finishQuiz === 'function') {
                    app.finishQuiz();
                } else if (app && typeof app.nextQuestion === 'function') {
                    app.nextQuestion();
                }
            };
        }

        // Hide the regular next button since it's now in the modal
        if (this.elements.controls.nextBtn) {
            this.elements.controls.nextBtn.style.display = 'none';
        }
    },

    // Close feedback modal
    closeFeedbackModal: function () {
        const feedbackEl = this.elements.displays.feedback;
        if (feedbackEl) {
            feedbackEl.style.display = 'none';
            feedbackEl.className = 'feedback';
        }
    },

    // Show explanation
    showExplanation: function (explanationText) {
        const explanationEl = this.elements.displays.explanation;
        if (!explanationEl || !explanationText) return;

        const content = Utils.renderMarkdown ? Utils.renderMarkdown(explanationText) : explanationText;

        explanationEl.innerHTML = `
            <div class="explanation-content">
                <h4>Explanation:</h4>
                <div class="markdown-content">${content}</div>
            </div>
        `;
        explanationEl.style.display = 'block';

        // Re-run math rendering on the explanation
        this.renderMathContent();
    },

    // Show general feedback message
    showFeedback: function (message, type = 'info') {
        const feedbackEl = this.elements.displays.feedback;
        if (!feedbackEl) return;

        feedbackEl.innerHTML = `
            <div class="feedback-message ${type}">
                ${message}
            </div>
        `;
        feedbackEl.style.display = 'block';

        setTimeout(() => {
            feedbackEl.style.display = 'none';
        }, 3000);
    },

    // Disable answer inputs after submission
    disableAnswerInputs: function () {
        document.querySelectorAll('.option-input, .fill-input').forEach(input => {
            input.disabled = true;
        });
    },

    // Enable answer inputs
    enableAnswerInputs: function () {
        document.querySelectorAll('.option-input, .fill-input').forEach(input => {
            input.disabled = false;
        });
    },

    // Show next button
    showNextButton: function () {
        if (this.elements.controls.nextBtn) {
            this.elements.controls.nextBtn.style.display = 'inline-block';
        }
        if (this.elements.controls.submitBtn) {
            this.elements.controls.submitBtn.style.display = 'none';
        }
    },

    // Show submit button
    showSubmitButton: function () {
        if (this.elements.controls.submitBtn) {
            this.elements.controls.submitBtn.style.display = 'inline-block';
        }
        if (this.elements.controls.nextBtn) {
            this.elements.controls.nextBtn.style.display = 'none';
        }
    },

    // Update UI state for new question
    updateUIState: function (question) {
        this.enableAnswerInputs();
        this.showSubmitButton();

        // Update bookmark button
        if (this.elements.controls.bookmarkBtn) {
            const isBookmarked = QuizStorage.isBookmarked(question.id);
            this.elements.controls.bookmarkBtn.innerHTML = isBookmarked ? '🔖' : '📖';
            this.elements.controls.bookmarkBtn.title = isBookmarked ? 'Remove bookmark' : 'Add bookmark';
        }
    },

    // Toggle question bookmark
    toggleBookmark: function () {
        if (!this.currentQuestion) return;

        QuizStorage.toggleBookmark(this.currentQuestion.id);
        this.updateUIState(this.currentQuestion);

        const isBookmarked = QuizStorage.isBookmarked(this.currentQuestion.id);
        this.showFeedback(`Question ${isBookmarked ? 'bookmarked' : 'unbookmarked'}`, 'success');
    },

    // Setup math rendering. KaTeX is loaded with `defer`, so it may not be
    // ready when this runs. We poll briefly and only surface a warning if it
    // genuinely never arrives.
    setupMathRendering: function () {
        if (this.tryEnableKatex()) return;

        let attempts = 0;
        const maxAttempts = 10; // 10 × 500ms = 5s budget
        const interval = setInterval(() => {
            attempts++;
            if (this.tryEnableKatex()) {
                clearInterval(interval);
                this.renderMathContent();
            } else if (attempts >= maxAttempts) {
                clearInterval(interval);
                console.warn('KaTeX never loaded - math will display as plain text');
            }
        }, 500);
    },

    tryEnableKatex: function () {
        if (typeof katex === 'undefined' || !katex.renderToString) return false;
        try {
            katex.renderToString('x = 1', { displayMode: false });
            this.mathRenderingEnabled = true;
            return true;
        } catch (error) {
            console.warn('KaTeX test failed:', error);
            return false;
        }
    },

    // Enhanced math content rendering with error handling
    renderMathContent: function () {
        if (!this.mathRenderingEnabled || typeof katex === 'undefined') {
            return;
        }

        try {
            // Render math in question text, options, and explanations
            document.querySelectorAll('.question-text, .option-text, .explanation-content').forEach(element => {
                if (!element.innerHTML) return;

                let html = element.innerHTML;
                let mathFound = false;

                // Replace display math ($$ ... $$) first (to avoid conflicts)
                html = html.replace(/\$\$([^$]+)\$\$/g, (match, math) => {
                    mathFound = true;
                    try {
                        return katex.renderToString(math.trim(), {
                            displayMode: true,
                            throwOnError: false
                        });
                    } catch (error) {
                        console.warn('KaTeX display math error:', error.message, 'for:', math);
                        return `<span class="math-error" title="Math rendering error">${match}</span>`;
                    }
                });

                // Replace inline math ($ ... $)
                html = html.replace(/\$([^$]+)\$/g, (match, math) => {
                    mathFound = true;
                    try {
                        return katex.renderToString(math.trim(), {
                            displayMode: false,
                            throwOnError: false
                        });
                    } catch (error) {
                        console.warn('KaTeX inline math error:', error.message, 'for:', math);
                        return `<span class="math-error" title="Math rendering error">${match}</span>`;
                    }
                });

                if (mathFound) {
                    element.innerHTML = html;
                }
            });
        } catch (error) {
            console.error('Math rendering failed:', error);
            this.mathRenderingEnabled = false;
        }
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizUI;
}