/**
 * Utility functions for the Equation Flashcards Application
 * Adapted from AP Physics Quiz utilities
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
                console.log(`⏱️ Performance: ${label} took ${duration.toFixed(2)}ms`);
                this.marks.delete(label);
                return duration;
            }
            return null;
        }
    },

    // String utilities
    sanitizeString: function(str) {
        if (typeof str !== 'string') return '';

        return str.trim()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
            .replace(/[\x00-\x1F\x7F]/g, '')
            .replace(/javascript:/gi, '')
            .replace(/vbscript:/gi, '')
            .replace(/data:/gi, '')
            .replace(/on\w+\s*=/gi, '');
    },

    // Generate a deterministic hash from a string
    simpleHash: function(str) {
        let hash = 0;
        if (str.length === 0) return hash;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
    },

    // Array utilities
    shuffleArray: function(array, inPlace = false) {
        if (!Array.isArray(array) || array.length === 0) {
            return array;
        }

        const arr = inPlace ? array : [...array];

        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
    },

    // CSV parsing
    parseCSV: function(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim());
        if (lines.length < 2) return [];

        const headers = lines[0].split(',').map(h => h.trim());
        const rows = [];

        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length === headers.length) {
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index].trim();
                });
                rows.push(row);
            }
        }

        return rows;
    },

    // Parse a single CSV line handling quoted fields
    parseCSVLine: function(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }

        result.push(current);
        return result;
    },

    // Error handling
    handleError: function(error, context = '', level = 'error') {
        const message = `Error in ${context}: ${error.message}`;

        if (level === 'error') {
            console.error('❌', message, error);
        } else if (level === 'warning') {
            console.warn('⚠️', message);
        } else {
            console.log('ℹ️', message);
        }

        return false;
    },

    // Date/time utilities
    formatDate: function(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    },

    formatTime: function(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    },

    // DOM utilities
    createElement: function(tag, className = '', content = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.textContent = content;
        return element;
    },

    // Debounce function for performance
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

    // Announce to screen reader
    announceToScreenReader: function(message, ariaLive = 'polite') {
        const announcer = document.getElementById(`${ariaLive}-announcer`) ||
                         document.getElementById('card-announcer');
        if (announcer) {
            announcer.textContent = message;
            console.log(`📢 Screen reader: ${message}`);
        }
    }
};

// Make Utils globally available
if (typeof window !== 'undefined') {
    window.Utils = Utils;
}
