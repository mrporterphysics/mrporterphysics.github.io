/**
 * Achievement Badge and Gamification System
 * Provides motivation through badges, levels, and progress tracking
 */

const AchievementSystem = {
    // Achievement definitions
    achievements: {
        // Learning Milestones
        'first_correct': {
            id: 'first_correct',
            title: 'First Success!',
            description: 'Answer your first question correctly',
            icon: '🎯',
            type: 'milestone',
            condition: (stats) => stats.correctAnswers >= 1,
            points: 10
        },
        'ten_correct': {
            id: 'ten_correct',
            title: 'Getting the Hang of It',
            description: 'Answer 10 questions correctly',
            icon: '📈',
            type: 'milestone',
            condition: (stats) => stats.correctAnswers >= 10,
            points: 25
        },
        'hundred_correct': {
            id: 'hundred_correct',
            title: 'Century Club',
            description: 'Answer 100 questions correctly',
            icon: '💯',
            type: 'milestone',
            condition: (stats) => stats.correctAnswers >= 100,
            points: 100
        },

        // Accuracy Achievements
        'perfectionist': {
            id: 'perfectionist',
            title: 'Perfectionist',
            description: 'Achieve 100% accuracy on 10+ questions',
            icon: '⭐',
            type: 'accuracy',
            condition: (stats) => stats.totalQuestions >= 10 && (stats.correctAnswers / stats.totalQuestions) === 1.0,
            points: 50
        },
        'sharp_shooter': {
            id: 'sharp_shooter',
            title: 'Sharp Shooter',
            description: 'Maintain 90%+ accuracy over 25+ questions',
            icon: '🎯',
            type: 'accuracy',
            condition: (stats) => stats.totalQuestions >= 25 && (stats.correctAnswers / stats.totalQuestions) >= 0.9,
            points: 75
        },

        // Streak Achievements
        'streak_5': {
            id: 'streak_5',
            title: 'Hot Streak',
            description: 'Get 5 questions correct in a row',
            icon: '🔥',
            type: 'streak',
            condition: (stats) => stats.streaks && stats.streaks.best >= 5,
            points: 30
        },
        'streak_10': {
            id: 'streak_10',
            title: 'On Fire!',
            description: 'Get 10 questions correct in a row',
            icon: '🚀',
            type: 'streak',
            condition: (stats) => stats.streaks && stats.streaks.best >= 10,
            points: 60
        },
        'streak_20': {
            id: 'streak_20',
            title: 'Unstoppable Force',
            description: 'Get 20 questions correct in a row',
            icon: '⚡',
            type: 'streak',
            condition: (stats) => stats.streaks && stats.streaks.best >= 20,
            points: 120
        },

        // Topic Mastery
        'kinematics_master': {
            id: 'kinematics_master',
            title: 'Motion Master',
            description: 'Achieve 85%+ accuracy in Kinematics (15+ questions)',
            icon: '🚀',
            type: 'topic_mastery',
            condition: (stats) => this.checkTopicMastery(stats, 'kinematics', 0.85, 15),
            points: 80
        },
        'forces_master': {
            id: 'forces_master',
            title: 'Force Expert',
            description: 'Achieve 85%+ accuracy in Forces (15+ questions)',
            icon: '⚡',
            type: 'topic_mastery',
            condition: (stats) => this.checkTopicMastery(stats, 'forces', 0.85, 15),
            points: 80
        },
        'energy_master': {
            id: 'energy_master',
            title: 'Energy Guru',
            description: 'Achieve 85%+ accuracy in Energy (15+ questions)',
            icon: '🔋',
            type: 'topic_mastery',
            condition: (stats) => this.checkTopicMastery(stats, 'energy', 0.85, 15),
            points: 80
        },

        // Study Habits
        'dedicated_learner': {
            id: 'dedicated_learner',
            title: 'Dedicated Learner',
            description: 'Study for 3 consecutive days',
            icon: '📚',
            type: 'habit',
            condition: (stats) => this.checkConsecutiveDays(3),
            points: 50
        },
        'study_guide_explorer': {
            id: 'study_guide_explorer',
            title: 'Guide Explorer',
            description: 'View 5 different study guides',
            icon: '🗺️',
            type: 'exploration',
            condition: (stats) => this.checkStudyGuideUsage(5),
            points: 40
        },
        'rapid_fire_champion': {
            id: 'rapid_fire_champion',
            title: 'Speed Demon',
            description: 'Complete a Rapid Fire round with 80%+ accuracy',
            icon: '⚡',
            type: 'mode_mastery',
            condition: (stats) => this.checkRapidFirePerformance(0.8),
            points: 60
        },

        // Special Achievements
        'fact_sheet_fan': {
            id: 'fact_sheet_fan',
            title: 'Reference Master',
            description: 'Use fact sheet references 25 times',
            icon: '📋',
            type: 'engagement',
            condition: (stats) => this.checkFactSheetUsage(25),
            points: 45
        },
        'hint_graduate': {
            id: 'hint_graduate',
            title: 'Independent Learner',
            description: 'Answer correctly without hints 50 times',
            icon: '🎓',
            type: 'independence',
            condition: (stats) => this.checkHintlessCorrect(50),
            points: 70
        }
    },

    // User progress data
    userProgress: {
        level: 1,
        totalPoints: 0,
        unlockedAchievements: [],
        recentAchievements: [],
        studyStreak: 0,
        lastStudyDate: null
    },

    // Level thresholds
    levelThresholds: [0, 100, 250, 500, 750, 1200, 1800, 2500, 3500, 5000, 7500],

    // Initialize achievement system
    init: function() {
        this.loadUserProgress();
        this.setupEventListeners();
        this.addAchievementDisplay();
        this.checkForNewAchievements();
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Listen for question answers to update progress
        document.addEventListener('questionAnswered', (event) => {
            this.checkForNewAchievements();
            this.updateLevel();
        });

        // Listen for various activities
        document.addEventListener('studyGuideViewed', () => {
            this.checkForNewAchievements();
        });

        document.addEventListener('rapidFireCompleted', () => {
            this.checkForNewAchievements();
        });
    },

    // Add achievement display to UI
    addAchievementDisplay: function() {
        const header = document.querySelector('header');
        if (header && !document.getElementById('achievement-display')) {
            const achievementDisplay = document.createElement('div');
            achievementDisplay.id = 'achievement-display';
            achievementDisplay.className = 'achievement-display';
            
            const level = this.userProgress.level;
            const points = this.userProgress.totalPoints;
            const nextLevelPoints = this.levelThresholds[level] || this.levelThresholds[this.levelThresholds.length - 1];
            const progress = ((points - (this.levelThresholds[level - 1] || 0)) / 
                            (nextLevelPoints - (this.levelThresholds[level - 1] || 0))) * 100;

            achievementDisplay.innerHTML = `
                <div class="level-display" onclick="AchievementSystem.showAchievementModal()">
                    <div class="level-info">
                        <span class="level-text">Level ${level}</span>
                        <span class="points-text">${points} pts</span>
                    </div>
                    <div class="level-progress">
                        <div class="level-progress-fill" style="width: ${Math.min(100, progress)}%"></div>
                    </div>
                </div>
                <div class="recent-badges" id="recent-badges">
                    ${this.userProgress.recentAchievements.slice(0, 3).map(id => 
                        `<span class="mini-badge" title="${this.achievements[id].title}">${this.achievements[id].icon}</span>`
                    ).join('')}
                </div>
            `;
            
            header.appendChild(achievementDisplay);
        }
    },

    // Check for new achievements
    checkForNewAchievements: function() {
        const stats = QuizStorage.getStatistics();
        const newAchievements = [];

        Object.values(this.achievements).forEach(achievement => {
            if (!this.userProgress.unlockedAchievements.includes(achievement.id)) {
                if (achievement.condition(stats)) {
                    newAchievements.push(achievement);
                    this.unlockAchievement(achievement);
                }
            }
        });

        if (newAchievements.length > 0) {
            this.showAchievementUnlocked(newAchievements);
        }
    },

    // Unlock an achievement
    unlockAchievement: function(achievement) {
        this.userProgress.unlockedAchievements.push(achievement.id);
        this.userProgress.recentAchievements.unshift(achievement.id);
        this.userProgress.recentAchievements = this.userProgress.recentAchievements.slice(0, 10);
        this.userProgress.totalPoints += achievement.points;
        
        this.saveUserProgress();
        this.updateLevel();
    },

    // Update user level based on points
    updateLevel: function() {
        const oldLevel = this.userProgress.level;
        let newLevel = 1;
        
        for (let i = 0; i < this.levelThresholds.length; i++) {
            if (this.userProgress.totalPoints >= this.levelThresholds[i]) {
                newLevel = i + 1;
            }
        }
        
        this.userProgress.level = newLevel;
        
        if (newLevel > oldLevel) {
            this.showLevelUp(newLevel);
        }
        
        this.updateAchievementDisplay();
        this.saveUserProgress();
    },

    // Show achievement unlocked notification
    showAchievementUnlocked: function(achievements) {
        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                const notification = document.createElement('div');
                notification.className = 'achievement-notification';
                notification.innerHTML = `
                    <div class="achievement-content">
                        <div class="achievement-icon">${achievement.icon}</div>
                        <div class="achievement-info">
                            <div class="achievement-title">Achievement Unlocked!</div>
                            <div class="achievement-name">${achievement.title}</div>
                            <div class="achievement-desc">${achievement.description}</div>
                            <div class="achievement-points">+${achievement.points} points</div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                // Animate in
                setTimeout(() => notification.classList.add('show'), 100);
                
                // Auto remove after 5 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        if (notification.parentNode) {
                            document.body.removeChild(notification);
                        }
                    }, 300);
                }, 5000);
                
            }, index * 1000); // Stagger multiple achievements
        });
    },

    // Show level up notification
    showLevelUp: function(newLevel) {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-content">
                <div class="level-up-icon">🎉</div>
                <div class="level-up-text">
                    <div class="level-up-title">Level Up!</div>
                    <div class="level-up-level">You are now Level ${newLevel}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    },

    // Show achievement modal
    showAchievementModal: function() {
        const modal = document.createElement('div');
        modal.className = 'achievement-modal';
        
        const unlockedCount = this.userProgress.unlockedAchievements.length;
        const totalCount = Object.keys(this.achievements).length;
        const completionPercentage = Math.round((unlockedCount / totalCount) * 100);
        
        modal.innerHTML = `
            <div class="achievement-panel">
                <div class="panel-header">
                    <h3>🏆 Achievements</h3>
                    <div class="achievement-stats">
                        <div class="stat">Level ${this.userProgress.level}</div>
                        <div class="stat">${this.userProgress.totalPoints} Points</div>
                        <div class="stat">${unlockedCount}/${totalCount} Unlocked (${completionPercentage}%)</div>
                    </div>
                    <button class="close-modal">×</button>
                </div>
                
                <div class="achievement-categories">
                    ${this.renderAchievementCategories()}
                </div>
                
                <div class="panel-footer">
                    <p class="achievement-tip">
                        💡 Keep practicing to unlock more achievements and level up!
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event handlers
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    },

    // Render achievement categories
    renderAchievementCategories: function() {
        const categories = {
            'milestone': { name: '📈 Milestones', achievements: [] },
            'accuracy': { name: '🎯 Accuracy', achievements: [] },
            'streak': { name: '🔥 Streaks', achievements: [] },
            'topic_mastery': { name: '🧠 Topic Mastery', achievements: [] },
            'habit': { name: '📚 Study Habits', achievements: [] },
            'mode_mastery': { name: '⚡ Mode Mastery', achievements: [] },
            'exploration': { name: '🗺️ Exploration', achievements: [] },
            'engagement': { name: '💡 Engagement', achievements: [] },
            'independence': { name: '🎓 Independence', achievements: [] }
        };

        // Group achievements by category
        Object.values(this.achievements).forEach(achievement => {
            if (categories[achievement.type]) {
                categories[achievement.type].achievements.push(achievement);
            }
        });

        return Object.entries(categories)
            .filter(([_, category]) => category.achievements.length > 0)
            .map(([type, category]) => `
                <div class="achievement-category">
                    <h4>${category.name}</h4>
                    <div class="achievement-grid">
                        ${category.achievements.map(achievement => {
                            const unlocked = this.userProgress.unlockedAchievements.includes(achievement.id);
                            return `
                                <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
                                    <div class="achievement-icon">${achievement.icon}</div>
                                    <div class="achievement-title">${achievement.title}</div>
                                    <div class="achievement-description">${achievement.description}</div>
                                    <div class="achievement-points">${achievement.points} pts</div>
                                    ${unlocked ? '<div class="unlock-check">✓</div>' : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `).join('');
    },

    // Update achievement display in header
    updateAchievementDisplay: function() {
        const display = document.getElementById('achievement-display');
        if (display) {
            const level = this.userProgress.level;
            const points = this.userProgress.totalPoints;
            const nextLevelPoints = this.levelThresholds[level] || this.levelThresholds[this.levelThresholds.length - 1];
            const progress = ((points - (this.levelThresholds[level - 1] || 0)) / 
                            (nextLevelPoints - (this.levelThresholds[level - 1] || 0))) * 100;

            const levelInfo = display.querySelector('.level-info');
            const progressFill = display.querySelector('.level-progress-fill');
            const recentBadges = display.querySelector('#recent-badges');

            if (levelInfo) {
                levelInfo.innerHTML = `
                    <span class="level-text">Level ${level}</span>
                    <span class="points-text">${points} pts</span>
                `;
            }

            if (progressFill) {
                progressFill.style.width = `${Math.min(100, progress)}%`;
            }

            if (recentBadges) {
                recentBadges.innerHTML = this.userProgress.recentAchievements.slice(0, 3).map(id => 
                    `<span class="mini-badge" title="${this.achievements[id].title}">${this.achievements[id].icon}</span>`
                ).join('');
            }
        }
    },

    // Helper functions for achievement conditions
    checkTopicMastery: function(stats, topic, threshold, minQuestions) {
        const topicStats = stats.topicStats && stats.topicStats[topic];
        if (!topicStats || topicStats.total < minQuestions) return false;
        return (topicStats.correct / topicStats.total) >= threshold;
    },

    checkConsecutiveDays: function(days) {
        // This would require more sophisticated date tracking
        // For now, return based on total study time
        const stats = QuizStorage.getStatistics();
        return stats.totalQuestions >= days * 10; // Approximate
    },

    checkStudyGuideUsage: function(count) {
        const guideStats = Utils.storage.get('study_guide_stats', { totalGuideViews: 0 });
        return guideStats.totalGuideViews >= count;
    },

    checkRapidFirePerformance: function(accuracy) {
        const rfStats = Utils.storage.get('rapid_fire_stats', { recentScores: [] });
        return rfStats.recentScores.some(score => score.accuracy >= accuracy * 100);
    },

    checkFactSheetUsage: function(count) {
        // This would integrate with fact sheet usage tracking
        return false; // Placeholder
    },

    checkHintlessCorrect: function(count) {
        // This would require tracking questions answered without hints
        return false; // Placeholder
    },

    // Storage management
    loadUserProgress: function() {
        const saved = Utils.storage.get('achievement_progress', {});
        this.userProgress = {
            level: saved.level || 1,
            totalPoints: saved.totalPoints || 0,
            unlockedAchievements: saved.unlockedAchievements || [],
            recentAchievements: saved.recentAchievements || [],
            studyStreak: saved.studyStreak || 0,
            lastStudyDate: saved.lastStudyDate || null
        };
    },

    saveUserProgress: function() {
        Utils.storage.set('achievement_progress', this.userProgress);
    },

    // Get achievement statistics
    getAchievementStats: function() {
        const unlocked = this.userProgress.unlockedAchievements.length;
        const total = Object.keys(this.achievements).length;
        
        return {
            level: this.userProgress.level,
            totalPoints: this.userProgress.totalPoints,
            unlockedCount: unlocked,
            totalAchievements: total,
            completionPercentage: Math.round((unlocked / total) * 100),
            recentAchievements: this.userProgress.recentAchievements.slice(0, 5)
        };
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AchievementSystem.init());
} else {
    AchievementSystem.init();
}