/**
 * Enhanced Performance Analytics System
 * Provides detailed learning analytics by topic, question type, and difficulty
 */

window.PerformanceAnalytics = {
    // Initialize the analytics system
    init: function () {
        this.updateAnalyticsDisplay();
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners: function () {
        // Listen for question completion events
        document.addEventListener('questionAnswered', (event) => {
            this.updateAnalyticsDisplay();
        });

        // Listen for quiz completion
        document.addEventListener('quizCompleted', (event) => {
            this.generateSessionReport();
        });
    },

    // Update the analytics display with comprehensive data
    updateAnalyticsDisplay: function () {
        try {
            const stats = QuizStorage.getStatistics();

            if (stats.totalQuestions === 0) {
                this.showEmptyState();
                return;
            }

            this.renderOverallPerformance(stats);
            this.renderTopicAnalytics(stats);
            this.renderQuestionTypeAnalytics(stats);
            this.renderDifficultyAnalytics(stats);
            this.renderTrendAnalysis(stats);

        } catch (error) {
            Utils.handleError(error, 'PerformanceAnalytics.updateAnalyticsDisplay');
        }
    },

    // Show empty state when no data is available
    showEmptyState: function () {
        const statsDisplay = document.getElementById('stats-display');
        if (statsDisplay) {
            statsDisplay.innerHTML = `
                <div class="analytics-empty-state">
                    <div class="empty-icon">📊</div>
                    <h3>No Analytics Data Yet</h3>
                    <p>Start answering questions to see your performance analytics!</p>
                </div>
            `;
        }
    },

    // Render overall performance metrics
    renderOverallPerformance: function (stats) {
        const accuracy = ((stats.correctAnswers / stats.totalQuestions) * 100).toFixed(1);
        const avgTimeFormatted = this.formatTime(stats.averageTime);

        const statsDisplay = document.getElementById('stats-display');
        if (statsDisplay) {
            statsDisplay.innerHTML = `
                <div class="analytics-dashboard">
                    <div class="analytics-header">
                        <h3>📈 Performance Analytics</h3>
                        <div class="analytics-summary">
                            <div class="summary-item">
                                <div class="summary-value">${stats.totalQuestions}</div>
                                <div class="summary-label">Questions Attempted</div>
                            </div>
                            <div class="summary-item">
                                <div class="summary-value">${accuracy}%</div>
                                <div class="summary-label">Overall Accuracy</div>
                            </div>
                            <div class="summary-item">
                                <div class="summary-value">${avgTimeFormatted}</div>
                                <div class="summary-label">Average Time</div>
                            </div>
                        </div>
                    </div>
                    <div id="detailed-analytics" class="detailed-analytics">
                        <!-- Detailed analytics will be populated here -->
                    </div>
                </div>
            `;
        }
    },

    // Render topic-specific analytics
    renderTopicAnalytics: function (stats) {
        const topicData = this.calculateTopicMetrics(stats.topicStats);

        const detailedAnalytics = document.getElementById('detailed-analytics');
        if (detailedAnalytics && Object.keys(topicData).length > 0) {
            const topicHTML = `
                <div class="analytics-section">
                    <h4>📚 Topic Performance</h4>
                    <div class="topic-analytics-grid">
                        ${Object.entries(topicData).map(([topic, data]) => `
                            <div class="topic-metric">
                                <div class="topic-name">${this.capitalizeFirst(topic)}</div>
                                <div class="topic-stats">
                                    <div class="accuracy-bar">
                                        <div class="accuracy-fill" style="width: ${data.accuracy}%"></div>
                                        <span class="accuracy-text">${data.accuracy}%</span>
                                    </div>
                                    <div class="topic-details">
                                        ${data.correct}/${data.total} correct • ${this.formatTime(data.avgTime)} avg
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            detailedAnalytics.insertAdjacentHTML('beforeend', topicHTML);
        }
    },

    // Render question type analytics
    renderQuestionTypeAnalytics: function (stats) {
        const typeData = this.calculateQuestionTypeMetrics(stats.questionTypeStats);

        const detailedAnalytics = document.getElementById('detailed-analytics');
        if (detailedAnalytics && Object.keys(typeData).length > 0) {
            const typeHTML = `
                <div class="analytics-section">
                    <h4>🔤 Question Type Performance</h4>
                    <div class="type-analytics-grid">
                        ${Object.entries(typeData).map(([type, data]) => `
                            <div class="type-metric">
                                <div class="type-icon">${this.getQuestionTypeIcon(type)}</div>
                                <div class="type-content">
                                    <div class="type-name">${this.getQuestionTypeName(type)}</div>
                                    <div class="type-accuracy">${data.accuracy}% accuracy</div>
                                    <div class="type-details">${data.correct}/${data.total} questions</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            detailedAnalytics.insertAdjacentHTML('beforeend', typeHTML);
        }
    },

    // Render difficulty level analytics
    renderDifficultyAnalytics: function (stats) {
        const difficultyData = stats.difficultyStats;

        const detailedAnalytics = document.getElementById('detailed-analytics');
        if (detailedAnalytics) {
            const difficultyHTML = `
                <div class="analytics-section">
                    <h4>⭐ Difficulty Level Performance</h4>
                    <div class="difficulty-analytics-grid">
                        ${[1, 2, 3].map(level => {
                const data = difficultyData[level] || { correct: 0, total: 0 };
                const accuracy = data.total > 0 ? ((data.correct / data.total) * 100).toFixed(1) : 0;
                const stars = '★'.repeat(level) + '☆'.repeat(3 - level);
                return `
                                <div class="difficulty-metric difficulty-${level}">
                                    <div class="difficulty-header">
                                        <span class="difficulty-stars">${stars}</span>
                                        <span class="difficulty-label">Level ${level}</span>
                                    </div>
                                    <div class="difficulty-stats">
                                        <div class="difficulty-accuracy">${accuracy}%</div>
                                        <div class="difficulty-count">${data.correct}/${data.total}</div>
                                    </div>
                                </div>
                            `;
            }).join('')}
                    </div>
                </div>
            `;
            detailedAnalytics.insertAdjacentHTML('beforeend', difficultyHTML);
        }
    },

    // Render trend analysis
    renderTrendAnalysis: function (stats) {
        const detailedAnalytics = document.getElementById('detailed-analytics');
        if (detailedAnalytics) {
            const streakInfo = stats.streaks || { current: 0, best: 0 };
            const trendHTML = `
                <div class="analytics-section">
                    <h4>📈 Learning Trends</h4>
                    <div class="trend-analytics">
                        <div class="trend-item">
                            <div class="trend-icon">🔥</div>
                            <div class="trend-content">
                                <div class="trend-label">Current Streak</div>
                                <div class="trend-value">${streakInfo.current} correct</div>
                            </div>
                        </div>
                        <div class="trend-item">
                            <div class="trend-icon">🏆</div>
                            <div class="trend-content">
                                <div class="trend-label">Personal Best</div>
                                <div class="trend-value">${streakInfo.best} in a row</div>
                            </div>
                        </div>
                        <div class="trend-item">
                            <div class="trend-icon">⏱️</div>
                            <div class="trend-content">
                                <div class="trend-label">Total Study Time</div>
                                <div class="trend-value">${this.formatTime(stats.totalTime)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            detailedAnalytics.insertAdjacentHTML('beforeend', trendHTML);
        }
    },

    // Calculate topic-specific metrics
    calculateTopicMetrics: function (topicStats) {
        const metrics = {};

        Object.entries(topicStats).forEach(([topic, stats]) => {
            if (stats.total > 0) {
                metrics[topic] = {
                    correct: stats.correct,
                    total: stats.total,
                    accuracy: ((stats.correct / stats.total) * 100).toFixed(1),
                    avgTime: stats.totalTime ? (stats.totalTime / stats.total) : 0
                };
            }
        });

        return metrics;
    },

    // Calculate question type metrics
    calculateQuestionTypeMetrics: function (typeStats) {
        const metrics = {};

        Object.entries(typeStats).forEach(([type, stats]) => {
            if (stats.total > 0) {
                metrics[type] = {
                    correct: stats.correct,
                    total: stats.total,
                    accuracy: ((stats.correct / stats.total) * 100).toFixed(1)
                };
            }
        });

        return metrics;
    },

    // Generate session report
    generateSessionReport: function () {
        const stats = QuizStorage.getStatistics();
        const sessionStats = this.calculateSessionStats(stats);

        this.showSessionReport(sessionStats);
    },

    // Calculate session-specific statistics
    calculateSessionStats: function (stats) {
        const progress = QuizStorage.getProgress();
        const sessionStart = progress.sessionStartTime || Date.now();
        const sessionDuration = Date.now() - sessionStart;

        return {
            questionsAnswered: progress.totalAttempted || 0,
            correctAnswers: progress.correctAnswers || 0,
            sessionDuration: sessionDuration,
            accuracy: progress.totalAttempted > 0 ?
                ((progress.correctAnswers / progress.totalAttempted) * 100).toFixed(1) : 0
        };
    },

    // Show session completion report
    showSessionReport: function (sessionStats) {
        const modal = document.createElement('div');
        modal.className = 'session-report-modal';
        modal.innerHTML = `
            <div class="session-report-content">
                <div class="session-report-header">
                    <h3>🎉 Session Complete!</h3>
                    <button class="close-report">×</button>
                </div>
                <div class="session-report-body">
                    <div class="session-metric">
                        <div class="metric-value">${sessionStats.questionsAnswered}</div>
                        <div class="metric-label">Questions Answered</div>
                    </div>
                    <div class="session-metric">
                        <div class="metric-value">${sessionStats.accuracy}%</div>
                        <div class="metric-label">Session Accuracy</div>
                    </div>
                    <div class="session-metric">
                        <div class="metric-value">${this.formatTime(sessionStats.sessionDuration)}</div>
                        <div class="metric-label">Study Time</div>
                    </div>
                </div>
                <div class="session-report-footer">
                    <button class="btn btn-primary continue-studying">Continue Studying</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event handlers
        modal.querySelector('.close-report').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('.continue-studying').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    },

    // Helper functions
    formatTime: function (milliseconds) {
        if (milliseconds < 1000) return '< 1s';
        const seconds = Math.floor(milliseconds / 1000);
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    },

    capitalizeFirst: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    getQuestionTypeIcon: function (type) {
        const icons = {
            'mc': '🔤',
            'tf': '✓✗',
            'fill': '✏️',
            'matching': '🔗'
        };
        return icons[type] || '❓';
    },

    getQuestionTypeName: function (type) {
        const names = {
            'mc': 'Multiple Choice',
            'tf': 'True/False',
            'fill': 'Fill-in-the-Blank',
            'matching': 'Matching'
        };
        return names[type] || 'Unknown';
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PerformanceAnalytics.init());
} else {
    PerformanceAnalytics.init();
}