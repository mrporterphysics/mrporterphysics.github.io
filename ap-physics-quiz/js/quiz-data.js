/**
 * QuizData - Question data management and filtering
 */

const QuizData = {
    questions: [],
    filteredQuestions: [],
    currentFilters: {
        course: 'ap-physics',
        topics: [],
        types: [],
        difficulty: 'all'
    },

    // Question type configurations
    QUESTION_TYPES: {
        'tf': { name: 'True/False', icon: '✓✗', color: '#4CAF50' },
        'mc': { name: 'Multiple Choice', icon: '🔤', color: '#2196F3' },
        'fill': { name: 'Fill in the Blank', icon: '📝', color: '#FF9800' },
        'matching': { name: 'Matching', icon: '🔗', color: '#9C27B0' },
        'image': { name: 'Image Based', icon: '🖼️', color: '#607D8B' }
    },

    // Available topics by course
    TOPICS: {
        'ap-physics': [
            'kinematics', 'forces', 'energy', 'momentum', 'rotation', 
            'gravitation', 'shm', 'fluids', 'waves', 'general'
        ],
        'earth-science': [
            'astronomy', 'meteorology', 'geology', 'oceanography', 'general'
        ]
    },

    // Load questions from provided data array
    loadQuestions: function(questionsArray) {
        Utils.performance.start('loadQuestions');
        
        try {
            this.questions = questionsArray.map(q => this.processQuestion(q));
            this.applyFilters();
            
            console.log(`Loaded ${this.questions.length} questions`);
            Utils.performance.end('loadQuestions');
            
            return true;
        } catch (error) {
            Utils.handleError(error, 'QuizData.loadQuestions');
            return false;
        }
    },

    // Process and validate a single question
    processQuestion: function(questionData) {
        return {
            id: questionData.id || this.generateId(),
            type: (questionData.type || 'mc').toLowerCase(),
            question: Utils.sanitizeString(questionData.question || ''),
            answer: questionData.answer || '',
            topic: (questionData.topic || 'general').toLowerCase(),
            explanation: Utils.sanitizeString(questionData.explanation || ''),
            options: this.extractOptions(questionData),
            alternateAnswers: this.parseAlternateAnswers(questionData.alternateAnswers),
            difficulty: parseInt(questionData.difficulty) || 1,
            metadata: {
                created: Date.now(),
                lastModified: Date.now()
            }
        };
    },

    // Extract options for multiple choice questions
    extractOptions: function(questionData) {
        const options = [];
        ['optionA', 'optionB', 'optionC', 'optionD', 'optionE'].forEach(key => {
            if (questionData[key] && questionData[key].trim()) {
                options.push(Utils.sanitizeString(questionData[key]));
            }
        });
        return options;
    },

    // Parse alternate answers
    parseAlternateAnswers: function(alternateAnswers) {
        if (!alternateAnswers) return [];
        
        if (Array.isArray(alternateAnswers)) return alternateAnswers;
        
        if (typeof alternateAnswers === 'string') {
            return alternateAnswers.split(',').map(answer => answer.trim());
        }
        
        return [];
    },

    // Generate a unique ID for questions without one
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Apply current filters to questions
    applyFilters: function() {
        Utils.performance.start('applyFilters');
        
        this.filteredQuestions = this.questions.filter(question => {
            // Course filter - not needed if all questions are from the same dataset
            
            // Topic filter
            if (this.currentFilters.topics.length > 0) {
                if (!this.currentFilters.topics.includes(question.topic)) {
                    return false;
                }
            }
            
            // Type filter
            if (this.currentFilters.types.length > 0) {
                if (!this.currentFilters.types.includes(question.type)) {
                    return false;
                }
            }
            
            // Difficulty filter
            if (this.currentFilters.difficulty !== 'all') {
                const targetDifficulty = parseInt(this.currentFilters.difficulty);
                if (question.difficulty !== targetDifficulty) {
                    return false;
                }
            }
            
            return true;
        });
        
        console.log(`Filtered to ${this.filteredQuestions.length} questions`);
        Utils.performance.end('applyFilters');
    },

    // Update filters
    setFilters: function(filters) {
        this.currentFilters = { ...this.currentFilters, ...filters };
        this.applyFilters();
    },

    // Get filtered questions for review mode (missed questions only)
    getReviewQuestions: function() {
        const missedIds = QuizStorage.getMissedQuestions();
        return this.questions.filter(q => missedIds.includes(q.id));
    },

    // Get questions by specific criteria
    getQuestionsByCriteria: function(criteria) {
        return this.questions.filter(question => {
            for (const [key, value] of Object.entries(criteria)) {
                if (Array.isArray(value)) {
                    if (!value.includes(question[key])) return false;
                } else {
                    if (question[key] !== value) return false;
                }
            }
            return true;
        });
    },

    // Shuffle questions
    shuffle: function() {
        this.filteredQuestions = Utils.shuffleArray(this.filteredQuestions);
    },

    // Get question by ID
    getQuestionById: function(id) {
        return this.questions.find(q => q.id == id);
    },

    // Get available topics for current course
    getAvailableTopics: function(course = null) {
        const targetCourse = course || this.currentFilters.course;
        return this.TOPICS[targetCourse] || [];
    },

    // Get statistics about current question set
    getDataStats: function() {
        const stats = {
            total: this.questions.length,
            filtered: this.filteredQuestions.length,
            byType: {},
            byTopic: {},
            byDifficulty: {1: 0, 2: 0, 3: 0}
        };
        
        this.filteredQuestions.forEach(question => {
            // Type statistics
            stats.byType[question.type] = (stats.byType[question.type] || 0) + 1;
            
            // Topic statistics
            stats.byTopic[question.topic] = (stats.byTopic[question.topic] || 0) + 1;
            
            // Difficulty statistics
            stats.byDifficulty[question.difficulty]++;
        });
        
        return stats;
    },

    // Validate question data integrity
    validateQuestion: function(question) {
        const errors = [];
        
        if (!question.id) errors.push('Missing ID');
        if (!question.question) errors.push('Missing question text');
        if (!question.answer) errors.push('Missing answer');
        if (!question.type || !this.QUESTION_TYPES[question.type]) {
            errors.push('Invalid or missing question type');
        }
        
        // Type-specific validations
        if (question.type === 'mc' && question.options.length < 2) {
            errors.push('Multiple choice question needs at least 2 options');
        }
        
        if (question.difficulty && (question.difficulty < 1 || question.difficulty > 3)) {
            errors.push('Difficulty must be 1, 2, or 3');
        }
        
        return errors;
    },

    // Batch validate all questions
    validateAllQuestions: function() {
        const validationResults = {
            valid: 0,
            invalid: 0,
            errors: []
        };
        
        this.questions.forEach((question, index) => {
            const errors = this.validateQuestion(question);
            if (errors.length > 0) {
                validationResults.invalid++;
                validationResults.errors.push({
                    questionIndex: index,
                    questionId: question.id,
                    errors: errors
                });
            } else {
                validationResults.valid++;
            }
        });
        
        return validationResults;
    },

    // Export current dataset
    exportData: function() {
        return {
            questions: this.questions,
            filters: this.currentFilters,
            stats: this.getDataStats(),
            exportDate: new Date().toISOString()
        };
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizData;
}