/**
 * Main application logic for AP Physics 1 Quiz App
 * Connects the data and UI components and manages the quiz flow
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
    
    // Enable debug mode in development
    Utils.setDebugMode(false);
    
    // Initialize the application
    function init() {
      console.log("AP Physics 1 Quiz App - Initializing");
      
      // Set up UI elements
      QuizUI.setup();
      
      // Load extended questions
      QuizData.loadExtendedQuestions();
      
      // Attach event listeners
      attachEventListeners();
      
      console.log("AP Physics 1 Quiz App - Initialized successfully");
    }
    
    // Attach event listeners to UI elements
    function attachEventListeners() {
      // Start Quiz button
      QuizUI.elements.buttons.start.addEventListener('click', startQuiz);
      
      // Fill in the blank input enter key
      QuizUI.elements.inputs.answerInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          checkAnswer();
        }
      });
      
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
    }
    
    // Start the quiz
    function startQuiz() {
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
      
      // Display first question
      displayQuestion();
    }
    
    // Display the current question
    function displayQuestion() {
      if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
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
    }
    
    // Check the current answer
    function checkAnswer() {
      if (attemptedQuestions.has(currentQuestionIndex)) return;
      
      const question = currentQuestions[currentQuestionIndex];
      const userAnswer = QuizUI.getUserAnswer(question.type);
      
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
      
      return isCorrect;
    }
    
    // Show the correct answer for the current question
    function showCorrectAnswer() {
      const question = currentQuestions[currentQuestionIndex];
      QuizUI.showCorrectAnswer(question);
    }
    
    // Restart the quiz with the same questions
    function restartQuiz() {
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
      
      // Display first question
      displayQuestion();
    }
    
    // Show the results at the end of the quiz
    function showResults() {
      // Get all missed questions
      const missedQuestionsCount = QuizData.getMissedQuestionsCount();
      
      // Show results in UI
      QuizUI.showResults(correctCount, currentQuestions.length, missedQuestionsCount > 0);
    }
    
    // Get stats about the loaded questions
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