/**
 * Local Storage Module for AP Physics 1 Quiz App
 * Handles saving and loading quiz state, user progress, and statistics
 */
const QuizStorage = (function() {
    // Constants for storage keys
    const KEYS = {
      STATE: 'ap_physics_quiz_state',
      MISSED: 'ap_physics_quiz_missed',
      STATS: 'ap_physics_quiz_stats',
      SETTINGS: 'ap_physics_quiz_settings',
      LAST_VISIT: 'ap_physics_quiz_last_visit',
      ACTIVITY_DATES: 'ap_physics_quiz_activity_dates',
      LAST_ACTIVITY: 'ap_physics_quiz_last_activity',
      DIFFICULTY_STATS: 'ap_physics_quiz_difficulty_stats'
    };
    
    /**
     * Save the current quiz state to localStorage
     * @param {Object} state - The current quiz state
     */
    function saveQuizState(state) {
      try {
        localStorage.setItem(KEYS.STATE, JSON.stringify(state));
        updateLastVisit();
      } catch (error) {
        console.error('Error saving quiz state:', error);
      }
    }
    
    /**
     * Load the saved quiz state from localStorage
     * @return {Object|null} - Saved quiz state or null if not found
     */
    function loadQuizState() {
      try {
        const state = localStorage.getItem(KEYS.STATE);
        return state ? JSON.parse(state) : null;
      } catch (error) {
        console.error('Error loading quiz state:', error);
        return null;
      }
    }
    
    /**
     * Save missed questions to localStorage
     * @param {Array} questions - Array of missed question objects
     */
    function saveMissedQuestions(questions) {
      try {
        localStorage.setItem(KEYS.MISSED, JSON.stringify(questions));
      } catch (error) {
        console.error('Error saving missed questions:', error);
      }
    }
    
    /**
     * Load missed questions from localStorage
     * @return {Array} - Array of missed question objects
     */
    function loadMissedQuestions() {
      try {
        const questions = localStorage.getItem(KEYS.MISSED);
        return questions ? JSON.parse(questions) : [];
      } catch (error) {
        console.error('Error loading missed questions:', error);
        return [];
      }
    }
    
    /**
     * Update user statistics
     * @param {Object} stats - The statistics to update or merge with existing stats
     */
    function updateStats(stats) {
      try {
        // Get current stats
        const currentStats = loadStats();
        
        // Merge with new stats
        const updatedStats = {
          ...currentStats,
          ...stats,
          totalQuizzesCompleted: (currentStats.totalQuizzesCompleted || 0) + 1,
          lastUpdated: new Date().toISOString()
        };
        
        // If topics stats exist, merge them properly
        if (currentStats.topics && stats.topics) {
          updatedStats.topics = { ...currentStats.topics };
          
          for (const topic in stats.topics) {
            if (updatedStats.topics[topic]) {
              updatedStats.topics[topic].correct = (updatedStats.topics[topic].correct || 0) + (stats.topics[topic].correct || 0);
              updatedStats.topics[topic].total = (updatedStats.topics[topic].total || 0) + (stats.topics[topic].total || 0);
            } else {
              updatedStats.topics[topic] = { ...stats.topics[topic] };
            }
          }
        }
        
        // Save updated stats
        localStorage.setItem(KEYS.STATS, JSON.stringify(updatedStats));
      } catch (error) {
        console.error('Error updating statistics:', error);
      }
    }
    
    /**
     * Load user statistics from localStorage
     * @return {Object} - User statistics
     */
    function loadStats() {
      try {
        const stats = localStorage.getItem(KEYS.STATS);
        return stats ? JSON.parse(stats) : {
          totalCorrect: 0,
          totalAnswered: 0,
          totalQuizzesCompleted: 0,
          topics: {},
          questionTypes: {}
        };
      } catch (error) {
        console.error('Error loading statistics:', error);
        return {
          totalCorrect: 0,
          totalAnswered: 0,
          totalQuizzesCompleted: 0,
          topics: {},
          questionTypes: {}
        };
      }
    }
    
    /**
     * Save user settings to localStorage
     * @param {Object} settings - User settings
     */
    function saveSettings(settings) {
      try {
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    }
    
    /**
     * Load user settings from localStorage
     * @return {Object} - User settings
     */
    function loadSettings() {
      try {
        const settings = localStorage.getItem(KEYS.SETTINGS);
        return settings ? JSON.parse(settings) : {
          timerEnabled: false,
          theme: 'light',
          showExplanations: true
        };
      } catch (error) {
        console.error('Error loading settings:', error);
        return {
          timerEnabled: false,
          theme: 'light',
          showExplanations: true
        };
      }
    }
    
    /**
     * Update last visit timestamp
     */
    function updateLastVisit() {
      try {
        localStorage.setItem(KEYS.LAST_VISIT, new Date().toISOString());
      } catch (error) {
        console.error('Error updating last visit:', error);
      }
    }
    
    /**
     * Get the timestamp of the last visit
     * @return {Date|null} - Date object of last visit or null if not found
     */
    function getLastVisit() {
      try {
        const lastVisit = localStorage.getItem(KEYS.LAST_VISIT);
        return lastVisit ? new Date(lastVisit) : null;
      } catch (error) {
        console.error('Error getting last visit:', error);
        return null;
      }
    }
    
    /**
     * Check if there's a saved quiz to resume
     * @return {boolean} - True if there's a saved quiz to resume
     */
    function hasSavedQuiz() {
      const state = loadQuizState();
      return Boolean(state && state.questions && state.index < state.questions.length);
    }
    
    /**
     * Clear all saved quiz data
     */
    function clearQuizData() {
      try {
        localStorage.removeItem(KEYS.STATE);
        localStorage.removeItem(KEYS.MISSED);
      } catch (error) {
        console.error('Error clearing quiz data:', error);
      }
    }
    
    /**
     * Clear all user data (quiz state, missed questions, statistics, settings)
     */
    function clearAllData() {
      try {
        Object.values(KEYS).forEach(key => {
          localStorage.removeItem(key);
        });
      } catch (error) {
        console.error('Error clearing all data:', error);
      }
    }
    
    /**
     * Export all user data as a JSON object
     * @return {Object} - All user data
     */
    function exportData() {
      try {
        const data = {};
        
        Object.entries(KEYS).forEach(([name, key]) => {
          const value = localStorage.getItem(key);
          if (value) {
            data[name] = JSON.parse(value);
          }
        });
        
        return data;
      } catch (error) {
        console.error('Error exporting data:', error);
        return null;
      }
    }
    
    /**
     * Import user data from a JSON object
     * @param {Object} data - The data to import
     * @return {boolean} - True if import was successful
     */
    function importData(data) {
      try {
        if (!data) return false;
        
        Object.entries(KEYS).forEach(([name, key]) => {
          if (data[name]) {
            localStorage.setItem(key, JSON.stringify(data[name]));
          }
        });
        
        return true;
      } catch (error) {
        console.error('Error importing data:', error);
        return false;
      }
    }
    
    // Check for browser support
    function isSupported() {
      try {
        const testKey = '__test_storage__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    }
    
    /**
     * Track activity date for streak calculation
     */
    function trackActivity() {
      try {
        const today = new Date().toDateString();
        let activityDates = getActivityDates();
        
        // Add today if not already tracked
        if (!activityDates.includes(today)) {
          activityDates.push(today);
          // Keep only last 30 days
          activityDates = activityDates.slice(-30);
          localStorage.setItem(KEYS.ACTIVITY_DATES, JSON.stringify(activityDates));
        }
        
        // Update last activity
        localStorage.setItem(KEYS.LAST_ACTIVITY, new Date().toISOString());
      } catch (error) {
        console.error('Error tracking activity:', error);
      }
    }
    
    /**
     * Get activity dates for streak calculation
     * @return {Array} Array of activity date strings
     */
    function getActivityDates() {
      try {
        const dates = localStorage.getItem(KEYS.ACTIVITY_DATES);
        return dates ? JSON.parse(dates) : [];
      } catch (error) {
        console.error('Error getting activity dates:', error);
        return [];
      }
    }
    
    /**
     * Get last activity timestamp
     * @return {string|null} ISO timestamp of last activity
     */
    function getLastActivity() {
      try {
        return localStorage.getItem(KEYS.LAST_ACTIVITY);
      } catch (error) {
        console.error('Error getting last activity:', error);
        return null;
      }
    }
    
    /**
     * Save difficulty-based statistics
     * @param {Object} difficultyStats - Stats by difficulty level
     */
    function saveDifficultyStats(difficultyStats) {
      try {
        localStorage.setItem(KEYS.DIFFICULTY_STATS, JSON.stringify(difficultyStats));
      } catch (error) {
        console.error('Error saving difficulty stats:', error);
      }
    }
    
    /**
     * Load difficulty-based statistics
     * @return {Object} Stats by difficulty level
     */
    function loadDifficultyStats() {
      try {
        const stats = localStorage.getItem(KEYS.DIFFICULTY_STATS);
        return stats ? JSON.parse(stats) : { easy: {}, medium: {}, hard: {} };
      } catch (error) {
        console.error('Error loading difficulty stats:', error);
        return { easy: {}, medium: {}, hard: {} };
      }
    }
    
    /**
     * Get comprehensive statistics for dashboard
     * @return {Object} Complete user statistics
     */
    function getStats() {
      return {
        ...loadStats(),
        activityDates: getActivityDates(),
        lastActivity: getLastActivity(),
        difficultyStats: loadDifficultyStats()
      };
    }

    // Initialize the module
    function init() {
      if (!isSupported()) {
        console.warn('localStorage is not supported. Quiz progress will not be saved.');
        return false;
      }
      
      updateLastVisit();
      trackActivity();
      return true;
    }
    
    // Public API
    return {
      init,
      saveQuizState,
      loadQuizState,
      saveMissedQuestions,
      loadMissedQuestions,
      updateStats,
      loadStats,
      saveSettings,
      loadSettings,
      getLastVisit,
      hasSavedQuiz,
      clearQuizData,
      clearAllData,
      exportData,
      importData,
      isSupported,
      trackActivity,
      getActivityDates,
      getLastActivity,
      saveDifficultyStats,
      loadDifficultyStats,
      getStats
    };
  })();