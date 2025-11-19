/**
 * Question Bookmarking and Navigation System
 * Allows students to bookmark questions for later review
 */

window.BookmarkSystem = {
    // Initialize the bookmark system
    init: function () {
        this.setupEventListeners();
        this.updateBookmarkButton();
    },

    // Setup event listeners
    setupEventListeners: function () {
        const bookmarkBtn = document.getElementById('bookmark-question');
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', () => this.toggleBookmark());
        }

        // Listen for question changes to update bookmark button
        document.addEventListener('questionDisplayed', () => {
            this.updateBookmarkButton();
        });
    },

    // Toggle bookmark for current question
    toggleBookmark: function () {
        try {
            const currentQuestion = this.getCurrentQuestion();
            if (!currentQuestion) return;

            const bookmarks = this.getBookmarks();
            const questionId = currentQuestion.id;
            const isBookmarked = bookmarks.includes(questionId);

            if (isBookmarked) {
                this.removeBookmark(questionId);
                this.showFeedback('Bookmark removed', 'info');
            } else {
                this.addBookmark(questionId);
                this.showFeedback('Question bookmarked!', 'success');
            }

            this.updateBookmarkButton();
        } catch (error) {
            Utils.handleError(error, 'BookmarkSystem.toggleBookmark');
            this.showFeedback('Error updating bookmark', 'error');
        }
    },

    // Add a bookmark
    addBookmark: function (questionId) {
        const bookmarks = this.getBookmarks();
        if (!bookmarks.includes(questionId)) {
            bookmarks.push(questionId);
            this.saveBookmarks(bookmarks);
        }
    },

    // Remove a bookmark
    removeBookmark: function (questionId) {
        const bookmarks = this.getBookmarks();
        const index = bookmarks.indexOf(questionId);
        if (index > -1) {
            bookmarks.splice(index, 1);
            this.saveBookmarks(bookmarks);
        }
    },

    // Get all bookmarks
    getBookmarks: function () {
        return Utils.storage.get('quiz_bookmarks', []);
    },

    // Save bookmarks to storage
    saveBookmarks: function (bookmarks) {
        Utils.storage.set('quiz_bookmarks', bookmarks);

        // Dispatch event for other components
        document.dispatchEvent(new CustomEvent('bookmarksUpdated', {
            detail: { bookmarks: bookmarks }
        }));
    },

    // Check if question is bookmarked
    isBookmarked: function (questionId) {
        return this.getBookmarks().includes(questionId);
    },

    // Update bookmark button appearance
    updateBookmarkButton: function () {
        const bookmarkBtn = document.getElementById('bookmark-question');
        const currentQuestion = this.getCurrentQuestion();

        if (bookmarkBtn && currentQuestion) {
            const isBookmarked = this.isBookmarked(currentQuestion.id);

            // Update button appearance
            if (isBookmarked) {
                bookmarkBtn.innerHTML = '🔖';
                bookmarkBtn.className = 'btn btn-warning';
                bookmarkBtn.title = 'Remove bookmark';
            } else {
                bookmarkBtn.innerHTML = '📖';
                bookmarkBtn.className = 'btn btn-secondary';
                bookmarkBtn.title = 'Bookmark this question';
            }
        }
    },

    // Get current question from QuizUI or PhysicsQuizApp
    getCurrentQuestion: function () {
        if (typeof QuizUI !== 'undefined' && QuizUI.currentQuestion) {
            return QuizUI.currentQuestion;
        } else if (typeof PhysicsQuizApp !== 'undefined' && PhysicsQuizApp.currentQuestion) {
            return PhysicsQuizApp.currentQuestion;
        }
        return null;
    },

    // Show feedback message
    showFeedback: function (message, type) {
        if (typeof QuizUI !== 'undefined' && QuizUI.showFeedback) {
            QuizUI.showFeedback(message, type);
        } else {
            console.log(`BookmarkSystem: ${message} (${type})`);
        }
    },

    // Get bookmarked questions with full question data
    getBookmarkedQuestions: function () {
        try {
            const bookmarkIds = this.getBookmarks();
            if (bookmarkIds.length === 0) return [];

            // Get all questions from QuizData
            const allQuestions = typeof QuizData !== 'undefined' ? QuizData.questions : [];

            return bookmarkIds.map(id => {
                const question = allQuestions.find(q => q.id === id);
                return question || null;
            }).filter(q => q !== null);
        } catch (error) {
            Utils.handleError(error, 'BookmarkSystem.getBookmarkedQuestions');
            return [];
        }
    },

    // Create bookmarked questions review mode
    startBookmarkReview: function () {
        const bookmarkedQuestions = this.getBookmarkedQuestions();

        if (bookmarkedQuestions.length === 0) {
            this.showFeedback('No bookmarked questions to review', 'info');
            return;
        }

        // Set up review mode with only bookmarked questions
        if (typeof QuizData !== 'undefined') {
            QuizData.setCustomQuestionSet(bookmarkedQuestions);

            // Restart quiz with bookmarked questions
            if (typeof PhysicsQuizApp !== 'undefined' && PhysicsQuizApp.startQuiz) {
                PhysicsQuizApp.startQuiz();
                this.showFeedback(`Starting review of ${bookmarkedQuestions.length} bookmarked questions`, 'success');
            }
        }
    },

    // Generate bookmark statistics
    getBookmarkStats: function () {
        const bookmarks = this.getBookmarks();
        const bookmarkedQuestions = this.getBookmarkedQuestions();

        const topicCounts = {};
        const typeCounts = {};

        bookmarkedQuestions.forEach(question => {
            // Count by topic
            const topic = question.topic || 'unknown';
            topicCounts[topic] = (topicCounts[topic] || 0) + 1;

            // Count by type
            const type = question.type || 'unknown';
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });

        return {
            total: bookmarks.length,
            topics: topicCounts,
            types: typeCounts,
            questions: bookmarkedQuestions
        };
    },

    // Export bookmarks as text
    exportBookmarks: function () {
        const bookmarkedQuestions = this.getBookmarkedQuestions();

        if (bookmarkedQuestions.length === 0) {
            this.showFeedback('No bookmarks to export', 'info');
            return;
        }

        let exportText = `AP Physics 1 Quiz - Bookmarked Questions (${bookmarkedQuestions.length} total)\n`;
        exportText += '='.repeat(60) + '\n\n';

        bookmarkedQuestions.forEach((question, index) => {
            exportText += `${index + 1}. [${question.topic.toUpperCase()}] [${question.type.toUpperCase()}]\n`;
            exportText += `Question: ${question.question}\n`;
            exportText += `Answer: ${question.answer}\n`;
            if (question.explanation) {
                exportText += `Explanation: ${question.explanation}\n`;
            }
            exportText += '\n' + '-'.repeat(40) + '\n\n';
        });

        // Create downloadable file
        const blob = new Blob([exportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ap-physics-bookmarks.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showFeedback('Bookmarks exported successfully!', 'success');
    },

    // Clear all bookmarks
    clearAllBookmarks: function () {
        if (confirm('Are you sure you want to remove all bookmarks? This cannot be undone.')) {
            this.saveBookmarks([]);
            this.updateBookmarkButton();
            this.showFeedback('All bookmarks cleared', 'info');
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BookmarkSystem.init());
} else {
    BookmarkSystem.init();
}