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
  
  // Enable debug mode in development (set to true for troubleshooting)
  Utils.setDebugMode(true);
  
  /**
   * Initialize the application
   */
  function init() {
    console.log("AP Physics 1 Quiz App - Initializing");
    
    // Performance monitoring
    Utils.performance.start('AppInit');
    
    // Make sure QuizData is available before proceeding
    if (typeof QuizData === 'undefined') {
      console.error("ERROR: QuizData module is not available. Check script loading order.");
      alert("Error initializing quiz. Please refresh the page or contact support.");
      return;
    }
    
    // Initialize local storage if available
    if (typeof QuizStorage !== 'undefined') {
      QuizStorage.init();
    }
    
    // Set up UI elements
    QuizUI.setup();
    
    // Set default quiz data file path if not set yet
    if (!window.quizDataFile) {
      window.quizDataFile = 'data/ap-physics-questions.csv';
    }
    
    // Load questions from the selected CSV file
    loadQuestionsFromCSV()
      .then(() => {
        // Log stats about loaded questions
        logQuestionStats();
      })
      .catch(error => {
        console.error("Error loading questions from CSV:", error);
        // Load default questions if CSV loading fails
        console.log("Loading extended questions as fallback");
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
   * Load questions from the selected CSV file
   * @return {Promise} Promise resolving when questions are loaded
   */
  function loadQuestionsFromCSV() {
    return new Promise((resolve, reject) => {
      // First check if QuizData is properly loaded
      if (typeof QuizData === 'undefined') {
        reject(new Error("QuizData module is not defined. Check script loading order."));
        return;
      }
      
      // Use the globally set quiz data file path
      const csvFilePath = window.quizDataFile || 'data/ap-physics-questions.csv';
      console.log("Attempting to load CSV from:", csvFilePath);
      
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
          
          // Check if the CSV text is valid
          if (!csvText || csvText.trim() === '') {
            throw new Error("CSV file is empty");
          }
          
          // Process CSV directly
          const questions = parseCSVDirectly(csvText);
          
          if (typeof QuizData !== 'undefined' && 
              typeof QuizData.processImportedQuestions === 'function') {
            QuizData.processImportedQuestions(questions);
            resolve();
          } else {
            reject(new Error("QuizData.processImportedQuestions method is not available"));
          }
        })
        .catch(error => {
          console.error("Error loading CSV:", error);
          // Fall back to built-in questions
          console.log("Falling back to built-in questions");
          if (typeof QuizData !== 'undefined' && 
              typeof QuizData.loadExtendedQuestions === 'function') {
            QuizData.loadExtendedQuestions();
            resolve();
          } else {
            reject(new Error("Unable to load fallback questions - QuizData module issue"));
          }
        });
    });
  }

/**
 * Improved CSV Parser for AP Physics Quiz
 * This parser is accessible globally through the PhysicsQuizApp object
 * @param {string} csvText - The CSV text content
 * @return {Object} Object containing questions by type
 */
function parseCSVDirectly(csvText) {
  // Split by lines - handle both CRLF and LF line endings
  const lines = csvText.split(/\r?\n/).filter(line => line.trim());
  
  // Make sure we have at least a header row
  if (lines.length === 0) {
    console.error("CSV file appears to be empty or has no valid lines");
    return { tf: [], fill: [], mc: [], matching: [], image: [] };
  }
  
  // Get headers
  const headers = parseCSVLine(lines[0]);
  
  // Prepare question containers
  const questions = {
    tf: [],
    fill: [],
    mc: [],
    matching: [],
    image: []
  };
  
  // Process each line (skipping header)
  for (let i = 1; i < lines.length; i++) {
    // Skip empty lines
    if (!lines[i].trim()) continue;
    
    const values = parseCSVLine(lines[i]);
    
    // Skip if not enough values
    if (values.length < 3) {
      console.warn(`Line ${i+1} in CSV has fewer than 3 values. Skipping.`);
      continue;
    }
    
    // Create question data
    const questionData = {};
    headers.forEach((header, index) => {
      if (index < values.length) {
        questionData[header] = values[index] || '';
      } else {
        questionData[header] = '';
      }
    });
    
    // Skip if no question text is provided
    if (!questionData.question || questionData.question.trim() === '') {
      console.warn(`Line ${i+1} in CSV has no question text. Skipping.`);
      continue;
    }
    
    // Determine question type
    const type = questionData.type ? questionData.type.toLowerCase().trim() : '';
    
    try {
      if (type === 'tf' || type === 'true/false') {
        questions.tf.push(processTFQuestion(questionData));
      } else if (type === 'fill') {
        questions.fill.push(processFillQuestion(questionData));
      } else if (type === 'mc' || type === 'multiple choice') {
        questions.mc.push(processMCQuestion(questionData));
      } else if (type === 'matching') {
        questions.matching.push(processMatchingQuestion(questionData));
      } else if (type === 'image') {
        questions.image.push(processImageQuestion(questionData));
      } else {
        console.warn(`Unknown question type "${type}" on line ${i+1}. Skipping.`);
      }
    } catch (error) {
      console.error(`Error processing question on line ${i+1}:`, error);
    }
  }
  
  console.log("Parsed questions from CSV:", {
    tf: questions.tf.length,
    fill: questions.fill.length,
    mc: questions.mc.length,
    matching: questions.matching.length,
    image: questions.image.length,
    total: questions.tf.length + questions.fill.length + questions.mc.length + 
           questions.matching.length + questions.image.length
  });
  
  return questions;
}

/**
 * Parse a CSV line, properly handling quotes and commas
 * @param {string} line - A single CSV line
 * @return {Array} Array of values from the line
 */
function parseCSVLine(line) {
  const values = [];
  let currentValue = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      // Check if this is an escaped quote ("") inside a quoted field
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        currentValue += '"'; // Add one quote character
        i++; // Skip the next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of value - only if not inside quotes
      values.push(currentValue);
      currentValue = '';
    } else {
      // Add character to current value
      currentValue += char;
    }
  }
  
  // Add the last value
  values.push(currentValue);
  
  // Trim whitespace from all values
  return values.map(value => value.trim());
}

/**
 * Process a True/False question from CSV data
 * @param {Object} data - The question data
 * @return {Object} Processed True/False question object
 */
function processTFQuestion(data) {
  return {
    id: parseInt(data.id) || Math.floor(Math.random() * 10000),
    question: data.question.trim(),
    answer: String(data.answer).toLowerCase().trim(),
    topic: data.topic ? data.topic.trim() : 'general',
    explanation: data.explanation ? data.explanation.trim() : '',
    type: 'tf'
  };
}

/**
 * Process a Fill-in-the-Blank question from CSV data
 * @param {Object} data - The question data
 * @return {Object} Processed Fill-in-the-Blank question object
 */
function processFillQuestion(data) {
  // Handle alternate answers
  let alternateAnswers = [];
  if (data.alternateAnswers) {
    // Split on commas or semicolons
    const separator = data.alternateAnswers.includes(';') ? ';' : ',';
    alternateAnswers = data.alternateAnswers.split(separator)
      .map(ans => ans.trim())
      .filter(ans => ans.length > 0);
  }
  
  // Standardize blank placeholders
  let question = data.question.trim();
  
  // For better visibility, we can highlight the blanks
  if (question.includes('__________')) {
    question = question.replace(/__________/g, '____');
  }
  
  return {
    id: parseInt(data.id) || Math.floor(Math.random() * 10000),
    question: question,
    answer: data.answer.trim(),
    alternateAnswers: alternateAnswers,
    topic: data.topic ? data.topic.trim() : 'general',
    explanation: data.explanation ? data.explanation.trim() : '',
    type: 'fill'
  };
}

/**
 * Process a Multiple Choice question from CSV data
 * @param {Object} data - The question data
 * @return {Object} Processed Multiple Choice question object
 */
function processMCQuestion(data) {
  // Process options (support multiple formats)
  const options = [];
  
  // Check for options in format optionA, optionB, etc.
  if (data.optionA || data.optionB) {
    ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
      const optionKey = `option${letter}`;
      if (data[optionKey] && data[optionKey].trim()) {
        options.push({
          label: letter,
          text: data[optionKey].trim()
        });
      }
    });
  }
  // Check for options in format "option A", "option B", etc.
  else if (data['option A'] || data['option B']) {
    ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
      const optionKey = `option ${letter}`;
      if (data[optionKey] && data[optionKey].trim()) {
        options.push({
          label: letter,
          text: data[optionKey].trim()
        });
      }
    });
  }
  
  return {
    id: parseInt(data.id) || Math.floor(Math.random() * 10000),
    question: data.question.trim(),
    options: options,
    answer: data.answer.trim(),
    topic: data.topic ? data.topic.trim() : 'general',
    explanation: data.explanation ? data.explanation.trim() : '',
    type: 'mc'
  };
}

/**
 * Process a Matching question from CSV data
 * @param {Object} data - The question data
 * @return {Object} Processed Matching question object
 */
function processMatchingQuestion(data) {
  // Create standard matching options A-E
  const matchingOptions = [];
  
  // Try to get matching options from CSV
  ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
    const optionKey = `option${letter}`;
    if (data[optionKey] && data[optionKey].trim()) {
      matchingOptions.push({
        label: letter,
        text: data[optionKey].trim()
      });
    }
  });
  
  return {
    id: parseInt(data.id) || Math.floor(Math.random() * 10000),
    question: data.question.trim(),
    answer: data.answer.trim(),
    matchingOptions: matchingOptions,
    topic: data.topic ? data.topic.trim() : 'general',
    explanation: data.explanation ? data.explanation.trim() : '',
    type: 'matching'
  };
}

/**
 * Process an Image-based question from CSV data
 * @param {Object} data - The question data
 * @return {Object} Processed Image question object
 */
function processImageQuestion(data) {
  // Get image URL from either imageUrl or image field
  const imageUrl = data.imageUrl || data.image || '';
  
  // Process options similar to multiple choice
  const options = [];
  
  ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
    const optionKey = `option${letter}`;
    if (data[optionKey] && data[optionKey].trim()) {
      options.push({
        label: letter,
        text: data[optionKey].trim()
      });
    }
  });
  
  return {
    id: parseInt(data.id) || Math.floor(Math.random() * 10000),
    question: data.question.trim(),
    imageUrl: imageUrl,
    options: options,
    answer: data.answer.trim(),
    topic: data.topic ? data.topic.trim() : 'general',
    explanation: data.explanation ? data.explanation.trim() : '',
    type: 'image'
  };
}
  
/**
   * Log statistics about loaded questions
   */
function logQuestionStats() {
  if (typeof QuizData === 'undefined' || typeof QuizData.getQuestionStats !== 'function') {
    console.error("Unable to log question stats - QuizData module issue");
    return;
  }
  
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
  if (typeof QuizData === 'undefined' || typeof QuizData.filterQuestions !== 'function') {
    console.error("QuizData module not available for filtering questions");
    alert("Error: Unable to start quiz. Please refresh the page.");
    Utils.performance.end('startQuiz');
    return;
  }
  
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
      
      if (attemptedQuestions.has(index) && 
          !missedQuestions.some(q => q.id === question.id)) {
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
 * Load questions from a specific CSV file
 * Can be called from outside the module to reload questions
 * @param {string} csvPath - Path to the CSV file
 * @return {Promise} Promise resolving when questions are loaded
 */
function loadQuestionsFromCSV(csvPath) {
  return new Promise((resolve, reject) => {
    // If a path is provided, update the global path
    if (csvPath) {
      window.quizDataFile = csvPath;
    }
    
    // First check if QuizData is properly loaded
    if (typeof QuizData === 'undefined') {
      reject(new Error("QuizData module is not defined. Check script loading order."));
      return;
    }
    
    // Use the globally set quiz data file path
    const filePath = window.quizDataFile || 'data/ap-physics-questions.csv';
    console.log("Attempting to load CSV from:", filePath);
    
    // Fetch the CSV file
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load CSV file: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(csvText => {
        console.log("Successfully loaded CSV file");
        
        // Check if the CSV text is valid
        if (!csvText || csvText.trim() === '') {
          throw new Error("CSV file is empty");
        }
        
        // Process CSV directly
        const questions = parseCSVDirectly(csvText);
        
        if (typeof QuizData !== 'undefined' && 
            typeof QuizData.processImportedQuestions === 'function') {
          QuizData.processImportedQuestions(questions);
          resolve();
        } else {
          reject(new Error("QuizData.processImportedQuestions method is not available"));
        }
      })
      .catch(error => {
        console.error("Error loading CSV:", error);
        reject(error);
      });
  });
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
  getStats,
  parseCSVDirectly,   // Expose the parser function
  loadQuestionsFromCSV // Expose the CSV loading function
};
})();

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', PhysicsQuizApp.init);