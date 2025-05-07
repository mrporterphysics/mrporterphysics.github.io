/**
 * Main application logic for AP Physics 1 Quiz App
 * Enhanced with Flexoki theme, LaTeX support, image questions, and local storage
 */

const PhysicsQuizApp = (function() {
  // Private variables
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let questionsAnswered = 0;
  let attemptedQuestions = new Set();
  let currentMode = '';
  
  // Enable debug mode in development (set to false for production)
  Utils.setDebugMode(false);
  
  /**
   * Initialize the application
   */
  function init() {
    console.log("AP Physics 1 Quiz App - Initializing");
    
    // Performance monitoring
    Utils.performance.start('AppInit');
    
    // Initialize local storage if available
    if (typeof QuizStorage !== 'undefined') {
      QuizStorage.init();
    }
    
    // Set up UI elements
    QuizUI.setup();
    
    // Try to load the pre-defined CSV file from the data folder
    loadQuestionsFromCSV()
      .then(() => {
        // Log stats about loaded questions
        logQuestionStats();
      })
      .catch(error => {
        console.error("Error loading questions from CSV:", error);
        // Load default questions if CSV loading fails
        QuizData.loadExtendedQuestions();
        logQuestionStats();
      });
    
    // Attach event listeners
    attachEventListeners();
    
    // Load and apply saved settings
    loadSettings();
    
    Utils.performance.end('AppInit');
    console.log("AP Physics 1 Quiz App - Initialized successfully");
  }
  
  /**
   * Load questions from the predefined CSV file in the data folder
   * @return {Promise} Promise resolving when questions are loaded
   */
  function loadQuestionsFromCSV() {
    return new Promise((resolve, reject) => {
      // Path to the CSV file in the data folder
      const csvFilePath = 'data/apphysicsquestions.csv';
      
      // Fetch the CSV file
      fetch(csvFilePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load CSV file: ${response.status} ${response.statusText}`);
          }
          return response.text();
        })
        .then(csvText => {
          console.log("Successfully loaded CSV file");
          
          // Parse the CSV and process questions
          if (typeof CSVImport !== 'undefined') {
            const questions = CSVImport.parseCSV(csvText);
            
            if (typeof QuizData !== 'undefined' && 
                typeof QuizData.processImportedQuestions === 'function') {
              QuizData.processImportedQuestions(questions);
              resolve();
            } else {
              reject(new Error("QuizData module not available for processing questions"));
            }
          } else {
            reject(new Error("CSVImport module not available for parsing CSV"));
          }
        })
        .catch(error => {
          console.error("Error loading CSV:", error);
          reject(error);
        });
    });
  }
  
  /**
   * Log statistics about loaded questions
   */
  function logQuestionStats() {
    const stats = QuizData.getQuestionStats();
    console.log("Question Statistics:", stats);
  }
  
  /**
   * Load saved settings
   */
  function loadSettings() {
    if (typeof QuizStorage === 'undefined') return;
    
    const settings = QuizStorage.loadSettings();
    
    // Apply theme if saved
    if (settings.theme) {
      document.body.setAttribute('data-theme', settings.theme);
    }
  }
  
  /**
   * Attach event listeners to UI elements
   */
  function attachEventListeners() {
    Utils.performance.start('attachEventListeners');
    
    // Start Quiz button
    QuizUI.elements.buttons.start.addEventListener('click', startQuiz);
    
    // Resume Quiz button if available
    if (QuizUI.elements.buttons.resume) {
      QuizUI.elements.buttons.resume.addEventListener('click', resumeQuiz);
    }
    
    // Fill in the blank input enter key (event is handled in QuizUI)
    
    // Show answer button
    QuizUI.elements.buttons.showAnswer.addEventListener('click', function() {
      if (!attemptedQuestions.has(currentQuestionIndex)) {
        checkAnswer();
      }
      showCorrectAnswer();
    });
    
    // Next question button
    QuizUI.elements.buttons.next.addEventListener('click', function() {
      // If question not answered yet, check it
      if (!attemptedQuestions.has(currentQuestionIndex)) {
        checkAnswer();
      }
      
      // Move to next question
      currentQuestionIndex++;
      
      // Save state if storage available
      saveQuizState();
      
      // Display next question
      displayQuestion();
    });
    
    // Restart quiz button
    QuizUI.elements.buttons.restart.addEventListener('click', restartQuiz);
    
    // Back to setup button
    QuizUI.elements.buttons.backToSetup.addEventListener('click', function() {
      QuizUI.showPanel('setup');
    });
    
    // Try again button
    QuizUI.elements.buttons.tryAgain.addEventListener('click', function() {
      QuizUI.showPanel('quiz');
      restartQuiz();
    });
    
    // Review missed button
    QuizUI.elements.buttons.reviewMissed.addEventListener('click', function() {
      const selections = QuizUI.getSelections();
      selections.mode = 'review';
      
      // Update UI to show review mode selected
      QuizUI.elements.selectors.modeOptions.forEach(opt => opt.classList.remove('active'));
      document.querySelector('.mode-option[data-mode="review"]').classList.add('active');
      
      QuizUI.showPanel('setup');
      startQuiz();
    });
    
    // New quiz button
    QuizUI.elements.buttons.newQuiz.addEventListener('click', function() {
      QuizUI.showPanel('setup');
    });
    
    // Study mode selection
    QuizUI.elements.selectors.modeOptions.forEach(option => {
      option.addEventListener('click', function() {
        QuizUI.elements.selectors.modeOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // Topic selection
    QuizUI.elements.selectors.topicButtons.forEach(button => {
      button.addEventListener('click', function() {
        QuizUI.elements.selectors.topicButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // Question type selection
    QuizUI.elements.selectors.questionTypeButtons.forEach(button => {
      button.addEventListener('click', function() {
        QuizUI.elements.selectors.questionTypeButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
      // Only handle shortcuts when quiz panel is visible
      if (QuizUI.elements.panels.quiz.style.display !== 'block') return;
      
      if (event.key === 'Enter' || event.key === ' ') {
        // Enter or Space to check answer/move to next question
        if (!attemptedQuestions.has(currentQuestionIndex)) {
          checkAnswer();
          event.preventDefault();
        } else {
          // If already answered, go to next question
          currentQuestionIndex++;
          saveQuizState();
          displayQuestion();
          event.preventDefault();
        }
      } else if (event.key === 'n' || event.key === 'ArrowRight') {
        // N or Right Arrow to go to next question
        if (!attemptedQuestions.has(currentQuestionIndex)) {
          checkAnswer();
        }
        currentQuestionIndex++;
        saveQuizState();
        displayQuestion();
        event.preventDefault();
      } else if (event.key === 'p' || event.key === 'ArrowLeft') {
        // P or Left Arrow to go to previous question
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          saveQuizState();
          displayQuestion();
          event.preventDefault();
        }
      } else if (event.key === 'a') {
        // A to show answer
        if (!attemptedQuestions.has(currentQuestionIndex)) {
          checkAnswer();
        }
        showCorrectAnswer();
        event.preventDefault();
      }
    });
    
    Utils.performance.end('attachEventListeners');
  }
  
  /**
   * Start the quiz
   */
  function startQuiz() {
    Utils.performance.start('startQuiz');
    Utils.debug('Starting quiz');
    
    // Get user selections
    const selections = QuizUI.getSelections();
    currentMode = selections.mode;
    
    // Filter questions based on selections
    currentQuestions = QuizData.filterQuestions(
      selections.questionType,
      selections.topic,
      selections.mode === 'review'
    );
    
    if (!currentQuestions || currentQuestions.length === 0) {
      alert('No questions available with the selected filters. Please choose different options.');
      Utils.performance.end('startQuiz');
      return;
    }
    
    // Reset quiz state
    currentQuestionIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    questionsAnswered = 0;
    attemptedQuestions = new Set();
    
    // If not in review mode, clear missed questions
    if (selections.mode !== 'review') {
      QuizData.clearMissedQuestions();
    }
    
    // Update UI
    QuizUI.updateProgress(questionsAnswered, currentQuestions.length, correctCount, incorrectCount);
    
    // Show quiz panel
    QuizUI.showPanel('quiz');
    
    // Save initial state
    saveQuizState();
    
    // Display first question
    displayQuestion();
    
    Utils.performance.end('startQuiz');
  }
  
  /**
   * Resume a previously saved quiz
   */
  function resumeQuiz() {
    Utils.performance.start('resumeQuiz');
    
    if (typeof QuizStorage === 'undefined' || !QuizStorage.hasSavedQuiz()) {
      console.error('No saved quiz to resume');
      Utils.performance.end('resumeQuiz');
      return;
    }
    
    // Load saved state
    const savedState = QuizStorage.loadQuizState();
    
    // Restore quiz state
    currentQuestions = savedState.questions || [];
    currentQuestionIndex = savedState.index || 0;
    correctCount = savedState.correct || 0;
    incorrectCount = savedState.incorrect || 0;
    questionsAnswered = savedState.answered || 0;
    attemptedQuestions = new Set(savedState.attempted || []);
    currentMode = savedState.mode || 'test';
    
    // Show quiz panel
    QuizUI.showPanel('quiz');
    
    // Update progress
    QuizUI.updateProgress(questionsAnswered, currentQuestions.length, correctCount, incorrectCount);
    
    // Display current question
    displayQuestion();
    
    Utils.performance.end('resumeQuiz');
  }
  
  /**
   * Display the current question
   */
  function displayQuestion() {
    Utils.performance.start('displayQuestion');
    
    if (currentQuestionIndex >= currentQuestions.length) {
      showResults();
      Utils.performance.end('displayQuestion');
      return;
    }
    
    const question = currentQuestions[currentQuestionIndex];
    
    // Display the question in the UI
    QuizUI.displayQuestion(question, currentQuestionIndex, currentQuestions.length);
    
    // Attach event handlers for the question type
    QuizUI.attachQuestionTypeHandlers(question.type, function(answer) {
      if (currentMode === 'learn') {
        checkAnswer();
      }
    });
    
    Utils.performance.end('displayQuestion');
  }
  
  /**
   * Check the current answer
   * @return {boolean} Whether the answer was correct
   */
  function checkAnswer() {
    Utils.performance.start('checkAnswer');
    
    if (attemptedQuestions.has(currentQuestionIndex)) {
      Utils.performance.end('checkAnswer');
      return false;
    }
    
    const question = currentQuestions[currentQuestionIndex];
    const userAnswer = QuizUI.getUserAnswer(question.type);
    
    // Don't proceed if no answer provided
    if (userAnswer === null || userAnswer === '') {
      Utils.performance.end('checkAnswer');
      return false;
    }
    
    // Check if answer is correct
    const isCorrect = QuizData.checkAnswer(question, userAnswer);
    
    // Mark question as attempted
    attemptedQuestions.add(currentQuestionIndex);
    
    // Update stats
    if (isCorrect) {
      correctCount++;
    } else {
      incorrectCount++;
      QuizData.addToMissedQuestions(question);
    }
    
    questionsAnswered++;
    
    // Update UI
    QuizUI.showAnswerFeedback(isCorrect);
    QuizUI.updateProgress(questionsAnswered, currentQuestions.length, correctCount, incorrectCount);
    
    // Show answer if in learning mode
    if (currentMode === 'learn') {
      showCorrectAnswer();
    }
    
    // Save state if storage available
    saveQuizState();
    
    Utils.performance.end('checkAnswer');
    return isCorrect;
  }
  
  /**
   * Show the correct answer for the current question
   */
  function showCorrectAnswer() {
    const question = currentQuestions[currentQuestionIndex];
    QuizUI.showCorrectAnswer(question);
  }
  
  /**
   * Restart the quiz with the same questions
   */
  function restartQuiz() {
    Utils.performance.start('restartQuiz');
    
    // Reset quiz state
    currentQuestionIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    questionsAnswered = 0;
    attemptedQuestions = new Set();
    
    // Shuffle questions
    currentQuestions = Utils.shuffleArray(currentQuestions);
    
    // Update UI
    QuizUI.updateProgress(questionsAnswered, currentQuestions.length, correctCount, incorrectCount);
    
    // Save state if storage available
    saveQuizState();
    
    // Display first question
    displayQuestion();
    
    Utils.performance.end('restartQuiz');
  }
  
  /**
   * Show the results at the end of the quiz
   */
  function showResults() {
    Utils.performance.start('showResults');
    
    // Get all missed questions
    const missedQuestions = QuizData.getMissedQuestions();
    
    // Create results object
    const results = {
      correctCount: correctCount,
      incorrectCount: incorrectCount,
      totalQuestions: currentQuestions.length,
      accuracy: questionsAnswered > 0 ? Math.round((correctCount / questionsAnswered) * 100) : 0,
      missedQuestions: missedQuestions
    };
    
    // Update statistics
    if (typeof QuizStorage !== 'undefined') {
      // Create statistics data for topics
      const topicStats = {};
      
      // Group questions by topic
      currentQuestions.forEach((question, index) => {
        const topic = question.topic || 'general';
        
        if (!topicStats[topic]) {
          topicStats[topic] = { correct: 0, total: 0 };
        }
        
        topicStats[topic].total++;
        
        if (attemptedQuestions.has(index) && !missedQuestions.some(q => q.id === question.id)) {
          topicStats[topic].correct++;
        }
      });
      
      // Update storage with new stats
      QuizStorage.updateStats({
        totalCorrect: correctCount,
        totalAnswered: questionsAnswered,
        topics: topicStats,
        accuracy: results.accuracy
      });
      
      // Clear saved quiz state
      QuizStorage.clearQuizData();
    }
    
    // Show results in UI
    QuizUI.showResults(results);
    
    Utils.performance.end('showResults');
  }
  
  /**
   * Save the current quiz state to localStorage
   */
  function saveQuizState() {
    if (typeof QuizStorage === 'undefined') return;
    
    // Convert attempted questions set to array for storage
    const attemptedArray = Array.from(attemptedQuestions);
    
    // Create state object
    const state = {
      questions: currentQuestions,
      index: currentQuestionIndex,
      correct: correctCount,
      incorrect: incorrectCount,
      answered: questionsAnswered,
      attempted: attemptedArray,
      mode: currentMode,
      selections: QuizUI.getSelections()
    };
    
    // Save state
    QuizStorage.saveQuizState(state);
  }
  
  /**
   * Get statistics about the loaded questions
   * @return {Object} Question statistics
   */
  function getStats() {
    return QuizData.getQuestionStats();
  }
  
  // Public API
  return {
    init,
    getStats
  };
})();

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', PhysicsQuizApp.init);