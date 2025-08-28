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
    init: function() {
        console.log('Initializing Quiz UI...');
        this.cacheElements();
        this.setupMathRendering();
        this.setupAnswerHandlers();
        this.isInitialized = true;
    },

    // Get readable name for question type
    getQuestionTypeName: function(type) {
        const typeNames = {
            'tf': 'True/False',
            'mc': 'Multiple Choice', 
            'fill': 'Fill in the Blank',
            'matching': 'Matching'
        };
        return typeNames[type] || type;
    },

    // Cache DOM elements for performance
    cacheElements: function() {
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
    displayQuestion: function(question) {
        if (!question) {
            console.error('No question provided to display');
            return;
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
    clearQuestionDisplay: function() {
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
    displayQuestionHeader: function(question) {
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


    // Display question text
    displayQuestionText: function(question) {
        const questionElement = this.elements.displays.question;
        
        if (questionElement) {
            questionElement.innerHTML = question.question;
        } else {
            console.error('Question text element not found');
        }
    },

    // Display answer interface based on question type
    displayAnswerInterface: function(question) {
        const container = this.elements.displays.options;
        if (!container) return;

        let html = '';

        switch (question.type) {
            case 'mc':
                html = this.createMultipleChoiceInterface(question);
                break;
            case 'tf':
                html = this.createTrueFalseInterface(question);
                break;
            case 'fill':
                html = this.createFillInBlankInterface(question);
                break;
            case 'matching':
                html = this.createMatchingInterface(question);
                break;
            default:
                html = '<p class="error">Unknown question type</p>';
        }

        container.innerHTML = html;
        this.setupAnswerHandlers();
    },

    // Create multiple choice interface
    createMultipleChoiceInterface: function(question) {
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
    createTrueFalseInterface: function(question) {
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
    createFillInBlankInterface: function(question) {
        return `
            <div class="fill-interface">
                <input type="text" id="fill-answer" class="fill-input" 
                       placeholder="Enter your answer..." 
                       autocomplete="off">
                <div class="fill-hints">
                    <small>Tip: Be precise with units and spelling</small>
                </div>
            </div>
        `;
    },

    // Create matching interface (simplified version)
    createMatchingInterface: function(question) {
        // This is a simplified implementation
        // A full matching interface would require more complex logic
        return `
            <div class="matching-interface">
                <p class="info">Matching questions require custom implementation</p>
                <input type="text" id="matching-answer" class="fill-input" 
                       placeholder="Enter your answer...">
            </div>
        `;
    },

    // Add fact sheet integration if available
    addFactSheetIntegration: function(question) {
        const questionContainer = this.elements.displays.question?.parentElement;
        if (!questionContainer) return;

        // Remove existing fact sheet section
        const existingFactSheetSection = questionContainer.querySelector('.fact-sheet-section');
        if (existingFactSheetSection) {
            existingFactSheetSection.remove();
        }

        // Add new fact sheet integration if available
        if (typeof FactSheetIntegration !== 'undefined') {
            const factSheetButton = FactSheetIntegration.createFactSheetButton(question);
            if (factSheetButton) {
                const factSheetSection = document.createElement('div');
                factSheetSection.className = 'fact-sheet-section';
                factSheetSection.appendChild(factSheetButton);
                
                questionContainer.appendChild(factSheetSection);
            }
        }
    },

    // Setup answer handling
    setupAnswerHandlers: function() {
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
    submitAnswer: function() {
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

            // Show explanation if in learning mode
            try {
                const settings = QuizStorage.getSettings();
                if (settings.mode === 'learning' && this.currentQuestion.explanation) {
                    this.showExplanation(this.currentQuestion.explanation);
                }
            } catch (settingsError) {
                Utils.handleError(settingsError, 'QuizUI.submitAnswer - settings');
                // Continue without explanation
            }

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
    getUserAnswer: function() {
        const question = this.currentQuestion;
        if (!question) return null;

        switch (question.type) {
            case 'mc':
                const mcChecked = document.querySelector('input[name="mc-answer"]:checked');
                return mcChecked ? mcChecked.value : null;

            case 'tf':
                const tfChecked = document.querySelector('input[name="tf-answer"]:checked');
                const result = tfChecked ? (tfChecked.value === 'true') : null;
                return result;

            case 'fill':
                const fillInput = document.getElementById('fill-answer');
                return fillInput ? fillInput.value.trim() : null;

            case 'matching':
                const matchingInput = document.getElementById('matching-answer');
                return matchingInput ? matchingInput.value.trim() : null;

            default:
                return null;
        }
    },

    // Check if answer is correct
    checkAnswer: function(userAnswer, question) {
        if (question.type === 'tf') {
            // Simplified and bulletproof True/False checking
            // Convert both to strings and compare directly
            const userStr = String(userAnswer).toLowerCase();
            const correctStr = String(question.answer).toLowerCase().trim();
            
            console.log('TF Final Check:', {
                userAnswer: userAnswer,
                userStr: userStr,
                correctAnswer: question.answer,
                correctStr: correctStr,
                match: userStr === correctStr
            });
            
            // Direct string comparison - most reliable
            return userStr === correctStr;
        }

        if (question.type === 'fill') {
            return Utils.answersMatch(userAnswer, question.answer, question.alternateAnswers);
        }

        if (question.type === 'mc') {
            return userAnswer === question.answer;
        }

        return false; // Default for unimplemented types
    },

    // Show answer feedback
    showAnswerFeedback: function(isCorrect, userAnswer, question) {
        const feedbackEl = this.elements.displays.feedback;
        if (!feedbackEl) return;

        let html = `
            <div class="feedback-header ${isCorrect ? 'correct' : 'incorrect'}">
                <span class="feedback-icon">${isCorrect ? '✅' : '❌'}</span>
                <span class="feedback-text">${isCorrect ? 'Correct!' : 'Incorrect'}</span>
            </div>
        `;

        if (!isCorrect) {
            // Format True/False answers for display
            let displayUserAnswer = userAnswer;
            let displayCorrectAnswer = question.answer;
            
            if (question.type === 'tf') {
                displayUserAnswer = userAnswer === true ? 'True' : 'False';
                const correctBool = String(question.answer).toLowerCase().trim() === 'true';
                displayCorrectAnswer = correctBool ? 'True' : 'False';
            }
            
            html += `
                <div class="feedback-details">
                    <p><strong>Your answer:</strong> ${displayUserAnswer}</p>
                    <p><strong>Correct answer:</strong> ${displayCorrectAnswer}</p>
                </div>
            `;
        }

        feedbackEl.innerHTML = html;
        feedbackEl.style.display = 'block';

        // Add animation
        feedbackEl.classList.add('feedback-show');
        setTimeout(() => {
            feedbackEl.classList.remove('feedback-show');
        }, 100);
    },

    // Show explanation
    showExplanation: function(explanationText) {
        const explanationEl = this.elements.displays.explanation;
        if (!explanationEl || !explanationText) return;

        explanationEl.innerHTML = `
            <div class="explanation-content">
                <h4>Explanation:</h4>
                <p>${explanationText}</p>
            </div>
        `;
        explanationEl.style.display = 'block';
    },

    // Show general feedback message
    showFeedback: function(message, type = 'info') {
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
    disableAnswerInputs: function() {
        document.querySelectorAll('.option-input, .fill-input').forEach(input => {
            input.disabled = true;
        });
    },

    // Enable answer inputs
    enableAnswerInputs: function() {
        document.querySelectorAll('.option-input, .fill-input').forEach(input => {
            input.disabled = false;
        });
    },

    // Show next button
    showNextButton: function() {
        if (this.elements.controls.nextBtn) {
            this.elements.controls.nextBtn.style.display = 'inline-block';
        }
        if (this.elements.controls.submitBtn) {
            this.elements.controls.submitBtn.style.display = 'none';
        }
    },

    // Show submit button
    showSubmitButton: function() {
        if (this.elements.controls.submitBtn) {
            this.elements.controls.submitBtn.style.display = 'inline-block';
        }
        if (this.elements.controls.nextBtn) {
            this.elements.controls.nextBtn.style.display = 'none';
        }
    },

    // Update UI state for new question
    updateUIState: function(question) {
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
    toggleBookmark: function() {
        if (!this.currentQuestion) return;

        QuizStorage.toggleBookmark(this.currentQuestion.id);
        this.updateUIState(this.currentQuestion);

        const isBookmarked = QuizStorage.isBookmarked(this.currentQuestion.id);
        this.showFeedback(`Question ${isBookmarked ? 'bookmarked' : 'unbookmarked'}`, 'success');
    },

    // Setup math rendering
    setupMathRendering: function() {
        if (typeof katex !== 'undefined') {
            this.renderMathContent();
        }
    },

    // Render math content using KaTeX
    renderMathContent: function() {
        if (typeof katex === 'undefined') return;

        // Render inline math ($ ... $)
        document.querySelectorAll('.question-text, .option-text, .explanation-content').forEach(element => {
            let html = element.innerHTML;
            
            // Replace inline math
            html = html.replace(/\$([^$]+)\$/g, (match, math) => {
                try {
                    return katex.renderToString(math, { displayMode: false });
                } catch (error) {
                    console.warn('KaTeX rendering error:', error);
                    return match;
                }
            });
            
            // Replace display math ($$ ... $$)
            html = html.replace(/\$\$([^$]+)\$\$/g, (match, math) => {
                try {
                    return katex.renderToString(math, { displayMode: true });
                } catch (error) {
                    console.warn('KaTeX rendering error:', error);
                    return match;
                }
            });
            
            element.innerHTML = html;
        });
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizUI;
}