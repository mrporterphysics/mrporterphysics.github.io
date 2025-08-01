/**
 * Progress Dashboard - Visual learning analytics for students
 * Provides comprehensive progress tracking and recommendations
 */

const ProgressDashboard = (function() {
  
  // Dashboard elements
  let elements = {};
  
  // Topic mappings for better display
  const topicDisplayNames = {
    'kinematics': 'Kinematics & Motion',
    'forces': 'Forces & Newton\'s Laws',
    'energy': 'Energy & Work',
    'momentum': 'Momentum & Impulse',
    'rotation': 'Rotational Motion',
    'gravitation': 'Gravity & Orbits',
    'shm': 'Simple Harmonic Motion',
    'fluids': 'Fluid Mechanics',
    'waves': 'Waves & Sound',
    'astronomy': 'Astronomy',
    'meteorology': 'Weather & Climate',
    'geology': 'Earth Structure',
    'plate_tectonics': 'Plate Tectonics'
  };
  
  /**
   * Initialize the progress dashboard
   */
  function init() {
    // Get dashboard elements
    elements.dashboard = document.getElementById('progressDashboard');
    elements.overallAccuracy = document.getElementById('overallAccuracy');
    elements.totalAnswered = document.getElementById('totalAnswered');
    elements.studyStreak = document.getElementById('studyStreak');
    elements.masteryLevel = document.getElementById('masteryLevel');
    elements.topicMasteryGrid = document.getElementById('topicMasteryGrid');
    elements.difficultyBars = document.getElementById('difficultyBars');
    elements.activityChart = document.getElementById('activityChart');
    elements.recommendationsList = document.getElementById('recommendationsList');
    
    // Add button to show dashboard
    addDashboardButton();
    
    // Load and display progress
    updateDashboard();
  }
  
  /**
   * Add dashboard toggle button to setup panel
   */
  function addDashboardButton() {
    const setupPanel = document.getElementById('setupPanel');
    const startButton = document.getElementById('startQuiz');
    
    // Create dashboard button
    const dashboardBtn = document.createElement('button');
    dashboardBtn.className = 'btn dashboard-btn';
    dashboardBtn.type = 'button';
    dashboardBtn.innerHTML = '📊 View Progress Dashboard';
    dashboardBtn.style.marginTop = '10px';
    dashboardBtn.style.backgroundColor = 'var(--accent-secondary)';
    
    // Insert before start button
    setupPanel.insertBefore(dashboardBtn, startButton);
    
    // Add event listener
    dashboardBtn.addEventListener('click', function() {
      toggleDashboard();
    });
  }
  
  /**
   * Toggle dashboard visibility
   */
  function toggleDashboard() {
    const isVisible = elements.dashboard.style.display !== 'none';
    
    if (isVisible) {
      elements.dashboard.style.display = 'none';
    } else {
      updateDashboard();
      elements.dashboard.style.display = 'block';
      // Smooth scroll to dashboard
      elements.dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  /**
   * Update the entire dashboard with current data
   */
  function updateDashboard() {
    if (!elements.dashboard) return;
    
    const stats = getProgressStats();
    
    updateOverallStats(stats);
    updateTopicMastery(stats);
    updateDifficultyProgress(stats);
    updateRecentActivity(stats);
    updateRecommendations(stats);
  }
  
  /**
   * Get comprehensive progress statistics
   */
  function getProgressStats() {
    if (typeof QuizStorage === 'undefined') {
      return getDefaultStats();
    }
    
    const savedStats = QuizStorage.getStats();
    const lastActivity = QuizStorage.getLastActivity();
    const streak = calculateStudyStreak();
    
    return {
      totalAnswered: savedStats.totalAnswered || 0,
      totalCorrect: savedStats.totalCorrect || 0,
      overallAccuracy: savedStats.totalAnswered > 0 ? 
        Math.round((savedStats.totalCorrect / savedStats.totalAnswered) * 100) : 0,
      topics: savedStats.topics || {},
      lastActivity: lastActivity,
      studyStreak: streak,
      masteryLevel: calculateMasteryLevel(savedStats),
      difficulties: calculateDifficultyStats(savedStats)
    };
  }
  
  /**
   * Get default stats for new users
   */
  function getDefaultStats() {
    return {
      totalAnswered: 0,
      totalCorrect: 0,
      overallAccuracy: 0,
      topics: {},
      lastActivity: null,
      studyStreak: 0,
      masteryLevel: 'Beginner',
      difficulties: { easy: 0, medium: 0, hard: 0 }
    };
  }
  
  /**
   * Calculate study streak
   */
  function calculateStudyStreak() {
    if (typeof QuizStorage === 'undefined') return 0;
    
    const activityDates = QuizStorage.getActivityDates() || [];
    if (activityDates.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    
    // Sort dates in descending order
    activityDates.sort((a, b) => new Date(b) - new Date(a));
    
    for (let i = 0; i < activityDates.length; i++) {
      const activityDate = new Date(activityDates[i]);
      const expectedDate = new Date(today.getTime() - (i * oneDay));
      
      // Check if activity was on expected consecutive day
      if (Math.abs(activityDate - expectedDate) < oneDay) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }
  
  /**
   * Calculate mastery level based on stats
   */
  function calculateMasteryLevel(stats) {
    const totalAnswered = stats.totalAnswered || 0;
    const accuracy = stats.totalAnswered > 0 ? 
      (stats.totalCorrect / stats.totalAnswered) * 100 : 0;
    
    if (totalAnswered < 50) return 'Beginner';
    if (totalAnswered < 150 || accuracy < 70) return 'Intermediate';
    if (totalAnswered < 300 || accuracy < 85) return 'Advanced';
    return 'Expert';
  }
  
  /**
   * Calculate difficulty-based statistics
   */
  function calculateDifficultyStats(stats) {
    // This would ideally come from tracked difficulty data
    // For now, estimate based on overall performance
    const accuracy = stats.totalAnswered > 0 ? 
      (stats.totalCorrect / stats.totalAnswered) * 100 : 0;
    
    return {
      easy: Math.min(100, accuracy + 15),
      medium: accuracy,
      hard: Math.max(0, accuracy - 20)
    };
  }
  
  /**
   * Update overall statistics cards
   */
  function updateOverallStats(stats) {
    if (elements.overallAccuracy) {
      elements.overallAccuracy.textContent = `${stats.overallAccuracy}%`;
    }
    
    if (elements.totalAnswered) {
      elements.totalAnswered.textContent = stats.totalAnswered;
    }
    
    if (elements.studyStreak) {
      elements.studyStreak.textContent = stats.studyStreak;
    }
    
    if (elements.masteryLevel) {
      elements.masteryLevel.textContent = stats.masteryLevel;
      
      // Update icon based on level
      const parentCard = elements.masteryLevel.closest('.stat-card');
      const icon = parentCard.querySelector('.stat-icon');
      if (icon) {
        const icons = {
          'Beginner': '🌱',
          'Intermediate': '📚',
          'Advanced': '🎓',
          'Expert': '🏆'
        };
        icon.textContent = icons[stats.masteryLevel] || '🏆';
      }
    }
  }
  
  /**
   * Update topic mastery grid
   */
  function updateTopicMastery(stats) {
    if (!elements.topicMasteryGrid) return;
    
    elements.topicMasteryGrid.innerHTML = '';
    
    // Get all topics (both with data and default topics)
    const allTopics = new Set([
      ...Object.keys(stats.topics),
      ...Object.keys(topicDisplayNames)
    ]);
    
    allTopics.forEach(topic => {
      const topicData = stats.topics[topic] || { correct: 0, total: 0 };
      const accuracy = topicData.total > 0 ? 
        Math.round((topicData.correct / topicData.total) * 100) : 0;
      
      const topicCard = createTopicCard(topic, topicData, accuracy);
      elements.topicMasteryGrid.appendChild(topicCard);
    });
  }
  
  /**
   * Create a topic mastery card
   */
  function createTopicCard(topic, data, accuracy) {
    const card = document.createElement('div');
    card.className = 'topic-card';
    
    const accuracyClass = accuracy >= 80 ? 'high' : accuracy >= 60 ? 'medium' : 'low';
    const displayName = topicDisplayNames[topic] || topic.charAt(0).toUpperCase() + topic.slice(1);
    
    card.innerHTML = `
      <div class="topic-name">${displayName}</div>
      <div class="topic-progress">
        <span class="topic-accuracy ${accuracyClass}">${accuracy}%</span>
        <span class="topic-count">${data.correct}/${data.total}</span>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar-fill ${accuracyClass}" style="width: ${accuracy}%"></div>
      </div>
      <div class="topic-stats">
        ${data.total === 0 ? 'No questions attempted yet' : 
          `${data.correct} correct out of ${data.total} questions`}
      </div>
    `;
    
    return card;
  }
  
  /**
   * Update difficulty progress bars
   */
  function updateDifficultyProgress(stats) {
    if (!elements.difficultyBars) return;
    
    const difficulties = [
      { key: 'easy', label: 'Easy ★☆☆', class: 'easy' },
      { key: 'medium', label: 'Medium ★★☆', class: 'medium' },
      { key: 'hard', label: 'Hard ★★★', class: 'hard' }
    ];
    
    elements.difficultyBars.innerHTML = '';
    
    difficulties.forEach(diff => {
      const accuracy = Math.round(stats.difficulties[diff.key] || 0);
      
      const barContainer = document.createElement('div');
      barContainer.className = 'difficulty-bar';
      
      barContainer.innerHTML = `
        <div class="difficulty-label ${diff.class}">
          ${diff.label}
        </div>
        <div class="progress-bar-container" style="flex: 1;">
          <div class="progress-bar-fill ${diff.class}" style="width: ${accuracy}%"></div>
        </div>
        <div class="difficulty-accuracy">${accuracy}%</div>
      `;
      
      elements.difficultyBars.appendChild(barContainer);
    });
  }
  
  /**
   * Update recent activity chart
   */
  function updateRecentActivity(stats) {
    if (!elements.activityChart) return;
    
    if (stats.totalAnswered === 0) {
      elements.activityChart.innerHTML = `
        <div class="activity-placeholder">
          Complete some quizzes to see your progress chart!
        </div>
      `;
      return;
    }
    
    // Simple activity display
    elements.activityChart.innerHTML = `
      <div style="text-align: center; color: var(--tx);">
        <div style="font-size: 2em; margin-bottom: 10px;">📈</div>
        <div><strong>${stats.totalAnswered}</strong> questions answered</div>
        <div style="color: var(--tx-2); margin-top: 5px;">
          Last activity: ${stats.lastActivity ? 
            new Date(stats.lastActivity).toLocaleDateString() : 'Today'}
        </div>
      </div>
    `;
  }
  
  /**
   * Update personalized recommendations
   */
  function updateRecommendations(stats) {
    if (!elements.recommendationsList) return;
    
    const recommendations = generateRecommendations(stats);
    
    elements.recommendationsList.innerHTML = '';
    
    recommendations.forEach(rec => {
      const recItem = document.createElement('div');
      recItem.className = 'recommendation-item';
      
      recItem.innerHTML = `
        <div class="recommendation-icon">${rec.icon}</div>
        <div class="recommendation-text">${rec.text}</div>
        <button class="recommendation-action" onclick="${rec.action}">
          ${rec.buttonText}
        </button>
      `;
      
      elements.recommendationsList.appendChild(recItem);
    });
    
    if (recommendations.length === 0) {
      elements.recommendationsList.innerHTML = `
        <div style="text-align: center; color: var(--tx-2); padding: 20px;">
          Great job! Keep practicing to get more personalized recommendations.
        </div>
      `;
    }
  }
  
  /**
   * Generate personalized recommendations
   */
  function generateRecommendations(stats) {
    const recommendations = [];
    
    // Low overall accuracy
    if (stats.overallAccuracy < 60 && stats.totalAnswered > 20) {
      recommendations.push({
        icon: '📚',
        text: 'Your accuracy could improve. Try switching to Learning Mode for immediate feedback.',
        buttonText: 'Start Learning',
        action: 'ProgressDashboard.startLearningMode()'
      });
    }
    
    // Low activity
    if (stats.totalAnswered < 50) {
      recommendations.push({
        icon: '🎯',
        text: 'Practice more questions to build confidence and improve your physics knowledge.',
        buttonText: 'Practice Now',
        action: 'ProgressDashboard.startPractice()'
      });
    }
    
    // Topic-specific recommendations
    Object.entries(stats.topics).forEach(([topic, data]) => {
      const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
      if (data.total >= 10 && accuracy < 50) {
        const displayName = topicDisplayNames[topic] || topic;
        recommendations.push({
          icon: '⚠️',
          text: `${displayName} needs attention. Your accuracy is ${Math.round(accuracy)}%.`,
          buttonText: 'Focus Study',
          action: `ProgressDashboard.focusOnTopic('${topic}')`
        });
      }
    });
    
    // Streak encouragement
    if (stats.studyStreak === 0 && stats.totalAnswered > 10) {
      recommendations.push({
        icon: '🔥',
        text: 'Start a study streak! Daily practice helps with long-term retention.',
        buttonText: 'Start Streak',
        action: 'ProgressDashboard.startPractice()'
      });
    }
    
    return recommendations.slice(0, 3); // Limit to 3 recommendations
  }
  
  /**
   * Action methods for recommendations
   */
  function startLearningMode() {
    // Switch to learning mode and start quiz
    const learningModeBtn = document.querySelector('.mode-option[data-mode="learn"]');
    if (learningModeBtn) {
      document.querySelectorAll('.mode-option').forEach(btn => btn.classList.remove('active'));
      learningModeBtn.classList.add('active');
    }
    
    // Hide dashboard and start quiz
    elements.dashboard.style.display = 'none';
    const startBtn = document.getElementById('startQuiz');
    if (startBtn) startBtn.click();
  }
  
  function startPractice() {
    // Hide dashboard and start quiz
    elements.dashboard.style.display = 'none';
    const startBtn = document.getElementById('startQuiz');
    if (startBtn) startBtn.click();
  }
  
  function focusOnTopic(topic) {
    // Select specific topic and start quiz
    const topicBtn = document.querySelector(`[data-topic="${topic}"]`);
    if (topicBtn) {
      document.querySelectorAll('.topic-btn').forEach(btn => btn.classList.remove('active'));
      topicBtn.classList.add('active');
    }
    
    startPractice();
  }
  
  // Public API
  return {
    init,
    updateDashboard,
    toggleDashboard,
    startLearningMode,
    startPractice,
    focusOnTopic
  };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for other modules to load
  setTimeout(ProgressDashboard.init, 100);
});