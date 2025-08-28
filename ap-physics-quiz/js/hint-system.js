/**
 * Progressive Hint System for AP Physics Quiz
 * Provides contextual hints and help for struggling students
 */

const HintSystem = {
    // Hint levels for progressive disclosure
    hintLevels: ['concept', 'approach', 'formula', 'solution'],
    
    // Current hint state
    currentHints: {},
    
    // Initialize the hint system
    init: function() {
        this.setupEventListeners();
        this.addHintButtonToUI();
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Listen for question display to reset hints
        document.addEventListener('questionDisplayed', (event) => {
            this.resetHints();
            this.updateHintButton(event.detail.question);
        });

        // Listen for incorrect answers to suggest hints
        document.addEventListener('questionAnswered', (event) => {
            if (!event.detail.isCorrect) {
                this.suggestHint(event.detail.questionId);
            }
        });
    },

    // Add hint button to the quiz interface
    addHintButtonToUI: function() {
        const controlCenter = document.querySelector('.control-center');
        if (controlCenter && !document.getElementById('hint-button')) {
            const hintButton = document.createElement('button');
            hintButton.id = 'hint-button';
            hintButton.className = 'btn btn-secondary';
            hintButton.innerHTML = '💡 Get Hint';
            hintButton.style.display = 'none';
            hintButton.title = 'Get a helpful hint for this question';
            
            // Insert before the submit button
            const submitButton = document.getElementById('submit-answer');
            if (submitButton) {
                controlCenter.insertBefore(hintButton, submitButton);
            } else {
                controlCenter.appendChild(hintButton);
            }

            hintButton.addEventListener('click', () => this.showNextHint());
        }
    },

    // Update hint button based on current question
    updateHintButton: function(question) {
        const hintButton = document.getElementById('hint-button');
        if (hintButton && question) {
            // Show hint button for difficult questions or after wrong answers
            const shouldShow = this.shouldShowHintButton(question);
            hintButton.style.display = shouldShow ? 'inline-block' : 'none';
            
            if (shouldShow) {
                this.generateHintsForQuestion(question);
            }
        }
    },

    // Determine if hint button should be shown
    shouldShowHintButton: function(question) {
        // Show for difficulty level 2 and 3 questions
        if (question.difficulty >= 2) return true;
        
        // Show if student has attempted this question incorrectly before
        const stats = QuizStorage.getStatistics();
        const questionStats = stats.questionStats && stats.questionStats[question.id];
        if (questionStats && questionStats.attempts > questionStats.correct) return true;
        
        // Show in learning mode
        const currentMode = this.getCurrentMode();
        if (currentMode === 'learning') return true;
        
        return false;
    },

    // Get current quiz mode
    getCurrentMode: function() {
        const activeMode = document.querySelector('.mode-btn.active');
        return activeMode ? activeMode.dataset.mode : 'learning';
    },

    // Generate hints for a specific question
    generateHintsForQuestion: function(question) {
        this.currentHints = {
            questionId: question.id,
            topic: question.topic,
            type: question.type,
            difficulty: question.difficulty,
            hintsShown: 0,
            hints: this.createHintsForQuestion(question)
        };
    },

    // Create contextual hints based on question content and topic
    createHintsForQuestion: function(question) {
        const hints = [];
        
        // Level 1: Concept hint
        hints.push({
            level: 'concept',
            title: '🎯 Concept Focus',
            content: this.generateConceptHint(question)
        });

        // Level 2: Approach hint
        hints.push({
            level: 'approach',
            title: '🤔 Problem Approach',
            content: this.generateApproachHint(question)
        });

        // Level 3: Formula hint
        hints.push({
            level: 'formula',
            title: '📐 Relevant Formula',
            content: this.generateFormulaHint(question)
        });

        // Level 4: Solution hint (most direct)
        hints.push({
            level: 'solution',
            title: '💡 Solution Strategy',
            content: this.generateSolutionHint(question)
        });

        return hints;
    },

    // Generate concept-level hint
    generateConceptHint: function(question) {
        const conceptHints = {
            'kinematics': 'Think about motion variables: position, velocity, acceleration, and time. What quantity is the question asking about?',
            'forces': 'Consider the forces acting on the object. Remember Newton\'s laws and think about equilibrium or acceleration.',
            'energy': 'Energy is conserved! Think about kinetic energy (motion) and potential energy (position or configuration).',
            'momentum': 'Momentum = mass × velocity. In collisions and interactions, total momentum is conserved.',
            'rotation': 'Rotational motion mirrors linear motion. Consider angular velocity, angular acceleration, and moment of inertia.',
            'gravitation': 'Gravitational force follows an inverse square law. Think about orbital motion and energy.',
            'shm': 'Simple harmonic motion involves restoring forces proportional to displacement. Think about springs and pendulums.',
            'fluids': 'Consider pressure, density, and flow. Remember Archimedes\' principle for buoyancy.',
            'waves': 'Waves carry energy and have properties like frequency, wavelength, and amplitude.'
        };
        
        return conceptHints[question.topic] || 'Think about the fundamental physics concept involved in this question.';
    },

    // Generate approach-level hint
    generateApproachHint: function(question) {
        const approachHints = {
            'tf': 'Read the statement carefully. Is it always true, sometimes true, or never true? Think of counterexamples.',
            'mc': 'Eliminate obviously wrong answers first. Use physics reasoning to choose between remaining options.',
            'fill': 'What units should your answer have? This can guide you to the right formula and calculation.',
            'matching': 'Look for relationships and patterns. Group similar concepts together.'
        };

        const typeHint = approachHints[question.type] || 'Break down the problem into smaller parts.';
        
        // Add topic-specific approach hints
        const topicApproaches = {
            'kinematics': 'Identify what you know and what you need to find. Choose the appropriate kinematic equation.',
            'forces': 'Draw a free-body diagram. Apply Newton\'s second law: ΣF = ma.',
            'energy': 'Use conservation of energy: Initial energy = Final energy (if no non-conservative forces).',
            'momentum': 'Apply conservation of momentum: Initial momentum = Final momentum.'
        };

        const topicHint = topicApproaches[question.topic];
        return topicHint ? `${typeHint} ${topicHint}` : typeHint;
    },

    // Generate formula-level hint
    generateFormulaHint: function(question) {
        const formulaHints = {
            'kinematics': 'Key equations: v = v₀ + at, x = v₀t + ½at², v² = v₀² + 2ax',
            'forces': 'Newton\'s laws: F = ma, For equilibrium: ΣF = 0',
            'energy': 'KE = ½mv², PE = mgh (gravitational), PE = ½kx² (elastic)',
            'momentum': 'p = mv, For collisions: m₁v₁ + m₂v₂ = m₁v₁\' + m₂v₂\'',
            'rotation': 'ω = v/r, α = a/r, τ = Iα, L = Iω',
            'gravitation': 'F = GMm/r², v = √(GM/r) for circular orbits',
            'shm': 'F = -kx, ω = √(k/m), T = 2π√(m/k)',
            'fluids': 'P = ρgh, F_buoyant = ρ_fluid × V_displaced × g',
            'waves': 'v = fλ, f = 1/T'
        };

        return formulaHints[question.topic] || 'Consider which formula relates the given quantities to what you need to find.';
    },

    // Generate solution-level hint
    generateSolutionHint: function(question) {
        // This would ideally be customized per question, but we'll provide general guidance
        const solutionHints = {
            'kinematics': 'Substitute known values into the appropriate equation and solve for the unknown.',
            'forces': 'Set up force equations for each direction (x and y). Solve the system of equations.',
            'energy': 'Set initial energy equal to final energy and solve for the unknown quantity.',
            'momentum': 'Apply conservation of momentum. Set up the equation and solve for the unknown.'
        };

        const hint = solutionHints[question.topic] || 'Work through the calculation step by step, keeping track of units.';
        return `${hint} Double-check your units and the reasonableness of your answer.`;
    },

    // Show the next available hint
    showNextHint: function() {
        if (!this.currentHints || !this.currentHints.hints) return;

        const hintIndex = this.currentHints.hintsShown;
        if (hintIndex >= this.currentHints.hints.length) {
            this.showAllHintsUsed();
            return;
        }

        const hint = this.currentHints.hints[hintIndex];
        this.displayHint(hint);
        this.currentHints.hintsShown++;

        // Update hint button text
        const hintButton = document.getElementById('hint-button');
        if (hintButton) {
            if (this.currentHints.hintsShown >= this.currentHints.hints.length) {
                hintButton.textContent = '💡 All hints used';
                hintButton.disabled = true;
            } else {
                hintButton.textContent = `💡 Next Hint (${this.currentHints.hintsShown}/${this.currentHints.hints.length})`;
            }
        }

        // Track hint usage
        this.trackHintUsage(hint);
    },

    // Display a hint to the user
    displayHint: function(hint) {
        // Create or update hint container
        let hintContainer = document.getElementById('hint-container');
        if (!hintContainer) {
            hintContainer = document.createElement('div');
            hintContainer.id = 'hint-container';
            hintContainer.className = 'hint-container';
            
            const questionContainer = document.querySelector('.question-container');
            if (questionContainer) {
                questionContainer.appendChild(hintContainer);
            }
        }

        // Create hint element
        const hintElement = document.createElement('div');
        hintElement.className = `hint-item hint-${hint.level}`;
        hintElement.innerHTML = `
            <div class="hint-header">
                <span class="hint-icon">💡</span>
                <span class="hint-title">${hint.title}</span>
                <span class="hint-level">Level ${this.currentHints.hintsShown + 1}</span>
            </div>
            <div class="hint-content">${hint.content}</div>
        `;

        hintContainer.appendChild(hintElement);
        
        // Smooth scroll to hint
        hintElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    // Show message when all hints are used
    showAllHintsUsed: function() {
        const hintContainer = document.getElementById('hint-container');
        if (hintContainer) {
            const finalMessage = document.createElement('div');
            finalMessage.className = 'hint-final-message';
            finalMessage.innerHTML = `
                <div class="hint-header">
                    <span class="hint-icon">🎯</span>
                    <span class="hint-title">All Hints Used</span>
                </div>
                <div class="hint-content">
                    You've used all available hints for this question. 
                    Try your best with the information provided, or check the 
                    <strong>📚 Quick Reference</strong> for more details.
                </div>
            `;
            hintContainer.appendChild(finalMessage);
        }
    },

    // Suggest hint after incorrect answer
    suggestHint: function(questionId) {
        if (this.getCurrentMode() !== 'learning') return;

        const hintButton = document.getElementById('hint-button');
        if (hintButton && hintButton.style.display !== 'none') {
            // Briefly highlight the hint button
            hintButton.classList.add('hint-suggested');
            setTimeout(() => {
                hintButton.classList.remove('hint-suggested');
            }, 3000);

            // Show a subtle suggestion message
            this.showHintSuggestion();
        }
    },

    // Show hint suggestion after wrong answer
    showHintSuggestion: function() {
        const suggestion = document.createElement('div');
        suggestion.className = 'hint-suggestion';
        suggestion.innerHTML = `
            <div class="suggestion-content">
                <span class="suggestion-icon">💡</span>
                <span class="suggestion-text">Need help? Try getting a hint!</span>
            </div>
        `;

        const questionContainer = document.querySelector('.question-container');
        if (questionContainer) {
            questionContainer.appendChild(suggestion);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (suggestion.parentNode) {
                    suggestion.parentNode.removeChild(suggestion);
                }
            }, 5000);
        }
    },

    // Reset hints for new question
    resetHints: function() {
        this.currentHints = {};
        
        // Clear hint container
        const hintContainer = document.getElementById('hint-container');
        if (hintContainer) {
            hintContainer.innerHTML = '';
        }

        // Reset hint button
        const hintButton = document.getElementById('hint-button');
        if (hintButton) {
            hintButton.textContent = '💡 Get Hint';
            hintButton.disabled = false;
            hintButton.classList.remove('hint-suggested');
        }

        // Remove any hint suggestions
        const suggestions = document.querySelectorAll('.hint-suggestion');
        suggestions.forEach(suggestion => {
            if (suggestion.parentNode) {
                suggestion.parentNode.removeChild(suggestion);
            }
        });
    },

    // Track hint usage for analytics
    trackHintUsage: function(hint) {
        try {
            let hintStats = Utils.storage.get('hint_stats', {
                totalHintsUsed: 0,
                hintsByLevel: {},
                hintsByTopic: {},
                questionsWithHints: new Set()
            });

            hintStats.totalHintsUsed++;
            hintStats.hintsByLevel[hint.level] = (hintStats.hintsByLevel[hint.level] || 0) + 1;
            hintStats.hintsByTopic[this.currentHints.topic] = (hintStats.hintsByTopic[this.currentHints.topic] || 0) + 1;
            hintStats.questionsWithHints.add(this.currentHints.questionId);

            // Convert Set to Array for storage
            hintStats.questionsWithHints = Array.from(hintStats.questionsWithHints);

            Utils.storage.set('hint_stats', hintStats);
            
        } catch (error) {
            Utils.handleError(error, 'HintSystem.trackHintUsage');
        }
    },

    // Get hint usage analytics
    getHintAnalytics: function() {
        try {
            const stats = Utils.storage.get('hint_stats', {
                totalHintsUsed: 0,
                hintsByLevel: {},
                hintsByTopic: {},
                questionsWithHints: []
            });

            return {
                totalHints: stats.totalHintsUsed,
                questionsWithHints: stats.questionsWithHints.length,
                levelBreakdown: stats.hintsByLevel,
                topicBreakdown: stats.hintsByTopic,
                averageHintsPerQuestion: stats.questionsWithHints.length > 0 ? 
                    (stats.totalHintsUsed / stats.questionsWithHints.length).toFixed(1) : 0
            };
            
        } catch (error) {
            Utils.handleError(error, 'HintSystem.getHintAnalytics');
            return null;
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HintSystem.init());
} else {
    HintSystem.init();
}