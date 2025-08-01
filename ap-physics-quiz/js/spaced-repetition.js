/**
 * Spaced Repetition System for AP Physics Quiz
 * Implements adaptive learning algorithm based on user performance
 * Uses a modified SuperMemo SM-2 algorithm optimized for educational content
 */

const SpacedRepetition = (function() {
  
  // Storage key for spaced repetition data
  const SR_STORAGE_KEY = 'ap_physics_sr_data';
  
  // Algorithm parameters (based on research in educational psychology)
  const ALGORITHM = {
    // Initial ease factor (how easy a question is perceived to be)
    INITIAL_EASE: 2.5,
    
    // Minimum ease factor (prevents questions from becoming too frequent)
    MIN_EASE: 1.3,
    
    // Ease adjustments based on performance
    EASE_ADJUSTMENTS: {
      CORRECT_EASY: 0.15,      // Increase ease when answered correctly and felt easy
      CORRECT_NORMAL: 0.0,     // No change when answered correctly normally
      CORRECT_HARD: -0.2,      // Decrease ease when correct but felt hard
      INCORRECT: -0.8          // Significant decrease when incorrect
    },
    
    // Initial intervals (in days)
    INITIAL_INTERVALS: [1, 6],
    
    // Quality ratings (how well the user performed)
    QUALITY: {
      INCORRECT: 0,
      CORRECT_HARD: 1,
      CORRECT_NORMAL: 2,
      CORRECT_EASY: 3
    }
  };
  
  /**
   * Initialize the spaced repetition system
   */
  function init() {
    console.log('Spaced Repetition System initialized');
  }
  
  /**
   * Get or create card data for a question
   * @param {string} questionId - Unique identifier for the question
   * @return {Object} Card data with repetition information
   */
  function getCard(questionId) {
    const allCards = loadAllCards();
    
    if (allCards[questionId]) {
      return allCards[questionId];
    }
    
    // Create new card
    const newCard = {
      id: questionId,
      ease: ALGORITHM.INITIAL_EASE,
      interval: 0,
      repetitions: 0,
      lastReviewed: null,
      nextReview: new Date().toISOString(),
      consecutiveCorrect: 0,
      totalSeen: 0,
      averageResponseTime: 0,
      difficultyRating: 2, // Default to medium difficulty
      topicMastery: 0.0    // Topic mastery score (0-1)
    };
    
    return newCard;
  }
  
  /**
   * Update card data after a review session
   * @param {string} questionId - Question identifier
   * @param {number} quality - Quality of response (0-3)
   * @param {number} responseTime - Time taken to answer (seconds)
   * @param {boolean} wasCorrect - Whether the answer was correct
   * @param {string} topic - Question topic for mastery tracking
   */
  function updateCard(questionId, quality, responseTime = 0, wasCorrect = false, topic = 'general') {
    const card = getCard(questionId);
    const allCards = loadAllCards();
    
    // Update basic stats
    card.totalSeen++;
    card.lastReviewed = new Date().toISOString();
    
    // Update response time average
    if (responseTime > 0) {
      card.averageResponseTime = card.averageResponseTime === 0 ? 
        responseTime : 
        (card.averageResponseTime + responseTime) / 2;
    }
    
    // Update consecutive correct streak
    if (wasCorrect) {
      card.consecutiveCorrect++;
    } else {
      card.consecutiveCorrect = 0;
    }
    
    // Apply SM-2 algorithm
    if (quality >= ALGORITHM.QUALITY.CORRECT_NORMAL) {
      // Correct answer
      if (card.repetitions === 0) {
        card.interval = ALGORITHM.INITIAL_INTERVALS[0];
      } else if (card.repetitions === 1) {
        card.interval = ALGORITHM.INITIAL_INTERVALS[1];
      } else {
        card.interval = Math.round(card.interval * card.ease);
      }
      card.repetitions++;
    } else {
      // Incorrect answer - reset interval but keep some progress
      card.repetitions = Math.max(0, card.repetitions - 1);
      card.interval = Math.max(1, Math.round(card.interval * 0.2));
    }
    
    // Update ease factor
    const easeChange = getEaseAdjustment(quality, responseTime, card.difficultyRating);
    card.ease = Math.max(ALGORITHM.MIN_EASE, card.ease + easeChange);
    
    // Calculate next review date
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + card.interval);
    card.nextReview = nextReviewDate.toISOString();
    
    // Update topic mastery
    updateTopicMastery(topic, wasCorrect, quality);
    
    // Save updated card
    allCards[questionId] = card;
    saveAllCards(allCards);
    
    return card;
  }
  
  /**
   * Calculate ease adjustment based on performance and difficulty
   * @param {number} quality - Quality rating (0-3)
   * @param {number} responseTime - Response time in seconds
   * @param {number} difficulty - Question difficulty (1-3)
   * @return {number} Ease adjustment value
   */
  function getEaseAdjustment(quality, responseTime, difficulty) {
    let adjustment = 0;
    
    switch (quality) {
      case ALGORITHM.QUALITY.INCORRECT:
        adjustment = ALGORITHM.EASE_ADJUSTMENTS.INCORRECT;
        break;
      case ALGORITHM.QUALITY.CORRECT_HARD:
        adjustment = ALGORITHM.EASE_ADJUSTMENTS.CORRECT_HARD;
        break;
      case ALGORITHM.QUALITY.CORRECT_NORMAL:
        adjustment = ALGORITHM.EASE_ADJUSTMENTS.CORRECT_NORMAL;
        break;
      case ALGORITHM.QUALITY.CORRECT_EASY:
        adjustment = ALGORITHM.EASE_ADJUSTMENTS.CORRECT_EASY;
        break;
    }
    
    // Adjust based on response time (faster = easier)
    if (responseTime > 0 && responseTime < 10) {
      adjustment += 0.05; // Quick response suggests it was easier
    } else if (responseTime > 30) {
      adjustment -= 0.05; // Slow response suggests it was harder
    }
    
    // Adjust based on question difficulty
    adjustment *= (difficulty / 2.0); // Scale by difficulty
    
    return adjustment;
  }
  
  /**
   * Update topic mastery score
   * @param {string} topic - Topic name
   * @param {boolean} wasCorrect - Whether answer was correct
   * @param {number} quality - Quality rating
   */
  function updateTopicMastery(topic, wasCorrect, quality) {
    if (!topic || topic === 'general') return;
    
    const masteryData = getTopicMasteryData();
    
    if (!masteryData[topic]) {
      masteryData[topic] = {
        score: 0.5, // Start at neutral
        totalReviews: 0,
        recentPerformance: []
      };
    }
    
    const topicData = masteryData[topic];
    topicData.totalReviews++;
    
    // Add to recent performance (keep last 10 reviews)
    topicData.recentPerformance.push({
      correct: wasCorrect,
      quality: quality,
      timestamp: new Date().toISOString()
    });
    
    if (topicData.recentPerformance.length > 10) {
      topicData.recentPerformance.shift();
    }
    
    // Calculate mastery score based on recent performance
    const recentCorrect = topicData.recentPerformance.filter(p => p.correct).length;
    const recentTotal = topicData.recentPerformance.length;
    const recentAccuracy = recentTotal > 0 ? recentCorrect / recentTotal : 0.5;
    
    // Weighted average: 70% recent performance, 30% historical
    topicData.score = (recentAccuracy * 0.7) + (topicData.score * 0.3);
    
    saveTopicMasteryData(masteryData);
  }
  
  /**
   * Get questions due for review
   * @param {number} maxCount - Maximum number of questions to return
   * @return {Array} Array of question IDs due for review
   */
  function getQuestionsForReview(maxCount = 20) {
    const now = new Date();
    const allCards = loadAllCards();
    const dueCards = [];
    
    Object.values(allCards).forEach(card => {
      const nextReview = new Date(card.nextReview);
      if (nextReview <= now) {
        dueCards.push({
          ...card,
          priority: calculatePriority(card, now)
        });
      }
    });
    
    // Sort by priority (higher priority first)
    dueCards.sort((a, b) => b.priority - a.priority);
    
    return dueCards.slice(0, maxCount).map(card => card.id);
  }
  
  /**
   * Calculate priority for a card (higher = more important to review)
   * @param {Object} card - Card data
   * @param {Date} now - Current time
   * @return {number} Priority score
   */
  function calculatePriority(card, now) {
    const nextReview = new Date(card.nextReview);
    const overdueDays = Math.max(0, (now - nextReview) / (1000 * 60 * 60 * 24));
    
    let priority = 100; // Base priority
    
    // Higher priority for overdue cards
    priority += overdueDays * 10;
    
    // Higher priority for cards with low ease (struggling cards)
    priority += (ALGORITHM.INITIAL_EASE - card.ease) * 20;
    
    // Higher priority for cards with low consecutive correct streak
    priority += Math.max(0, 5 - card.consecutiveCorrect) * 5;
    
    // Lower priority for cards seen many times recently
    if (card.totalSeen > 10) {
      priority -= Math.min(50, (card.totalSeen - 10) * 2);
    }
    
    return priority;
  }
  
  /**
   * Get recommended study session
   * @param {Object} options - Session configuration
   * @return {Object} Study session data
   */
  function getStudySession(options = {}) {
    const {
      maxQuestions = 20,
      focusTopic = null,
      difficultyRange = [1, 3],
      includeNew = true,
      reviewOnly = false
    } = options;
    
    const session = {
      dueForReview: [],
      newQuestions: [],
      weakTopics: [],
      recommendations: []
    };
    
    // Get questions due for review
    if (!reviewOnly) {
      session.dueForReview = getQuestionsForReview(Math.round(maxQuestions * 0.7));
    }
    
    // Add new questions if requested
    if (includeNew && !reviewOnly) {
      const newCount = maxQuestions - session.dueForReview.length;
      session.newQuestions = getNewQuestions(newCount, focusTopic, difficultyRange);
    }
    
    // Identify weak topics for extra practice
    session.weakTopics = getWeakTopics();
    
    // Generate personalized recommendations
    session.recommendations = generateStudyRecommendations();
    
    return session;
  }
  
  /**
   * Get new questions that haven't been seen yet
   * @param {number} count - Number of new questions needed
   * @param {string} focusTopic - Optional topic to focus on
   * @param {Array} difficultyRange - Difficulty range [min, max]
   * @return {Array} Array of new question IDs
   */
  function getNewQuestions(count, focusTopic = null, difficultyRange = [1, 3]) {
    // This would integrate with the quiz data to find unreviewed questions
    // For now, return empty array - would need integration with QuizData module
    return [];
  }
  
  /**
   * Get topics where the user is struggling
   * @return {Array} Array of weak topic data
   */
  function getWeakTopics() {
    const masteryData = getTopicMasteryData();
    const weakTopics = [];
    
    Object.entries(masteryData).forEach(([topic, data]) => {
      if (data.score < 0.6 && data.totalReviews >= 5) {
        weakTopics.push({
          topic: topic,
          masteryScore: data.score,
          totalReviews: data.totalReviews,
          needsWork: true
        });
      }
    });
    
    // Sort by mastery score (lowest first)
    weakTopics.sort((a, b) => a.masteryScore - b.masteryScore);
    
    return weakTopics.slice(0, 3); // Return top 3 weak topics
  }
  
  /**
   * Generate personalized study recommendations
   * @return {Array} Array of recommendation objects
   */
  function generateStudyRecommendations() {
    const recommendations = [];
    const dueCount = getQuestionsForReview(100).length;
    const weakTopics = getWeakTopics();
    
    if (dueCount > 20) {
      recommendations.push({
        type: 'review',
        priority: 'high',
        message: `You have ${dueCount} questions due for review. Focus on reviewing to maintain retention.`,
        action: 'startReview'
      });
    }
    
    if (weakTopics.length > 0) {
      const weakest = weakTopics[0];
      recommendations.push({
        type: 'focus',
        priority: 'medium',
        message: `Consider focusing on ${weakest.topic} where your mastery is ${Math.round(weakest.masteryScore * 100)}%.`,
        action: `focusOnTopic:${weakest.topic}`
      });
    }
    
    if (dueCount < 5) {
      recommendations.push({
        type: 'learn',
        priority: 'low',
        message: 'Great job staying on top of reviews! Try learning some new questions.',
        action: 'startLearning'
      });
    }
    
    return recommendations;
  }
  
  /**
   * Load all card data from storage
   * @return {Object} All card data indexed by question ID
   */
  function loadAllCards() {
    try {
      const data = localStorage.getItem(SR_STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading spaced repetition data:', error);
      return {};
    }
  }
  
  /**
   * Save all card data to storage
   * @param {Object} cards - All card data to save
   */
  function saveAllCards(cards) {
    try {
      localStorage.setItem(SR_STORAGE_KEY, JSON.stringify(cards));
    } catch (error) {
      console.error('Error saving spaced repetition data:', error);
    }
  }
  
  /**
   * Get topic mastery data
   * @return {Object} Topic mastery information
   */
  function getTopicMasteryData() {
    try {
      const data = localStorage.getItem(SR_STORAGE_KEY + '_mastery');
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading topic mastery data:', error);
      return {};
    }
  }
  
  /**
   * Save topic mastery data
   * @param {Object} masteryData - Topic mastery data to save
   */
  function saveTopicMasteryData(masteryData) {
    try {
      localStorage.setItem(SR_STORAGE_KEY + '_mastery', JSON.stringify(masteryData));
    } catch (error) {
      console.error('Error saving topic mastery data:', error);
    }
  }
  
  /**
   * Get statistics about the spaced repetition system
   * @return {Object} Statistics data
   */
  function getStats() {
    const allCards = loadAllCards();
    const masteryData = getTopicMasteryData();
    const now = new Date();
    
    const stats = {
      totalCards: Object.keys(allCards).length,
      cardsReviewed: Object.values(allCards).filter(card => card.lastReviewed).length,
      cardsDue: getQuestionsForReview(1000).length,
      averageEase: 0,
      topicMastery: {},
      studyStreak: 0
    };
    
    // Calculate average ease
    const easeValues = Object.values(allCards).map(card => card.ease);
    if (easeValues.length > 0) {
      stats.averageEase = easeValues.reduce((sum, ease) => sum + ease, 0) / easeValues.length;
    }
    
    // Format topic mastery
    Object.entries(masteryData).forEach(([topic, data]) => {
      stats.topicMastery[topic] = {
        score: Math.round(data.score * 100),
        reviews: data.totalReviews
      };
    });
    
    return stats;
  }
  
  /**
   * Reset all spaced repetition data (for debugging/testing)
   */
  function reset() {
    localStorage.removeItem(SR_STORAGE_KEY);
    localStorage.removeItem(SR_STORAGE_KEY + '_mastery');
  }
  
  // Public API
  return {
    init,
    getCard,
    updateCard,
    getQuestionsForReview,
    getStudySession,
    getWeakTopics,
    getStats,
    reset,
    
    // Constants for external use
    QUALITY: ALGORITHM.QUALITY
  };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  SpacedRepetition.init();
});