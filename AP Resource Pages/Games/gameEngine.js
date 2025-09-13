// Game Engine - Core game logic and mechanics
class GameEngine {
    constructor() {
        this.playerData = this.loadPlayerData();
        this.currentSession = null;
        this.sessionTimer = null;
        this.currentQuestion = null;
        this.sessionQuestions = [];
        this.sessionStartTime = null;
        this.questionStartTime = null;
        
        this.initializePlayer();
    }

    // Player Data Management
    loadPlayerData() {
        const saved = localStorage.getItem('kinemaquest-player');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            totalPoints: 0,
            currentLevel: 0,
            sessionCount: 0,
            questionsAnswered: 0,
            questionsCorrect: 0,
            badges: [],
            topicMastery: {
                'graph-reading': { attempted: 0, correct: 0 },
                'slope-interpretation': { attempted: 0, correct: 0 },
                'area-calculation': { attempted: 0, correct: 0 },
                'sketching': { attempted: 0, correct: 0 },
                'misconception-id': { attempted: 0, correct: 0 },
                'multi-graph': { attempted: 0, correct: 0 }
            },
            streakCount: 0,
            lastPlayDate: null,
            achievements: {},
            settings: {
                soundEnabled: true,
                difficulty: 'adaptive'
            }
        };
    }

    savePlayerData() {
        localStorage.setItem('kinemaquest-player', JSON.stringify(this.playerData));
    }

    initializePlayer() {
        this.updatePlayerLevel();
        this.checkDailyStreak();
    }

    updatePlayerLevel() {
        const levels = GAME_CONFIG.LEVELS;
        for (let i = levels.length - 1; i >= 0; i--) {
            if (this.playerData.totalPoints >= levels[i].minPoints) {
                this.playerData.currentLevel = i;
                break;
            }
        }
    }

    getCurrentLevel() {
        return GAME_CONFIG.LEVELS[this.playerData.currentLevel];
    }

    getPointsToNextLevel() {
        const currentLevel = this.getCurrentLevel();
        const nextLevel = GAME_CONFIG.LEVELS[this.playerData.currentLevel + 1];
        
        if (!nextLevel) return 0;
        
        return nextLevel.minPoints - this.playerData.totalPoints;
    }

    getLevelProgress() {
        const currentLevel = this.getCurrentLevel();
        const pointsInLevel = this.playerData.totalPoints - currentLevel.minPoints;
        const levelRange = currentLevel.maxPoints - currentLevel.minPoints;
        
        return Math.min(100, (pointsInLevel / levelRange) * 100);
    }

    checkDailyStreak() {
        const today = new Date().toDateString();
        const lastPlay = this.playerData.lastPlayDate;
        
        if (lastPlay !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastPlay === yesterday.toDateString()) {
                this.playerData.streakCount += 1;
            } else if (lastPlay !== today) {
                this.playerData.streakCount = 1;
            }
            
            this.playerData.lastPlayDate = today;
            this.awardPoints(10, 'Daily login bonus');
        }
    }

    // Session Management
    startSession(mode = 'normal') {
        this.currentSession = {
            mode: mode,
            startTime: Date.now(),
            timeLimit: GAME_CONFIG.SESSION_TIME * 1000,
            questions: [],
            currentQuestionIndex: 0,
            points: 0,
            correct: 0,
            incorrect: 0,
            streakCount: 0
        };

        this.generateSessionQuestions();
        this.sessionStartTime = Date.now();
        
        // Start session timer
        this.startSessionTimer();
        
        return this.currentSession;
    }

    generateSessionQuestions() {
        const playerLevel = this.playerData.currentLevel;
        const questionsNeeded = 8; // Base questions per session
        
        // Mix of current level and slightly easier questions
        const questions = [];
        
        // 60% current level, 30% previous level, 10% next level
        for (let i = 0; i < questionsNeeded; i++) {
            let targetLevel = playerLevel;
            
            const rand = Math.random();
            if (rand < 0.3 && playerLevel > 0) {
                targetLevel = playerLevel - 1; // Easier
            } else if (rand > 0.9 && playerLevel < GAME_CONFIG.LEVELS.length - 1) {
                targetLevel = playerLevel + 1; // Harder
            }
            
            const question = this.selectQuestionForLevel(targetLevel);
            if (question) {
                questions.push(question);
            }
        }
        
        this.currentSession.questions = questions;
    }

    selectQuestionForLevel(level) {
        // For now, use sample questions. In production, this would select from larger question bank
        const availableQuestions = SAMPLE_QUESTIONS.filter(q => q.level <= level + 1);
        
        if (availableQuestions.length === 0) {
            return SAMPLE_QUESTIONS[0]; // Fallback
        }
        
        return this.cloneQuestion(availableQuestions[Math.floor(Math.random() * availableQuestions.length)]);
    }

    cloneQuestion(question) {
        return JSON.parse(JSON.stringify(question));
    }

    getCurrentQuestion() {
        if (!this.currentSession || this.currentSession.currentQuestionIndex >= this.currentSession.questions.length) {
            return null;
        }
        
        return this.currentSession.questions[this.currentSession.currentQuestionIndex];
    }

    startSessionTimer() {
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
        }
        
        this.sessionTimer = setInterval(() => {
            if (this.currentSession) {
                const elapsed = Date.now() - this.currentSession.startTime;
                const remaining = Math.max(0, this.currentSession.timeLimit - elapsed);
                
                // Update timer display
                this.updateTimerDisplay(remaining);
                
                if (remaining === 0) {
                    this.endSession();
                }
            }
        }, 1000);
    }

    updateTimerDisplay(remainingMs) {
        const minutes = Math.floor(remainingMs / 60000);
        const seconds = Math.floor((remainingMs % 60000) / 1000);
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        const timerElement = document.getElementById('session-timer');
        if (timerElement) {
            timerElement.textContent = display;
        }
    }

    // Question Management
    submitAnswer(selectedAnswer, timeSpent = 0) {
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) return null;

        const isCorrect = this.checkAnswer(currentQuestion, selectedAnswer);
        const points = this.calculatePoints(currentQuestion, isCorrect, timeSpent);
        
        const result = {
            correct: isCorrect,
            points: points,
            explanation: currentQuestion.explanation,
            selectedAnswer: selectedAnswer,
            correctAnswer: this.getCorrectAnswer(currentQuestion),
            timeSpent: timeSpent
        };

        // Update session stats
        this.currentSession.points += points;
        if (isCorrect) {
            this.currentSession.correct++;
            this.currentSession.streakCount++;
        } else {
            this.currentSession.incorrect++;
            this.currentSession.streakCount = 0;
        }

        // Update player stats
        this.updatePlayerStats(currentQuestion, isCorrect, points);
        
        // Check for achievements
        this.checkAchievements(result);
        
        return result;
    }

    checkAnswer(question, selectedAnswer) {
        switch (question.type) {
            case 'graph-matching':
            case 'misconception-identification':
                return question.options[selectedAnswer] && question.options[selectedAnswer].correct;
            
            case 'area-under-curve':
                return question.options[selectedAnswer] && question.options[selectedAnswer].correct;
            
            case 'sketch-challenge':
                // For sketch challenges, we'd need more complex validation
                // For now, assume we have a validation function
                return this.validateSketch(question, selectedAnswer);
            
            default:
                return false;
        }
    }

    getCorrectAnswer(question) {
        switch (question.type) {
            case 'graph-matching':
            case 'misconception-identification':
            case 'area-under-curve':
                return question.options.findIndex(opt => opt.correct);
            
            default:
                return 0;
        }
    }

    calculatePoints(question, isCorrect, timeSpent) {
        if (!isCorrect) return 0;
        
        let basePoints = question.points || 15;
        let multiplier = 1;
        
        // First attempt bonus
        multiplier *= 1.5;
        
        // Streak bonus
        if (this.currentSession.streakCount >= 3) {
            multiplier *= 1.2;
        }
        if (this.currentSession.streakCount >= 5) {
            multiplier *= 1.5;
        }
        
        // Time bonus (small, only as tiebreaker)
        if (timeSpent < 30000) { // Less than 30 seconds
            multiplier *= 1.05;
        }
        
        // Daily challenge bonus
        const today = getDailyChallenge();
        if (this.currentSession.mode === 'daily-challenge') {
            multiplier *= today.bonus;
        }
        
        return Math.floor(basePoints * multiplier);
    }

    updatePlayerStats(question, isCorrect, points) {
        // Update total points
        this.playerData.totalPoints += points;
        
        // Update question counts
        this.playerData.questionsAnswered++;
        if (isCorrect) {
            this.playerData.questionsCorrect++;
        }
        
        // Update topic mastery
        const topicKey = this.getTopicKey(question.type);
        if (this.playerData.topicMastery[topicKey]) {
            this.playerData.topicMastery[topicKey].attempted++;
            if (isCorrect) {
                this.playerData.topicMastery[topicKey].correct++;
            }
        }
        
        // Update level
        const oldLevel = this.playerData.currentLevel;
        this.updatePlayerLevel();
        
        // Check for level up
        if (this.playerData.currentLevel > oldLevel) {
            this.triggerLevelUp(oldLevel, this.playerData.currentLevel);
        }
        
        // Save progress
        this.savePlayerData();
    }

    getTopicKey(questionType) {
        const mapping = {
            'graph-matching': 'graph-reading',
            'misconception-identification': 'misconception-id',
            'sketch-challenge': 'sketching',
            'multi-graph-coordination': 'multi-graph',
            'area-under-curve': 'area-calculation'
        };
        
        return mapping[questionType] || 'graph-reading';
    }

    nextQuestion() {
        if (!this.currentSession) return false;
        
        this.currentSession.currentQuestionIndex++;
        this.questionStartTime = Date.now();
        
        return this.currentSession.currentQuestionIndex < this.currentSession.questions.length;
    }

    // Achievement System
    checkAchievements(result) {
        const badges = GAME_CONFIG.BADGES;
        
        badges.forEach(badge => {
            if (this.playerData.badges.includes(badge.id)) return;
            
            let earned = false;
            
            switch (badge.type) {
                case 'count':
                    earned = this.checkCountAchievement(badge);
                    break;
                case 'perfect':
                    earned = this.checkPerfectAchievement(badge);
                    break;
                case 'speed':
                    earned = this.checkSpeedAchievement(badge);
                    break;
                case 'accuracy':
                    earned = this.checkAccuracyAchievement(badge);
                    break;
                case 'consistency':
                    earned = this.checkConsistencyAchievement(badge);
                    break;
                case 'improvement':
                    earned = this.checkImprovementAchievement(badge);
                    break;
                case 'variety':
                    earned = this.checkVarietyAchievement(badge);
                    break;
            }
            
            if (earned) {
                this.awardBadge(badge.id);
            }
        });
    }

    checkCountAchievement(badge) {
        // Implementation varies by specific badge
        switch (badge.id) {
            case 'graph-reader':
                return this.playerData.questionsAnswered >= badge.requirement;
            case 'area-calculator':
                const areaStats = this.playerData.topicMastery['area-calculation'];
                return areaStats && areaStats.correct >= badge.requirement;
            case 'sketch-artist':
                const sketchStats = this.playerData.topicMastery['sketching'];
                return sketchStats && sketchStats.correct >= badge.requirement;
            case 'misconception-hunter':
                const misconceptionStats = this.playerData.topicMastery['misconception-id'];
                return misconceptionStats && misconceptionStats.correct >= badge.requirement;
            default:
                return false;
        }
    }

    checkPerfectAchievement(badge) {
        // Check for perfect scores on specific topics
        switch (badge.id) {
            case 'slope-master':
                const slopeStats = this.playerData.topicMastery['slope-interpretation'];
                return slopeStats && slopeStats.attempted >= 10 && 
                       (slopeStats.correct / slopeStats.attempted) === 1;
            default:
                return false;
        }
    }

    checkSpeedAchievement(badge) {
        // Speed demon badge - checked in session completion
        return false; // Handled in checkSessionAchievements
    }

    checkAccuracyAchievement(badge) {
        const accuracy = this.playerData.questionsAnswered > 0 ? 
            (this.playerData.questionsCorrect / this.playerData.questionsAnswered) * 100 : 0;
        
        return accuracy >= badge.requirement && this.playerData.questionsAnswered >= 10;
    }

    checkConsistencyAchievement(badge) {
        // Check for consistent performance across sessions
        // Simplified implementation - would need session history in production
        const accuracy = this.playerData.questionsAnswered > 0 ? 
            (this.playerData.questionsCorrect / this.playerData.questionsAnswered) * 100 : 0;
        
        return accuracy >= badge.requirement && this.playerData.sessionCount >= 5;
    }

    checkImprovementAchievement(badge) {
        // Comeback kid - simplified implementation
        // In production, would track topic-specific improvement over time
        return false; // Would need session history to implement properly
    }

    checkVarietyAchievement(badge) {
        // Explorer badge - check if tried different activity types
        const topics = Object.keys(this.playerData.topicMastery);
        const attemptedTopics = topics.filter(topic => 
            this.playerData.topicMastery[topic].attempted > 0
        );
        
        return attemptedTopics.length >= 3; // Tried at least 3 different types
    }

    awardBadge(badgeId) {
        if (!this.playerData.badges.includes(badgeId)) {
            this.playerData.badges.push(badgeId);
            this.savePlayerData();
            
            // Trigger badge notification
            this.showBadgeNotification(badgeId);
        }
    }

    awardPoints(points, reason = '') {
        this.playerData.totalPoints += points;
        this.updatePlayerLevel();
        this.savePlayerData();
        
        // Show points notification
        if (reason) {
            this.showPointsNotification(points, reason);
        }
    }

    triggerLevelUp(oldLevel, newLevel) {
        const event = new CustomEvent('levelUp', {
            detail: {
                oldLevel: GAME_CONFIG.LEVELS[oldLevel],
                newLevel: GAME_CONFIG.LEVELS[newLevel],
                player: this.playerData
            }
        });
        
        document.dispatchEvent(event);
    }

    showBadgeNotification(badgeId) {
        const badge = GAME_CONFIG.BADGES.find(b => b.id === badgeId);
        if (badge) {
            const event = new CustomEvent('badgeEarned', {
                detail: { badge: badge }
            });
            document.dispatchEvent(event);
        }
    }

    showPointsNotification(points, reason) {
        const event = new CustomEvent('pointsEarned', {
            detail: { points: points, reason: reason }
        });
        document.dispatchEvent(event);
    }

    // Session End
    endSession() {
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
            this.sessionTimer = null;
        }
        
        if (!this.currentSession) return null;
        
        const sessionData = {
            ...this.currentSession,
            endTime: Date.now(),
            finalAccuracy: this.currentSession.questions.length > 0 ? 
                (this.currentSession.correct / this.currentSession.questions.length) * 100 : 0,
            playerLevel: this.playerData.currentLevel
        };
        
        // Update player session count
        this.playerData.sessionCount++;
        
        // Check for session achievements
        this.checkSessionAchievements(sessionData);
        
        this.savePlayerData();
        
        const finalSession = this.currentSession;
        this.currentSession = null;
        
        return sessionData;
    }

    checkSessionAchievements(sessionData) {
        const sessionTime = sessionData.endTime - sessionData.startTime;
        const sessionMinutes = sessionTime / (1000 * 60);
        
        // Speed demon achievement
        if (sessionMinutes < 15 && sessionData.finalAccuracy > 85) {
            this.awardBadge('speed-demon');
        }
        
        // Perfectionist achievement
        if (sessionData.finalAccuracy === 100 && sessionData.questions.length >= 10) {
            this.awardBadge('perfectionist');
        }
    }

    // Utility Methods
    getPlayerAccuracy() {
        if (this.playerData.questionsAnswered === 0) return 0;
        return Math.round((this.playerData.questionsCorrect / this.playerData.questionsAnswered) * 100);
    }

    getTopicMasteryPercentage(topic) {
        const stats = this.playerData.topicMastery[topic];
        if (!stats || stats.attempted === 0) return 0;
        return Math.round((stats.correct / stats.attempted) * 100);
    }

    validateSketch(question, sketchData) {
        // Simplified sketch validation - in production this would be more sophisticated
        // For now, return true if user attempted to sketch
        return sketchData && sketchData.points && sketchData.points.length > 5;
    }

    // Export/Import for testing or data migration
    exportPlayerData() {
        return JSON.stringify(this.playerData, null, 2);
    }

    importPlayerData(dataString) {
        try {
            const data = JSON.parse(dataString);
            this.playerData = { ...this.loadPlayerData(), ...data };
            this.savePlayerData();
            this.initializePlayer();
            return true;
        } catch (error) {
            console.error('Failed to import player data:', error);
            return false;
        }
    }

    // Admin/Debug functions
    addDebugPoints(points) {
        this.awardPoints(points, 'Debug points');
    }

    resetPlayerData() {
        localStorage.removeItem('kinemaquest-player');
        this.playerData = this.loadPlayerData();
        this.initializePlayer();
    }
}

// Graph rendering utilities for questions
class GraphRenderer {
    static renderGraph(canvas, graphData, axes) {
        const ctx = canvas.getContext('2d');
        
        console.log('GraphRenderer.renderGraph called with:', { 
            canvasSize: { width: canvas.width, height: canvas.height },
            styleSize: { width: canvas.style.width, height: canvas.style.height },
            graphData, 
            axes 
        });
        
        // Handle case where canvas has no dimensions
        if (canvas.width === 0 || canvas.height === 0) {
            console.error('Canvas has zero dimensions, cannot render');
            return;
        }
        
        // Set canvas to actual size for crisp rendering
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        console.log('Canvas rect:', rect, 'DPR:', dpr);
        
        // Use canvas.width/height if available, otherwise use rect
        const renderWidth = canvas.width > 0 ? canvas.width : rect.width;
        const renderHeight = canvas.height > 0 ? canvas.height : rect.height;
        
        if (renderWidth <= 0 || renderHeight <= 0) {
            console.error('Cannot determine valid canvas dimensions:', { renderWidth, renderHeight });
            this.drawErrorMessage(ctx, 300, 200, 'Canvas sizing error');
            return;
        }
        
        // Set actual canvas size
        canvas.width = renderWidth;
        canvas.height = renderHeight;
        
        const width = renderWidth;
        const height = renderHeight;
        
        console.log('Final render dimensions:', { width, height });
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Set high quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Draw axes
        this.drawAxes(ctx, width, height, axes);
        
        // Draw graph based on type
        console.log('Graph type:', graphData.type);
        switch (graphData.type) {
            case 'linear':
                this.drawLinearGraph(ctx, graphData, width, height, axes);
                break;
            case 'parabolic':
                this.drawParabolicGraph(ctx, graphData, width, height, axes);
                break;
            case 'piecewise':
                this.drawPiecewiseGraph(ctx, graphData, width, height, axes);
                break;
            case 'horizontal':
                this.drawHorizontalLine(ctx, graphData, width, height, axes);
                break;
            case 'sinusoidal':
                this.drawSinusoidalGraph(ctx, graphData, width, height, axes);
                break;
            case 'complex':
                console.log('Rendering complex graph');
                this.drawComplexGraph(ctx, graphData, width, height, axes);
                break;
            case 'sawtooth':
                this.drawSawtoothGraph(ctx, graphData, width, height, axes);
                break;
            default:
                console.warn(`Unknown graph type: ${graphData.type}`);
                this.drawErrorMessage(ctx, width, height, `Graph type "${graphData.type}" not supported`);
                break;
        }
    }
    
    static drawAxes(ctx, width, height, axes) {
        const margin = 50;
        
        // Use theme-aware colors
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#333';
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#333';
        ctx.lineWidth = 2;
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, height - margin);
        ctx.stroke();
        
        // X-axis  
        ctx.beginPath();
        ctx.moveTo(margin, height - margin);
        ctx.lineTo(width - margin, height - margin);
        ctx.stroke();
        
        // Arrow heads
        const arrowSize = 8;
        
        // Y-axis arrow
        ctx.beginPath();
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin - arrowSize/2, margin + arrowSize);
        ctx.lineTo(margin + arrowSize/2, margin + arrowSize);
        ctx.closePath();
        ctx.fill();
        
        // X-axis arrow
        ctx.beginPath();
        ctx.moveTo(width - margin, height - margin);
        ctx.lineTo(width - margin - arrowSize, height - margin - arrowSize/2);
        ctx.lineTo(width - margin - arrowSize, height - margin + arrowSize/2);
        ctx.closePath();
        ctx.fill();
        
        // Labels with better positioning
        ctx.font = 'bold 14px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // X-axis label
        ctx.fillText(axes.xLabel || 'Time (s)', width / 2, height - 15);
        
        // Y-axis label  
        ctx.save();
        ctx.translate(20, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(axes.yLabel || 'Value', 0, 0);
        ctx.restore();
        
        // Grid lines (light)
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#e2e2e2';
        ctx.lineWidth = 1;
        
        const xSteps = 5;
        const ySteps = 4;
        
        for (let i = 1; i < xSteps; i++) {
            const x = margin + (width - 2 * margin) * i / xSteps;
            ctx.beginPath();
            ctx.moveTo(x, margin);
            ctx.lineTo(x, height - margin);
            ctx.stroke();
        }
        
        for (let i = 1; i < ySteps; i++) {
            const y = margin + (height - 2 * margin) * i / ySteps;
            ctx.beginPath();
            ctx.moveTo(margin, y);
            ctx.lineTo(width - margin, y);
            ctx.stroke();
        }
    }
    
    static drawLinearGraph(ctx, graphData, width, height, axes) {
        if (!graphData || typeof graphData !== 'object') {
            console.error('Linear graph: Invalid graphData:', graphData);
            this.drawErrorMessage(ctx, width, height, 'Invalid linear graph data');
            return;
        }
        
        const margin = 50;
        const xRange = width - 2 * margin;
        const yRange = height - 2 * margin;
        
        const xScale = xRange / (axes.xMax || 10);
        const yScale = yRange / ((axes.yMax || 20) - (axes.yMin || 0));
        
        let x1, y1, x2, y2;
        
        // Handle different linear graph formats
        if (graphData.startX !== undefined && graphData.startY !== undefined) {
            // Format: startX, startY, endX, endY
            x1 = margin + graphData.startX * xScale;
            y1 = height - margin - (graphData.startY - (axes.yMin || 0)) * yScale;
            x2 = margin + graphData.endX * xScale;
            y2 = height - margin - (graphData.endY - (axes.yMin || 0)) * yScale;
        } else if (graphData.slope !== undefined && graphData.intercept !== undefined) {
            // Format: slope and y-intercept (y = mx + b)
            const xMin = 0;
            const xMax = axes.xMax || 10;
            
            const y1Value = graphData.slope * xMin + graphData.intercept;
            const y2Value = graphData.slope * xMax + graphData.intercept;
            
            x1 = margin + xMin * xScale;
            y1 = height - margin - (y1Value - (axes.yMin || 0)) * yScale;
            x2 = margin + xMax * xScale;
            y2 = height - margin - (y2Value - (axes.yMin || 0)) * yScale;
        }
        
        // Use theme-aware color
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#4385BE';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Add data points
        ctx.fillStyle = ctx.strokeStyle;
        const pointRadius = 6;
        
        ctx.beginPath();
        ctx.arc(x1, y1, pointRadius, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x2, y2, pointRadius, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    static drawHorizontalLine(ctx, graphData, width, height, axes) {
        const margin = 50;
        const yRange = height - 2 * margin;
        const yScale = yRange / ((axes.yMax || 20) - (axes.yMin || 0));
        
        const y = height - margin - (graphData.y - (axes.yMin || 0)) * yScale;
        
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#4385BE';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(margin, y);
        ctx.lineTo(width - margin, y);
        ctx.stroke();
    }
    
    static drawParabolicGraph(ctx, graphData, width, height, axes) {
        const margin = 50;
        const xRange = width - 2 * margin;
        const yRange = height - 2 * margin;
        
        const xMax = axes.xMax || 10;
        const yMax = axes.yMax || 20;
        const yMin = axes.yMin || 0;
        
        const xScale = xRange / xMax;
        const yScale = yRange / (yMax - yMin);
        
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#4385BE';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        
        let firstPoint = true;
        const step = xMax / 100; // Smooth curve with 100 points
        
        for (let x = 0; x <= xMax; x += step) {
            const y = graphData.a * x * x + graphData.b * x + graphData.c;
            
            // Only draw if within bounds
            if (y >= yMin && y <= yMax) {
                const pixelX = margin + x * xScale;
                const pixelY = height - margin - (y - yMin) * yScale;
                
                if (firstPoint) {
                    ctx.moveTo(pixelX, pixelY);
                    firstPoint = false;
                } else {
                    ctx.lineTo(pixelX, pixelY);
                }
            }
        }
        ctx.stroke();
    }
    
    static drawSinusoidalGraph(ctx, graphData, width, height, axes) {
        const margin = 50;
        const xRange = width - 2 * margin;
        const yRange = height - 2 * margin;
        
        const xMax = axes.xMax || 10;
        const yMax = axes.yMax || 20;
        const yMin = axes.yMin || -20;
        
        const xScale = xRange / xMax;
        const yScale = yRange / (yMax - yMin);
        
        const amplitude = graphData.amplitude || 10;
        const period = graphData.period || 2;
        
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#4385BE';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        
        let firstPoint = true;
        const step = xMax / 200; // Very smooth curve
        
        for (let x = 0; x <= xMax; x += step) {
            const y = amplitude * Math.sin(2 * Math.PI * x / period);
            
            const pixelX = margin + x * xScale;
            const pixelY = height - margin - (y - yMin) * yScale;
            
            if (firstPoint) {
                ctx.moveTo(pixelX, pixelY);
                firstPoint = false;
            } else {
                ctx.lineTo(pixelX, pixelY);
            }
        }
        ctx.stroke();
    }
    
    static drawComplexGraph(ctx, graphData, width, height, axes) {
        console.log('Drawing complex graph:', { graphData, width, height, axes });
        
        const margin = 50;
        const xRange = width - 2 * margin;
        const yRange = height - 2 * margin;
        
        const xMax = axes.xMax || 10;
        const yMax = axes.yMax || 20;
        const yMin = axes.yMin || -20;
        
        const xScale = xRange / xMax;
        const yScale = yRange / (yMax - yMin);
        
        console.log('Graph scales:', { xScale, yScale, xRange, yRange, margin });
        
        if (!graphData.regions || !Array.isArray(graphData.regions)) {
            console.error('Complex graph: Invalid regions data:', graphData);
            this.drawErrorMessage(ctx, width, height, 'Complex graph missing regions data');
            return;
        }
        
        if (graphData.regions.length === 0) {
            console.warn('Complex graph: Empty regions array');
            this.drawErrorMessage(ctx, width, height, 'No graph regions to draw');
            return;
        }
        
        console.log('Drawing regions:', graphData.regions);
        
        // Draw each region
        graphData.regions.forEach((region, index) => {
            console.log(`Drawing region ${index}:`, region);
            this.drawRegion(ctx, region, margin, xScale, yScale, height, yMin, index);
        });
    }
    
    static drawRegion(ctx, region, margin, xScale, yScale, height, yMin, index) {
        const colors = [
            getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#4385BE',
            getComputedStyle(document.documentElement).getPropertyValue('--success-color') || '#879A39',
            getComputedStyle(document.documentElement).getPropertyValue('--warning-color') || '#DA702C'
        ];
        
        ctx.fillStyle = colors[index % colors.length] + '80'; // Semi-transparent
        ctx.strokeStyle = colors[index % colors.length];
        ctx.lineWidth = 3;
        
        const xStart = region.xStart || 0;
        const base = region.base || 1;
        const height_val = region.height || 0;
        
        switch (region.shape) {
            case 'rectangle':
                this.drawRectangleRegion(ctx, xStart, base, height_val, margin, xScale, yScale, height, yMin);
                break;
            case 'triangle':
                this.drawTriangleRegion(ctx, xStart, base, height_val, margin, xScale, yScale, height, yMin);
                break;
            case 'trapezoid':
                this.drawTrapezoidRegion(ctx, region, margin, xScale, yScale, height, yMin);
                break;
        }
    }
    
    static drawRectangleRegion(ctx, xStart, base, height_val, margin, xScale, yScale, height, yMin) {
        console.log('Drawing rectangle region:', { xStart, base, height_val, margin, xScale, yScale, height, yMin });
        
        const x1 = margin + xStart * xScale;
        const x2 = margin + (xStart + base) * xScale;
        const y1 = height - margin - (0 - yMin) * yScale; // Baseline
        const y2 = height - margin - (height_val - yMin) * yScale;
        
        console.log('Rectangle coordinates:', { x1, x2, y1, y2 });
        
        // Fill rectangle
        ctx.beginPath();
        ctx.rect(x1, Math.min(y1, y2), x2 - x1, Math.abs(y2 - y1));
        ctx.fill();
        
        // Stroke outline
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1, y2);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2, y1);
        ctx.closePath();
        ctx.stroke();
    }
    
    static drawTriangleRegion(ctx, xStart, base, height_val, margin, xScale, yScale, height, yMin) {
        console.log('Drawing triangle region:', { xStart, base, height_val, margin, xScale, yScale, height, yMin });
        
        const x1 = margin + xStart * xScale;
        const x2 = margin + (xStart + base) * xScale;
        const y1 = height - margin - (0 - yMin) * yScale; // Baseline
        const y2 = height - margin - (height_val - yMin) * yScale;
        
        console.log('Triangle coordinates:', { x1, x2, y1, y2 });
        
        // Fill triangle
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.fill();
        
        // Stroke outline
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();
    }
    
    static drawTrapezoidRegion(ctx, region, margin, xScale, yScale, height, yMin) {
        const x1 = margin + (region.xStart || 0) * xScale;
        const x2 = margin + ((region.xStart || 0) + (region.base || 1)) * xScale;
        const y1 = height - margin - (0 - yMin) * yScale; // Baseline
        const y2 = height - margin - ((region.startHeight || 0) - yMin) * yScale;
        const y3 = height - margin - ((region.endHeight || 0) - yMin) * yScale;
        
        // Fill trapezoid
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1, y2);
        ctx.lineTo(x2, y3);
        ctx.lineTo(x2, y1);
        ctx.closePath();
        ctx.fill();
        
        // Stroke outline
        ctx.stroke();
    }
    
    static drawErrorMessage(ctx, width, height, message) {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--error-color') || '#ef4444';
        ctx.font = 'bold 16px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText('Graph Error:', width / 2, height / 2 - 10);
        ctx.font = '14px "Fira Code", monospace';
        ctx.fillText(message, width / 2, height / 2 + 10);
    }
    
    static drawPiecewiseGraph(ctx, graphData, width, height, axes) {
        if (!graphData.segments || !Array.isArray(graphData.segments)) {
            this.drawErrorMessage(ctx, width, height, 'Piecewise graph missing segments data');
            return;
        }
        
        const margin = 50;
        const xRange = width - 2 * margin;
        const yRange = height - 2 * margin;
        
        const xMax = axes.xMax || 10;
        const yMax = axes.yMax || 20;
        const yMin = axes.yMin || 0;
        
        const xScale = xRange / xMax;
        const yScale = yRange / (yMax - yMin);
        
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#4385BE';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        
        graphData.segments.forEach(segment => {
            this.drawPiecewiseSegment(ctx, segment, margin, xScale, yScale, height, yMin);
        });
    }
    
    static drawPiecewiseSegment(ctx, segment, margin, xScale, yScale, height, yMin) {
        const startX = segment.startX || 0;
        const endX = segment.endX || 1;
        
        ctx.beginPath();
        
        if (segment.type === 'linear') {
            const startY = segment.slope * startX + segment.intercept;
            const endY = segment.slope * endX + segment.intercept;
            
            const x1 = margin + startX * xScale;
            const y1 = height - margin - (startY - yMin) * yScale;
            const x2 = margin + endX * xScale;
            const y2 = height - margin - (endY - yMin) * yScale;
            
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
        } else if (segment.type === 'constant') {
            const y = segment.value || 0;
            const pixelY = height - margin - (y - yMin) * yScale;
            
            ctx.moveTo(margin + startX * xScale, pixelY);
            ctx.lineTo(margin + endX * xScale, pixelY);
        } else if (segment.type === 'parabolic') {
            let firstPoint = true;
            const step = (endX - startX) / 50;
            
            for (let x = startX; x <= endX; x += step) {
                const y = segment.a * x * x + segment.b * x + segment.c;
                const pixelX = margin + x * xScale;
                const pixelY = height - margin - (y - yMin) * yScale;
                
                if (firstPoint) {
                    ctx.moveTo(pixelX, pixelY);
                    firstPoint = false;
                } else {
                    ctx.lineTo(pixelX, pixelY);
                }
            }
        }
        
        ctx.stroke();
    }
    
    static drawSawtoothGraph(ctx, graphData, width, height, axes) {
        const margin = 50;
        const xRange = width - 2 * margin;
        const yRange = height - 2 * margin;
        
        const xMax = axes.xMax || 10;
        const yMax = axes.yMax || 20;
        const yMin = axes.yMin || -20;
        
        const xScale = xRange / xMax;
        const yScale = yRange / (yMax - yMin);
        
        // Default sawtooth parameters
        const amplitude = graphData.amplitude || 10;
        const period = graphData.period || 2;
        const offset = graphData.offset || 0;
        
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#4385BE';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        let firstPoint = true;
        const step = 0.1;
        
        for (let x = 0; x <= xMax; x += step) {
            // Sawtooth wave: linear ramp from -amplitude to +amplitude, then reset
            const phaseX = (x + offset) % period;
            const normalizedPhase = phaseX / period; // 0 to 1
            const y = amplitude * (2 * normalizedPhase - 1); // -amplitude to +amplitude
            
            const pixelX = margin + x * xScale;
            const pixelY = height - margin - (y - yMin) * yScale;
            
            if (firstPoint) {
                ctx.moveTo(pixelX, pixelY);
                firstPoint = false;
            } else {
                ctx.lineTo(pixelX, pixelY);
            }
        }
        
        ctx.stroke();
    }
}