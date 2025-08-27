/**
 * Topic Mastery Visualization and Progress Tracking
 * Displays topic-based progress meters and learning analytics
 */

const TopicMastery = {
    // Initialize the topic mastery system
    init: function() {
        this.updateMasteryDisplay();
        this.setupEventListeners();
    },

    // Update the mastery display with current progress
    updateMasteryDisplay: function() {
        try {
            const stats = QuizStorage.getStatistics();
            const topicStats = this.calculateTopicMastery(stats);
            
            this.renderMasteryMeters(topicStats);
            this.renderOverallStats(stats);
            
            // Show the mastery section if there's progress to display
            const masterySection = document.getElementById('topic-mastery');
            if (masterySection && Object.keys(topicStats).length > 0) {
                masterySection.style.display = 'block';
            }
        } catch (error) {
            Utils.handleError(error, 'TopicMastery.updateMasteryDisplay', 'warning');
        }
    },

    // Calculate mastery percentages for each topic
    calculateTopicMastery: function(stats) {
        const topicMastery = {};
        
        if (!stats.topicStats) return topicMastery;

        for (const [topic, topicData] of Object.entries(stats.topicStats)) {
            if (topicData.total > 0) {
                const percentage = Math.round((topicData.correct / topicData.total) * 100);
                const masteryLevel = this.getMasteryLevel(percentage);
                
                topicMastery[topic] = {
                    percentage: percentage,
                    correct: topicData.correct,
                    total: topicData.total,
                    level: masteryLevel,
                    attempted: topicData.total
                };
            }
        }

        return topicMastery;
    },

    // Determine mastery level based on percentage
    getMasteryLevel: function(percentage) {
        if (percentage >= 80) return 'high';
        if (percentage >= 60) return 'medium';
        return 'low';
    },

    // Render the mastery meters
    renderMasteryMeters: function(topicStats) {
        const container = document.getElementById('mastery-meters');
        if (!container) return;

        const sortedTopics = Object.entries(topicStats)
            .sort((a, b) => b[1].percentage - a[1].percentage);

        container.innerHTML = sortedTopics.map(([topic, data]) => `
            <div class="mastery-meter">
                <div class="topic-name">${this.formatTopicName(topic)}</div>
                <div class="progress-bar-wrapper">
                    <div class="progress-fill mastery-${data.level}" 
                         style="width: ${data.percentage}%" 
                         title="${data.correct}/${data.total} correct">
                    </div>
                </div>
                <div class="mastery-percentage">${data.percentage}%</div>
            </div>
        `).join('');
    },

    // Render overall statistics
    renderOverallStats: function(stats) {
        const container = document.getElementById('mastery-meters');
        if (!container || !stats.topicStats) return;

        const totalTopics = Object.keys(stats.topicStats).length;
        const masteredTopics = Object.values(stats.topicStats)
            .filter(topic => topic.total > 0 && (topic.correct / topic.total) >= 0.8).length;

        const statsHtml = `
            <div class="mastery-stats">
                <div class="stat-item">
                    <span>📚</span>
                    <span class="stat-value">${totalTopics}</span>
                    <span>Topics Explored</span>
                </div>
                <div class="stat-item">
                    <span>🎯</span>
                    <span class="stat-value">${masteredTopics}</span>
                    <span>Mastered (≥80%)</span>
                </div>
                <div class="stat-item">
                    <span>📈</span>
                    <span class="stat-value">${stats.totalQuestions || 0}</span>
                    <span>Total Answered</span>
                </div>
                <div class="stat-item">
                    <span>⚡</span>
                    <span class="stat-value">${stats.streaks?.current || 0}</span>
                    <span>Current Streak</span>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', statsHtml);
    },

    // Format topic name for display
    formatTopicName: function(topic) {
        return topic.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Listen for answer submissions to update mastery display
        document.addEventListener('questionAnswered', () => {
            setTimeout(() => this.updateMasteryDisplay(), 100);
        });

        // Listen for quiz completion to update display
        document.addEventListener('quizCompleted', () => {
            setTimeout(() => this.updateMasteryDisplay(), 100);
        });
    },

    // Get recommendations for topics to focus on
    getRecommendations: function() {
        const stats = QuizStorage.getStatistics();
        const topicStats = this.calculateTopicMastery(stats);
        
        const recommendations = [];
        
        for (const [topic, data] of Object.entries(topicStats)) {
            if (data.level === 'low' && data.attempted >= 3) {
                recommendations.push({
                    topic: topic,
                    reason: `${data.percentage}% accuracy - needs practice`,
                    priority: 'high'
                });
            } else if (data.level === 'medium' && data.attempted >= 5) {
                recommendations.push({
                    topic: topic,
                    reason: `${data.percentage}% accuracy - close to mastery`,
                    priority: 'medium'
                });
            }
        }

        return recommendations.sort((a, b) => {
            const priority = { 'high': 3, 'medium': 2, 'low': 1 };
            return priority[b.priority] - priority[a.priority];
        });
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => TopicMastery.init());
} else {
    TopicMastery.init();
}