/**
 * Spaced Repetition System (SRS) for Equation Flashcards
 * Implements SM-2 algorithm for intelligent scheduling
 * Adapted from AP Physics Quiz spaced-repetition.js
 */

const FlashcardSRS = {
    // Minimum ease factor
    minEase: 1.3,
    defaultEase: 2.5,

    currentEquation: null,
    dueEquations: [],
    sessionStartTime: null,
    cardStartTime: null,

    // Initialize SRS mode
    init: function() {
        console.log('🧠 Initializing Spaced Repetition Mode...');

        this.sessionStartTime = Date.now();

        // Get equations due for review
        this.dueEquations = this.getEquationsForReview();

        if (this.dueEquations.length === 0) {
            console.log('✨ No equations due for review');
            this.showNoReviewsMessage();
            return false;
        }

        // Set up event listeners
        this.setupEventListeners();

        // Load first card
        this.loadNextCard();

        // Show rating buttons
        FlashcardUI.showRatingButtons();

        console.log(`✅ SRS mode initialized with ${this.dueEquations.length} cards`);
        return true;
    },

    // Set up event listeners
    setupEventListeners: function() {
        document.addEventListener('ratingSelected', (e) => this.handleRating(e.detail.rating));
        document.addEventListener('requestNextCard', () => this.loadNextCard());
        document.addEventListener('requestRestart', () => this.restart());
    },

    // Get equations due for review
    getEquationsForReview: function(maxEquations = 50) {
        const srsData = FlashcardStorage.getSRSData();
        const allEquations = FlashcardData.getFilteredEquations();
        const now = Date.now();
        const dueEquations = [];

        allEquations.forEach(equation => {
            const equationSRS = srsData[equation.id];

            if (!equationSRS) {
                // New equation - add to review
                dueEquations.push({
                    id: equation.id,
                    priority: 100, // New cards get high priority
                    data: null
                });
            } else if (equationSRS.nextReview <= now) {
                // Due for review
                dueEquations.push({
                    id: equation.id,
                    priority: this.calculatePriority(equationSRS, now),
                    data: equationSRS
                });
            }
        });

        // Sort by priority (higher priority first)
        dueEquations.sort((a, b) => b.priority - a.priority);

        // Return IDs only
        return dueEquations.slice(0, maxEquations).map(eq => eq.id);
    },

    // Calculate review priority
    calculatePriority: function(srsData, now) {
        const daysSinceLastReview = (now - srsData.lastReviewed) / (24 * 60 * 60 * 1000);
        const daysOverdue = (now - srsData.nextReview) / (24 * 60 * 60 * 1000);

        // Priority factors:
        // 1. Overdue cards get higher priority
        let priority = Math.max(0, daysOverdue) * 10;

        // 2. Struggling cards get higher priority
        if (srsData.difficulty === 'struggling') priority += 50;
        if (srsData.difficulty === 'learning') priority += 20;

        // 3. Cards with low accuracy get higher priority
        const accuracy = srsData.correctReviews / srsData.totalReviews;
        if (accuracy < 0.5) priority += 30;

        return priority;
    },

    // Load next card
    loadNextCard: function() {
        if (this.dueEquations.length === 0) {
            this.showCompletion();
            return false;
        }

        const equationId = this.dueEquations[0];
        const equation = FlashcardData.getEquationById(equationId);

        if (!equation) {
            console.error(`❌ Equation not found: ${equationId}`);
            this.dueEquations.shift(); // Remove invalid equation
            return this.loadNextCard(); // Try next
        }

        this.currentEquation = equation;
        this.cardStartTime = Date.now();

        // Display card
        FlashcardUI.displayCard(equation, {
            index: 0, // Don't show specific index in SRS mode
            total: this.dueEquations.length
        });

        console.log(`📇 Loaded card: ${equation.name} (${this.dueEquations.length} remaining)`);
        return true;
    },

    // Handle difficulty rating
    handleRating: function(rating) {
        if (!this.currentEquation) return;

        const timeSpent = Date.now() - this.cardStartTime;

        // Update SRS data
        this.updateEquationSRS(this.currentEquation.id, rating, timeSpent);

        // Remove from due list
        this.dueEquations.shift();

        // Announce
        Utils.announceToScreenReader(`Rated as ${this.getRatingName(rating)}`, 'polite');

        // Load next card
        setTimeout(() => this.loadNextCard(), 500);
    },

    // Update equation SRS data
    updateEquationSRS: function(equationId, rating, timeSpent) {
        const srsData = FlashcardStorage.getSRSData();

        if (!srsData[equationId]) {
            // Initialize new equation
            srsData[equationId] = {
                interval: 0,
                ease: this.defaultEase,
                repetitions: 0,
                lastReviewed: Date.now(),
                nextReview: Date.now(),
                totalReviews: 0,
                correctReviews: 0,
                averageTime: 0,
                difficulty: 'new'
            };
        }

        const eq = srsData[equationId];

        // Update statistics
        eq.totalReviews++;
        eq.averageTime = ((eq.averageTime * (eq.totalReviews - 1)) + timeSpent) / eq.totalReviews;
        eq.lastReviewed = Date.now();

        // SM-2 algorithm with rating 1-5
        // Rating 3+ is considered "correct"
        const quality = rating;

        if (quality >= 3) {
            // Correct response
            eq.correctReviews++;

            // Calculate new interval
            if (eq.repetitions === 0) {
                eq.interval = 1;
            } else if (eq.repetitions === 1) {
                eq.interval = 6;
            } else {
                eq.interval = Math.round(eq.interval * eq.ease);
            }

            eq.repetitions++;

            // Adjust ease factor based on quality
            // Formula: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
            const easeChange = 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
            eq.ease = Math.max(this.minEase, eq.ease + easeChange);

        } else {
            // Incorrect/difficult response
            eq.repetitions = 0;
            eq.interval = 1;
            eq.ease = Math.max(this.minEase, eq.ease - 0.2);
        }

        // Calculate next review date
        eq.nextReview = Date.now() + (eq.interval * 24 * 60 * 60 * 1000);

        // Update difficulty classification
        eq.difficulty = this.classifyDifficulty(eq);

        // Save
        FlashcardStorage.saveSRSData(srsData);

        console.log(`💾 Updated SRS for ${equationId}: interval=${eq.interval}, ease=${eq.ease.toFixed(2)}, difficulty=${eq.difficulty}`);

        // Update statistics
        this.updateStatistics(equationId, quality >= 3);
    },

    // Classify equation difficulty
    classifyDifficulty: function(srsData) {
        if (srsData.totalReviews === 0) return 'new';

        const accuracy = srsData.correctReviews / srsData.totalReviews;
        const reps = srsData.repetitions;

        if (accuracy < 0.5) return 'struggling';
        if (accuracy >= 0.9 && reps >= 4) return 'mastered';
        if (accuracy >= 0.7 && reps >= 2) return 'familiar';
        return 'learning';
    },

    // Get rating name for announcement
    getRatingName: function(rating) {
        const names = {
            1: 'very easy',
            2: 'easy',
            3: 'medium',
            4: 'hard',
            5: 'very hard'
        };
        return names[rating] || 'medium';
    },

    // Update statistics
    updateStatistics: function(equationId, isCorrect) {
        const stats = FlashcardStorage.getStatistics();

        stats.totalReviews = (stats.totalReviews || 0) + 1;
        stats.lastSessionDate = Date.now();

        // Update category stats
        const equation = FlashcardData.getEquationById(equationId);
        if (equation) {
            const category = equation.category;
            if (!stats.categoryStats[category]) {
                stats.categoryStats[category] = { reviewed: 0, mastered: 0 };
            }
            stats.categoryStats[category].reviewed++;
        }

        // Update mastery levels
        const srsData = FlashcardStorage.getSRSData();
        stats.masteryLevels = this.calculateMasteryLevels(srsData);

        FlashcardStorage.saveStatistics(stats);
    },

    // Calculate mastery levels
    calculateMasteryLevels: function(srsData) {
        const levels = {
            new: 0,
            learning: 0,
            familiar: 0,
            mastered: 0,
            struggling: 0
        };

        const allEquations = FlashcardData.getAllEquations();

        allEquations.forEach(eq => {
            const data = srsData[eq.id];
            if (!data) {
                levels.new++;
            } else {
                levels[data.difficulty]++;
            }
        });

        return levels;
    },

    // Show completion message
    showCompletion: function() {
        console.log('🎉 SRS review session complete!');

        FlashcardUI.showCompletion();

        // Hide rating buttons
        FlashcardUI.hideRatingButtons();
    },

    // Show no reviews message
    showNoReviewsMessage: function() {
        if (FlashcardUI.elements.cardContainer) {
            FlashcardUI.elements.cardContainer.innerHTML = `
                <div class="no-reviews-message" role="status">
                    <h2>✨ All Caught Up!</h2>
                    <p>You have no equations due for review right now.</p>
                    <p>Come back later to continue your learning.</p>
                    <div class="next-review-info">
                        <p><strong>Next review:</strong> ${this.getNextReviewTime()}</p>
                    </div>
                    <button type="button" id="switch-sequential-btn" class="btn-primary">
                        Switch to Sequential Mode
                    </button>
                </div>
            `;

            const switchBtn = document.getElementById('switch-sequential-btn');
            if (switchBtn) {
                switchBtn.addEventListener('click', () => {
                    document.dispatchEvent(new CustomEvent('switchMode', {
                        detail: { mode: 'sequential' }
                    }));
                });
            }
        }

        Utils.announceToScreenReader('All caught up! No equations due for review.', 'polite');
    },

    // Get next review time
    getNextReviewTime: function() {
        const srsData = FlashcardStorage.getSRSData();
        const now = Date.now();
        let nextReview = Infinity;

        for (const data of Object.values(srsData)) {
            if (data.nextReview > now && data.nextReview < nextReview) {
                nextReview = data.nextReview;
            }
        }

        if (nextReview === Infinity) {
            return 'No scheduled reviews';
        }

        const hours = Math.ceil((nextReview - now) / (60 * 60 * 1000));
        if (hours < 24) {
            return `in ${hours} hour${hours === 1 ? '' : 's'}`;
        } else {
            const days = Math.ceil(hours / 24);
            return `in ${days} day${days === 1 ? '' : 's'}`;
        }
    },

    // Restart session
    restart: function() {
        this.sessionStartTime = Date.now();
        this.dueEquations = this.getEquationsForReview();

        if (this.dueEquations.length === 0) {
            this.showNoReviewsMessage();
        } else {
            this.loadNextCard();
        }

        console.log('🔄 SRS session restarted');
    },

    // Cleanup
    cleanup: function() {
        FlashcardUI.hideRatingButtons();
        console.log('🧹 SRS mode cleaned up');
    }
};

// Make globally available
if (typeof window !== 'undefined') {
    window.FlashcardSRS = FlashcardSRS;
}
