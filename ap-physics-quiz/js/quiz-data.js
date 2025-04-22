/**
 * Quiz Data and Question Management for AP Physics 1 Quiz App
 * Manages loading, filtering, and accessing question data
 */

const QuizData = (function() {
  // Private data
  let quizData = {
    tf: [],   // True/False questions
    fill: [], // Fill in the blank questions
    mc: []    // Multiple choice questions
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
      { id: 5, question: "True or False: The acceleration of an object in free fall is -10 m/s².", answer: "true", topic: "kinematics", explanation: "On Earth, the acceleration due to gravity is approximately 10 m/s² downward, often written as -10 m/s² when downward is negative." },
      { id: 6, question: "True or False: Mechanical energy is conserved when there is no net work done by external forces.", answer: "true", topic: "energy", explanation: "Mechanical energy (kinetic + potential) is conserved when no non-conservative forces do work." },
      { id: 7, question: "True or False: Power is defined as the amount of energy used in one second.", answer: "true", topic: "energy", explanation: "Power is the rate of energy transfer, measured in energy per unit time (joules per second, or watts)." },
      { id: 8, question: "True or False: In an elastic collision, mechanical energy is conserved.", answer: "true", topic: "momentum", explanation: "By definition, an elastic collision conserves both momentum and mechanical energy." },
      { id: 9, question: "True or False: The period of a pendulum depends on the mass of the bob.", answer: "false", topic: "shm", explanation: "The period of a pendulum depends only on its length and the gravitational field strength, not on the mass." },
      { id: 10, question: "True or False: Density is defined as volume divided by mass.", answer: "false", topic: "fluids", explanation: "Density is defined as mass divided by volume (ρ = m/V)." }
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
      },
      { 
        id: 19, 
        question: "What is the formula for kinetic energy?",
        options: [
          { label: "A", text: "KE = mgh" },
          { label: "B", text: "KE = mv" },
          { label: "C", text: "KE = ½mv²" },
          { label: "D", text: "KE = ½kx²" }
        ],
        answer: "C",
        topic: "energy",
        explanation: "Kinetic energy is calculated as KE = ½mv², where m is mass and v is velocity."
      },
      { 
        id: 20, 
        question: "In a simple pendulum, what does the period depend on?",
        options: [
          { label: "A", text: "The mass of the bob" },
          { label: "B", text: "The amplitude of oscillation" },
          { label: "C", text: "The length of the pendulum" },
          { label: "D", text: "All of the above" }
        ],
        answer: "C",
        topic: "shm",
        explanation: "For small oscillations, the period of a pendulum depends only on its length and the gravitational field strength, not on mass or amplitude."
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
      },
      { 
        id: 202, 
        question: "In Newton's Second Law, if you double the force applied to an object, what happens to its acceleration?",
        options: [
          { label: "A", text: "It doubles" },
          { label: "B", text: "It halves" },
          { label: "C", text: "It quadruples" },
          { label: "D", text: "It remains the same" }
        ],
        answer: "A",
        topic: "forces",
        explanation: "According to Newton's Second Law (F = ma), if mass remains constant, acceleration is directly proportional to force. So doubling the force doubles the acceleration."
      },
      { 
        id: 203, 
        question: "According to Newton's Third Law, when you push on a wall:",
        options: [
          { label: "A", text: "The wall doesn't push back" },
          { label: "B", text: "The wall pushes back with less force" },
          { label: "C", text: "The wall pushes back with more force" },
          { label: "D", text: "The wall pushes back with equal force" }
        ],
        answer: "D",
        topic: "forces",
        explanation: "Newton's Third Law states that for every action, there is an equal and opposite reaction. So when you push on a wall, the wall pushes back with equal force in the opposite direction."
      }
    ]
  };

  // Initialize and add properties to questions
  function initializeQuestions() {
    // Reset data
    quizData = {
      tf: [...basicQuestions.tf],
      fill: [...basicQuestions.fill],
      mc: [...basicQuestions.mc]
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
      ...quizData.mc
    ];
    
    Utils.debug('Basic questions initialized', { count: allQuestions.length });
  }
  
  // Load extended question set
  function loadExtendedQuestions() {
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
      ...quizData.mc
    ];
    
    Utils.debug('Extended questions loaded', { count: allQuestions.length });
    return allQuestions.length;
  }
  
  // Filter questions based on type and topic
  function filterQuestions(questionType = 'all', topic = 'all', useReviewMode = false) {
    Utils.debug('Filtering questions', { questionType, topic, useReviewMode });
    
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
      Utils.debug('No questions match the filters');
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
      Utils.debug('Added to missed questions', { id: question.id });
    }
    return missedQuestions.length;
  }
  
  // Clear missed questions list
  function clearMissedQuestions() {
    const count = missedQuestions.length;
    missedQuestions = [];
    Utils.debug('Cleared missed questions', { count });
    return count;
  }
  
  // Check if an answer is correct
  function checkAnswer(question, userAnswer) {
    if (!question || userAnswer === null || userAnswer === undefined) {
      return false;
    }
    
    let isCorrect = false;
    
    switch (question.type) {
      case 'tf':
        isCorrect = userAnswer === question.answer;
        break;
        
      case 'fill':
        userAnswer = userAnswer.trim().toLowerCase();
        // Check main answer and alternatives
        isCorrect = (userAnswer === question.answer.toLowerCase()) ||
                    (question.alternateAnswers && question.alternateAnswers.some(alt => 
                      Utils.stringSimilarity(userAnswer, alt, true)
                    ));
        break;
        
      case 'mc':
        isCorrect = userAnswer === question.answer;
        break;
    }
    
    Utils.debug('Checking answer', { 
      questionId: question.id, 
      userAnswer, 
      correctAnswer: question.answer,
      isCorrect 
    });
    
    return isCorrect;
  }
  
  // Loading the full 200 question set (placeholder for future implementation)
  function loadFullQuestionSet() {
    Utils.debug('Loading full question set (placeholder)');
    // Here you would implement code to load your full 200 question set
    // This could be from a JSON file, fetch API call, or parsing your paste.txt
    
    // For now, we'll just load the extended questions
    return loadExtendedQuestions();
  }
  
  // Count questions by type and topic
  function getQuestionStats() {
    const stats = {
      total: allQuestions.length,
      byType: {
        tf: quizData.tf.length,
        fill: quizData.fill.length,
        mc: quizData.mc.length
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
    checkAnswer,
    getQuestionStats,
    getMissedQuestionsCount: () => missedQuestions.length
  };
})();