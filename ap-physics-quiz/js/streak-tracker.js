/**
 * Streak Tracking and Motivation System
 * Handles correct answer streaks and personal best tracking
 */

window.StreakTracker = {
    // Initialize the streak tracking system
    init: function () {
        this.updateStreakDisplay();
        this.setupEventListeners();
    },

    // Update the streak display
    updateStreakDisplay: function () {
        try {
            const stats = QuizStorage.getStatistics();
            const streaks = stats.streaks || { current: 0, best: 0 };

            this.renderStreakCounter(streaks);

            // Show streak display if there's any streak activity
            const streakDisplay = document.getElementById('streak-display');
            if (streakDisplay && (streaks.current > 0 || streaks.best > 0)) {
                streakDisplay.style.display = 'block';
            }
        } catch (error) {
            Utils.handleError(error, 'StreakTracker.updateStreakDisplay', 'warning');
        }
    },

    // Render the streak counter
    renderStreakCounter: function (streaks) {
        const currentElement = document.getElementById('current-streak');
        const personalBestElement = document.getElementById('personal-best');

        if (currentElement) {
            currentElement.textContent = streaks.current;

            // Add visual effects for milestones
            this.addStreakEffects(currentElement, streaks.current);
        }

        if (personalBestElement) {
            personalBestElement.textContent = `Best: ${streaks.best}`;

            // Highlight when personal best is achieved
            if (streaks.current > 0 && streaks.current === streaks.best) {
                personalBestElement.style.color = 'var(--gr)';
                personalBestElement.style.fontWeight = 'bold';
            } else {
                personalBestElement.style.color = 'var(--tx-3)';
                personalBestElement.style.fontWeight = 'normal';
            }
        }
    },

    // Add visual effects for streak milestones
    addStreakEffects: function (element, streak) {
        // Remove existing classes
        element.classList.remove('streak-fire', 'streak-hot', 'streak-blazing');

        if (streak >= 10) {
            element.classList.add('streak-blazing');
            element.style.color = 'var(--re)';
        } else if (streak >= 5) {
            element.classList.add('streak-hot');
            element.style.color = 'var(--or)';
        } else if (streak >= 3) {
            element.classList.add('streak-fire');
            element.style.color = 'var(--ye)';
        } else if (streak > 0) {
            element.style.color = 'var(--gr)';
        } else {
            element.style.color = 'var(--tx-2)';
        }
    },

    // Handle correct answer (increment streak)
    onCorrectAnswer: function () {
        const stats = QuizStorage.getStatistics();
        const streaks = stats.streaks || { current: 0, best: 0 };

        streaks.current++;

        // Update personal best if needed
        if (streaks.current > streaks.best) {
            streaks.best = streaks.current;
            this.showPersonalBestAchievement(streaks.best);
        }

        // Show milestone achievements
        this.checkMilestoneAchievements(streaks.current);

        // Update statistics
        QuizStorage.updateStatistics({
            ...stats,
            streaks: streaks
        });

        this.updateStreakDisplay();

        // Dispatch streak event for other components
        document.dispatchEvent(new CustomEvent('streakUpdated', {
            detail: { current: streaks.current, best: streaks.best }
        }));
    },

    // Handle incorrect answer (reset streak)
    onIncorrectAnswer: function () {
        const stats = QuizStorage.getStatistics();
        const streaks = stats.streaks || { current: 0, best: 0 };

        const previousStreak = streaks.current;
        streaks.current = 0;

        // Update statistics
        QuizStorage.updateStatistics({
            ...stats,
            streaks: streaks
        });

        this.updateStreakDisplay();

        // Show encouragement if had a good streak
        if (previousStreak >= 3) {
            this.showEncouragementMessage(previousStreak);
        }

        // Dispatch streak reset event
        document.dispatchEvent(new CustomEvent('streakReset', {
            detail: { previousStreak: previousStreak, best: streaks.best }
        }));
    },

    // Check for milestone achievements
    checkMilestoneAchievements: function (streak) {
        const milestones = [3, 5, 10, 15, 20, 25, 50];

        if (milestones.includes(streak)) {
            this.showMilestoneAchievement(streak);
        }
    },

    // Show milestone achievement
    showMilestoneAchievement: function (streak) {
        const messages = {
            3: { icon: '🔥', text: 'On Fire!', subtext: '3 in a row!' },
            5: { icon: '⚡', text: 'Hot Streak!', subtext: '5 correct answers!' },
            10: { icon: '🚀', text: 'Unstoppable!', subtext: '10 question streak!' },
            15: { icon: '🎯', text: 'Sharpshooter!', subtext: '15 perfect answers!' },
            20: { icon: '🏆', text: 'Physics Master!', subtext: '20 question streak!' },
            25: { icon: '🌟', text: 'Legendary!', subtext: '25 in a row!' },
            50: { icon: '👑', text: 'Physics Genius!', subtext: 'Incredible 50 streak!' }
        };

        const achievement = messages[streak];
        if (achievement) {
            this.showAchievementModal(achievement);
        }
    },

    // Show personal best achievement
    showPersonalBestAchievement: function (best) {
        this.showAchievementModal({
            icon: '🏅',
            text: 'New Personal Best!',
            subtext: `${best} correct answers in a row!`
        });
    },

    // Show encouragement message when streak is broken
    showEncouragementMessage: function (streak) {
        const messages = [
            `Great ${streak}-question streak! Keep it up!`,
            `You had ${streak} in a row - you're getting stronger!`,
            `${streak} correct answers shows you're learning well!`,
            `Don't worry about the streak - ${streak} in a row is impressive!`
        ];

        const message = messages[Math.floor(Math.random() * messages.length)];
        this.showMotivationalMessage(message);
    },

    // Show achievement modal
    showAchievementModal: function (achievement) {
        // Create temporary achievement display
        const modal = document.createElement('div');
        modal.className = 'achievement-modal';
        modal.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">${achievement.text}</div>
                <div class="achievement-subtext">${achievement.subtext}</div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => modal.classList.add('show'), 10);

        // Remove after delay
        setTimeout(() => {
            modal.classList.remove('show');
            setTimeout(() => document.body.removeChild(modal), 300);
        }, 3000);
    },

    // Show motivational message
    showMotivationalMessage: function (message) {
        // Use existing feedback system if available
        if (typeof QuizUI !== 'undefined' && QuizUI.showFeedback) {
            QuizUI.showFeedback(message, 'info');
        } else {
            console.log('Motivational message:', message);
        }
    },

    // Setup event listeners
    setupEventListeners: function () {
        // Listen for question answered events
        document.addEventListener('questionAnswered', (event) => {
            if (event.detail && event.detail.isCorrect !== undefined) {
                if (event.detail.isCorrect) {
                    this.onCorrectAnswer();
                } else {
                    this.onIncorrectAnswer();
                }
            }
        });

        // Listen for quiz reset
        document.addEventListener('quizReset', () => {
            // Optionally reset streak on quiz reset
            // this.resetStreak();
        });
    },

    // Reset streak (for new quiz sessions)
    resetStreak: function () {
        const stats = QuizStorage.getStatistics();
        stats.streaks = { current: 0, best: stats.streaks?.best || 0 };

        QuizStorage.updateStatistics(stats);
        this.updateStreakDisplay();
    },

    // Get current streak stats
    getStats: function () {
        const stats = QuizStorage.getStatistics();
        return stats.streaks || { current: 0, best: 0 };
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => StreakTracker.init());
} else {
    StreakTracker.init();
}