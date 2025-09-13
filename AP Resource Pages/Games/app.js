// Main Application Controller
class KinemaQuestApp {
    constructor() {
        this.gameEngine = new GameEngine();
        this.currentScreen = 'welcome';
        this.currentQuestionStartTime = null;
        
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.updatePlayerDisplay();
        this.showScreen('welcome');
        this.setupDailyChallenge();
        
        // Listen for game events
        document.addEventListener('levelUp', (e) => this.handleLevelUp(e.detail));
        document.addEventListener('badgeEarned', (e) => this.handleBadgeEarned(e.detail));
        document.addEventListener('pointsEarned', (e) => this.handlePointsEarned(e.detail));
        
        // Debug test can be enabled for development
        // setTimeout(() => this.debugTestComplexGraph(), 2000);
    }

    setupEventListeners() {
        // Welcome screen buttons
        document.getElementById('start-session').addEventListener('click', () => this.startSession());
        document.getElementById('practice-mode').addEventListener('click', () => this.startPractice());
        document.getElementById('view-progress').addEventListener('click', () => this.showProgress());
        document.getElementById('daily-challenge-btn').addEventListener('click', () => this.startDailyChallenge());

        // Game screen buttons
        document.getElementById('next-question').addEventListener('click', () => this.nextQuestion());

        // Results screen buttons
        document.getElementById('continue-session').addEventListener('click', () => this.continueSession());
        document.getElementById('new-session').addEventListener('click', () => this.newSession());
        document.getElementById('view-leaderboard').addEventListener('click', () => this.showLeaderboard());

        // Progress screen buttons
        document.getElementById('back-to-main').addEventListener('click', () => this.showScreen('welcome'));

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Answer selection (will be set up dynamically per question)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('answer-option')) {
                this.selectAnswer(e.target);
            }
        });
    }

    // Screen Management
    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
            
            // Set focus for accessibility
            const heading = targetScreen.querySelector('h2, h1');
            if (heading) {
                heading.setAttribute('tabindex', '-1');
                heading.focus();
            }
        }

        // Update content based on screen
        switch (screenName) {
            case 'welcome':
                this.updateWelcomeScreen();
                this.hideAllGameElements();
                break;
            case 'game':
                this.hideWelcomeElements();
                this.hideResultsElements();
                break;
            case 'results':
                this.hideGameElements();
                break;
            case 'progress':
                this.updateProgressScreen();
                break;
        }
    }

    hideAllGameElements() {
        // Ensure clean state when returning to welcome
        const feedbackContainer = document.getElementById('feedback-container');
        const nextButton = document.getElementById('next-question');
        
        if (feedbackContainer) feedbackContainer.classList.add('hidden');
        if (nextButton) nextButton.disabled = true;
        
        // Clean up any animations
        document.querySelectorAll('canvas').forEach(canvas => {
            if (canvas._animationId) {
                window.animationEngine.destroyAnimation(canvas._animationId);
            }
            if (canvas._resizeHandler) {
                window.removeEventListener('resize', canvas._resizeHandler);
            }
        });
    }

    hideWelcomeElements() {
        // Ensure welcome screen is truly hidden
        const welcomeScreen = document.getElementById('welcome-screen');
        if (welcomeScreen) {
            welcomeScreen.classList.remove('active');
        }
    }

    hideResultsElements() {
        // Ensure results screen is hidden
        const resultsScreen = document.getElementById('results-screen');
        const levelUpNotification = document.getElementById('level-up-notification');
        
        if (resultsScreen) {
            resultsScreen.classList.remove('active');
        }
        if (levelUpNotification) {
            levelUpNotification.classList.add('hidden');
        }
    }

    hideGameElements() {
        // Ensure game screen is hidden
        const gameScreen = document.getElementById('game-screen');
        if (gameScreen) {
            gameScreen.classList.remove('active');
        }
    }

    updateWelcomeScreen() {
        const level = this.gameEngine.getCurrentLevel();
        document.getElementById('current-level-name').textContent = level.name;
        document.getElementById('level-description').textContent = level.description;

        // Update daily challenge
        this.setupDailyChallenge();
    }

    setupDailyChallenge() {
        const challenge = getDailyChallenge();
        document.getElementById('daily-challenge-name').textContent = challenge.name;
        document.getElementById('daily-challenge-desc').textContent = challenge.description;
        
        // Check if challenge is active
        const challengeButton = document.getElementById('daily-challenge-btn');
        const isActive = localStorage.getItem('daily-challenge-active') === 'true';
        
        if (isActive) {
            challengeButton.textContent = '✓ Challenge Active (+50% Bonus)';
            challengeButton.classList.add('challenge-active');
            challengeButton.setAttribute('aria-pressed', 'true');
        } else {
            challengeButton.textContent = 'Activate Challenge (+50% Bonus)';
            challengeButton.classList.remove('challenge-active');
            challengeButton.setAttribute('aria-pressed', 'false');
        }
        
        // Toggle challenge on click
        challengeButton.onclick = () => this.toggleDailyChallenge();
    }

    toggleDailyChallenge() {
        const isActive = localStorage.getItem('daily-challenge-active') === 'true';
        const newState = !isActive;
        
        localStorage.setItem('daily-challenge-active', newState.toString());
        
        const challengeButton = document.getElementById('daily-challenge-btn');
        if (newState) {
            challengeButton.textContent = '✓ Challenge Active (+50% Bonus)';
            challengeButton.classList.add('challenge-active');
            challengeButton.setAttribute('aria-pressed', 'true');
            this.announceToScreenReader('Daily challenge activated! You will earn 50% bonus points.');
        } else {
            challengeButton.textContent = 'Activate Challenge (+50% Bonus)';
            challengeButton.classList.remove('challenge-active');
            challengeButton.setAttribute('aria-pressed', 'false');
            this.announceToScreenReader('Daily challenge deactivated.');
        }
    }

    // Session Management
    startSession(mode = 'normal') {
        const session = this.gameEngine.startSession(mode);
        this.showScreen('game');
        this.loadCurrentQuestion();
        this.updateGameUI();
    }

    startPractice() {
        this.startSession('practice');
    }

    startDailyChallenge() {
        this.startSession('daily-challenge');
    }

    continueSession() {
        // Add 10 minutes to current session
        if (this.gameEngine.currentSession) {
            this.gameEngine.currentSession.timeLimit += 10 * 60 * 1000;
            this.showScreen('game');
            this.loadCurrentQuestion();
        }
    }

    newSession() {
        this.showScreen('welcome');
    }

    // Question Management
    loadCurrentQuestion() {
        const question = this.gameEngine.getCurrentQuestion();
        if (!question) {
            this.endSession();
            return;
        }

        this.currentQuestionStartTime = Date.now();
        this.displayQuestion(question);
        this.updateQuestionCounter();
        
        // Disable Next Question button until answer is submitted
        const nextButton = document.getElementById('next-question');
        if (nextButton) {
            nextButton.disabled = true;
            nextButton.textContent = 'Submit Answer First';
        }
        
        // Hide feedback container
        const feedbackContainer = document.getElementById('feedback-container');
        if (feedbackContainer) {
            feedbackContainer.classList.add('hidden');
        }
    }

    displayQuestion(question) {
        const container = document.getElementById('question-container');
        const answerContainer = document.getElementById('answer-container');
        
        // Clear previous content
        container.innerHTML = '';
        answerContainer.innerHTML = '';

        // Display question text
        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.innerHTML = `<h3>${question.question}</h3>`;
        
        if (question.scenario) {
            const scenarioDiv = document.createElement('div');
            scenarioDiv.className = 'scenario';
            scenarioDiv.innerHTML = `<p><em>${question.scenario}</em></p>`;
            questionText.appendChild(scenarioDiv);
        }
        
        container.appendChild(questionText);

        // Display graph if needed
        if (question.graphType || question.primaryGraph) {
            if (question.graphData) {
                // Graph data is in the question itself (e.g., area-under-curve, misconception-id)
                this.displayGraph(container, question);
            } else if (question.primaryGraph && question.primaryGraph.data) {
                // Graph data is in primaryGraph.data (e.g., multi-graph-coordination)
                const graphQuestion = {
                    ...question,
                    graphType: question.primaryGraph.type,
                    graphData: question.primaryGraph.data
                };
                this.displayGraph(container, graphQuestion);
            } else if (question.options && question.options.some(opt => opt.graphData)) {
                // Graph data is in options (e.g., graph-matching questions)
                // For now, don't show main graph - graphs will be in answer options
                console.log('Graph data in options - will display in answer choices');
            } else {
                console.warn('Question has graphType but no graphData:', question);
                // Add fallback: show placeholder graph
                this.displayPlaceholderGraph(container, question.graphType || 'Unknown');
            }
        }

        // Display animation if needed
        if (question.animation) {
            this.displayAnimation(container, question);
        }

        // Display answer options
        this.displayAnswerOptions(answerContainer, question);
        
        // Hide feedback
        document.getElementById('feedback-container').classList.add('hidden');
    }

    displayGraph(container, question) {
        const graphContainer = document.createElement('div');
        graphContainer.className = 'graph-container';
        
        const canvas = document.createElement('canvas');
        // Set initial canvas size - will be adjusted by renderer
        canvas.style.width = '90%';
        canvas.style.height = '90%';
        
        graphContainer.appendChild(canvas);
        container.appendChild(graphContainer);

        // Render graph based on question data
        if (question.graphData) {
            const axes = this.getAxesConfig(question.graphType, question.graphData);
            
            console.log('Setting up graph for question type:', question.type, 'with graph type:', question.graphType);
            console.log('Graph data:', question.graphData);
            console.log('Axes config:', axes);
            
            // Force canvas to have explicit dimensions before rendering
            const forceCanvasSize = () => {
                const rect = graphContainer.getBoundingClientRect();
                console.log('Graph container dimensions:', rect);
                
                if (rect.width > 0 && rect.height > 0) {
                    canvas.width = rect.width * 0.9;
                    canvas.height = rect.height * 0.9;
                    canvas.style.width = (rect.width * 0.9) + 'px';
                    canvas.style.height = (rect.height * 0.9) + 'px';
                    
                    console.log('Set canvas dimensions to:', canvas.width, 'x', canvas.height);
                    GraphRenderer.renderGraph(canvas, question.graphData, axes);
                }
            };
            
            // Try immediate render
            forceCanvasSize();
            
            // Also delay render to be sure
            setTimeout(() => {
                forceCanvasSize();
            }, 150);
            
            // Re-render on window resize
            const resizeHandler = () => {
                forceCanvasSize();
            };
            
            window.addEventListener('resize', resizeHandler);
            
            // Clean up event listener when moving to next question
            canvas._resizeHandler = resizeHandler;
        }
    }

    getAxesConfig(graphType, graphData) {
        // Set appropriate ranges based on graph type and data
        let xMax = 10;
        let yMax = 20;
        let yMin = 0;
        
        if (graphType === 'velocity-time') {
            yMin = -20;
            yMax = 20;
        } else if (graphType === 'position-time') {
            yMin = 0;
            yMax = 60;
            
            // Adjust for slope/intercept format
            if (graphData.slope !== undefined && graphData.intercept !== undefined) {
                const maxY = Math.max(graphData.intercept, graphData.slope * xMax + graphData.intercept);
                const minY = Math.min(graphData.intercept, graphData.slope * xMax + graphData.intercept);
                yMax = Math.max(maxY + 10, 60);
                yMin = Math.min(minY - 10, 0);
            }
        } else if (graphType === 'acceleration-time') {
            yMin = -10;
            yMax = 10;
        }
        
        return {
            xLabel: this.getAxisLabel(graphType, 'x'),
            yLabel: this.getAxisLabel(graphType, 'y'),
            xMax: xMax,
            yMax: yMax,
            yMin: yMin
        };
    }

    displayAnimation(container, question) {
        const animationContainer = document.createElement('div');
        animationContainer.className = 'animation-container';
        
        const canvas = document.createElement('canvas');
        canvas.style.width = '90%';
        canvas.style.height = '90%';
        
        // Add scenario description if present
        if (question.scenario) {
            const scenarioDiv = document.createElement('div');
            scenarioDiv.className = 'scenario-description';
            scenarioDiv.textContent = question.scenario;
            container.appendChild(scenarioDiv);
        }
        
        // Add hint button for animations
        const hintButton = document.createElement('button');
        hintButton.className = 'hint-button';
        hintButton.innerHTML = '💡';
        hintButton.title = 'Show animation hints';
        hintButton.onclick = () => this.toggleAnimationHints(question);
        
        animationContainer.appendChild(canvas);
        animationContainer.appendChild(hintButton);
        container.appendChild(animationContainer);
        
        // Create animation
        setTimeout(() => {
            const animationId = window.animationEngine.createAnimation(canvas, question.animation, {
                duration: question.animation.duration || 4000,
                loop: true
            });
            
            // Create controls
            const controlsContainer = document.createElement('div');
            controlsContainer.id = 'animation-controls-' + Date.now();
            container.appendChild(controlsContainer);
            
            window.animationEngine.createControls(controlsContainer.id, animationId);
            
            // Auto-play animation
            window.animationEngine.playAnimation(animationId);
            
            // Store for cleanup
            canvas._animationId = animationId;
        }, 200);
    }

    toggleAnimationHints(question) {
        // Remove existing hint panel
        const existingPanel = document.querySelector('.hint-panel');
        if (existingPanel) {
            existingPanel.remove();
            return;
        }
        
        // Create hint panel
        const hintPanel = document.createElement('div');
        hintPanel.className = 'hint-panel';
        
        if (question.hints && question.hints.length > 0) {
            const hintsList = document.createElement('ul');
            question.hints.forEach(hint => {
                const listItem = document.createElement('li');
                listItem.textContent = hint;
                hintsList.appendChild(listItem);
            });
            hintPanel.appendChild(hintsList);
        } else {
            hintPanel.innerHTML = '<p>Watch the animation carefully and think about the physics principles involved.</p>';
        }
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: var(--text-secondary);
        `;
        closeButton.onclick = () => hintPanel.remove();
        hintPanel.appendChild(closeButton);
        
        // Add to animation container
        const animationContainer = document.querySelector('.animation-container');
        if (animationContainer) {
            animationContainer.appendChild(hintPanel);
            
            // Show with animation
            setTimeout(() => {
                hintPanel.classList.add('show');
            }, 10);
        }
    }

    getAxisLabel(graphType, axis) {
        const labels = {
            'position-time': { x: 'Time (s)', y: 'Position (m)' },
            'velocity-time': { x: 'Time (s)', y: 'Velocity (m/s)' },
            'acceleration-time': { x: 'Time (s)', y: 'Acceleration (m/s²)' }
        };
        
        return labels[graphType] ? labels[graphType][axis] : 'Value';
    }
    
    getAxesConfigForMiniGraph(graphData) {
        // Simplified axes for mini-graphs - no labels to save space
        let xMax = 10;
        let yMax = 20;
        let yMin = -20;
        
        // Adjust based on graph type
        if (graphData.type === 'horizontal') {
            yMax = Math.max(20, (graphData.y || 0) + 10);
            yMin = Math.min(-5, (graphData.y || 0) - 10);
        } else if (graphData.type === 'linear') {
            if (graphData.startY !== undefined && graphData.endY !== undefined) {
                const minY = Math.min(graphData.startY, graphData.endY);
                const maxY = Math.max(graphData.startY, graphData.endY);
                yMin = minY - 5;
                yMax = maxY + 5;
            } else if (graphData.slope !== undefined && graphData.intercept !== undefined) {
                const y1 = graphData.intercept;
                const y2 = graphData.slope * xMax + graphData.intercept;
                yMin = Math.min(y1, y2) - 5;
                yMax = Math.max(y1, y2) + 5;
            }
        } else if (graphData.type === 'parabolic') {
            // For parabolic, set reasonable bounds
            yMax = 30;
            yMin = -5;
        }
        
        return {
            xLabel: '',
            yLabel: '',
            xMax: xMax,
            yMax: yMax,
            yMin: yMin
        };
    }

    displayAnswerOptions(container, question) {
        if (!question.options && !question.answers) return;
        
        const options = question.options || question.answers;
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'answer-options';
        
        options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'answer-option';
            optionElement.dataset.index = index;
            
            // Handle different option formats
            if (typeof option === 'string') {
                optionElement.textContent = option;
            } else if (option.text) {
                optionElement.textContent = option.text;
            } else if (option.description) {
                optionElement.innerHTML = `<strong>Option ${String.fromCharCode(65 + index)}:</strong> ${option.description}`;
                
                // Add mini graph for graph options
                if (option.graphData) {
                    const miniGraphContainer = document.createElement('div');
                    miniGraphContainer.className = 'mini-graph-container';
                    miniGraphContainer.style.cssText = `
                        width: 180px;
                        height: 120px;
                        margin: 10px auto 5px;
                        border: 2px solid var(--border-color);
                        border-radius: 8px;
                        background: var(--bg-primary);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                    `;
                    
                    const miniCanvas = document.createElement('canvas');
                    miniCanvas.width = 160;
                    miniCanvas.height = 100;
                    miniCanvas.style.width = '160px';
                    miniCanvas.style.height = '100px';
                    miniCanvas.style.border = '1px solid var(--border-color)';
                    miniCanvas.style.borderRadius = '4px';
                    
                    miniGraphContainer.appendChild(miniCanvas);
                    optionElement.appendChild(miniGraphContainer);
                    
                    // Render mini-graph with proper error handling
                    setTimeout(() => {
                        try {
                            const axes = this.getAxesConfigForMiniGraph(option.graphData);
                            console.log('Rendering mini-graph:', option.description, 'with data:', option.graphData);
                            GraphRenderer.renderGraph(miniCanvas, option.graphData, axes);
                        } catch (error) {
                            console.error('Failed to render mini-graph:', error);
                            miniGraphContainer.innerHTML = `<div style="color: var(--text-secondary); text-align: center; font-size: 0.8rem;">Graph preview<br>unavailable</div>`;
                        }
                    }, 150);
                }
            }
            
            optionsContainer.appendChild(optionElement);
        });
        
        container.appendChild(optionsContainer);
    }

    selectAnswer(element) {
        // Remove previous selections
        document.querySelectorAll('.answer-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Select current option
        element.classList.add('selected');
        
        // Submit answer after short delay
        setTimeout(() => {
            const answerIndex = parseInt(element.dataset.index);
            this.submitAnswer(answerIndex);
        }, 500);
    }

    submitAnswer(answerIndex) {
        const timeSpent = Date.now() - this.currentQuestionStartTime;
        const result = this.gameEngine.submitAnswer(answerIndex, timeSpent);
        
        this.showFeedback(result);
        this.updateGameUI();
    }

    showFeedback(result) {
        const container = document.getElementById('feedback-container');
        const messageDiv = document.getElementById('feedback-message');
        
        // Clear previous content
        messageDiv.innerHTML = '';
        
        // Create feedback message
        const feedbackClass = result.correct ? 'feedback-correct' : 'feedback-incorrect';
        const feedbackIcon = result.correct ? '✅' : '❌';
        const points = result.correct ? `+${result.points} points!` : 'No points awarded';
        
        messageDiv.innerHTML = `
            <div class="${feedbackClass}">
                <strong>${feedbackIcon} ${result.correct ? 'Correct!' : 'Incorrect'}</strong>
                <p>${points}</p>
            </div>
            <div class="explanation">
                <p><strong>Explanation:</strong> ${result.explanation}</p>
            </div>
        `;
        
        // Show correct answer if incorrect
        if (!result.correct && result.correctAnswer !== undefined) {
            const currentQuestion = this.gameEngine.getCurrentQuestion();
            const correctOption = currentQuestion.options[result.correctAnswer];
            
            if (correctOption) {
                const correctText = correctOption.text || correctOption.description || `Option ${result.correctAnswer + 1}`;
                messageDiv.innerHTML += `
                    <div class="correct-answer">
                        <p><strong>Correct answer:</strong> ${correctText}</p>
                    </div>
                `;
            }
        }
        
        // Highlight answer options
        this.highlightAnswers(result);
        
        // Show feedback container
        container.classList.remove('hidden');
        
        // Enable Next Question button
        const nextButton = document.getElementById('next-question');
        if (nextButton) {
            nextButton.disabled = false;
            nextButton.textContent = 'Next Question';
        }
    }

    highlightAnswers(result) {
        const options = document.querySelectorAll('.answer-option');
        
        options.forEach((option, index) => {
            option.classList.remove('selected');
            
            if (index === result.correctAnswer) {
                option.classList.add('correct');
            } else if (index === result.selectedAnswer && !result.correct) {
                option.classList.add('incorrect');
            }
        });
    }

    nextQuestion() {
        const hasMore = this.gameEngine.nextQuestion();
        
        if (hasMore) {
            this.loadCurrentQuestion();
        } else {
            this.endSession();
        }
    }

    updateQuestionCounter() {
        const session = this.gameEngine.currentSession;
        if (!session) return;
        
        document.getElementById('current-question').textContent = session.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = session.questions.length;
    }

    updateGameUI() {
        const session = this.gameEngine.currentSession;
        if (!session) return;
        
        // Update session points
        document.getElementById('session-points').textContent = session.points;
        
        // Update player stats
        this.updatePlayerDisplay();
    }

    // Session End
    endSession() {
        const sessionData = this.gameEngine.endSession();
        this.showSessionResults(sessionData);
    }

    showSessionResults(sessionData) {
        this.showScreen('results');
        
        // Update results display with proper data binding
        const finalScore = sessionData?.points || 0;
        const finalAccuracy = sessionData?.finalAccuracy || 0;
        const questionsAnswered = sessionData?.questions?.length || 0;
        
        document.getElementById('final-score').textContent = finalScore;
        document.getElementById('final-accuracy').textContent = `${Math.round(finalAccuracy)}%`;
        document.getElementById('questions-answered').textContent = questionsAnswered;
        
        // Add session vs lifetime labels
        this.addStatLabels();
        
        // Check for level up
        const playerData = this.gameEngine.playerData;
        
        // Announce results to screen readers
        this.announceToScreenReader(`Session complete! You earned ${finalScore} points with ${Math.round(finalAccuracy)}% accuracy.`);
    }

    addStatLabels() {
        // Add "Current Session" labels to results
        const scoreCard = document.getElementById('final-score').closest('.stat-card');
        const accuracyCard = document.getElementById('final-accuracy').closest('.stat-card');
        const questionsCard = document.getElementById('questions-answered').closest('.stat-card');
        
        [scoreCard, accuracyCard, questionsCard].forEach(card => {
            if (card && !card.querySelector('.stat-label-session')) {
                const label = document.createElement('small');
                label.className = 'stat-label-session';
                label.textContent = 'Current Session';
                label.style.display = 'block';
                label.style.opacity = '0.7';
                card.appendChild(label);
            }
        });
        
        // Add "Lifetime Stats" label to header stats
        const playerLevel = document.getElementById('player-level');
        const playerPoints = document.getElementById('player-points');
        const playerAccuracy = document.getElementById('player-accuracy');
        
        [playerLevel, playerPoints, playerAccuracy].forEach(element => {
            if (element && !element.parentNode.querySelector('.lifetime-label')) {
                const label = document.createElement('small');
                label.className = 'lifetime-label';
                label.textContent = 'Lifetime';
                label.style.fontSize = '0.7rem';
                label.style.opacity = '0.6';
                label.style.display = 'block';
                element.parentNode.appendChild(label);
            }
        });
    }

    // Progress and Stats
    showProgress() {
        this.showScreen('progress');
        this.switchTab('overview');
    }

    updateProgressScreen() {
        // Update level progress
        const progress = this.gameEngine.getLevelProgress();
        const pointsToNext = this.gameEngine.getPointsToNextLevel();
        
        document.querySelector('.level-fill').style.width = `${progress}%`;
        document.getElementById('points-to-next').textContent = pointsToNext;
        
        // Update topic mastery
        this.updateTopicMastery();
        
        // Update badges
        this.updateBadgesDisplay();
        
        // Update leaderboard
        this.updateLeaderboard();
    }

    updateTopicMastery() {
        const topics = [
            { key: 'graph-reading', label: 'Graph Reading' },
            { key: 'slope-interpretation', label: 'Slope Interpretation' },
            { key: 'area-calculation', label: 'Area Under Curves' },
            { key: 'sketching', label: 'Graph Sketching' },
            { key: 'misconception-id', label: 'Misconception ID' },
            { key: 'multi-graph', label: 'Multi-Graph' }
        ];
        
        const masteryGrid = document.querySelector('.mastery-grid');
        masteryGrid.innerHTML = '';
        
        topics.forEach(topic => {
            const percentage = this.gameEngine.getTopicMasteryPercentage(topic.key);
            
            const item = document.createElement('div');
            item.className = 'mastery-item';
            item.innerHTML = `
                <span>${topic.label}</span>
                <div class="mastery-bar">
                    <div style="width: ${percentage}%"></div>
                </div>
                <span>${percentage}%</span>
            `;
            
            masteryGrid.appendChild(item);
        });
    }

    updateBadgesDisplay() {
        const badgesGrid = document.getElementById('badges-grid');
        badgesGrid.innerHTML = '';
        
        GAME_CONFIG.BADGES.forEach(badge => {
            const earned = this.gameEngine.playerData.badges.includes(badge.id);
            
            const badgeElement = document.createElement('div');
            badgeElement.className = `badge-item ${earned ? 'earned' : 'locked'}`;
            badgeElement.innerHTML = `
                <span class="badge-icon">${badge.icon}</span>
                <h4>${badge.name}</h4>
                <p>${badge.description}</p>
                ${earned ? '<div class="badge-earned">✅ Earned!</div>' : ''}
            `;
            
            badgesGrid.appendChild(badgeElement);
        });
    }

    updateLeaderboard() {
        const leaderboardList = document.getElementById('leaderboard-list');
        leaderboardList.innerHTML = '';
        
        // For now, use sample data. In production, this would fetch from server
        SAMPLE_LEADERBOARD.forEach((player, index) => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            
            // Highlight current player (simplified - would use actual player ID)
            const isCurrentPlayer = index === 0; // Placeholder
            if (isCurrentPlayer) {
                item.style.backgroundColor = '#dbeafe';
            }
            
            item.innerHTML = `
                <span class="leaderboard-rank">#${player.rank}</span>
                <span class="leaderboard-name">${player.name}</span>
                <span class="leaderboard-score">${player.points} pts</span>
            `;
            
            leaderboardList.appendChild(item);
        });
    }

    showLeaderboard() {
        this.showProgress();
        this.switchTab('leaderboard');
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        // Load tab-specific content
        if (tabName === 'leaderboard') {
            this.updateLeaderboard();
        }
    }

    // Event Handlers
    handleLevelUp(detail) {
        // Show level up notification
        const notification = document.getElementById('level-up-notification');
        const newLevelName = document.getElementById('new-level-name');
        
        const levelName = detail.newLevel?.name || `Level ${detail.player?.currentLevel + 1 || 'Unknown'}`;
        newLevelName.textContent = levelName;
        
        // Add level number and perks info
        const levelInfo = document.createElement('p');
        levelInfo.innerHTML = `<strong>Level ${detail.player?.currentLevel + 1 || '?'}</strong><br>
                              <em>Perk: +10% points on ${levelName.toLowerCase()} tasks!</em>`;
        
        // Clear any existing level info and add new
        const existingInfo = notification.querySelector('.level-info');
        if (existingInfo) existingInfo.remove();
        
        levelInfo.className = 'level-info';
        newLevelName.parentNode.insertBefore(levelInfo, newLevelName.nextSibling);
        
        notification.classList.remove('hidden');
        
        // Update player display
        this.updatePlayerDisplay();
        
        // Show celebration animation
        this.showCelebration(`Level Up! You've reached ${levelName}!`);
        
        // Announce to screen readers
        this.announceToScreenReader(`Congratulations! You've reached ${levelName}`);
    }

    handleBadgeEarned(detail) {
        // Show badge notification
        this.showCelebration(`Badge Earned: ${detail.badge.name}`);
        
        // Update badges display if on progress screen
        if (this.currentScreen === 'progress') {
            this.updateBadgesDisplay();
        }
    }

    handlePointsEarned(detail) {
        // Show floating points animation
        this.showFloatingPoints(detail.points, detail.reason);
        this.updatePlayerDisplay();
    }

    showCelebration(message) {
        // Create temporary celebration overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeInOut 3s ease-in-out;
        `;
        
        overlay.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 10px; text-align: center; animation: bounce 0.6s ease;">
                <h2 style="color: #10b981; margin-bottom: 1rem;">🎉 ${message} 🎉</h2>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 3000);
    }

    showFloatingPoints(points, reason) {
        // Create floating points animation
        const pointsElement = document.createElement('div');
        pointsElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            font-weight: bold;
            color: #10b981;
            z-index: 999;
            animation: floatUp 2s ease-out forwards;
            pointer-events: none;
        `;
        
        pointsElement.textContent = `+${points} points`;
        if (reason) {
            pointsElement.innerHTML += `<br><small>${reason}</small>`;
        }
        
        document.body.appendChild(pointsElement);
        
        setTimeout(() => {
            if (document.body.contains(pointsElement)) {
                document.body.removeChild(pointsElement);
            }
        }, 2000);
    }

    announceToScreenReader(message, urgent = false) {
        const liveRegion = urgent ? 
            document.getElementById('urgent-updates') : 
            document.getElementById('status-updates');
        
        if (liveRegion) {
            liveRegion.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 3000);
        }
    }

    // Player Display Updates
    updatePlayerDisplay() {
        const playerData = this.gameEngine.playerData;
        const currentLevel = this.gameEngine.getCurrentLevel();
        const accuracy = this.gameEngine.getPlayerAccuracy();
        const progress = this.gameEngine.getLevelProgress();
        const pointsToNext = this.gameEngine.getPointsToNextLevel();
        
        // Update header stats with proper formatting
        document.getElementById('player-level').textContent = `${playerData.currentLevel + 1}: ${currentLevel.name}`;
        document.getElementById('player-points').textContent = playerData.totalPoints.toLocaleString();
        document.getElementById('player-accuracy').textContent = `${accuracy}%`;
        
        // Update progress bar with aria label
        const progressBar = document.getElementById('level-progress');
        if (progressBar) {
            progressBar.value = Math.round(progress);
            progressBar.setAttribute('aria-label', `Level progress: ${Math.round(progress)}% complete`);
        }
        
        // Add points to next level indicator
        this.updateProgressInfo(pointsToNext, currentLevel);
    }

    updateProgressInfo(pointsToNext, currentLevel) {
        // Add or update points to next level display
        const headerContent = document.querySelector('.header-content');
        let progressInfo = headerContent.querySelector('.progress-info');
        
        if (!progressInfo) {
            progressInfo = document.createElement('div');
            progressInfo.className = 'progress-info';
            progressInfo.style.fontSize = '0.8rem';
            progressInfo.style.opacity = '0.8';
            progressInfo.style.textAlign = 'center';
            headerContent.appendChild(progressInfo);
        }
        
        if (pointsToNext > 0) {
            progressInfo.textContent = `${pointsToNext.toLocaleString()} points to Level ${this.gameEngine.playerData.currentLevel + 2}`;
        } else {
            progressInfo.textContent = 'Maximum Level Reached!';
        }
    }
    
    debugTestComplexGraph() {
        console.log('=== DEBUG: Testing complex graph rendering ===');
        
        // Find area-under-curve question
        const areaQuestion = SAMPLE_QUESTIONS.find(q => q.type === 'area-under-curve');
        if (!areaQuestion) {
            console.error('DEBUG: No area-under-curve question found');
            return;
        }
        
        console.log('DEBUG: Found area question:', areaQuestion);
        
        // Create test canvas
        const testContainer = document.createElement('div');
        testContainer.style.position = 'fixed';
        testContainer.style.top = '10px';
        testContainer.style.right = '10px';
        testContainer.style.width = '300px';
        testContainer.style.height = '200px';
        testContainer.style.backgroundColor = 'white';
        testContainer.style.border = '2px solid red';
        testContainer.style.zIndex = '9999';
        
        const testCanvas = document.createElement('canvas');
        testCanvas.width = 280;
        testCanvas.height = 180;
        testCanvas.style.width = '280px';
        testCanvas.style.height = '180px';
        
        testContainer.appendChild(testCanvas);
        document.body.appendChild(testContainer);
        
        // Try rendering
        const axes = this.getAxesConfig(areaQuestion.graphType, areaQuestion.graphData);
        console.log('DEBUG: Rendering with axes:', axes);
        
        try {
            GraphRenderer.renderGraph(testCanvas, areaQuestion.graphData, axes);
            console.log('DEBUG: Graph rendering completed');
        } catch (error) {
            console.error('DEBUG: Graph rendering failed:', error);
        }
        
        // Remove test canvas after 10 seconds
        setTimeout(() => {
            document.body.removeChild(testContainer);
        }, 10000);
    }
    
    displayPlaceholderGraph(container, graphType) {
        const placeholderDiv = document.createElement('div');
        placeholderDiv.className = 'graph-container placeholder-graph';
        placeholderDiv.style.display = 'flex';
        placeholderDiv.style.alignItems = 'center';
        placeholderDiv.style.justifyContent = 'center';
        placeholderDiv.style.backgroundColor = 'var(--bg-tertiary)';
        placeholderDiv.style.border = '2px dashed var(--border-color)';
        placeholderDiv.style.color = 'var(--text-secondary)';
        placeholderDiv.style.fontSize = '1.1rem';
        placeholderDiv.innerHTML = `
            <div style="text-align: center;">
                <div style="margin-bottom: 0.5rem;">📊</div>
                <div>Graph: ${graphType}</div>
                <div style="font-size: 0.9rem; opacity: 0.8;">Data not available</div>
            </div>
        `;
        
        container.appendChild(placeholderDiv);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; }
        20%, 80% { opacity: 1; }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% { transform: scale(1); }
        40%, 43% { transform: scale(1.1); }
    }
    
    @keyframes floatUp {
        0% { opacity: 1; transform: translate(-50%, -50%); }
        100% { opacity: 0; transform: translate(-50%, -150%); }
    }
    
    /* Improved answer options styling */
    .answer-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .answer-option {
        padding: 1.2rem;
        border: 2px solid var(--border-color);
        border-radius: var(--radius);
        background: var(--bg-secondary);
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .answer-option:hover {
        border-color: var(--primary-color);
        background: var(--bg-primary);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .answer-option.selected {
        border-color: var(--primary-color);
        background: var(--primary-color);
        color: var(--bg-primary);
        transform: scale(1.02);
    }
    
    .answer-option strong {
        color: var(--primary-color);
        font-size: 1rem;
        margin-bottom: 0.5rem;
        display: block;
    }
    
    .answer-option.selected strong {
        color: var(--bg-primary);
    }
    
    .mini-graph-container {
        border: 2px solid var(--border-color) !important;
        background: var(--bg-primary) !important;
    }
    
    .answer-option:hover .mini-graph-container {
        border-color: var(--primary-color) !important;
    }
    
    .answer-option.selected .mini-graph-container {
        border-color: var(--bg-primary) !important;
        background: rgba(255,255,255,0.9) !important;
    }
    
    @media (max-width: 768px) {
        .answer-options {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 0.8rem;
        }
        
        .mini-graph-container {
            width: 150px !important;
            height: 100px !important;
        }
        
        .mini-graph-container canvas {
            width: 130px !important;
            height: 80px !important;
        }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.kinemaQuestApp = new KinemaQuestApp();
});