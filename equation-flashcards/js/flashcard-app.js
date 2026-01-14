/**
 * Main controller for Equation Flashcards Application
 * Coordinates all modules and manages application state
 */

const FlashcardApp = {
    currentMode: null,
    isInitialized: false,

    // Initialize application
    init: async function() {
        console.log('🚀 Starting Equation Flashcards Application...');
        console.log('📅 Version 1.0 - January 2026');

        try {
            // Show loading state
            FlashcardUI.showLoading();

            // Initialize modules in order
            await this.initializeModules();

            // Load theme
            this.loadTheme();

            // Set up mode selection
            this.setupModeSelection();

            // Set up category filter
            this.setupCategoryFilter();

            // Start in saved mode or default to sequential
            const savedMode = FlashcardStorage.getSetting('studyMode', 'sequential');
            this.switchMode(savedMode);

            this.isInitialized = true;

            // Hide loading
            FlashcardUI.hideLoading();

            // Announce ready state
            Utils.announceToScreenReader('Equation flashcards application ready', 'polite');
            console.log('✅ Application initialized successfully');

            // Show keyboard shortcuts hint
            setTimeout(() => {
                FlashcardKeyboard.announceShortcuts();
            }, 2000);

        } catch (error) {
            Utils.handleError(error, 'FlashcardApp.init', 'error');
            FlashcardUI.showError('Failed to initialize application. Please refresh the page.');
        }
    },

    // Initialize all modules
    initializeModules: async function() {
        console.log('🔧 Initializing modules...');

        // 1. Initialize UI (cache DOM elements)
        FlashcardUI.init();

        // 2. Load data from CSV
        await FlashcardData.init();

        // 3. Load saved filters
        FlashcardData.loadSavedFilters();

        // 4. Audio system already initialized on page load
        // FlashcardAudio.init() - called automatically

        // 5. Keyboard already initialized on page load
        // FlashcardKeyboard.init() - called automatically

        console.log('✅ All modules initialized');
    },

    // Set up mode selection
    setupModeSelection: function() {
        const sequentialBtn = document.getElementById('mode-sequential');
        const srsBtn = document.getElementById('mode-srs');

        if (sequentialBtn) {
            sequentialBtn.addEventListener('click', () => this.switchMode('sequential'));
        }

        if (srsBtn) {
            srsBtn.addEventListener('click', () => this.switchMode('spaced-repetition'));
        }

        // Listen for mode switch events
        document.addEventListener('switchMode', (e) => {
            this.switchMode(e.detail.mode);
        });
    },

    // Set up category filter
    setupCategoryFilter: function() {
        const categoryFilter = document.getElementById('category-filter');

        if (!categoryFilter) {
            console.warn('⚠️ Category filter element not found');
            return;
        }

        // Populate category options
        const categories = FlashcardData.getCategories();

        // Clear existing options (keep "All Units")
        categoryFilter.innerHTML = '<option value="all">All Units</option>';

        // Add category options with friendly names
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            // Convert category to display name (e.g., "static-electricity" → "Static Electricity")
            option.textContent = this.formatCategoryName(category);
            categoryFilter.appendChild(option);
        });

        // Set saved filter value
        const savedCategory = FlashcardStorage.getSetting('categoryFilter', 'all');
        categoryFilter.value = savedCategory;

        // Add change event listener
        categoryFilter.addEventListener('change', (e) => {
            const selectedCategory = e.target.value;
            console.log(`🔍 Filtering by category: ${selectedCategory}`);

            // Update filter in data module
            FlashcardData.setFilter('category', selectedCategory);

            // Clear the saved session to force recreation with new filter
            FlashcardStorage.clearSession();

            // Restart current mode with filtered data
            this.switchMode(this.currentMode);

            // Announce filter change
            const announcement = selectedCategory === 'all'
                ? 'Showing all equations'
                : `Filtering to ${this.formatCategoryName(selectedCategory)} equations only`;
            Utils.announceToScreenReader(announcement, 'polite');
        });

        console.log(`📚 Category filter populated with ${categories.length} categories`);
    },

    // Format category name for display
    formatCategoryName: function(category) {
        return category
            .split(/[-_\s]+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    // Switch study mode
    switchMode: function(mode) {
        console.log(`🔄 Switching to ${mode} mode...`);

        // Cleanup current mode
        if (this.currentMode) {
            if (this.currentMode === 'sequential' && FlashcardSequential.cleanup) {
                FlashcardSequential.cleanup();
            } else if (this.currentMode === 'spaced-repetition' && FlashcardSRS.cleanup) {
                FlashcardSRS.cleanup();
            }
        }

        // Initialize new mode
        if (mode === 'sequential') {
            FlashcardSequential.init();
            this.currentMode = 'sequential';
        } else if (mode === 'spaced-repetition') {
            FlashcardSRS.init();
            this.currentMode = 'spaced-repetition';
        }

        // Save preference
        FlashcardStorage.setSetting('studyMode', mode);

        // Update UI
        this.updateModeUI(mode);

        // Announce
        const modeName = mode === 'sequential' ? 'Sequential Review' : 'Spaced Repetition';
        Utils.announceToScreenReader(`Switched to ${modeName} mode`, 'polite');

        console.log(`✅ Now in ${mode} mode`);
    },

    // Update mode UI indicators
    updateModeUI: function(mode) {
        const sequentialBtn = document.getElementById('mode-sequential');
        const srsBtn = document.getElementById('mode-srs');

        if (sequentialBtn && srsBtn) {
            sequentialBtn.classList.toggle('active', mode === 'sequential');
            srsBtn.classList.toggle('active', mode === 'spaced-repetition');

            sequentialBtn.setAttribute('aria-pressed', mode === 'sequential');
            srsBtn.setAttribute('aria-pressed', mode === 'spaced-repetition');
        }
    },

    // Load and apply theme
    loadTheme: function() {
        const savedTheme = FlashcardStorage.getSetting('theme', 'light');
        this.setTheme(savedTheme);

        // Set up theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    },

    // Set theme
    setTheme: function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        FlashcardStorage.setSetting('theme', theme);

        // Update theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = theme === 'dark' ? '☀️' : '🌙';
            }
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
        }

        console.log(`🎨 Theme set to: ${theme}`);
    },

    // Toggle theme
    toggleTheme: function() {
        const currentTheme = FlashcardStorage.getSetting('theme', 'light');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);

        Utils.announceToScreenReader(`Switched to ${newTheme} theme`, 'polite');
    },

    // Open settings modal
    openSettings: function() {
        const settingsModal = document.getElementById('settings-modal');
        if (settingsModal) {
            // Populate settings
            this.populateSettings();

            // Show modal
            settingsModal.setAttribute('aria-hidden', 'false');
            settingsModal.style.display = 'flex';

            // Focus first element
            const firstInput = settingsModal.querySelector('input, select, button');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }

            Utils.announceToScreenReader('Settings opened', 'polite');
        }
    },

    // Populate settings form
    populateSettings: function() {
        // Speech rate
        const speechRate = document.getElementById('speech-rate');
        if (speechRate) {
            speechRate.value = FlashcardStorage.getSetting('speechRate', 1.0);
        }

        // Auto-read toggle
        const autoRead = document.getElementById('auto-read-toggle');
        if (autoRead) {
            autoRead.checked = FlashcardStorage.getSetting('autoRead', true);
        }

        // Voice selection
        const voiceSelect = document.getElementById('voice-select');
        if (voiceSelect) {
            voiceSelect.innerHTML = '';
            FlashcardAudio.voiceList.forEach(voice => {
                const option = document.createElement('option');
                option.value = voice.name;
                option.textContent = `${voice.name} (${voice.lang})`;
                if (FlashcardAudio.selectedVoice && voice.name === FlashcardAudio.selectedVoice.name) {
                    option.selected = true;
                }
                voiceSelect.appendChild(option);
            });
        }

        // Shuffle cards
        const shuffleCards = document.getElementById('shuffle-cards-toggle');
        if (shuffleCards) {
            shuffleCards.checked = FlashcardStorage.getSetting('shuffleCards', false);
        }
    },

    // Save settings
    saveSettings: function() {
        // Speech rate
        const speechRate = document.getElementById('speech-rate');
        if (speechRate) {
            FlashcardAudio.setSpeechRate(parseFloat(speechRate.value));
        }

        // Auto-read
        const autoRead = document.getElementById('auto-read-toggle');
        if (autoRead) {
            FlashcardStorage.setSetting('autoRead', autoRead.checked);
        }

        // Voice
        const voiceSelect = document.getElementById('voice-select');
        if (voiceSelect) {
            FlashcardAudio.setVoice(voiceSelect.value);
        }

        // Shuffle
        const shuffleCards = document.getElementById('shuffle-cards-toggle');
        if (shuffleCards) {
            FlashcardStorage.setSetting('shuffleCards', shuffleCards.checked);
        }

        Utils.announceToScreenReader('Settings saved', 'polite');
        console.log('✅ Settings saved');

        // Close modal
        this.closeSettings();
    },

    // Close settings modal
    closeSettings: function() {
        const settingsModal = document.getElementById('settings-modal');
        if (settingsModal) {
            settingsModal.setAttribute('aria-hidden', 'true');
            settingsModal.style.display = 'none';
        }
    },

    // Export data
    exportData: function() {
        try {
            FlashcardStorage.downloadExport();
            Utils.announceToScreenReader('Data exported successfully', 'polite');
        } catch (error) {
            Utils.handleError(error, 'exportData', 'error');
            alert('Failed to export data. Please try again.');
        }
    },

    // Import data
    importData: function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const jsonString = event.target.result;
                    if (FlashcardStorage.importData(jsonString)) {
                        alert('Data imported successfully! Please refresh the page.');
                        Utils.announceToScreenReader('Data imported successfully', 'polite');
                    }
                } catch (error) {
                    Utils.handleError(error, 'importData', 'error');
                    alert('Failed to import data. Please check the file format.');
                }
            };
            reader.readAsText(file);
        };

        input.click();
    },

    // Reset all data
    resetAllData: function() {
        if (FlashcardStorage.clearAll()) {
            alert('All data has been reset. The page will now reload.');
            location.reload();
        }
    },

    // Show statistics
    showStatistics: function() {
        const stats = FlashcardStorage.getStatistics();
        const srsData = FlashcardStorage.getSRSData();

        const masteryLevels = FlashcardSRS.calculateMasteryLevels(srsData);

        const statsHTML = `
            <div class="statistics-view" role="region" aria-labelledby="stats-title">
                <h2 id="stats-title">Your Progress</h2>

                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>Total Reviews</h3>
                        <p class="stat-value">${stats.totalReviews || 0}</p>
                    </div>

                    <div class="stat-card">
                        <h3>Sessions</h3>
                        <p class="stat-value">${stats.sessionCount || 0}</p>
                    </div>

                    <div class="stat-card">
                        <h3>Time Spent</h3>
                        <p class="stat-value">${Utils.formatTime(stats.totalTimeSpent || 0)}</p>
                    </div>

                    <div class="stat-card">
                        <h3>Current Streak</h3>
                        <p class="stat-value">${stats.streaks.current || 0} days</p>
                    </div>
                </div>

                <div class="mastery-section">
                    <h3>Mastery Levels</h3>
                    <dl class="mastery-list">
                        <div><dt>Mastered:</dt><dd>${masteryLevels.mastered}</dd></div>
                        <div><dt>Familiar:</dt><dd>${masteryLevels.familiar}</dd></div>
                        <div><dt>Learning:</dt><dd>${masteryLevels.learning}</dd></div>
                        <div><dt>New:</dt><dd>${masteryLevels.new}</dd></div>
                        <div><dt>Struggling:</dt><dd>${masteryLevels.struggling}</dd></div>
                    </dl>
                </div>

                <button type="button" class="btn-secondary" onclick="FlashcardApp.closeStatistics()">
                    Close
                </button>
            </div>
        `;

        const statsContainer = document.getElementById('stats-container');
        if (statsContainer) {
            statsContainer.innerHTML = statsHTML;
            statsContainer.style.display = 'block';
        }

        Utils.announceToScreenReader('Statistics displayed', 'polite');
    },

    closeStatistics: function() {
        const statsContainer = document.getElementById('stats-container');
        if (statsContainer) {
            statsContainer.style.display = 'none';
        }
    },

    // Error recovery
    handleFatalError: function(error) {
        console.error('💥 Fatal error:', error);
        FlashcardUI.showError('A critical error occurred. Please refresh the page.');

        // Try to save any unsaved data
        try {
            if (this.currentMode === 'sequential' && FlashcardSequential.session) {
                FlashcardSequential.saveSession();
            }
        } catch (saveError) {
            console.error('Failed to save session:', saveError);
        }
    }
};

// Global error handler
window.addEventListener('error', (event) => {
    FlashcardApp.handleFatalError(event.error);
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        FlashcardApp.init();
    });
} else {
    FlashcardApp.init();
}

// Make globally available
window.FlashcardApp = FlashcardApp;
