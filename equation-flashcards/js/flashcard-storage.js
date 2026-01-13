/**
 * LocalStorage wrapper for Equation Flashcards
 * Handles all persistence with error recovery
 */

const FlashcardStorage = {
    // Storage keys
    KEYS: {
        SETTINGS: 'flashcard_settings',
        SRS_DATA: 'flashcard_srs_data',
        SESSION: 'flashcard_session',
        STATISTICS: 'flashcard_statistics',
        BOOKMARKS: 'flashcard_bookmarks'
    },

    // Check if localStorage is available
    isAvailable: function() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.warn('⚠️ localStorage not available:', e);
            return false;
        }
    },

    // Get item from localStorage with error handling
    getItem: function(key, defaultValue = null) {
        if (!this.isAvailable()) return defaultValue;

        try {
            const item = localStorage.getItem(key);
            if (item === null) return defaultValue;

            try {
                return JSON.parse(item);
            } catch (parseError) {
                console.warn(`⚠️ Failed to parse ${key}, returning raw value`);
                return item;
            }
        } catch (error) {
            Utils.handleError(error, `getItem(${key})`, 'warning');
            return defaultValue;
        }
    },

    // Set item in localStorage with error handling
    setItem: function(key, value) {
        if (!this.isAvailable()) return false;

        try {
            const serialized = typeof value === 'string' ? value : JSON.stringify(value);
            localStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                console.error('❌ Storage quota exceeded');
                this.handleQuotaExceeded();
            } else {
                Utils.handleError(error, `setItem(${key})`, 'error');
            }
            return false;
        }
    },

    // Remove item from localStorage
    removeItem: function(key) {
        if (!this.isAvailable()) return false;

        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            Utils.handleError(error, `removeItem(${key})`, 'warning');
            return false;
        }
    },

    // Clear all flashcard data
    clearAll: function() {
        if (!confirm('Are you sure you want to delete all flashcard data? This cannot be undone.')) {
            return false;
        }

        Object.values(this.KEYS).forEach(key => {
            this.removeItem(key);
        });

        console.log('✅ All flashcard data cleared');
        return true;
    },

    // Handle storage quota exceeded
    handleQuotaExceeded: function() {
        console.warn('⚠️ Attempting to free up storage space...');

        // Try to compress SRS data by removing old entries
        const srsData = this.getSRSData();
        const now = Date.now();
        const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

        let cleaned = 0;
        for (const [equationId, data] of Object.entries(srsData)) {
            if (data.lastReviewed < thirtyDaysAgo && data.totalReviews < 3) {
                delete srsData[equationId];
                cleaned++;
            }
        }

        if (cleaned > 0) {
            this.saveSRSData(srsData);
            console.log(`✅ Cleaned ${cleaned} old entries from SRS data`);
        }
    },

    // === Settings Management ===

    getSettings: function() {
        const defaults = {
            studyMode: 'sequential',
            shuffleCards: false,
            autoRead: true,
            speechRate: 1.0,
            selectedVoice: null,
            theme: 'light',
            categoryFilter: 'all',
            difficultyFilter: 'all',
            showProgress: true,
            confirmReset: true
        };

        const settings = this.getItem(this.KEYS.SETTINGS, defaults);
        return { ...defaults, ...settings };
    },

    getSetting: function(key, defaultValue = null) {
        const settings = this.getSettings();
        return settings.hasOwnProperty(key) ? settings[key] : defaultValue;
    },

    setSetting: function(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        return this.setItem(this.KEYS.SETTINGS, settings);
    },

    saveSettings: function(settings) {
        return this.setItem(this.KEYS.SETTINGS, settings);
    },

    // === SRS Data Management ===

    getSRSData: function() {
        return this.getItem(this.KEYS.SRS_DATA, {});
    },

    saveSRSData: function(data) {
        return this.setItem(this.KEYS.SRS_DATA, data);
    },

    getEquationSRS: function(equationId) {
        const srsData = this.getSRSData();
        return srsData[equationId] || null;
    },

    updateEquationSRS: function(equationId, data) {
        const srsData = this.getSRSData();
        srsData[equationId] = data;
        return this.saveSRSData(srsData);
    },

    // === Session Management ===

    getSession: function() {
        return this.getItem(this.KEYS.SESSION, null);
    },

    saveSession: function(session) {
        return this.setItem(this.KEYS.SESSION, session);
    },

    clearSession: function() {
        return this.removeItem(this.KEYS.SESSION);
    },

    // === Statistics Management ===

    getStatistics: function() {
        const defaults = {
            totalReviews: 0,
            totalTimeSpent: 0,
            sessionCount: 0,
            lastSessionDate: null,
            categoryStats: {},
            masteryLevels: {
                new: 0,
                learning: 0,
                familiar: 0,
                mastered: 0,
                struggling: 0
            },
            streaks: {
                current: 0,
                longest: 0
            }
        };

        const stats = this.getItem(this.KEYS.STATISTICS, defaults);
        return { ...defaults, ...stats };
    },

    saveStatistics: function(stats) {
        return this.setItem(this.KEYS.STATISTICS, stats);
    },

    updateStatistics: function(updates) {
        const stats = this.getStatistics();
        const updated = { ...stats, ...updates };
        return this.saveStatistics(updated);
    },

    incrementStat: function(key, amount = 1) {
        const stats = this.getStatistics();
        stats[key] = (stats[key] || 0) + amount;
        return this.saveStatistics(stats);
    },

    // === Bookmarks Management ===

    getBookmarks: function() {
        return this.getItem(this.KEYS.BOOKMARKS, []);
    },

    saveBookmarks: function(bookmarks) {
        return this.setItem(this.KEYS.BOOKMARKS, bookmarks);
    },

    isBookmarked: function(equationId) {
        const bookmarks = this.getBookmarks();
        return bookmarks.includes(equationId);
    },

    toggleBookmark: function(equationId) {
        const bookmarks = this.getBookmarks();
        const index = bookmarks.indexOf(equationId);

        if (index > -1) {
            bookmarks.splice(index, 1);
            console.log(`🔖 Removed bookmark: ${equationId}`);
        } else {
            bookmarks.push(equationId);
            console.log(`🔖 Added bookmark: ${equationId}`);
        }

        return this.saveBookmarks(bookmarks);
    },

    // === Export/Import ===

    exportData: function() {
        const data = {
            version: '1.0',
            exported: Date.now(),
            settings: this.getSettings(),
            srsData: this.getSRSData(),
            statistics: this.getStatistics(),
            bookmarks: this.getBookmarks()
        };

        return JSON.stringify(data, null, 2);
    },

    importData: function(jsonString) {
        try {
            const data = JSON.parse(jsonString);

            if (!data.version) {
                throw new Error('Invalid export file: missing version');
            }

            // Import data with validation
            if (data.settings) this.saveSettings(data.settings);
            if (data.srsData) this.saveSRSData(data.srsData);
            if (data.statistics) this.saveStatistics(data.statistics);
            if (data.bookmarks) this.saveBookmarks(data.bookmarks);

            console.log('✅ Data imported successfully');
            return true;
        } catch (error) {
            Utils.handleError(error, 'importData', 'error');
            alert('Failed to import data. Please check the file format.');
            return false;
        }
    },

    // Download export as file
    downloadExport: function() {
        const data = this.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `flashcard-backup-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('✅ Export downloaded');
    },

    // === Data Validation ===

    validateData: function() {
        console.log('🔍 Validating stored data...');

        let issues = 0;

        // Validate settings
        const settings = this.getSettings();
        if (typeof settings.autoRead !== 'boolean') {
            console.warn('⚠️ Invalid autoRead setting, resetting to true');
            settings.autoRead = true;
            this.saveSettings(settings);
            issues++;
        }

        // Validate SRS data
        const srsData = this.getSRSData();
        for (const [id, data] of Object.entries(srsData)) {
            if (!data.lastReviewed || !data.interval) {
                console.warn(`⚠️ Invalid SRS data for equation ${id}`);
                delete srsData[id];
                issues++;
            }
        }
        if (issues > 0) {
            this.saveSRSData(srsData);
        }

        console.log(`✅ Validation complete. ${issues} issue(s) fixed.`);
        return issues;
    }
};

// Initialize storage and make globally available
if (typeof window !== 'undefined') {
    window.FlashcardStorage = FlashcardStorage;

    // Validate data on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            FlashcardStorage.validateData();
        });
    } else {
        FlashcardStorage.validateData();
    }
}
