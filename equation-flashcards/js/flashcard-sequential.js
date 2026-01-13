/**
 * Sequential study mode for Equation Flashcards
 * Simple forward/backward navigation through cards
 */

const FlashcardSequential = {
    session: null,
    sessionStartTime: null,

    // Initialize sequential mode
    init: function() {
        console.log('📚 Initializing Sequential Mode...');

        // Load or create session
        this.session = FlashcardStorage.getSession();

        if (!this.session || this.session.mode !== 'sequential') {
            this.createNewSession();
        }

        this.sessionStartTime = Date.now();

        // Set up event listeners
        this.setupEventListeners();

        // Load first card
        this.loadCurrentCard();

        console.log('✅ Sequential mode initialized');
        return true;
    },

    // Create a new session
    createNewSession: function() {
        const allEquations = FlashcardData.getFilteredEquations();
        const shuffled = FlashcardStorage.getSetting('shuffleCards', false);

        if (allEquations.length === 0) {
            console.error('❌ No equations available');
            FlashcardUI.showError('No equations found. Please check your filters.');
            return false;
        }

        const equationIds = allEquations.map(eq => eq.id);

        if (shuffled) {
            Utils.shuffleArray(equationIds, true);
            console.log('🔀 Cards shuffled');
        }

        this.session = {
            mode: 'sequential',
            shuffled: shuffled,
            currentIndex: 0,
            equationIds: equationIds,
            reviewedIds: [],
            sessionStartTime: Date.now(),
            filters: {
                category: FlashcardData.currentFilters.category,
                difficulty: FlashcardData.currentFilters.difficulty
            }
        };

        this.saveSession();

        console.log(`✅ Created new session with ${equationIds.length} cards`);
        return true;
    },

    // Set up event listeners
    setupEventListeners: function() {
        // Navigation requests
        document.addEventListener('requestNextCard', () => this.nextCard());
        document.addEventListener('requestPreviousCard', () => this.previousCard());
        document.addEventListener('requestRestart', () => this.restart());
    },

    // Load current card
    loadCurrentCard: function() {
        if (!this.session || !this.session.equationIds) {
            console.error('❌ No session available');
            return false;
        }

        const equationId = this.session.equationIds[this.session.currentIndex];
        const equation = FlashcardData.getEquationById(equationId);

        if (!equation) {
            console.error(`❌ Equation not found: ${equationId}`);
            return false;
        }

        // Mark as reviewed
        this.markCurrentAsReviewed();

        // Display card
        FlashcardUI.displayCard(equation, {
            index: this.session.currentIndex,
            total: this.session.equationIds.length
        });

        // Update navigation buttons
        this.updateNavigationState();

        // Update statistics
        this.updateStatistics();

        return true;
    },

    // Go to next card
    nextCard: function() {
        if (!this.session) return false;

        if (this.session.currentIndex < this.session.equationIds.length - 1) {
            this.session.currentIndex++;
            this.saveSession();
            this.loadCurrentCard();

            console.log(`➡️ Next card: ${this.session.currentIndex + 1}/${this.session.equationIds.length}`);
            return true;
        } else {
            // Reached end of deck
            this.showCompletion();
            return false;
        }
    },

    // Go to previous card
    previousCard: function() {
        if (!this.session) return false;

        if (this.session.currentIndex > 0) {
            this.session.currentIndex--;
            this.saveSession();
            this.loadCurrentCard();

            console.log(`⬅️ Previous card: ${this.session.currentIndex + 1}/${this.session.equationIds.length}`);
            return true;
        } else {
            Utils.announceToScreenReader('Already at first card', 'polite');
            return false;
        }
    },

    // Jump to specific card
    jumpToCard: function(index) {
        if (!this.session) return false;

        if (index >= 0 && index < this.session.equationIds.length) {
            this.session.currentIndex = index;
            this.saveSession();
            this.loadCurrentCard();

            console.log(`⏭️ Jumped to card ${index + 1}`);
            return true;
        }

        return false;
    },

    // Jump to first card
    jumpToFirst: function() {
        return this.jumpToCard(0);
    },

    // Jump to last card
    jumpToLast: function() {
        return this.jumpToCard(this.session.equationIds.length - 1);
    },

    // Mark current card as reviewed
    markCurrentAsReviewed: function() {
        if (!this.session) return;

        const equationId = this.session.equationIds[this.session.currentIndex];

        if (!this.session.reviewedIds.includes(equationId)) {
            this.session.reviewedIds.push(equationId);
        }
    },

    // Update navigation button states
    updateNavigationState: function() {
        const canGoPrev = this.session.currentIndex > 0;
        const canGoNext = this.session.currentIndex < this.session.equationIds.length - 1;

        FlashcardUI.updateNavigationButtons(canGoPrev, canGoNext);
    },

    // Update statistics
    updateStatistics: function() {
        const stats = FlashcardStorage.getStatistics();

        stats.totalReviews = (stats.totalReviews || 0) + 1;
        stats.sessionCount = (stats.sessionCount || 0) + 1;
        stats.lastSessionDate = Date.now();

        // Calculate time spent
        const timeSpent = Date.now() - this.sessionStartTime;
        stats.totalTimeSpent = (stats.totalTimeSpent || 0) + timeSpent;

        // Update category stats
        const equation = FlashcardData.getEquationById(
            this.session.equationIds[this.session.currentIndex]
        );

        if (equation) {
            const category = equation.category;
            if (!stats.categoryStats[category]) {
                stats.categoryStats[category] = { reviewed: 0, mastered: 0 };
            }
            stats.categoryStats[category].reviewed++;
        }

        FlashcardStorage.saveStatistics(stats);
    },

    // Show completion message
    showCompletion: function() {
        console.log('🎉 Session complete!');

        FlashcardUI.showCompletion();

        // Update streak
        this.updateStreak();

        // Clear session
        FlashcardStorage.clearSession();
    },

    // Update daily streak
    updateStreak: function() {
        const stats = FlashcardStorage.getStatistics();
        const now = Date.now();
        const lastSession = stats.lastSessionDate;

        if (lastSession) {
            const daysSinceLastSession = Math.floor((now - lastSession) / (24 * 60 * 60 * 1000));

            if (daysSinceLastSession === 0) {
                // Same day, keep streak
            } else if (daysSinceLastSession === 1) {
                // Next day, increment streak
                stats.streaks.current++;
            } else {
                // Streak broken, reset
                stats.streaks.current = 1;
            }
        } else {
            // First session
            stats.streaks.current = 1;
        }

        // Update longest streak
        if (stats.streaks.current > stats.streaks.longest) {
            stats.streaks.longest = stats.streaks.current;
        }

        FlashcardStorage.saveStatistics(stats);

        console.log(`🔥 Current streak: ${stats.streaks.current} days`);
    },

    // Restart session
    restart: function() {
        this.createNewSession();
        this.sessionStartTime = Date.now();
        this.loadCurrentCard();

        Utils.announceToScreenReader('Starting new session', 'polite');
        console.log('🔄 Session restarted');
    },

    // Toggle shuffle
    toggleShuffle: function() {
        const current = FlashcardStorage.getSetting('shuffleCards', false);
        const newValue = !current;

        FlashcardStorage.setSetting('shuffleCards', newValue);

        const message = newValue ? 'Shuffle enabled' : 'Shuffle disabled';
        Utils.announceToScreenReader(message, 'polite');
        console.log(`🔀 ${message}`);

        // Ask if user wants to restart with new setting
        if (confirm(`${message}. Would you like to restart the session?`)) {
            this.restart();
        }
    },

    // Get session info
    getSessionInfo: function() {
        if (!this.session) return null;

        return {
            mode: 'sequential',
            current: this.session.currentIndex + 1,
            total: this.session.equationIds.length,
            reviewed: this.session.reviewedIds.length,
            shuffled: this.session.shuffled,
            progress: ((this.session.currentIndex + 1) / this.session.equationIds.length) * 100
        };
    },

    // Save session
    saveSession: function() {
        return FlashcardStorage.saveSession(this.session);
    },

    // Cleanup
    cleanup: function() {
        this.saveSession();
        console.log('🧹 Sequential mode cleaned up');
    }
};

// Make globally available
if (typeof window !== 'undefined') {
    window.FlashcardSequential = FlashcardSequential;
}
