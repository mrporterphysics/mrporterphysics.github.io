/**
 * Enhanced Answer Matching System for AP Physics Quiz
 * Comprehensive smart matching algorithms for mathematical expressions, units, and physics concepts
 */

const EnhancedAnswerMatching = {
    
    /**
     * Main answer matching function with improved algorithms
     */
    smartAnswerMatch: function(userAnswer, correctAnswer, alternateAnswers = []) {
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
            if (this.smartAnswerMatch(userAnswer, alt)) return true;
        }

        // 7. Physics-specific concept matching
        if (this.physicsConceptsMatch(normalizedUser, normalizedCorrect)) return true;

        return false;
    },

    /**
     * Enhanced mathematical expression matching
     */
    mathExpressionsMatch: function(user, correct) {
        // Normalize mathematical expressions
        const userMath = this.normalizeMathExpression(user);
        const correctMath = this.normalizeMathExpression(correct);
        
        if (userMath === correctMath) return true;

        // Handle common mathematical variations
        const variations = this.getMathVariations(correctMath);
        return variations.includes(userMath);
    },

    /**
     * Normalize mathematical expressions
     */
    normalizeMathExpression: function(expr) {
        return expr
            // Standardize variable names
            .replace(/v_?f/g, 'vf')
            .replace(/v_?o/g, 'vo') 
            .replace(/v_?i/g, 'vo')
            .replace(/x_?f/g, 'xf')
            .replace(/x_?o/g, 'xo')
            .replace(/x_?i/g, 'xo')
            // Standardize mathematical operators
            .replace(/×/g, '*')
            .replace(/·/g, '*')
            .replace(/\s*\*\s*/g, '*')
            .replace(/\s*\+\s*/g, '+')
            .replace(/\s*-\s*/g, '-')
            .replace(/\s*=\s*/g, '=')
            // Handle exponents
            .replace(/\^2/g, '²')
            .replace(/\*\*2/g, '²')
            .replace(/\^3/g, '³')
            .replace(/\*\*3/g, '³')
            // Remove extra spaces
            .replace(/\s+/g, '')
            .trim();
    },

    /**
     * Generate common variations of mathematical expressions
     */
    getMathVariations: function(expr) {
        const variations = [expr];
        
        // Add variations with different spacing
        variations.push(expr.replace(/([=+\-*/])/g, ' $1 '));
        
        // Add variations with parentheses rearranged
        if (expr.includes('²') && expr.includes('vo')) {
            // vf² = vo² + 2ax variations
            variations.push(expr.replace('vf²', 'v²f'));
            variations.push(expr.replace('vo²', 'v²o'));
            variations.push(expr.replace('vf² = vo² + 2ax', 'v²-v²₀=2ax'));
        }

        // Common physics equation variations
        if (expr.includes('f=ma')) {
            variations.push('force=mass*acceleration', 'f=m*a', 'force equals mass times acceleration');
        }
        
        return variations;
    },

    /**
     * Enhanced unit matching
     */
    unitsMatch: function(user, correct) {
        const userUnits = this.extractAndNormalizeUnits(user);
        const correctUnits = this.extractAndNormalizeUnits(correct);
        
        if (userUnits === correctUnits) return true;

        // Check unit equivalents
        return this.areUnitsEquivalent(userUnits, correctUnits);
    },

    /**
     * Extract and normalize units
     */
    extractAndNormalizeUnits: function(text) {
        // Unit normalization patterns
        return text
            .toLowerCase()
            // Basic SI units
            .replace(/metres?(?:\s*per\s*second\s*squared)?/g, 'm/s²')
            .replace(/metres?\s*per\s*second/g, 'm/s')
            .replace(/meters?\s*per\s*second\s*squared/g, 'm/s²')
            .replace(/meters?\s*per\s*second/g, 'm/s')
            .replace(/m\/s\/s/g, 'm/s²')
            .replace(/meters?\s*per\s*second\s*squared/g, 'm/s²')
            .replace(/kilograms?\s*meters?\s*per\s*second/g, 'kg·m/s')
            .replace(/kg\s*m\/s/g, 'kg·m/s')
            .replace(/kg\*m\/s/g, 'kg·m/s')
            .replace(/newtons?\s*meters?/g, 'N·m')
            .replace(/n\s*m/g, 'N·m')
            .replace(/joules?\s*per\s*second/g, 'W')
            .replace(/j\/s/g, 'W')
            // Normalize common unit abbreviations
            .replace(/\b(newtons?|n)\b/g, 'N')
            .replace(/\b(joules?|j)\b/g, 'J')
            .replace(/\b(watts?|w)\b/g, 'W')
            .replace(/\b(pascals?|pa)\b/g, 'Pa')
            .replace(/\b(radians?\s*per\s*second|rad\/s)\b/g, 'rad/s')
            .replace(/\b(radians?|rad)\b/g, 'rad')
            .trim();
    },

    /**
     * Check if units are equivalent
     */
    areUnitsEquivalent: function(unit1, unit2) {
        const equivalents = {
            'N': ['kg·m/s²', 'kg*m/s²', 'kg m/s²'],
            'J': ['N·m', 'N*m', 'kg·m²/s²', 'kg*m²/s²'],
            'W': ['J/s', 'kg·m²/s³', 'kg*m²/s³'],
            'Pa': ['N/m²', 'kg/(m·s²)', 'kg/(m*s²)'],
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

    /**
     * Smart numerical matching with contextual tolerance
     */
    smartNumericalMatch: function(user, correct) {
        const userNum = this.extractNumber(user);
        const correctNum = this.extractNumber(correct);
        
        if (userNum === null || correctNum === null) return false;

        // Context-aware tolerance
        const tolerance = this.getSmartTolerance(correctNum, user, correct);
        
        return Math.abs(userNum - correctNum) <= tolerance;
    },

    /**
     * Extract numerical value with better parsing
     */
    extractNumber: function(text) {
        // Remove common non-numeric words but keep scientific notation
        const cleaned = text.replace(/[^\d.e\-+×*^/]/gi, '');
        
        // Handle scientific notation
        const scientificMatch = text.match(/(\d+\.?\d*)\s*[×*]\s*10\^?([+-]?\d+)/i);
        if (scientificMatch) {
            const base = parseFloat(scientificMatch[1]);
            const exponent = parseInt(scientificMatch[2]);
            return base * Math.pow(10, exponent);
        }

        // Handle fractions
        const fractionMatch = text.match(/(\d+\.?\d*)\/(\d+\.?\d*)/);
        if (fractionMatch) {
            return parseFloat(fractionMatch[1]) / parseFloat(fractionMatch[2]);
        }

        // Handle square root expressions
        const sqrtMatch = text.match(/√(\d+\.?\d*)/);
        if (sqrtMatch) {
            return Math.sqrt(parseFloat(sqrtMatch[1]));
        }

        // Regular number parsing
        const num = parseFloat(cleaned);
        return isNaN(num) ? null : num;
    },

    /**
     * Get context-aware tolerance for numerical comparison
     */
    getSmartTolerance: function(number, userText, correctText) {
        const absNum = Math.abs(number);
        
        // Exact integers (like 10 for gravity) should have minimal tolerance
        if (Number.isInteger(number) && absNum <= 100) {
            return 0.1;
        }

        // Physical constants should have appropriate precision tolerance
        if (correctText.includes('×') || correctText.includes('e-') || correctText.includes('E-')) {
            return absNum * 0.01; // 1% for scientific notation
        }

        // Small decimals
        if (absNum < 1) {
            return absNum * 0.05; // 5% tolerance
        }

        // Regular numbers
        if (absNum < 10) return 0.1;
        if (absNum < 100) return 1;
        return absNum * 0.02; // 2% for large numbers
    },

    /**
     * Advanced text normalization
     */
    advancedNormalize: function(text) {
        return text
            .toLowerCase()
            .trim()
            // Remove common filler words
            .replace(/\b(the|a|an|is|are|of|to|in|at|on|for|with|by)\b/g, '')
            // Normalize common physics terms
            .replace(/\b(pythagorean|pythagoras)\b/g, 'pythagorean')
            .replace(/\b(perpendicular|perp)\b/g, 'perpendicular')
            .replace(/\b(parallel|para)\b/g, 'parallel')
            .replace(/\b(opposite|opposing|against|contrary to)\b/g, 'opposite')
            .replace(/\b(acceleration|accel)\b/g, 'acceleration')
            .replace(/\b(velocity|vel)\b/g, 'velocity')
            .replace(/\b(straight line|line|linear path)\b/g, 'straightline')
            .replace(/\b(away from|farther from|further from)\b/g, 'away')
            // Remove extra punctuation and spaces
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    },

    /**
     * Physics-specific concept matching
     */
    physicsConceptsMatch: function(user, correct) {
        // Define concept equivalencies
        const concepts = {
            'force': ['f', 'net force', 'applied force'],
            'acceleration': ['accel', 'a'],
            'mass': ['m'],
            'velocity': ['v', 'speed', 'vel'],
            'momentum': ['p', 'linear momentum'],
            'energy': ['e', 'mechanical energy'],
            'work': ['w', 'work done'],
            'power': ['p', 'rate of work'],
            'torque': ['τ', 'tau', 'moment', 'moment of force'],
            'angular momentum': ['l', 'rotational momentum'],
        };

        for (const [concept, synonyms] of Object.entries(concepts)) {
            if ((user === concept && synonyms.includes(correct)) ||
                (correct === concept && synonyms.includes(user))) {
                return true;
            }
        }

        return false;
    },

    /**
     * Utility functions
     */
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
    }
};

// Export for use in the main application
if (typeof module !== 'undefined') {
    module.exports = EnhancedAnswerMatching;
}