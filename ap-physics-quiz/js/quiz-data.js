/**
 * Quiz Data and Question Management for AP Physics 1 Quiz App
 * Manages loading, filtering, and accessing question data
 */

const QuizData = (function() {
  // Private data
  let quizData = {
    tf: [],      // True/False questions
    fill: [],    // Fill in the blank questions
    mc: [],      // Multiple choice questions
    matching: [] // Matching questions - Added support
  };
  
  let allQuestions = [];
  let missedQuestions = [];
  
  // Basic question set (can be expanded)
  const basicQuestions = {
    // True/False Questions
    tf: [
      { id: 1, question: "True or False: Displacement indicates the total distance an object travels.", answer: "false", topic: "kinematics", explanation: "Displacement only indicates how far an object ends up from its initial position, regardless of the path taken." },
      { id: 2, question: "True or False: Average velocity is displacement divided by the time interval over which that displacement occurred.", answer: "true", topic: "kinematics", explanation: "Average velocity is defined as the total displacement divided by the time interval." },
      { id: 3, question: "True or False: On a position-time graph, a positive slope indicates the object is moving away from the detector.", answer: "true", topic: "kinematics", explanation: "A positive slope on a position-time graph means the position is increasing with time, indicating movement away from the reference point." },
      { id: 4, question: "True or False: On a velocity-time graph, the slope represents the object's acceleration.", answer: "true", topic: "kinematics", explanation: "The slope of a velocity-time graph gives the rate of change of velocity, which is acceleration." },
      { id: 5, question: "True or False: The acceleration of an object in free fall is -10 m/s².", answer: "true", topic: "kinematics", explanation: "On Earth, the acceleration due to gravity is approximately 10 m/s² downward, often written as -10 m/s² when downward is negative." }
    ],
    
    // Fill in the Blank Questions
    fill: [
      { id: 11, question: "The units of acceleration are __________.", answer: "m/s²", alternateAnswers: ["m/s/s", "meters per second squared"], topic: "kinematics", explanation: "Acceleration is the rate of change of velocity, measured in meters per second per second (m/s²)." },
      { id: 12, question: "On a position-time graph, a position-time slope like a front slash (/) means the object is moving __________ from the detector.", answer: "away", alternateAnswers: ["farther", "further"], topic: "kinematics", explanation: "A positive slope (front slash) on a position-time graph indicates the object is moving away from the reference point." },
      { id: 13, question: "When an object slows down, its acceleration is __________ the direction of motion.", answer: "opposite", alternateAnswers: ["against", "contrary to"], topic: "kinematics", explanation: "Deceleration occurs when acceleration is in the direction opposite to velocity." },
      { id: 14, question: "In projectile motion, the vertical acceleration is always __________ m/s².", answer: "10", alternateAnswers: ["9.8", "9.81"], topic: "kinematics", explanation: "On Earth, objects experience a downward acceleration of approximately 10 m/s² due to gravity." },
      { id: 15, question: "The force of friction is equal to the coefficient of friction times the __________ force.", answer: "normal", alternateAnswers: ["perpendicular"], topic: "forces", explanation: "The formula for friction force is Ff = μFn, where Fn is the normal force." }
    ],
    
    // Multiple Choice Questions
    mc: [
      { 
        id: 16, 
        question: "Which of the following is the correct definition of instantaneous velocity?",
        options: [
          { label: "A", text: "The total distance traveled divided by the total time" },
          { label: "B", text: "How fast an object is moving at a specific moment in time" },
          { label: "C", text: "The change in position divided by time" },
          { label: "D", text: "The slope of a velocity-time graph" }
        ],
        answer: "B",
        topic: "kinematics",
        explanation: "Instantaneous velocity is the velocity at a single moment in time, not averaged over an interval."
      },
      { 
        id: 17, 
        question: "On a position-time graph, which of the following is true?",
        options: [
          { label: "A", text: "The slope indicates the object's position" },
          { label: "B", text: "The slope indicates the object's acceleration" },
          { label: "C", text: "The slope indicates the object's speed" },
          { label: "D", text: "The vertical axis represents time" }
        ],
        answer: "C",
        topic: "kinematics",
        explanation: "The slope of a position-time graph represents the rate of change of position, which is velocity/speed."
      },
      { 
        id: 18, 
        question: "Which of the following correctly represents Newton's Second Law?",
        options: [
          { label: "A", text: "F = ma²" },
          { label: "B", text: "F = ma" },
          { label: "C", text: "F = mv" },
          { label: "D", text: "F = m/a" }
        ],
        answer: "B",
        topic: "forces",
        explanation: "Newton's Second Law states that force equals mass times acceleration (F = ma)."
      }
    ],
    
    // Matching Questions - Added basic support
    matching: [
      {
        id: 151,
        question: "Displacement",
        answer: "A",
        matchingOptions: [
          { label: "A", text: "How far an object ends up from its initial position" },
          { label: "B", text: "The total path length traveled by an object" },
          { label: "C", text: "The time it takes to move from one position to another" },
          { label: "D", text: "The average speed of an object" },
          { label: "E", text: "The direction of motion" }
        ],
        topic: "kinematics",
        explanation: "Displacement is the straight-line distance and direction from initial to final position."
      },
      {
        id: 152,
        question: "Average velocity",
        answer: "B",
        matchingOptions: [
          { label: "A", text: "Total distance divided by total time" },
          { label: "B", text: "Displacement divided by time interval" },
          { label: "C", text: "Speed at a specific moment" },
          { label: "D", text: "How quickly an object accelerates" },
          { label: "E", text: "The slope of a distance-time graph" }
        ],
        topic: "kinematics",
        explanation: "Average velocity equals total displacement divided by total time."
      }
    ]
  };

  // Extended question set
  // Move this inside the module scope to make it accessible to all functions
  const extendedQuestions = {
    // Additional true/false questions
    tf: [
      { id: 101, question: "True or False: In projectile motion, horizontal acceleration is always zero.", answer: "true", topic: "kinematics", explanation: "In the absence of air resistance, there is no horizontal force acting on a projectile, so the horizontal acceleration is zero." },
      { id: 102, question: "True or False: An object is in equilibrium only when it remains at rest.", answer: "false", topic: "forces", explanation: "An object is in equilibrium when it's either at rest or moving with constant velocity (no acceleration)." },
      { id: 103, question: "True or False: The normal force always equals the weight of an object.", answer: "false", topic: "forces", explanation: "The normal force equals the weight only on horizontal surfaces with no other vertical forces. On inclines or with additional forces, this is not true." }
    ],
    
    // Additional fill-in-the-blank questions
    fill: [
      { id: 151, question: "Velocities in perpendicular directions add with the __________ theorem.", answer: "pythagorean", alternateAnswers: ["pythagoras", "pythagorean theorem"], topic: "kinematics", explanation: "When velocities are perpendicular, their magnitudes are related by the Pythagorean theorem (v² = vx² + vy²)." },
      { id: 152, question: "An object is in equilibrium if it is moving in a __________ at constant speed.", answer: "straight line", alternateAnswers: ["line", "linear path"], topic: "forces", explanation: "An object is in equilibrium when the net force is zero, which happens when it's either at rest or moving with constant velocity in a straight line." },
      { id: 153, question: "Newton's Second Law can be expressed as __________.", answer: "F = ma", alternateAnswers: ["force equals mass times acceleration"], topic: "forces", explanation: "Newton's Second Law states that the net force on an object equals its mass times its acceleration." }
    ],
    
    // Additional multiple choice questions
    mc: [
      { 
        id: 201, 
        question: "For an object in projectile motion, which statement is correct?",
        options: [
          { label: "A", text: "Horizontal and vertical accelerations are both 10 m/s²" },
          { label: "B", text: "Horizontal acceleration is 10 m/s² and vertical acceleration is 0" },
          { label: "C", text: "Horizontal acceleration is 0 and vertical acceleration is 10 m/s²" },
          { label: "D", text: "Both horizontal and vertical accelerations are 0" }
        ],
        answer: "C",
        topic: "kinematics",
        explanation: "In projectile motion (assuming no air resistance), there is no horizontal force, so horizontal acceleration is 0. The only force is gravity, which causes a vertical acceleration of approximately 10 m/s² downward."
      }
    ],
    
    // Additional matching questions
    matching: [
      {
        id: 251,
        question: "Normal force",
        answer: "A",
        matchingOptions: [
          { label: "A", text: "Force perpendicular to a surface" },
          { label: "B", text: "Force parallel to a surface that opposes motion" },
          { label: "C", text: "Force that attracts objects with mass" },
          { label: "D", text: "Force transmitted by a string or rope" },
          { label: "E", text: "Sum of all forces acting on an object" }
        ],
        topic: "forces",
        explanation: "Normal force acts perpendicular to the contact surface between objects."
      }
    ]
  };

  // Initialize and add properties to questions
  function initializeQuestions() {
    console.log("Initializing quiz data with basic questions");
    // Reset data
    quizData = {
      tf: [...basicQuestions.tf],
      fill: [...basicQuestions.fill],
      mc: [...basicQuestions.mc],
      matching: [...basicQuestions.matching] // Include matching questions
    };
    
    // Add type property to all questions for easier handling
    for (const type in quizData) {
      quizData[type].forEach(question => {
        question.type = type;
      });
    }
    
    // Combine all questions
    allQuestions = [
      ...quizData.tf,
      ...quizData.fill,
      ...quizData.mc,
      ...quizData.matching // Include matching questions
    ];
    
    console.log('Basic questions initialized', { count: allQuestions.length });
    return allQuestions.length;
  }
  
  // Load extended question set
  function loadExtendedQuestions() {
    console.log("Loading extended question set");
    
    // First initialize with basic questions if not already done
    if (allQuestions.length === 0) {
      initializeQuestions();
    }
    
    // Add extended questions to each category
    for (const type in extendedQuestions) {
      extendedQuestions[type].forEach(question => {
        question.type = type;
        quizData[type].push(question);
      });
    }
    
    // Update all questions array
    allQuestions = [
      ...quizData.tf,
      ...quizData.fill,
      ...quizData.mc,
      ...quizData.matching // Include matching questions
    ];
    
    console.log('Extended questions loaded', { count: allQuestions.length });
    return allQuestions.length;
  }
  
  // Filter questions based on type and topic
  function filterQuestions(questionType = 'all', topic = 'all', useReviewMode = false) {
    console.log('Filtering questions', { questionType, topic, useReviewMode });
    
    // Make sure we have questions loaded
    if (allQuestions.length === 0) {
      initializeQuestions();
    }
    
    let filtered = [];
    
    // Filter by question type
    if (questionType === 'all') {
      filtered = allQuestions;
    } else {
      filtered = quizData[questionType] || [];
    }
    
    // Filter by topic
    if (topic !== 'all') {
      filtered = filtered.filter(q => q.topic === topic);
    }
    
    // If in review mode, use only missed questions if available
    if (useReviewMode && missedQuestions.length > 0) {
      filtered = missedQuestions;
    }
    
    // Ensure we have at least one question
    if (filtered.length === 0) {
      console.log('No questions match the filters');
      return null;
    }
    
    // Return shuffled questions
    return Utils.shuffleArray(filtered);
  }
  
  // Add a question to missed questions list if not already there
  function addToMissedQuestions(question) {
    const alreadyMissed = missedQuestions.some(q => q.id === question.id);
    if (!alreadyMissed) {
      missedQuestions.push(question);
      console.log('Added to missed questions', { id: question.id });
    }
    return missedQuestions.length;
  }
  
  // Clear missed questions list
  function clearMissedQuestions() {
    const count = missedQuestions.length;
    missedQuestions = [];
    console.log('Cleared missed questions', { count });
    return count;
  }
  
  /**
   * Get missed questions array
   * @return {Array} Array of missed questions
   */
  function getMissedQuestions() {
    return missedQuestions;
  }
  
  // Check if an answer is correct
  function checkAnswer(question, userAnswer) {
    if (!question || userAnswer === null || userAnswer === undefined) {
      return false;
    }
    
    let isCorrect = false;
    
    switch (question.type) {
      case 'tf':
        // Convert answers to string for comparison
        isCorrect = String(userAnswer).toLowerCase() === String(question.answer).toLowerCase();
        break;
        
      case 'fill':
        userAnswer = String(userAnswer).trim().toLowerCase();
        // Check main answer and alternatives
        isCorrect = (userAnswer === String(question.answer).toLowerCase()) ||
                    (question.alternateAnswers && question.alternateAnswers.some(alt => 
                      Utils.stringSimilarity(userAnswer, alt, true)
                    ));
        break;
        
      case 'mc':
        isCorrect = String(userAnswer) === String(question.answer);
        break;
        
      case 'matching':
        isCorrect = String(userAnswer) === String(question.answer);
        break;
    }
    
    console.log('Checking answer', { 
      questionId: question.id, 
      userAnswer, 
      correctAnswer: question.answer,
      isCorrect 
    });
    
    return isCorrect;
  }
  
  /**
   * Load the full question set from the CSV file
   * @return {Promise<number>} Promise resolving to the number of questions loaded
   */
  function loadFullQuestionSet() {
    console.log('Loading full question set from CSV');
    
    const csvFileName = 'ap-physics-questions.csv'; // Set your CSV file name here
    const csvFilePath = `data/${csvFileName}`; // Assuming it's in a 'data' folder
    
    // Check if we're running on a server or local file
    const isOnline = window.location.protocol.includes('http');
    
    if (isOnline) {
      // Online mode - fetch the file
      return fetch(csvFilePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load CSV file: ${response.status} ${response.statusText}`);
          }
          return response.text();
        })
        .then(text => {
          console.log(`Successfully loaded CSV file: ${csvFileName}`);
          return processImportedQuestions(parseCSV(text));
        })
        .catch(error => {
          console.error('Error loading questions from CSV:', error);
          // Fallback to extended questions if loading fails
          alert(`Failed to load questions from ${csvFileName}. Using built-in questions instead.`);
          return loadExtendedQuestions();
        });
    } else {
      // Local file mode - use built-in questions
      console.log('Running in local file mode - using built-in questions');
      return Promise.resolve(loadExtendedQuestions());
    }
  }
  
  /**
   * Process imported questions and add them to the quiz data
   * @param {Object} questions - Questions object from CSV import
   * @return {number} The total number of questions processed
   */
  function processImportedQuestions(questions) {
    // Reset question sets first
    quizData = {
      tf: [],
      fill: [],
      mc: [],
      matching: []
    };
    
    // Add the parsed questions to quizData
    for (const type in questions) {
      if (questions[type] && questions[type].length > 0) {
        questions[type].forEach(question => {
          question.type = type;
          quizData[type].push(question);
        });
      }
    }
    
    // Update all questions array
    allQuestions = [
      ...quizData.tf,
      ...quizData.fill,
      ...quizData.mc,
      ...quizData.matching
    ];
    
    // Log information about loaded questions
    console.log('CSV questions loaded', { count: allQuestions.length });
    console.log(`Loaded ${allQuestions.length} questions from CSV:`);
    console.log(`- True/False: ${quizData.tf.length}`);
    console.log(`- Fill in the Blank: ${quizData.fill.length}`);
    console.log(`- Multiple Choice: ${quizData.mc.length}`);
    console.log(`- Matching: ${quizData.matching.length}`);
    
    return allQuestions.length;
  }
  
  /**
   * Parse CSV text directly
   * @param {string} csvText - The CSV text content
   * @return {Object} Object containing questions by type
   */
  function parseCSV(csvText) {
    // Simple CSV parsing function
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Prepare question containers
    const questions = {
      tf: [],
      fill: [],
      mc: [],
      matching: []
    };
    
    // Process each line (skipping the header)
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      
      // Make sure we have enough values
      if (values.length < 3) continue;
      
      // Create an object with the headers as keys
      const data = {};
      headers.forEach((header, index) => {
        if (index < values.length) {
          data[header] = values[index].trim();
        } else {
          data[header] = '';
        }
      });
      
      // Process based on question type
      const type = data.type.toLowerCase();
      
      if (type === 'tf' || type === 'true/false') {
        questions.tf.push({
          id: parseInt(data.id) || Math.floor(Math.random() * 10000),
          question: data.question,
          answer: data.answer.toLowerCase(),
          topic: data.topic || 'general',
          explanation: data.explanation || '',
          type: 'tf'
        });
      } else if (type === 'fill') {
        questions.fill.push({
          id: parseInt(data.id) || Math.floor(Math.random() * 10000),
          question: data.question,
          answer: data.answer,
          alternateAnswers: data.alternateAnswers ? data.alternateAnswers.split(',').map(a => a.trim()) : [],
          topic: data.topic || 'general',
          explanation: data.explanation || '',
          type: 'fill'
        });
      } else if (type === 'mc') {
        const options = [];
        ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
          const optionKey = `option${letter}`;
          if (data[optionKey]) {
            options.push({
              label: letter,
              text: data[optionKey]
            });
          }
        });
        
        questions.mc.push({
          id: parseInt(data.id) || Math.floor(Math.random() * 10000),
          question: data.question,
          options: options,
          answer: data.answer,
          topic: data.topic || 'general',
          explanation: data.explanation || '',
          type: 'mc'
        });
      } else if (type === 'matching') {
        const matchingOptions = [];
        ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
          const optionKey = `option${letter}`;
          if (data[optionKey]) {
            matchingOptions.push({
              label: letter,
              text: data[optionKey]
            });
          }
        });
        
        questions.matching.push({
          id: parseInt(data.id) || Math.floor(Math.random() * 10000),
          question: data.question,
          matchingOptions: matchingOptions,
          answer: data.answer,
          topic: data.topic || 'general',
          explanation: data.explanation || '',
          type: 'matching'
        });
      }
    }
    
    return questions;
  }
  
  /**
   * Parse a CSV line handling quotes and special characters
   */
  function parseCSVLine(line) {
    const values = [];
    let currentValue = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        // Toggle quote state
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        // End of value
        values.push(currentValue);
        currentValue = '';
      } else {
        // Add character to current value
        currentValue += char;
      }
    }
    
    // Add the last value
    values.push(currentValue);
    
    return values;
  }
  
  // Count questions by type and topic
  function getQuestionStats() {
    // Make sure we have questions loaded
    if (allQuestions.length === 0) {
      initializeQuestions();
    }
    
    const stats = {
      total: allQuestions.length,
      byType: {
        tf: quizData.tf.length,
        fill: quizData.fill.length,
        mc: quizData.mc.length,
        matching: quizData.matching.length
      },
      byTopic: {}
    };
    
    // Count by topic
    allQuestions.forEach(q => {
      if (!stats.byTopic[q.topic]) {
        stats.byTopic[q.topic] = 0;
      }
      stats.byTopic[q.topic]++;
    });
    
    return stats;
  }
  
  // Initialize the module
  initializeQuestions();
  
  // Public API
  return {
    filterQuestions,
    loadExtendedQuestions,
    loadFullQuestionSet,
    addToMissedQuestions,
    clearMissedQuestions,
    getMissedQuestions,
    checkAnswer,
    getQuestionStats,
    processImportedQuestions,
    getMissedQuestionsCount: () => missedQuestions.length
  };
})();

