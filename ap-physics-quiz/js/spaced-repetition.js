/**
 * Spaced Repetition System (SRS) for AP Physics Quiz
 * Implements intelligent question scheduling based on student performance
 */

const SpacedRepetition = {
    // SRS intervals in days (modified SM-2 algorithm)
    intervals: [1, 3, 7, 14, 30, 60, 120],
    
    // Minimum ease factor
    minEase: 1.3,
    
    // Default ease factor for new questions
    defaultEase: 2.5,

    // Initialize the spaced repetition system
    init: function() {
        this.setupEventListeners();
        this.scheduleReviewNotifications();
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Listen for question answers to update SRS data
        document.addEventListener('questionAnswered', (event) => {
            const { questionId, isCorrect, timeSpent } = event.detail;
            this.updateQuestionSRS(questionId, isCorrect, timeSpent);
        });

        // Add review mode to start screen
        this.addReviewModeToUI();
    },

    // Update SRS data for a question based on answer performance
    updateQuestionSRS: function(questionId, isCorrect, timeSpent) {
        try {
            const srsData = this.getSRSData();
            
            if (!srsData[questionId]) {
                // Initialize new question
                srsData[questionId] = {
                    interval: 0,
                    ease: this.defaultEase,
                    repetitions: 0,
                    lastReviewed: Date.now(),
                    nextReview: Date.now(),
                    totalAnswers: 0,
                    correctAnswers: 0,
                    averageTime: 0,
                    difficulty: 'new'
                };
            }

            const question = srsData[questionId];
            
            // Update answer statistics
            question.totalAnswers++;
            if (isCorrect) question.correctAnswers++;
            question.averageTime = ((question.averageTime * (question.totalAnswers - 1)) + timeSpent) / question.totalAnswers;
            question.lastReviewed = Date.now();

            if (isCorrect) {
                // Correct answer: increase interval
                if (question.repetitions === 0) {
                    question.interval = 1;
                } else if (question.repetitions === 1) {
                    question.interval = 3;
                } else {
                    question.interval = Math.round(question.interval * question.ease);
                }
                
                question.repetitions++;
                
                // Adjust ease based on time taken and difficulty
                const timeAdjustment = this.calculateTimeAdjustment(timeSpent);
                question.ease = Math.max(this.minEase, question.ease + timeAdjustment);
                
                // Update difficulty classification
                question.difficulty = this.classifyDifficulty(question);
                
            } else {
                // Incorrect answer: reset repetitions, decrease ease
                question.repetitions = 0;
                question.interval = 1;
                question.ease = Math.max(this.minEase, question.ease - 0.2);
                question.difficulty = 'struggling';
            }

            // Calculate next review date
            question.nextReview = Date.now() + (question.interval * 24 * 60 * 60 * 1000);
            
            this.saveSRSData(srsData);
            
        } catch (error) {
            Utils.handleError(error, 'SpacedRepetition.updateQuestionSRS');
        }
    },

    // Calculate time adjustment for ease factor
    calculateTimeAdjustment: function(timeSpent) {
        // Faster answers (< 10 seconds) increase ease more
        if (timeSpent < 10000) return 0.1;
        // Medium time (10-30 seconds) slight increase
        if (timeSpent < 30000) return 0.05;
        // Slow answers (> 30 seconds) slight decrease
        return -0.05;
    },

    // Classify question difficulty based on performance
    classifyDifficulty: function(question) {
        const accuracy = question.correctAnswers / question.totalAnswers;
        const avgTime = question.averageTime;

        if (accuracy >= 0.9 && avgTime < 15000) return 'mastered';
        if (accuracy >= 0.8 && avgTime < 30000) return 'familiar';
        if (accuracy >= 0.6) return 'learning';
        return 'struggling';
    },

    // Get questions due for review
    getQuestionsForReview: function(maxQuestions = 20) {
        try {
            const srsData = this.getSRSData();
            const now = Date.now();
            const dueQuestions = [];

            Object.entries(srsData).forEach(([questionId, data]) => {
                if (data.nextReview <= now) {
                    dueQuestions.push({
                        id: questionId,
                        priority: this.calculatePriority(data, now),
                        data: data
                    });
                }
            });

            // Sort by priority (higher priority first)
            dueQuestions.sort((a, b) => b.priority - a.priority);
            
            return dueQuestions.slice(0, maxQuestions).map(q => q.id);
            
        } catch (error) {
            Utils.handleError(error, 'SpacedRepetition.getQuestionsForReview');
            return [];
        }
    },

    // Calculate review priority for a question
    calculatePriority: function(questionData, now) {
        const daysSinceLastReview = (now - questionData.lastReviewed) / (24 * 60 * 60 * 1000);
        const accuracy = questionData.correctAnswers / Math.max(1, questionData.totalAnswers);
        
        // Higher priority for:
        // - Questions overdue for longer
        // - Questions with lower accuracy
        // - Questions marked as struggling
        let priority = daysSinceLastReview * 10;
        
        if (accuracy < 0.5) priority *= 2;
        if (questionData.difficulty === 'struggling') priority *= 1.5;
        
        return priority;
    },

    // Add spaced repetition review mode to the UI
    addReviewModeToUI: function() {
        const modeOptions = document.querySelector('.mode-options');
        if (modeOptions && !document.querySelector('[data-mode="spaced-review"]')) {
            const reviewButton = document.createElement('button');
            reviewButton.className = 'mode-btn';
            reviewButton.dataset.mode = 'spaced-review';
            
            const dueCount = this.getQuestionsForReview().length;
            
            reviewButton.innerHTML = `
                <div class="btn-emoji">🧠</div>
                <div class="btn-content">
                    <strong>Smart Review</strong>
                    <span>Spaced repetition (${dueCount} due)</span>
                </div>
            `;
            
            modeOptions.appendChild(reviewButton);
            
            // Add click handler
            reviewButton.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
                reviewButton.classList.add('active');
            });
        }
    },

    // Get SRS analytics for display
    getSRSAnalytics: function() {
        try {
            const srsData = this.getSRSData();
            const analytics = {
                totalQuestions: Object.keys(srsData).length,
                mastered: 0,
                familiar: 0,
                learning: 0,
                struggling: 0,
                dueToday: 0,
                dueThisWeek: 0
            };

            const now = Date.now();
            const oneWeek = 7 * 24 * 60 * 60 * 1000;

            Object.values(srsData).forEach(data => {
                analytics[data.difficulty]++;
                
                if (data.nextReview <= now) analytics.dueToday++;
                else if (data.nextReview <= now + oneWeek) analytics.dueThisWeek++;
            });

            return analytics;
            
        } catch (error) {
            Utils.handleError(error, 'SpacedRepetition.getSRSAnalytics');
            return null;
        }
    },

    // Generate personalized study recommendations
    getStudyRecommendations: function() {
        const analytics = this.getSRSAnalytics();
        const recommendations = [];

        if (analytics.dueToday > 0) {
            recommendations.push({
                type: 'review',
                priority: 'high',
                message: `You have ${analytics.dueToday} questions due for review today`,
                action: 'Start Smart Review',
                mode: 'spaced-review'
            });
        }

        if (analytics.struggling > 0) {
            recommendations.push({
                type: 'practice',
                priority: 'medium',
                message: `Focus on ${analytics.struggling} concepts you're struggling with`,
                action: 'Practice Struggling Topics',
                mode: 'review'
            });
        }

        if (analytics.learning > analytics.familiar) {
            recommendations.push({
                type: 'learning',
                priority: 'medium',
                message: 'Continue building familiarity with current topics',
                action: 'Continue Learning',
                mode: 'learning'
            });
        }

        return recommendations;
    },

    // Schedule review notifications (mock implementation)
    scheduleReviewNotifications: function() {
        // In a real implementation, this would set up browser notifications
        // or integrate with a notification service
        const dueCount = this.getQuestionsForReview().length;
        
        if (dueCount > 0) {
            console.log(`📚 SRS Reminder: ${dueCount} questions are due for review`);
        }
    },

    // Update the due count in the UI
    updateDueCountInUI: function() {
        const reviewButton = document.querySelector('[data-mode="spaced-review"]');
        if (reviewButton) {
            const dueCount = this.getQuestionsForReview().length;
            const span = reviewButton.querySelector('span');
            if (span) {
                span.textContent = `Spaced repetition (${dueCount} due)`;
            }
        }
    },

    // Storage management
    getSRSData: function() {
        return Utils.storage.get('srs_data', {});
    },

    saveSRSData: function(data) {
        return Utils.storage.set('srs_data', data);
    },

    // Export SRS data for backup
    exportSRSData: function() {
        const srsData = this.getSRSData();
        const exportData = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            srsData: srsData
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `ap-physics-srs-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // Import SRS data from backup
    importSRSData: function(fileInput) {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importData = JSON.parse(e.target.result);
                if (importData.srsData) {
                    this.saveSRSData(importData.srsData);
                    this.updateDueCountInUI();
                    console.log('SRS data imported successfully');
                }
            } catch (error) {
                Utils.handleError(error, 'SpacedRepetition.importSRSData');
            }
        };
        reader.readAsText(file);
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SpacedRepetition.init());
} else {
    SpacedRepetition.init();
}