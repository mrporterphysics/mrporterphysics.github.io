/**
 * QuizStorage - Local storage management for quiz progress and settings
 */

const QuizStorage = {
    // Storage keys
    KEYS: {
        PROGRESS: 'quiz_progress',
        SETTINGS: 'quiz_settings', 
        STATISTICS: 'quiz_statistics',
        MISSED_QUESTIONS: 'missed_questions',
        BOOKMARKS: 'bookmarked_questions',
        THEME: 'quiz_theme'
    },

    // Default settings
    DEFAULT_SETTINGS: {
        course: 'ap-physics',
        mode: 'learning',
        showExplanations: true,
        theme: 'light',
        autoAdvance: false,
        timerEnabled: false,
        difficultySetting: 'all'
    },

    // Initialize storage with comprehensive error handling
    init: function() {
        try {
            // Test localStorage availability
            this.testStorageAvailability();
            
            // Initialize settings
            const currentSettings = this.getSettings();
            if (!currentSettings || Object.keys(currentSettings).length === 0) {
                this.saveSettings(this.DEFAULT_SETTINGS);
            }
            
            // Initialize statistics
            const currentStats = this.getStatistics();
            if (!currentStats || !currentStats.lastUpdated) {
                this.saveStatistics(this.createEmptyStatistics());
            }
            
            // Validate and repair corrupted data
            this.validateAndRepairData();
            
            console.log('✅ QuizStorage initialized successfully');
        } catch (error) {
            Utils.handleError(error, 'QuizStorage.init');
            
            // Attempt recovery
            try {
                this.performStorageRecovery();
            } catch (recoveryError) {
                Utils.handleError(recoveryError, 'QuizStorage.init recovery');
                throw new Error('Unable to initialize storage. Local storage may be disabled or full.');
            }
        }
    },

    // Test localStorage availability and quota
    testStorageAvailability: function() {
        if (typeof Storage === 'undefined') {
            throw new Error('localStorage is not supported by this browser');
        }
        
        try {
            const testKey = '__quiz_storage_test__';
            const testData = 'test';
            localStorage.setItem(testKey, testData);
            
            if (localStorage.getItem(testKey) !== testData) {
                throw new Error('localStorage write/read test failed');
            }
            
            localStorage.removeItem(testKey);
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                throw new Error('localStorage quota exceeded. Please clear some data.');
            }
            throw new Error(`localStorage test failed: ${error.message}`);
        }
    },

    // Validate and repair corrupted storage data
    validateAndRepairData: function() {
        let repairsMade = 0;
        
        // Validate settings structure
        const settings = Utils.storage.get(this.KEYS.SETTINGS);
        if (settings && typeof settings === 'object') {
            let needsRepair = false;
            const repairedSettings = { ...this.DEFAULT_SETTINGS };
            
            for (const key in settings) {
                if (this.DEFAULT_SETTINGS.hasOwnProperty(key)) {
                    repairedSettings[key] = settings[key];
                } else {
                    needsRepair = true;
                }
            }
            
            if (needsRepair) {
                Utils.storage.set(this.KEYS.SETTINGS, repairedSettings);
                repairsMade++;
            }
        }
        
        // Validate statistics structure
        const stats = Utils.storage.get(this.KEYS.STATISTICS);
        if (stats && typeof stats === 'object') {
            const requiredFields = ['totalQuestions', 'correctAnswers', 'totalTime', 'lastUpdated'];
            let needsRepair = false;
            
            for (const field of requiredFields) {
                if (!(field in stats)) {
                    needsRepair = true;
                    break;
                }
            }
            
            if (needsRepair) {
                const repairedStats = { ...this.createEmptyStatistics(), ...stats };
                this.saveStatistics(repairedStats);
                repairsMade++;
            }
        }
        
        if (repairsMade > 0) {
            console.log(`🔧 Repaired ${repairsMade} corrupted storage items`);
        }
    },

    // Perform storage recovery
    performStorageRecovery: function() {
        console.log('🚨 Attempting storage recovery...');
        
        // Clear potentially corrupted items
        Object.values(this.KEYS).forEach(key => {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                // Continue recovery attempt
            }
        });
        
        // Reinitialize with defaults
        this.saveSettings(this.DEFAULT_SETTINGS);
        this.saveStatistics(this.createEmptyStatistics());
        
        console.log('✅ Storage recovery completed');
    },

    // Settings management
    getSettings: function() {
        return Utils.storage.get(this.KEYS.SETTINGS, this.DEFAULT_SETTINGS);
    },

    saveSettings: function(settings) {
        const merged = { ...this.DEFAULT_SETTINGS, ...settings };
        return Utils.storage.set(this.KEYS.SETTINGS, merged);
    },

    updateSetting: function(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        return this.saveSettings(settings);
    },

    // Progress tracking
    getProgress: function() {
        return Utils.storage.get(this.KEYS.PROGRESS, {
            currentQuestionIndex: 0,
            answeredQuestions: [],
            correctAnswers: 0,
            totalAttempted: 0,
            sessionStartTime: Date.now(),
            completedTopics: []
        });
    },

    saveProgress: function(progress) {
        return Utils.storage.set(this.KEYS.PROGRESS, progress);
    },

    updateProgress: function(questionId, isCorrect, timeSpent = 0) {
        const progress = this.getProgress();
        
        // Update answered questions
        if (!progress.answeredQuestions.includes(questionId)) {
            progress.answeredQuestions.push(questionId);
            progress.totalAttempted++;
        }
        
        if (isCorrect) {
            progress.correctAnswers++;
        }

        // Update statistics
        this.updateStatistics(questionId, isCorrect, timeSpent);
        
        return this.saveProgress(progress);
    },

    resetProgress: function() {
        const defaultProgress = {
            currentQuestionIndex: 0,
            answeredQuestions: [],
            correctAnswers: 0,
            totalAttempted: 0,
            sessionStartTime: Date.now(),
            completedTopics: []
        };
        return this.saveProgress(defaultProgress);
    },

    // Statistics management
    createEmptyStatistics: function() {
        return {
            totalQuestions: 0,
            correctAnswers: 0,
            totalTime: 0,
            averageTime: 0,
            topicStats: {},
            questionTypeStats: {},
            difficultyStats: {1: {correct: 0, total: 0}, 2: {correct: 0, total: 0}, 3: {correct: 0, total: 0}},
            streaks: {current: 0, best: 0},
            lastUpdated: Date.now()
        };
    },

    getStatistics: function() {
        return Utils.storage.get(this.KEYS.STATISTICS, this.createEmptyStatistics());
    },

    saveStatistics: function(stats) {
        stats.lastUpdated = Date.now();
        return Utils.storage.set(this.KEYS.STATISTICS, stats);
    },

    updateStatistics: function(questionId, isCorrect, timeSpent, question = {}) {
        const stats = this.getStatistics();
        
        stats.totalQuestions++;
        if (isCorrect) stats.correctAnswers++;
        stats.totalTime += timeSpent;
        stats.averageTime = stats.totalTime / stats.totalQuestions;

        // Topic statistics
        if (question.topic) {
            if (!stats.topicStats[question.topic]) {
                stats.topicStats[question.topic] = {correct: 0, total: 0};
            }
            stats.topicStats[question.topic].total++;
            if (isCorrect) stats.topicStats[question.topic].correct++;
        }

        // Question type statistics
        if (question.type) {
            if (!stats.questionTypeStats[question.type]) {
                stats.questionTypeStats[question.type] = {correct: 0, total: 0};
            }
            stats.questionTypeStats[question.type].total++;
            if (isCorrect) stats.questionTypeStats[question.type].correct++;
        }

        // Difficulty statistics
        if (question.difficulty) {
            const diff = question.difficulty;
            if (stats.difficultyStats[diff]) {
                stats.difficultyStats[diff].total++;
                if (isCorrect) stats.difficultyStats[diff].correct++;
            }
        }

        // Streak tracking
        if (isCorrect) {
            stats.streaks.current++;
            if (stats.streaks.current > stats.streaks.best) {
                stats.streaks.best = stats.streaks.current;
            }
        } else {
            stats.streaks.current = 0;
        }

        return this.saveStatistics(stats);
    },

    // Missed questions management
    getMissedQuestions: function() {
        return Utils.storage.get(this.KEYS.MISSED_QUESTIONS, []);
    },

    addMissedQuestion: function(questionId) {
        const missed = this.getMissedQuestions();
        if (!missed.includes(questionId)) {
            missed.push(questionId);
            return Utils.storage.set(this.KEYS.MISSED_QUESTIONS, missed);
        }
        return true;
    },

    removeMissedQuestion: function(questionId) {
        const missed = this.getMissedQuestions();
        const filtered = missed.filter(id => id !== questionId);
        return Utils.storage.set(this.KEYS.MISSED_QUESTIONS, filtered);
    },

    clearMissedQuestions: function() {
        return Utils.storage.set(this.KEYS.MISSED_QUESTIONS, []);
    },

    // Bookmarks management
    getBookmarks: function() {
        return Utils.storage.get(this.KEYS.BOOKMARKS, []);
    },

    toggleBookmark: function(questionId) {
        const bookmarks = this.getBookmarks();
        const index = bookmarks.indexOf(questionId);
        
        if (index > -1) {
            bookmarks.splice(index, 1);
        } else {
            bookmarks.push(questionId);
        }
        
        return Utils.storage.set(this.KEYS.BOOKMARKS, bookmarks);
    },

    isBookmarked: function(questionId) {
        return this.getBookmarks().includes(questionId);
    },

    // Export/Import functionality
    exportData: function() {
        return {
            settings: this.getSettings(),
            progress: this.getProgress(),
            statistics: this.getStatistics(),
            missedQuestions: this.getMissedQuestions(),
            bookmarks: this.getBookmarks(),
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    },

    importData: function(data) {
        try {
            if (data.settings) this.saveSettings(data.settings);
            if (data.progress) this.saveProgress(data.progress);
            if (data.statistics) this.saveStatistics(data.statistics);
            if (data.missedQuestions) Utils.storage.set(this.KEYS.MISSED_QUESTIONS, data.missedQuestions);
            if (data.bookmarks) Utils.storage.set(this.KEYS.BOOKMARKS, data.bookmarks);
            return true;
        } catch (error) {
            Utils.handleError(error, 'QuizStorage.importData');
            return false;
        }
    },

    // Clear all data
    clearAllData: function() {
        Object.values(this.KEYS).forEach(key => {
            Utils.storage.remove(key);
        });
        this.init(); // Reinitialize with defaults
    }
};

// Initialize on load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        QuizStorage.init();
    });
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizStorage;
}