/**
 * Utility functions for the AP Physics Quiz Application
 */

const Utils = {
    // Performance monitoring
    performance: {
        marks: new Map(),
        
        start: function(label) {
            this.marks.set(label, performance.now());
        },
        
        end: function(label) {
            const startTime = this.marks.get(label);
            if (startTime) {
                const duration = performance.now() - startTime;
                console.log(`Performance: ${label} took ${duration.toFixed(2)}ms`);
                this.marks.delete(label);
                return duration;
            }
            return null;
        }
    },

    // String utilities
    sanitizeString: function(str) {
        if (typeof str !== 'string') return '';
        return str.trim().replace(/[<>]/g, '');
    },

    // Number utilities
    parseNumber: function(value) {
        const num = parseFloat(value);
        return isNaN(num) ? null : num;
    },

    // Array utilities
    shuffleArray: function(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // Answer comparison utilities  
    normalizeAnswer: function(answer) {
        if (typeof answer !== 'string') return String(answer).toLowerCase();
        
        let normalized = answer.toLowerCase().trim();
        
        // Handle units first (before breaking them apart)
        normalized = normalized
            .replace(/meters?\s+per\s+second\s+squared/g, 'm/s²')
            .replace(/meters?\s+per\s+second/g, 'm/s')
            .replace(/metres?\s+per\s+second\s+squared/g, 'm/s²')
            .replace(/metres?\s+per\s+second/g, 'm/s');
        
        // Then normalize other terms
        normalized = normalized
            .replace(/[^\w\s.-°/²³]+/g, '') // Keep letters, numbers, spaces, -, ., °, /, superscripts
            .replace(/\s+/g, ' ') // Normalize whitespace
            .replace(/\b(meters?|metre?s?)\b/g, 'm')
            .replace(/\b(seconds?)\b/g, 's')
            .replace(/\b(kilograms?)\b/g, 'kg')
            .replace(/\b(newtons?)\b/g, 'n')
            .replace(/\b(joules?)\b/g, 'j')
            .replace(/\b(watts?)\b/g, 'w')
            .replace(/degrees?/g, '°')
            .trim();
            
        return normalized;
    },

    // Enhanced physics answer matching
    answersMatch: function(userAnswer, correctAnswer, alternateAnswers = []) {
        if (!userAnswer || !correctAnswer) return false;

        // Convert to strings and handle boolean answers
        const userStr = String(userAnswer).toLowerCase().trim();
        const correctStr = String(correctAnswer).toLowerCase().trim();

        // Direct string comparison for exact matches
        if (userStr === correctStr) return true;

        // Normalize both answers
        const normalizedUser = this.normalizeAnswer(userAnswer);
        const normalizedCorrect = this.normalizeAnswer(correctAnswer);
        
        if (normalizedUser === normalizedCorrect) return true;
        
        // Check alternate answers
        const alternates = Array.isArray(alternateAnswers) ? alternateAnswers : 
                          (typeof alternateAnswers === 'string' ? alternateAnswers.split(',') : []);
        
        for (let alt of alternates) {
            if (alt && this.normalizeAnswer(alt.trim()) === normalizedUser) return true;
        }

        // Numerical comparison with tolerance for physics calculations
        const userNum = this.parseNumber(userAnswer);
        const correctNum = this.parseNumber(correctAnswer);
        
        if (userNum !== null && correctNum !== null) {
            const tolerance = this.getNumberTolerance(correctNum);
            if (Math.abs(userNum - correctNum) <= tolerance) return true;
        }

        // Physics-specific matching
        return this.physicsSpecificMatch(normalizedUser, normalizedCorrect);
    },

    // Get appropriate numerical tolerance based on the magnitude
    getNumberTolerance: function(number) {
        const absNum = Math.abs(number);
        if (absNum === 0) return 0.01;
        if (absNum < 1) return absNum * 0.1; // 10% for small numbers
        if (absNum < 10) return 0.5; // Allow 0.5 tolerance for single digits
        if (absNum < 100) return 1.5; // Slightly more tolerance
        return absNum * 0.05; // 5% for large numbers
    },

    // Physics-specific matching logic
    physicsSpecificMatch: function(userAnswer, correctAnswer) {
        // Common physics answer variations
        const variations = {
            // Common physics terms
            'acceleration': ['accel', 'a'],
            'velocity': ['vel', 'v', 'speed'],
            'displacement': ['position', 'distance', 'x', 's'],
            'force': ['f'],
            'mass': ['m'],
            'time': ['t'],
            'energy': ['e'],
            'power': ['p'],
            'momentum': ['p'],
            'frequency': ['freq', 'f'],
            'wavelength': ['lambda', 'λ'],
            'amplitude': ['amp', 'a'],
            'period': ['t'],
            
            // Units
            'meters per second': ['m/s', 'ms-1', 'ms^-1', 'mps'],
            'meters per second squared': ['m/s²', 'm/s2', 'ms-2', 'ms^-2', 'm/s^2'],
            'm/s': ['meters per second', 'mps', 'ms-1'],
            'm/s²': ['meters per second squared', 'm/s2', 'm/s^2', 'ms-2'],
            'm/s2': ['m/s²', 'meters per second squared', 'm/s^2'],
            'newtons': ['n'],
            'joules': ['j'],
            'watts': ['w'],
            'hertz': ['hz'],
            
            // Common answers
            'kinetic energy': ['ke', 'kinetic'],
            'potential energy': ['pe', 'potential'],
            'gravitational potential energy': ['gpe', 'gravitational pe'],
            'moment of inertia': ['rotational inertia', 'moment inertia', 'inertia'],
            
            // Boolean variations
            'true': ['yes', 't', '1', 'correct'],
            'false': ['no', 'f', '0', 'incorrect'],
            
            // Directional terms
            'upward': ['up'],
            'downward': ['down'],
            'toward center': ['inward', 'centripetal'],
            'away from center': ['outward', 'centrifugal']
        };

        // Check variations
        for (const [canonical, alts] of Object.entries(variations)) {
            if (correctAnswer === canonical && alts.includes(userAnswer)) return true;
            if (userAnswer === canonical && alts.includes(correctAnswer)) return true;
        }

        // Check if words are contained within each other (for partial matches)
        if (userAnswer.length > 3 && correctAnswer.length > 3) {
            if (userAnswer.includes(correctAnswer) || correctAnswer.includes(userAnswer)) {
                return true;
            }
        }

        return false;
    },

    // DOM utilities
    createElement: function(tag, className = '', innerHTML = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    },

    // Local storage utilities
    storage: {
        get: function(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.warn('Error reading from localStorage:', error);
                return defaultValue;
            }
        },
        
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.warn('Error writing to localStorage:', error);
                return false;
            }
        },
        
        remove: function(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.warn('Error removing from localStorage:', error);
                return false;
            }
        }
    },

    // Enhanced error handling with categorization
    handleError: function(error, context = '', severity = 'error') {
        const timestamp = new Date().toISOString();
        const errorMessage = error?.message || String(error);
        const errorStack = error?.stack || 'No stack trace available';
        
        // Log to console with appropriate level
        switch (severity) {
            case 'warning':
                console.warn(`⚠️ Warning in ${context}:`, errorMessage);
                break;
            case 'critical':
                console.error(`🚨 Critical error in ${context}:`, errorMessage);
                break;
            default:
                console.error(`❌ Error in ${context}:`, errorMessage);
        }
        
        // Enhanced error info with browser context
        const errorInfo = {
            message: errorMessage,
            stack: errorStack,
            context: context,
            severity: severity,
            timestamp: timestamp,
            url: window.location.href,
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            online: navigator.onLine
        };
        
        // Store error for debugging with size management
        try {
            const errors = this.storage.get('quiz_errors', []);
            errors.push(errorInfo);
            
            // Keep only last 20 errors, prioritizing critical ones
            if (errors.length > 20) {
                const sortedErrors = errors.sort((a, b) => {
                    if (a.severity === 'critical' && b.severity !== 'critical') return -1;
                    if (b.severity === 'critical' && a.severity !== 'critical') return 1;
                    return new Date(b.timestamp) - new Date(a.timestamp);
                });
                errors.splice(0, errors.length);
                errors.push(...sortedErrors.slice(0, 20));
            }
            
            this.storage.set('quiz_errors', errors);
        } catch (storageError) {
            console.warn('Failed to store error information:', storageError);
        }
        
        // Report critical errors to user
        if (severity === 'critical') {
            this.reportCriticalError(errorInfo);
        }
    },

    // Report critical errors to user
    reportCriticalError: function(errorInfo) {
        // Avoid infinite loops
        if (this._reportingError) return;
        this._reportingError = true;
        
        setTimeout(() => {
            if (window.PhysicsQuizApp && typeof PhysicsQuizApp.showCriticalError === 'function') {
                PhysicsQuizApp.showCriticalError(
                    'Critical Error Detected',
                    `A critical error occurred in ${errorInfo.context}. The application may not work properly.`,
                    () => window.location.reload()
                );
            }
            this._reportingError = false;
        }, 100);
    },

    // Network connectivity monitoring
    networkStatus: {
        isOnline: navigator.onLine,
        listeners: [],
        
        init: function() {
            window.addEventListener('online', () => {
                this.isOnline = true;
                this.notifyListeners(true);
                Utils.handleError(new Error('Network connection restored'), 'NetworkStatus', 'warning');
            });
            
            window.addEventListener('offline', () => {
                this.isOnline = false;
                this.notifyListeners(false);
                Utils.handleError(new Error('Network connection lost'), 'NetworkStatus', 'warning');
            });
        },
        
        addListener: function(callback) {
            this.listeners.push(callback);
        },
        
        notifyListeners: function(isOnline) {
            this.listeners.forEach(callback => {
                try {
                    callback(isOnline);
                } catch (error) {
                    Utils.handleError(error, 'NetworkStatus listener');
                }
            });
        }
    },

    // Debounce utility
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format time for display
    formatTime: function(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}