/**
 * Keyboard navigation for Equation Flashcards
 * Handles all keyboard shortcuts and accessibility
 */

const FlashcardKeyboard = {
    shortcuts: {},
    isModalOpen: false,

    // Initialize keyboard handler
    init: function() {
        console.log('⌨️ Initializing Keyboard Handler...');

        // Define shortcuts
        this.defineShortcuts();

        // Set up global keyboard listener
        this.setupGlobalListener();

        console.log('✅ Keyboard handler initialized');
        return true;
    },

    // Define all keyboard shortcuts
    defineShortcuts: function() {
        this.shortcuts = {
            // Card navigation
            'Space': {
                description: 'Flip card',
                handler: () => this.handleFlipCard(),
                preventDefault: true
            },
            'ArrowRight': {
                description: 'Next card',
                handler: () => this.handleNextCard(),
                preventDefault: true
            },
            'ArrowLeft': {
                description: 'Previous card',
                handler: () => this.handlePreviousCard(),
                preventDefault: true
            },
            'n': {
                description: 'Next card',
                handler: () => this.handleNextCard()
            },
            'b': {
                description: 'Previous card (back)',
                handler: () => this.handlePreviousCard()
            },

            // Audio controls
            'a': {
                description: 'Play/pause audio',
                handler: () => this.handleAudio()
            },
            'p': {
                description: 'Play/pause audio',
                handler: () => this.handleAudio()
            },
            'r': {
                description: 'Repeat audio',
                handler: () => this.handleRepeatAudio()
            },
            's': {
                description: 'Toggle auto-read',
                handler: () => this.handleToggleAutoRead()
            },

            // SRS rating (1-5)
            '1': {
                description: 'Rate as very easy',
                handler: () => this.handleRating(1)
            },
            '2': {
                description: 'Rate as easy',
                handler: () => this.handleRating(2)
            },
            '3': {
                description: 'Rate as medium',
                handler: () => this.handleRating(3)
            },
            '4': {
                description: 'Rate as hard',
                handler: () => this.handleRating(4)
            },
            '5': {
                description: 'Rate as very hard',
                handler: () => this.handleRating(5)
            },

            // Help and modals
            'h': {
                description: 'Show keyboard help',
                handler: () => this.handleShowHelp()
            },
            '?': {
                description: 'Show keyboard help',
                handler: () => this.handleShowHelp()
            },
            'Escape': {
                description: 'Close modals/cancel',
                handler: () => this.handleEscape(),
                preventDefault: true
            }
        };
    },

    // Set up global keyboard listener
    setupGlobalListener: function() {
        document.addEventListener('keydown', (event) => {
            this.handleKeyPress(event);
        });
    },

    // Handle key press
    handleKeyPress: function(event) {
        // Ignore if typing in input field
        if (this.isTypingInInput(event.target)) {
            return;
        }

        // Ignore if modifier keys are pressed (except Shift for ?)
        if (event.ctrlKey || event.altKey || event.metaKey) {
            return;
        }

        const key = event.key;
        const shortcut = this.shortcuts[key];

        if (shortcut) {
            console.log(`⌨️ Keyboard shortcut: ${key}`);

            // Prevent default if specified
            if (shortcut.preventDefault) {
                event.preventDefault();
            }

            // Execute handler
            try {
                shortcut.handler();
            } catch (error) {
                Utils.handleError(error, `Keyboard shortcut: ${key}`, 'error');
            }
        }
    },

    // Check if user is typing in an input field
    isTypingInInput: function(element) {
        const tagName = element.tagName.toLowerCase();
        return tagName === 'input' ||
               tagName === 'textarea' ||
               tagName === 'select' ||
               element.isContentEditable;
    },

    // === Shortcut Handlers ===

    handleFlipCard: function() {
        FlashcardUI.flipCard();
    },

    handleNextCard: function() {
        document.dispatchEvent(new CustomEvent('requestNextCard'));
    },

    handlePreviousCard: function() {
        document.dispatchEvent(new CustomEvent('requestPreviousCard'));
    },

    handleAudio: function() {
        if (FlashcardAudio.isPlaying) {
            FlashcardAudio.stop();
        } else {
            FlashcardUI.playAudio();
        }
    },

    handleRepeatAudio: function() {
        FlashcardAudio.stop();
        setTimeout(() => FlashcardUI.playAudio(), 100);
    },

    handleToggleAutoRead: function() {
        const current = FlashcardStorage.getSetting('autoRead', true);
        const newValue = !current;
        FlashcardStorage.setSetting('autoRead', newValue);

        const message = newValue ? 'Auto-read enabled' : 'Auto-read disabled';
        Utils.announceToScreenReader(message, 'polite');
        console.log(`🔊 ${message}`);
    },

    handleRating: function(rating) {
        document.dispatchEvent(new CustomEvent('ratingSelected', {
            detail: { rating }
        }));
    },

    handleShowHelp: function() {
        this.showKeyboardHelp();
    },

    handleEscape: function() {
        // Close any open modals
        const modals = document.querySelectorAll('.modal[aria-hidden="false"]');
        modals.forEach(modal => {
            this.closeModal(modal);
        });

        // Stop audio
        FlashcardAudio.stop();
    },

    // === Modal Management ===

    showKeyboardHelp: function() {
        const helpModal = document.getElementById('keyboard-help-modal');
        if (helpModal) {
            this.openModal(helpModal);
        } else {
            this.createKeyboardHelpModal();
        }
    },

    createKeyboardHelpModal: function() {
        const modalHTML = `
            <div id="keyboard-help-modal" class="modal" role="dialog" aria-labelledby="help-modal-title" aria-modal="true">
                <div class="modal-content">
                    <header class="modal-header">
                        <h2 id="help-modal-title">Keyboard Shortcuts</h2>
                        <button type="button" class="modal-close" aria-label="Close help">×</button>
                    </header>
                    <div class="modal-body">
                        ${this.renderShortcutsHelp()}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const helpModal = document.getElementById('keyboard-help-modal');
        const closeBtn = helpModal.querySelector('.modal-close');

        closeBtn.addEventListener('click', () => this.closeModal(helpModal));

        this.openModal(helpModal);
    },

    renderShortcutsHelp: function() {
        const sections = {
            'Card Navigation': ['Space', 'ArrowRight', 'ArrowLeft', 'n', 'b'],
            'Audio Controls': ['a', 'p', 'r', 's'],
            'Rating (SRS Mode)': ['1', '2', '3', '4', '5'],
            'Other': ['h', '?', 'Escape']
        };

        let html = '';

        for (const [section, keys] of Object.entries(sections)) {
            html += `<div class="shortcut-section">
                <h3>${section}</h3>
                <dl class="shortcuts-list">`;

            keys.forEach(key => {
                const shortcut = this.shortcuts[key];
                if (shortcut) {
                    const keyDisplay = this.formatKeyDisplay(key);
                    html += `
                        <div class="shortcut-item">
                            <dt><kbd>${keyDisplay}</kbd></dt>
                            <dd>${Utils.sanitizeString(shortcut.description)}</dd>
                        </div>
                    `;
                }
            });

            html += `</dl></div>`;
        }

        return html;
    },

    formatKeyDisplay: function(key) {
        const keyMap = {
            'Space': 'Space',
            'ArrowRight': '→',
            'ArrowLeft': '←',
            'Escape': 'Esc'
        };

        return keyMap[key] || key.toUpperCase();
    },

    openModal: function(modal) {
        modal.setAttribute('aria-hidden', 'false');
        modal.style.display = 'flex';
        this.isModalOpen = true;

        // Focus first focusable element
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }

        // Set up focus trap
        this.setupFocusTrap(modal);

        Utils.announceToScreenReader('Modal opened', 'polite');
    },

    closeModal: function(modal) {
        modal.setAttribute('aria-hidden', 'true');
        modal.style.display = 'none';
        this.isModalOpen = false;

        Utils.announceToScreenReader('Modal closed', 'polite');
    },

    setupFocusTrap: function(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        modal.addEventListener('keydown', handleTabKey);
    },

    // Get shortcuts for display
    getShortcuts: function() {
        return this.shortcuts;
    },

    // Announce available shortcuts
    announceShortcuts: function() {
        const message = 'Press H or question mark for keyboard shortcuts. Press Space to flip card, arrow keys to navigate, A to play audio.';
        Utils.announceToScreenReader(message, 'polite');
    }
};

// Make globally available and initialize
if (typeof window !== 'undefined') {
    window.FlashcardKeyboard = FlashcardKeyboard;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            FlashcardKeyboard.init();
        });
    } else {
        FlashcardKeyboard.init();
    }
}
