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

    // Enhanced physics answer matching with smart algorithms
    answersMatch: function(userAnswer, correctAnswer, alternateAnswers = []) {
        if (!userAnswer || !correctAnswer) return false;

        // Use enhanced smart matching system
        return this.smartAnswerMatch(userAnswer, correctAnswer, alternateAnswers);
    },

    // Smart answer matching with comprehensive algorithms and error handling
    smartAnswerMatch: function(userAnswer, correctAnswer, alternateAnswers = []) {
        try {
            if (!userAnswer || !correctAnswer) return false;

            // Convert to strings and basic cleanup
            const userStr = String(userAnswer).toLowerCase().trim();
            const correctStr = String(correctAnswer).toLowerCase().trim();

            // 1. Direct exact match
            if (userStr === correctStr) return true;

            // 2. Enhanced mathematical expression matching
            if (this.isMathematicalExpression(correctStr) || this.isMathematicalExpression(userStr)) {
                if (this.mathExpressionsMatch(userStr, correctStr)) return true;
            }

            // 3. Enhanced unit matching
            if (this.containsUnits(correctStr) || this.containsUnits(userStr)) {
                if (this.unitsMatch(userStr, correctStr)) return true;
            }

            // 4. Improved numerical matching with smart tolerance
            const numericResult = this.smartNumericalMatch(userStr, correctStr);
            if (numericResult) return true;

            // 5. Enhanced text normalization and matching
            const normalizedUser = this.advancedNormalize(userStr);
            const normalizedCorrect = this.advancedNormalize(correctStr);
            if (normalizedUser === normalizedCorrect) return true;

            // 6. Check alternate answers with same algorithms
            const alternates = this.parseAlternateAnswers(alternateAnswers);
            for (let alt of alternates) {
                if (alt && this.smartAnswerMatch(userAnswer, alt)) return true;
            }

            // 7. Physics-specific concept matching
            if (this.physicsConceptsMatch(normalizedUser, normalizedCorrect)) return true;

            return false;
        } catch (error) {
            this.handleError(error, 'smartAnswerMatch', 'warning');
            // Fallback to basic string comparison
            return String(userAnswer).toLowerCase().trim() === String(correctAnswer).toLowerCase().trim();
        }
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

    // Enhanced mathematical expression matching
    mathExpressionsMatch: function(user, correct) {
        const userMath = this.normalizeMathExpression(user);
        const correctMath = this.normalizeMathExpression(correct);
        
        if (userMath === correctMath) return true;

        const variations = this.getMathVariations(correctMath);
        return variations.includes(userMath);
    },

    // Normalize mathematical expressions
    normalizeMathExpression: function(expr) {
        return expr
            .replace(/v_?f/g, 'vf')
            .replace(/v_?o/g, 'vo')
            .replace(/v_?i/g, 'vo')
            .replace(/×/g, '*')
            .replace(/·/g, '*')
            .replace(/\s*\*\s*/g, '*')
            .replace(/\s*\+\s*/g, '+')
            .replace(/\s*-\s*/g, '-')
            .replace(/\s*=\s*/g, '=')
            .replace(/\^2/g, '²')
            .replace(/\*\*2/g, '²')
            .replace(/\s+/g, '')
            .trim();
    },

    // Generate math variations
    getMathVariations: function(expr) {
        const variations = [expr];
        variations.push(expr.replace(/([=+\-*/])/g, ' $1 '));
        
        if (expr.includes('²') && expr.includes('vo')) {
            variations.push(expr.replace('vf²', 'v²f'));
            variations.push(expr.replace('vo²', 'v²o'));
            variations.push(expr.replace('vf² = vo² + 2ax', 'v²-v²₀=2ax'));
        }

        if (expr.includes('f=ma')) {
            variations.push('force=mass*acceleration', 'f=m*a');
        }
        
        return variations;
    },

    // Enhanced unit matching
    unitsMatch: function(user, correct) {
        const userUnits = this.extractAndNormalizeUnits(user);
        const correctUnits = this.extractAndNormalizeUnits(correct);
        
        if (userUnits === correctUnits) return true;
        return this.areUnitsEquivalent(userUnits, correctUnits);
    },

    // Extract and normalize units
    extractAndNormalizeUnits: function(text) {
        return text.toLowerCase()
            .replace(/metres?\s*per\s*second\s*squared/g, 'm/s²')
            .replace(/metres?\s*per\s*second/g, 'm/s')
            .replace(/meters?\s*per\s*second\s*squared/g, 'm/s²')
            .replace(/meters?\s*per\s*second/g, 'm/s')
            .replace(/m\/s\/s/g, 'm/s²')
            .replace(/kg\s*m\/s/g, 'kg·m/s')
            .replace(/kg\*m\/s/g, 'kg·m/s')
            .replace(/\b(newtons?|n)\b/g, 'N')
            .replace(/\b(joules?|j)\b/g, 'J')
            .replace(/\b(watts?|w)\b/g, 'W')
            .trim();
    },

    // Check unit equivalency
    areUnitsEquivalent: function(unit1, unit2) {
        const equivalents = {
            'N': ['kg·m/s²', 'kg*m/s²'],
            'J': ['N·m', 'N*m'],
            'W': ['J/s'],
            'N·s': ['kg·m/s', 'kg*m/s'],
        };

        for (const [standard, variations] of Object.entries(equivalents)) {
            if ((unit1 === standard && variations.includes(unit2)) ||
                (unit2 === standard && variations.includes(unit1))) {
                return true;
            }
        }
        return false;
    },

    // Smart numerical matching
    smartNumericalMatch: function(user, correct) {
        const userNum = this.extractNumber(user);
        const correctNum = this.extractNumber(correct);
        
        if (userNum === null || correctNum === null) return false;

        const tolerance = this.getSmartTolerance(correctNum, user, correct);
        return Math.abs(userNum - correctNum) <= tolerance;
    },

    // Enhanced number extraction with error handling
    extractNumber: function(text) {
        try {
            const scientificMatch = text.match(/(\d+\.?\d*)\s*[×*]\s*10\^?([+-]?\d+)/i);
            if (scientificMatch) {
                const base = parseFloat(scientificMatch[1]);
                const exponent = parseInt(scientificMatch[2]);
                if (isNaN(base) || isNaN(exponent)) return null;
                return base * Math.pow(10, exponent);
            }

            const fractionMatch = text.match(/(\d+\.?\d*)\/(\d+\.?\d*)/);
            if (fractionMatch) {
                const num = parseFloat(fractionMatch[1]);
                const den = parseFloat(fractionMatch[2]);
                if (isNaN(num) || isNaN(den) || den === 0) return null;
                return num / den;
            }

            const cleaned = text.replace(/[^\d.e\-+]/g, '');
            const num = parseFloat(cleaned);
            return isNaN(num) ? null : num;
        } catch (error) {
            this.handleError(error, 'extractNumber', 'warning');
            return null;
        }
    },

    // Smart tolerance calculation
    getSmartTolerance: function(number, userText, correctText) {
        const absNum = Math.abs(number);
        
        if (Number.isInteger(number) && absNum <= 100) return 0.1;
        if (correctText.includes('×') || correctText.includes('e-')) return absNum * 0.01;
        if (absNum < 1) return absNum * 0.05;
        if (absNum < 10) return 0.1;
        if (absNum < 100) return 1;
        return absNum * 0.02;
    },

    // Advanced text normalization
    advancedNormalize: function(text) {
        return text.toLowerCase().trim()
            .replace(/\b(the|a|an|is|are|of|to|in|at|on|for|with|by)\b/g, '')
            .replace(/\b(pythagorean|pythagoras)\b/g, 'pythagorean')
            .replace(/\b(opposite|opposing|against|contrary to)\b/g, 'opposite')
            .replace(/\b(straight line|line|linear path)\b/g, 'straightline')
            .replace(/\b(away from|farther from|further from)\b/g, 'away')
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    },

    // Enhanced physics concept matching
    physicsConceptsMatch: function(user, correct) {
        const concepts = {
            'force': ['f', 'net force'],
            'acceleration': ['accel', 'a'],
            'velocity': ['v', 'speed', 'vel'],
            'momentum': ['p', 'linear momentum'],
            'torque': ['τ', 'tau', 'moment'],
        };

        for (const [concept, synonyms] of Object.entries(concepts)) {
            if ((user === concept && synonyms.includes(correct)) ||
                (correct === concept && synonyms.includes(user))) {
                return true;
            }
        }
        return false;
    },

    // Utility functions for enhanced matching
    isMathematicalExpression: function(text) {
        return /[=+\-*/^²³√]/.test(text) || /\b[a-z]²?\b/.test(text);
    },

    containsUnits: function(text) {
        return /\b(m\/s²?|kg|N|J|W|Pa|rad|°)\b/i.test(text);
    },

    parseAlternateAnswers: function(alternates) {
        if (Array.isArray(alternates)) return alternates;
        if (typeof alternates === 'string') {
            return alternates.split(',').map(s => s.trim()).filter(s => s.length > 0);
        }
        return [];
    },

    // Application health check and validation
    validateApplicationHealth: function() {
        const healthReport = {
            overall: 'healthy',
            issues: [],
            timestamp: new Date().toISOString(),
            checks: {
                dom: false,
                storage: false,
                networking: false,
                dependencies: false
            }
        };

        try {
            // 1. DOM Health Check
            const criticalElements = [
                'start-screen', 'quiz-container', 'question-container',
                'start-quiz', 'next-question', 'prev-question'
            ];
            
            let missingElements = [];
            for (const elementId of criticalElements) {
                if (!document.getElementById(elementId)) {
                    missingElements.push(elementId);
                }
            }
            
            if (missingElements.length === 0) {
                healthReport.checks.dom = true;
            } else {
                healthReport.issues.push(`Missing DOM elements: ${missingElements.join(', ')}`);
                healthReport.overall = 'degraded';
            }

            // 2. Storage Health Check
            try {
                const testKey = 'health_check_test';
                const testValue = { test: true, timestamp: Date.now() };
                localStorage.setItem(testKey, JSON.stringify(testValue));
                const retrieved = JSON.parse(localStorage.getItem(testKey));
                localStorage.removeItem(testKey);
                
                if (retrieved && retrieved.test === true) {
                    healthReport.checks.storage = true;
                } else {
                    throw new Error('Storage retrieval failed');
                }
            } catch (storageError) {
                healthReport.issues.push(`Storage not working: ${storageError.message}`);
                healthReport.overall = 'critical';
            }

            // 3. Network Health Check
            healthReport.checks.networking = navigator.onLine;
            if (!navigator.onLine) {
                healthReport.issues.push('Network connection unavailable');
                healthReport.overall = healthReport.overall === 'healthy' ? 'degraded' : healthReport.overall;
            }

            // 4. Dependencies Health Check
            const requiredGlobals = ['KaTeX', 'marked'];
            let missingDeps = [];
            for (const dep of requiredGlobals) {
                if (typeof window[dep] === 'undefined') {
                    missingDeps.push(dep);
                }
            }
            
            if (missingDeps.length === 0) {
                healthReport.checks.dependencies = true;
            } else {
                healthReport.issues.push(`Missing dependencies: ${missingDeps.join(', ')}`);
                healthReport.overall = 'degraded';
            }

            // Log health status
            const icon = healthReport.overall === 'healthy' ? '✅' : 
                        healthReport.overall === 'degraded' ? '⚠️' : '🚨';
            console.log(`${icon} Application Health: ${healthReport.overall.toUpperCase()}`);
            
            if (healthReport.issues.length > 0) {
                console.warn('Health Issues:', healthReport.issues);
            }

        } catch (error) {
            healthReport.overall = 'critical';
            healthReport.issues.push(`Health check failed: ${error.message}`);
            this.handleError(error, 'validateApplicationHealth', 'critical');
        }

        return healthReport;
    },

    // Enhanced input validation
    validateUserInput: function(input, type = 'text', options = {}) {
        const result = {
            isValid: true,
            value: input,
            errors: [],
            sanitized: null
        };

        try {
            if (input === null || input === undefined) {
                result.isValid = false;
                result.errors.push('Input is required');
                return result;
            }

            const inputStr = String(input).trim();
            
            switch (type) {
                case 'answer':
                    // Validate quiz answer input
                    if (inputStr.length === 0) {
                        result.isValid = false;
                        result.errors.push('Answer cannot be empty');
                    } else if (inputStr.length > 500) {
                        result.isValid = false;
                        result.errors.push('Answer is too long (max 500 characters)');
                    } else {
                        // Sanitize but preserve mathematical notation
                        result.sanitized = inputStr.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                        result.value = result.sanitized;
                    }
                    break;

                case 'number':
                    const num = parseFloat(inputStr);
                    if (isNaN(num)) {
                        result.isValid = false;
                        result.errors.push('Input must be a valid number');
                    } else {
                        result.value = num;
                        result.sanitized = num;
                    }
                    break;

                case 'text':
                default:
                    if (inputStr.length > (options.maxLength || 1000)) {
                        result.isValid = false;
                        result.errors.push(`Text is too long (max ${options.maxLength || 1000} characters)`);
                    } else {
                        // Basic XSS protection
                        result.sanitized = inputStr
                            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                            .replace(/javascript:/gi, '')
                            .replace(/on\w+=/gi, '');
                        result.value = result.sanitized;
                    }
                    break;
            }
        } catch (error) {
            result.isValid = false;
            result.errors.push(`Validation error: ${error.message}`);
            this.handleError(error, 'validateUserInput', 'warning');
        }

        return result;
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