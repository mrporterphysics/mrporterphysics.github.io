/**
 * UI module for Equation Flashcards
 * Handles card rendering, flip animations, and ARIA updates
 */

const FlashcardUI = {
    currentEquation: null,
    currentIndex: 0,
    totalCards: 0,
    isShowingFront: true,
    elements: {},

    // Initialize UI
    init: function() {
        console.log('🎨 Initializing Flashcard UI...');

        // Cache DOM elements
        this.cacheElements();

        // Set up event listeners
        this.setupEventListeners();

        console.log('✅ UI initialized');
        return true;
    },

    // Cache frequently accessed DOM elements
    cacheElements: function() {
        this.elements = {
            // Card container
            cardContainer: document.getElementById('card-container'),
            cardFront: document.getElementById('card-front'),
            cardBack: document.getElementById('card-back'),

            // Card content
            equationName: document.getElementById('equation-name'),
            equationFormula: document.getElementById('equation-formula'),
            equationVariables: document.getElementById('equation-variables'),
            equationCategory: document.getElementById('equation-category'),
            equationNotes: document.getElementById('equation-notes'),

            // Controls
            flipButton: document.getElementById('flip-card-btn'),
            playButton: document.getElementById('play-audio-btn'),
            nextButton: document.getElementById('next-card-btn'),
            prevButton: document.getElementById('prev-card-btn'),

            // Progress
            progressText: document.getElementById('progress-text'),
            progressBar: document.getElementById('progress-bar'),
            progressFill: document.getElementById('progress-fill'),

            // ARIA live regions
            cardAnnouncer: document.getElementById('card-announcer'),
            progressAnnouncer: document.getElementById('progress-announcer'),
            audioAnnouncer: document.getElementById('audio-announcer')
        };
    },

    // Set up event listeners
    setupEventListeners: function() {
        // Flip button
        if (this.elements.flipButton) {
            this.elements.flipButton.addEventListener('click', () => this.flipCard());
        }

        // Play audio button
        if (this.elements.playButton) {
            this.elements.playButton.addEventListener('click', () => this.playAudio());
        }

        // Navigation buttons
        if (this.elements.nextButton) {
            this.elements.nextButton.addEventListener('click', () => this.nextCard());
        }

        if (this.elements.prevButton) {
            this.elements.prevButton.addEventListener('click', () => this.previousCard());
        }

        // Listen for custom events
        document.addEventListener('cardChanged', (e) => this.handleCardChanged(e));
        document.addEventListener('audioStateChanged', (e) => this.handleAudioStateChanged(e));
    },

    // Display a card
    displayCard: function(equation, options = {}) {
        if (!equation) {
            console.error('❌ No equation to display');
            return false;
        }

        this.currentEquation = equation;
        this.currentIndex = options.index || 0;
        this.totalCards = options.total || FlashcardData.getEquationCount();

        // Reset to front side
        this.isShowingFront = true;

        // Update card content
        this.updateCardContent();

        // Update progress
        this.updateProgress();

        // Announce to screen reader
        this.announceCard();

        // Auto-play audio if enabled
        if (FlashcardStorage.getSetting('autoRead', true)) {
            setTimeout(() => this.playAudio(), 500);
        }

        console.log(`📇 Displaying card ${this.currentIndex + 1}/${this.totalCards}: ${equation.name}`);
        return true;
    },

    // Update card content
    updateCardContent: function() {
        const eq = this.currentEquation;

        // Front side - equation name
        if (this.elements.equationName) {
            this.elements.equationName.textContent = eq.name;
        }

        if (this.elements.equationCategory) {
            this.elements.equationCategory.textContent = this.capitalizeCategory(eq.category);
        }

        // Back side - full details
        if (this.elements.equationFormula) {
            this.elements.equationFormula.textContent = eq.equation;
        }

        if (this.elements.equationVariables) {
            const variables = FlashcardData.parseVariables(eq.variables);
            this.elements.equationVariables.innerHTML = this.renderVariables(variables);
        }

        if (this.elements.equationNotes && eq.notes) {
            this.elements.equationNotes.textContent = eq.notes;
            this.elements.equationNotes.style.display = eq.notes ? 'block' : 'none';
        }

        // Show front, hide back initially
        this.showSide('front');
    },

    // Render variables as list
    renderVariables: function(variables) {
        if (!variables || variables.length === 0) return '';

        const items = variables.map(v => {
            const sanitizedSymbol = Utils.sanitizeString(v.symbol);
            const sanitizedDef = Utils.sanitizeString(v.definition);
            return `<li><strong>${sanitizedSymbol}</strong>: ${sanitizedDef}</li>`;
        }).join('');

        return `<ul class="variables-list" role="list">${items}</ul>`;
    },

    // Flip card between front and back
    flipCard: function() {
        this.isShowingFront = !this.isShowingFront;

        const side = this.isShowingFront ? 'front' : 'back';
        this.showSide(side);

        // Announce flip
        const announcement = this.isShowingFront
            ? `Showing equation name: ${this.currentEquation.name}`
            : `Showing equation details: ${this.currentEquation.equation}`;
        this.announce(announcement, 'polite');

        // Auto-play audio if enabled
        if (FlashcardStorage.getSetting('autoRead', true)) {
            setTimeout(() => this.playAudio(), 300);
        }

        // Dispatch event
        document.dispatchEvent(new CustomEvent('cardFlipped', {
            detail: { side, equation: this.currentEquation }
        }));

        console.log(`🔄 Flipped to ${side} side`);
    },

    // Show specific side of card
    showSide: function(side) {
        if (!this.elements.cardContainer) return;

        if (side === 'front') {
            this.elements.cardFront.setAttribute('aria-hidden', 'false');
            this.elements.cardBack.setAttribute('aria-hidden', 'true');
            this.elements.cardContainer.classList.remove('show-back');
            this.elements.cardContainer.classList.add('show-front');
        } else {
            this.elements.cardFront.setAttribute('aria-hidden', 'true');
            this.elements.cardBack.setAttribute('aria-hidden', 'false');
            this.elements.cardContainer.classList.remove('show-front');
            this.elements.cardContainer.classList.add('show-back');
        }
    },

    // Play audio for current side
    playAudio: function() {
        if (!this.currentEquation) return;

        const side = this.isShowingFront ? 'front' : 'back';
        console.log(`🔊 Playing audio for ${side} side (isShowingFront: ${this.isShowingFront})`);
        console.log(`   Front text would be: "${this.currentEquation.name}"`);
        console.log(`   Back text would be: "${this.currentEquation.audioDescription}"`);
        FlashcardAudio.speakEquation(this.currentEquation, side);
    },

    // Next card
    nextCard: function() {
        document.dispatchEvent(new CustomEvent('requestNextCard'));
    },

    // Previous card
    previousCard: function() {
        document.dispatchEvent(new CustomEvent('requestPreviousCard'));
    },

    // Update progress indicators
    updateProgress: function() {
        const current = this.currentIndex + 1;
        const total = this.totalCards;

        // Update progress text
        if (this.elements.progressText) {
            this.elements.progressText.textContent = `${current} of ${total}`;
        }

        // Update progress bar
        if (this.elements.progressBar && this.elements.progressFill) {
            const percentage = total > 0 ? (current / total) * 100 : 0;
            this.elements.progressFill.style.width = `${percentage}%`;

            this.elements.progressBar.setAttribute('aria-valuenow', current);
            this.elements.progressBar.setAttribute('aria-valuemax', total);
            this.elements.progressBar.setAttribute('aria-valuetext', `${current} of ${total} equations`);
        }

        // Announce progress periodically (every 5 cards)
        if (current % 5 === 0 || current === total) {
            this.announceProgress();
        }
    },

    // Announce card to screen reader
    announceCard: function() {
        const announcement = `Equation ${this.currentIndex + 1} of ${this.totalCards}. ${this.currentEquation.name}. Category: ${this.capitalizeCategory(this.currentEquation.category)}`;
        this.announce(announcement, 'polite');
    },

    // Announce progress
    announceProgress: function() {
        const announcement = `Progress: ${this.currentIndex + 1} of ${this.totalCards} equations reviewed`;
        this.announce(announcement, 'polite', 'progress');
    },

    // Generic announce function
    announce: function(message, priority = 'polite', type = 'card') {
        const announcer = type === 'progress'
            ? this.elements.progressAnnouncer
            : this.elements.cardAnnouncer;

        if (announcer) {
            announcer.textContent = message;
        }

        console.log(`📢 Announced: ${message}`);
    },

    // Handle card changed event
    handleCardChanged: function(event) {
        const { equation, index, total } = event.detail;
        this.displayCard(equation, { index, total });
    },

    // Handle audio state changed
    handleAudioStateChanged: function(event) {
        const { state, isPlaying } = event.detail;

        if (this.elements.playButton) {
            const icon = this.elements.playButton.querySelector('.audio-icon');
            if (icon) {
                icon.textContent = isPlaying ? '⏸️' : '🔊';
            }

            const label = isPlaying ? 'Pause audio' : 'Play audio';
            this.elements.playButton.setAttribute('aria-label', label);
        }
    },

    // Show loading state
    showLoading: function() {
        if (this.elements.cardContainer) {
            this.elements.cardContainer.classList.add('loading');
            this.announce('Loading equations...', 'polite');
        }
    },

    // Hide loading state
    hideLoading: function() {
        if (this.elements.cardContainer) {
            this.elements.cardContainer.classList.remove('loading');
        }
    },

    // Show error message
    showError: function(message) {
        const errorMsg = message || 'An error occurred. Please refresh the page.';

        if (this.elements.cardContainer) {
            this.elements.cardContainer.innerHTML = `
                <div class="error-message" role="alert">
                    <h2>Error</h2>
                    <p>${Utils.sanitizeString(errorMsg)}</p>
                    <button type="button" onclick="location.reload()">Reload Page</button>
                </div>
            `;
        }

        this.announce(errorMsg, 'assertive');
    },

    // Show completion message
    showCompletion: function() {
        const stats = FlashcardStorage.getStatistics();

        if (this.elements.cardContainer) {
            this.elements.cardContainer.innerHTML = `
                <div class="completion-message" role="status">
                    <h2>🎉 Session Complete!</h2>
                    <p>You've reviewed all ${this.totalCards} equations.</p>
                    <div class="completion-stats">
                        <p><strong>Total Reviews:</strong> ${stats.totalReviews}</p>
                        <p><strong>Time Spent:</strong> ${Utils.formatTime(stats.totalTimeSpent)}</p>
                    </div>
                    <button type="button" id="restart-btn" class="btn-primary">
                        Start New Session
                    </button>
                </div>
            `;

            // Add event listener to restart button
            const restartBtn = document.getElementById('restart-btn');
            if (restartBtn) {
                restartBtn.addEventListener('click', () => {
                    document.dispatchEvent(new CustomEvent('requestRestart'));
                });
            }
        }

        this.announce(`Session complete! You reviewed ${this.totalCards} equations.`, 'polite');
    },

    // Update difficulty rating UI (for SRS mode)
    showRatingButtons: function() {
        const ratingContainer = document.getElementById('rating-container');
        if (ratingContainer) {
            ratingContainer.style.display = 'flex';
            ratingContainer.setAttribute('aria-hidden', 'false');
        }
    },

    hideRatingButtons: function() {
        const ratingContainer = document.getElementById('rating-container');
        if (ratingContainer) {
            ratingContainer.style.display = 'none';
            ratingContainer.setAttribute('aria-hidden', 'true');
        }
    },

    // Update navigation button states
    updateNavigationButtons: function(canGoPrev, canGoNext) {
        if (this.elements.prevButton) {
            this.elements.prevButton.disabled = !canGoPrev;
            this.elements.prevButton.setAttribute('aria-disabled', !canGoPrev);
        }

        if (this.elements.nextButton) {
            this.elements.nextButton.disabled = !canGoNext;
            this.elements.nextButton.setAttribute('aria-disabled', !canGoNext);
        }
    },

    // Utility: Capitalize category name
    capitalizeCategory: function(category) {
        return category
            .split(/[-_\s]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
};

// Make globally available
if (typeof window !== 'undefined') {
    window.FlashcardUI = FlashcardUI;
}
