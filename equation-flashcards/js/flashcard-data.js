/**
 * Data management for Equation Flashcards
 * Handles CSV loading, parsing, filtering, and validation
 */

const FlashcardData = {
    allEquations: [],
    filteredEquations: [],
    currentFilters: {
        category: 'all',
        difficulty: 'all'
    },
    isLoaded: false,

    // Initialize data module
    init: async function() {
        console.log('📚 Initializing Flashcard Data...');

        try {
            await this.loadEquations();
            this.applyFilters();
            this.isLoaded = true;
            console.log(`✅ Loaded ${this.allEquations.length} equations`);

            // Dispatch loaded event
            document.dispatchEvent(new CustomEvent('dataLoaded', {
                detail: { count: this.allEquations.length }
            }));

            return true;
        } catch (error) {
            Utils.handleError(error, 'FlashcardData.init', 'error');
            return false;
        }
    },

    // Load equations from CSV
    loadEquations: async function() {
        const csvPath = 'data/regents-equations.csv';

        try {
            const response = await fetch(csvPath);

            if (!response.ok) {
                throw new Error(`Failed to load CSV: ${response.status} ${response.statusText}`);
            }

            const csvText = await response.text();
            this.allEquations = this.parseCSV(csvText);

            if (this.allEquations.length === 0) {
                throw new Error('No equations found in CSV file');
            }

            console.log(`✅ Parsed ${this.allEquations.length} equations from CSV`);
            return this.allEquations;

        } catch (error) {
            console.error('❌ Failed to load equations:', error);
            alert('Failed to load equation data. Please refresh the page.');
            throw error;
        }
    },

    // Parse CSV text into equation objects
    parseCSV: function(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim() && !line.startsWith('#'));

        if (lines.length < 2) {
            throw new Error('CSV file is empty or invalid');
        }

        // Parse header
        const headers = this.parseCSVLine(lines[0]);
        const equations = [];

        // Parse data rows
        for (let i = 1; i < lines.length; i++) {
            try {
                const values = this.parseCSVLine(lines[i]);

                if (values.length !== headers.length) {
                    console.warn(`⚠️ Row ${i + 1} has ${values.length} values, expected ${headers.length}`);
                    continue;
                }

                const equation = {};
                headers.forEach((header, index) => {
                    equation[header] = values[index];
                });

                // Validate required fields
                if (this.validateEquation(equation, i + 1)) {
                    // Convert difficulty to number
                    equation.difficulty = parseInt(equation.difficulty) || 1;

                    equations.push(equation);
                }
            } catch (error) {
                console.warn(`⚠️ Error parsing line ${i + 1}:`, error);
            }
        }

        return equations;
    },

    // Parse a single CSV line (handles quoted fields)
    parseCSVLine: function(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
                if (inQuotes && line[i + 1] === '"') {
                    // Escaped quote
                    current += '"';
                    i++;
                } else {
                    // Toggle quote state
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                // Field separator
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }

        // Push final field
        result.push(current.trim());
        return result;
    },

    // Validate equation object
    validateEquation: function(equation, lineNumber) {
        const required = ['id', 'equation', 'name', 'variables', 'category', 'difficulty', 'audioDescription'];

        for (const field of required) {
            if (!equation[field] || equation[field].trim() === '') {
                console.warn(`⚠️ Line ${lineNumber}: Missing required field '${field}'`);
                return false;
            }
        }

        return true;
    },

    // === Filtering ===

    applyFilters: function() {
        Utils.performance.start('applyFilters');

        let filtered = [...this.allEquations];

        // Category filter
        if (this.currentFilters.category !== 'all') {
            filtered = filtered.filter(eq =>
                eq.category.toLowerCase() === this.currentFilters.category.toLowerCase()
            );
        }

        // Difficulty filter
        if (this.currentFilters.difficulty !== 'all') {
            filtered = filtered.filter(eq =>
                eq.difficulty === parseInt(this.currentFilters.difficulty)
            );
        }

        this.filteredEquations = filtered;

        Utils.performance.end('applyFilters');

        console.log(`🔍 Filtered to ${filtered.length} equations`);

        // Dispatch filter event
        document.dispatchEvent(new CustomEvent('filtersApplied', {
            detail: {
                count: filtered.length,
                filters: this.currentFilters
            }
        }));

        return filtered;
    },

    setFilter: function(filterType, value) {
        if (this.currentFilters.hasOwnProperty(filterType)) {
            this.currentFilters[filterType] = value;
            this.applyFilters();

            // Save filter preference
            FlashcardStorage.setSetting(`${filterType}Filter`, value);

            return true;
        }
        return false;
    },

    clearFilters: function() {
        this.currentFilters.category = 'all';
        this.currentFilters.difficulty = 'all';
        this.applyFilters();

        // Clear saved filters
        FlashcardStorage.setSetting('categoryFilter', 'all');
        FlashcardStorage.setSetting('difficultyFilter', 'all');
    },

    loadSavedFilters: function() {
        this.currentFilters.category = FlashcardStorage.getSetting('categoryFilter', 'all');
        this.currentFilters.difficulty = FlashcardStorage.getSetting('difficultyFilter', 'all');
        this.applyFilters();
    },

    // === Getters ===

    getFilteredEquations: function() {
        return this.filteredEquations;
    },

    getAllEquations: function() {
        return this.allEquations;
    },

    getEquationById: function(id) {
        return this.allEquations.find(eq => eq.id === id);
    },

    getEquationByIndex: function(index) {
        if (index >= 0 && index < this.filteredEquations.length) {
            return this.filteredEquations[index];
        }
        return null;
    },

    getEquationCount: function() {
        return this.filteredEquations.length;
    },

    getTotalCount: function() {
        return this.allEquations.length;
    },

    // === Categories ===

    getCategories: function() {
        const categories = new Set();
        this.allEquations.forEach(eq => {
            categories.add(eq.category);
        });
        return Array.from(categories).sort();
    },

    getCategoryCount: function(category) {
        return this.allEquations.filter(eq =>
            eq.category.toLowerCase() === category.toLowerCase()
        ).length;
    },

    getCategoryCounts: function() {
        const counts = {};
        this.allEquations.forEach(eq => {
            const cat = eq.category;
            counts[cat] = (counts[cat] || 0) + 1;
        });
        return counts;
    },

    // === Search ===

    searchEquations: function(query) {
        if (!query || query.trim() === '') {
            return this.filteredEquations;
        }

        const lowerQuery = query.toLowerCase().trim();

        return this.filteredEquations.filter(eq => {
            return eq.name.toLowerCase().includes(lowerQuery) ||
                   eq.equation.toLowerCase().includes(lowerQuery) ||
                   eq.variables.toLowerCase().includes(lowerQuery) ||
                   eq.category.toLowerCase().includes(lowerQuery);
        });
    },

    // === Statistics ===

    getStatistics: function() {
        return {
            total: this.allEquations.length,
            filtered: this.filteredEquations.length,
            categories: this.getCategories().length,
            difficultyCounts: this.getDifficultyCounts()
        };
    },

    getDifficultyCounts: function() {
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        this.allEquations.forEach(eq => {
            const diff = eq.difficulty || 1;
            counts[diff] = (counts[diff] || 0) + 1;
        });
        return counts;
    },

    // === Variable Parsing ===

    parseVariables: function(variablesString) {
        if (!variablesString) return [];

        const variables = [];
        const parts = variablesString.split(';');

        parts.forEach(part => {
            const match = part.trim().match(/^(.+?):\s*(.+)$/);
            if (match) {
                variables.push({
                    symbol: match[1].trim(),
                    definition: match[2].trim()
                });
            }
        });

        return variables;
    },

    getVariablesFormatted: function(equation) {
        const variables = this.parseVariables(equation.variables);
        return variables.map(v => `${v.symbol}: ${v.definition}`).join('\n');
    }
};

// Make globally available
if (typeof window !== 'undefined') {
    window.FlashcardData = FlashcardData;
}
