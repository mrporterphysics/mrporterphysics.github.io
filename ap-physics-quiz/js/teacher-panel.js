/**
 * Teacher Administration Panel
 * Provides comprehensive class management and analytics tools for educators
 */

const TeacherPanel = (function() {
  
  // Default teacher access code
  const DEFAULT_ACCESS_CODE = 'physics2024';
  const TEACHER_STORAGE_KEY = 'ap_physics_teacher_settings';
  
  // Panel elements
  let elements = {};
  let isAuthenticated = false;
  let currentTab = 'overview';
  
  /**
   * Initialize the teacher panel
   */
  function init() {
    console.log('Teacher Panel initialized');
    
    // Get DOM elements
    elements.teacherModeBtn = document.getElementById('teacherModeBtn');
    elements.teacherPanel = document.getElementById('teacherPanel');
    elements.closeTeacherPanel = document.getElementById('closeTeacherPanel');
    elements.teacherAuth = document.getElementById('teacherAuth');
    elements.teacherDashboard = document.getElementById('teacherDashboard');
    elements.teacherPassword = document.getElementById('teacherPassword');
    elements.teacherLogin = document.getElementById('teacherLogin');
    
    // Add event listeners
    if (elements.teacherModeBtn) {
      elements.teacherModeBtn.addEventListener('click', openTeacherPanel);
    }
    
    if (elements.closeTeacherPanel) {
      elements.closeTeacherPanel.addEventListener('click', closeTeacherPanel);
    }
    
    if (elements.teacherLogin) {
      elements.teacherLogin.addEventListener('click', authenticateTeacher);
    }
    
    if (elements.teacherPassword) {
      elements.teacherPassword.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          authenticateTeacher();
        }
      });
    }
    
    // Set up tab navigation
    setupTabNavigation();
    
    // Set up dashboard functionality
    setupDashboardFeatures();
  }
  
  /**
   * Open the teacher panel
   */
  function openTeacherPanel() {
    if (elements.teacherPanel) {
      elements.teacherPanel.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      if (isAuthenticated) {
        showDashboard();
      } else {
        showAuthentication();
      }
    }
  }
  
  /**
   * Close the teacher panel
   */
  function closeTeacherPanel() {
    if (elements.teacherPanel) {
      elements.teacherPanel.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  }
  
  /**
   * Show authentication form
   */
  function showAuthentication() {
    if (elements.teacherAuth && elements.teacherDashboard) {
      elements.teacherAuth.style.display = 'block';
      elements.teacherDashboard.style.display = 'none';
    }
  }
  
  /**
   * Show main dashboard
   */
  function showDashboard() {
    if (elements.teacherAuth && elements.teacherDashboard) {
      elements.teacherAuth.style.display = 'none';
      elements.teacherDashboard.style.display = 'block';
      
      // Update dashboard data
      updateDashboardStats();
      updateCurrentTab();
    }
  }
  
  /**
   * Authenticate teacher access
   */
  function authenticateTeacher() {
    const password = elements.teacherPassword.value.trim();
    const savedSettings = getTeacherSettings();
    const accessCode = savedSettings.accessCode || DEFAULT_ACCESS_CODE;
    
    if (password === accessCode) {
      isAuthenticated = true;
      elements.teacherPassword.value = '';
      showDashboard();
    } else {
      alert('Invalid access code. Please try again.');
      elements.teacherPassword.value = '';
      elements.teacherPassword.focus();
    }
  }
  
  /**
   * Setup tab navigation
   */
  function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.teacher-tab');
    const tabContents = document.querySelectorAll('.teacher-tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabName = this.dataset.tab;
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Update active tab content
        tabContents.forEach(content => content.classList.remove('active'));
        const targetContent = document.getElementById(tabName + 'Tab');
        if (targetContent) {
          targetContent.classList.add('active');
        }
        
        currentTab = tabName;
        updateCurrentTab();
      });
    });
  }
  
  /**
   * Setup dashboard features
   */
  function setupDashboardFeatures() {
    // Question preview functionality
    const previewSelect = document.getElementById('previewTopicSelect');
    if (previewSelect) {
      previewSelect.addEventListener('change', updateQuestionPreview);
    }
    
    // Export functionality
    const exportQuestionsBtn = document.getElementById('exportQuestions');
    if (exportQuestionsBtn) {
      exportQuestionsBtn.addEventListener('click', exportQuestions);
    }
    
    const exportPrintableBtn = document.getElementById('exportPrintable');
    if (exportPrintableBtn) {
      exportPrintableBtn.addEventListener('click', exportPrintable);
    }
    
    const exportAllDataBtn = document.getElementById('exportAllData');
    if (exportAllDataBtn) {
      exportAllDataBtn.addEventListener('click', exportAllData);
    }
    
    // Clear data functionality
    const clearAllDataBtn = document.getElementById('clearAllData');
    if (clearAllDataBtn) {
      clearAllDataBtn.addEventListener('click', clearAllData);
    }
    
    // Settings functionality
    const updatePasswordBtn = document.getElementById('updatePassword');
    if (updatePasswordBtn) {
      updatePasswordBtn.addEventListener('click', updateTeacherPassword);
    }
    
    // Import functionality
    const importBtn = document.getElementById('importQuestions');
    if (importBtn) {
      importBtn.addEventListener('click', importQuestions);
    }
  }
  
  /**
   * Update dashboard statistics
   */
  function updateDashboardStats() {
    // Update question count
    const totalQuestionsEl = document.getElementById('totalQuestionsCount');
    if (totalQuestionsEl && typeof QuizData !== 'undefined') {
      const stats = QuizData.getQuestionStats();
      totalQuestionsEl.textContent = stats.total || 260;
    }
    
    // Update class statistics (simulated for demo)
    const activeStudentsEl = document.getElementById('activeStudentsCount');
    const averageAccuracyEl = document.getElementById('averageAccuracy');
    const totalSessionsEl = document.getElementById('totalSessionsCount');
    
    if (typeof QuizStorage !== 'undefined') {
      const allStats = QuizStorage.getStats();
      
      if (activeStudentsEl) {
        // Simulate active students count
        activeStudentsEl.textContent = Math.max(1, Math.floor(allStats.totalAnswered / 50)) || '-';
      }
      
      if (averageAccuracyEl && allStats.totalAnswered > 0) {
        const accuracy = Math.round((allStats.totalCorrect / allStats.totalAnswered) * 100);
        averageAccuracyEl.textContent = accuracy + '%';
      }
      
      if (totalSessionsEl) {
        totalSessionsEl.textContent = Math.floor(allStats.totalAnswered / 20) || '-';
      }
    }
  }
  
  /**
   * Update current tab content
   */
  function updateCurrentTab() {
    switch (currentTab) {
      case 'overview':
        updateOverviewTab();
        break;
      case 'questions':
        updateQuestionsTab();
        break;
      case 'analytics':
        updateAnalyticsTab();
        break;
      case 'settings':
        updateSettingsTab();
        break;
    }
  }
  
  /**
   * Update overview tab content
   */
  function updateOverviewTab() {
    // Update recent activity
    const recentActivityEl = document.getElementById('recentActivity');
    if (recentActivityEl && typeof QuizStorage !== 'undefined') {
      const activityDates = QuizStorage.getActivityDates();
      
      if (activityDates.length > 0) {
        const recentDates = activityDates.slice(-5).reverse();
        recentActivityEl.innerHTML = recentDates.map(date => 
          `<div class="activity-item">📚 Student practice session on ${new Date(date).toLocaleDateString()}</div>`
        ).join('');
      }
    }
    
    // Update topic performance
    const topicGridEl = document.getElementById('topicPerformanceGrid');
    if (topicGridEl && typeof QuizStorage !== 'undefined') {
      const stats = QuizStorage.getStats();
      if (stats.topics && Object.keys(stats.topics).length > 0) {
        topicGridEl.innerHTML = Object.entries(stats.topics).map(([topic, data]) => {
          const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
          const performanceClass = accuracy >= 80 ? 'high' : accuracy >= 60 ? 'medium' : 'low';
          
          return `
            <div class="topic-performance-card ${performanceClass}">
              <div class="topic-name">${topic.charAt(0).toUpperCase() + topic.slice(1)}</div>
              <div class="topic-accuracy">${accuracy}%</div>
              <div class="topic-questions">${data.correct}/${data.total} correct</div>
            </div>
          `;
        }).join('');
        
        // Add CSS for topic performance cards
        addTopicPerformanceStyles();
      } else {
        topicGridEl.innerHTML = '<div class="no-data">No student performance data available yet.</div>';
      }
    }
    
    // Update recommendations
    updateClassRecommendations();
  }
  
  /**
   * Add CSS styles for topic performance cards
   */
  function addTopicPerformanceStyles() {
    if (document.getElementById('topicPerformanceStyles')) return;
    
    const style = document.createElement('style');
    style.id = 'topicPerformanceStyles';
    style.textContent = `
      .topic-performance-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
      }
      .topic-performance-card {
        background: var(--bg);
        border: 1px solid var(--ui);
        border-radius: 6px;
        padding: 15px;
        text-align: center;
      }
      .topic-performance-card.high { border-left: 4px solid var(--accent-success); }
      .topic-performance-card.medium { border-left: 4px solid var(--accent-yellow); }
      .topic-performance-card.low { border-left: 4px solid var(--accent-danger); }
      .topic-name { font-weight: bold; margin-bottom: 8px; }
      .topic-accuracy { font-size: 1.5em; font-weight: bold; margin-bottom: 5px; }
      .topic-accuracy { color: var(--accent-primary); }
      .topic-questions { color: var(--tx-2); font-size: 0.9em; }
      .no-data { text-align: center; color: var(--tx-2); font-style: italic; padding: 20px; }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * Update class recommendations
   */
  function updateClassRecommendations() {
    const recommendationsEl = document.getElementById('classRecommendations');
    if (!recommendationsEl) return;
    
    const recommendations = [];
    
    if (typeof QuizStorage !== 'undefined') {
      const stats = QuizStorage.getStats();
      
      if (stats.totalAnswered < 100) {
        recommendations.push({
          icon: '📚',
          text: 'Encourage more student practice. Current activity level is low.',
          priority: 'high'
        });
      }
      
      if (stats.topics) {
        const weakTopics = Object.entries(stats.topics)
          .filter(([topic, data]) => data.total >= 10 && (data.correct / data.total) < 0.6)
          .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));
        
        if (weakTopics.length > 0) {
          const weakestTopic = weakTopics[0][0];
          recommendations.push({
            icon: '⚠️',
            text: `Students are struggling with ${weakestTopic}. Consider additional review.`,
            priority: 'high'
          });
        }
      }
      
      if (typeof SpacedRepetition !== 'undefined') {
        const srStats = SpacedRepetition.getStats();
        if (srStats.cardsDue > 50) {
          recommendations.push({
            icon: '🔄',
            text: 'Many questions are due for review. Encourage students to use Smart Review mode.',
            priority: 'medium'
          });
        }
      }
    }
    
    if (recommendations.length === 0) {
      recommendations.push({
        icon: '✅',
        text: 'Great job! Students are making good progress across all topics.',
        priority: 'info'
      });
    }
    
    recommendationsEl.innerHTML = recommendations.map(rec => `
      <div class="recommendation-item ${rec.priority}">
        <span class="rec-icon">${rec.icon}</span>
        <span class="rec-text">${rec.text}</span>
      </div>
    `).join('');
  }
  
  /**
   * Update questions tab
   */
  function updateQuestionsTab() {
    const statsGridEl = document.getElementById('questionStatsGrid');
    if (statsGridEl && typeof QuizData !== 'undefined') {
      const stats = QuizData.getQuestionStats();
      
      statsGridEl.innerHTML = `
        <div class="question-type-stats">
          <h5>Questions by Type</h5>
          <div class="type-breakdown">
            <div class="type-item">True/False: <strong>${stats.byType.tf}</strong></div>
            <div class="type-item">Fill-in-blank: <strong>${stats.byType.fill}</strong></div>
            <div class="type-item">Multiple Choice: <strong>${stats.byType.mc}</strong></div>
            <div class="type-item">Matching: <strong>${stats.byType.matching}</strong></div>
          </div>
        </div>
        <div class="question-topic-stats">
          <h5>Questions by Topic</h5>
          <div class="topic-breakdown">
            ${Object.entries(stats.byTopic).map(([topic, count]) => 
              `<div class="topic-item">${topic}: <strong>${count}</strong></div>`
            ).join('')}
          </div>
        </div>
      `;
    }
  }
  
  /**
   * Update question preview
   */
  function updateQuestionPreview() {
    const topicSelect = document.getElementById('previewTopicSelect');
    const previewContent = document.getElementById('previewContent');
    
    if (!topicSelect || !previewContent || typeof QuizData === 'undefined') return;
    
    const selectedTopic = topicSelect.value;
    const questions = QuizData.filterQuestions('all', selectedTopic, false, false);
    
    if (questions.length === 0) {
      previewContent.innerHTML = '<div class="no-questions">No questions found for this topic.</div>';
      return;
    }
    
    // Show first 5 questions as preview
    const previewQuestions = questions.slice(0, 5);
    previewContent.innerHTML = previewQuestions.map((q, index) => `
      <div class="preview-question">
        <div class="question-header">
          <span class="question-number">${index + 1}.</span>
          <span class="question-type">[${q.type.toUpperCase()}]</span>
          ${q.difficulty ? `<span class="question-difficulty">${'★'.repeat(q.difficulty)}</span>` : ''}
        </div>
        <div class="question-text">${q.question}</div>
        <div class="question-answer"><strong>Answer:</strong> ${q.answer}</div>
      </div>
    `).join('');
  }
  
  /**
   * Export questions as CSV
   */
  function exportQuestions() {
    if (typeof QuizData === 'undefined') {
      alert('Question data not available');
      return;
    }
    
    const allQuestions = QuizData.filterQuestions('all', 'all', false, false);
    const csvContent = convertQuestionsToCSV(allQuestions);
    downloadCSV(csvContent, 'ap-physics-questions.csv');
  }
  
  /**
   * Convert questions to CSV format
   */
  function convertQuestionsToCSV(questions) {
    const headers = ['id', 'type', 'question', 'answer', 'topic', 'explanation', 'difficulty'];
    const rows = [headers.join(',')];
    
    questions.forEach(q => {
      const row = [
        q.id || '',
        q.type || '',
        `"${(q.question || '').replace(/"/g, '""')}"`,
        `"${(q.answer || '').replace(/"/g, '""')}"`,
        q.topic || '',
        `"${(q.explanation || '').replace(/"/g, '""')}"`,
        q.difficulty || 2
      ];
      rows.push(row.join(','));
    });
    
    return rows.join('\n');
  }
  
  /**
   * Download CSV file
   */
  function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  /**
   * Export printable version
   */
  function exportPrintable() {
    alert('Printable export feature coming soon!');
  }
  
  /**
   * Export all student data
   */
  function exportAllData() {
    if (typeof QuizStorage === 'undefined') {
      alert('Storage system not available');
      return;
    }
    
    const allData = QuizStorage.exportData();
    const jsonContent = JSON.stringify(allData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'student-data-export.json');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  /**
   * Clear all data with confirmation
   */
  function clearAllData() {
    const confirmation = confirm(
      'Are you sure you want to clear ALL student data? This action cannot be undone!\\n\\n' +
      'This will delete:\\n' +
      '- All student progress\\n' +
      '- All statistics\\n' +
      '- All spaced repetition data\\n\\n' +
      'Type "DELETE" in the next prompt to confirm.'
    );
    
    if (!confirmation) return;
    
    const secondConfirmation = prompt('Type "DELETE" to confirm deletion of all data:');
    if (secondConfirmation !== 'DELETE') {
      alert('Data deletion cancelled.');
      return;
    }
    
    // Clear all data
    if (typeof QuizStorage !== 'undefined') {
      QuizStorage.clearAllData();
    }
    
    if (typeof SpacedRepetition !== 'undefined') {
      SpacedRepetition.reset();
    }
    
    alert('All student data has been cleared.');
    updateDashboardStats();
    updateCurrentTab();
  }
  
  /**
   * Update analytics tab
   */
  function updateAnalyticsTab() {
    const metricsEl = document.getElementById('metricsDashboard');
    if (metricsEl) {
      metricsEl.innerHTML = `
        <div class="metrics-placeholder">
          <h4>📊 Advanced Analytics</h4>
          <p>Detailed performance metrics and learning analytics will be displayed here.</p>
          <p>Features include:</p>
          <ul>
            <li>Student progress tracking over time</li>
            <li>Question difficulty analysis</li>
            <li>Topic mastery progression</li>
            <li>Learning efficiency metrics</li>
          </ul>
        </div>
      `;
    }
  }
  
  /**
   * Update settings tab
   */
  function updateSettingsTab() {
    const settings = getTeacherSettings();
    
    // Load current settings
    const allowStatsCheckbox = document.getElementById('allowStudentStats');
    const enableSRCheckbox = document.getElementById('enableSpacedRepetition');
    const showDifficultyCheckbox = document.getElementById('showDifficulty');
    
    if (allowStatsCheckbox) allowStatsCheckbox.checked = settings.allowStudentStats || false;
    if (enableSRCheckbox) enableSRCheckbox.checked = settings.enableSpacedRepetition !== false;
    if (showDifficultyCheckbox) showDifficultyCheckbox.checked = settings.showDifficulty !== false;
  }
  
  /**
   * Update teacher password
   */
  function updateTeacherPassword() {
    const newPasswordEl = document.getElementById('newTeacherPassword');
    if (!newPasswordEl) return;
    
    const newPassword = newPasswordEl.value.trim();
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    
    const settings = getTeacherSettings();
    settings.accessCode = newPassword;
    saveTeacherSettings(settings);
    
    newPasswordEl.value = '';
    alert('Teacher access code updated successfully.');
  }
  
  /**
   * Import questions
   */
  function importQuestions() {
    alert('Question import feature coming soon!');
  }
  
  /**
   * Get teacher settings
   */
  function getTeacherSettings() {
    try {
      const settings = localStorage.getItem(TEACHER_STORAGE_KEY);
      return settings ? JSON.parse(settings) : {};
    } catch (error) {
      console.error('Error loading teacher settings:', error);
      return {};
    }
  }
  
  /**
   * Save teacher settings
   */
  function saveTeacherSettings(settings) {
    try {
      localStorage.setItem(TEACHER_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving teacher settings:', error);
    }
  }
  
  // Public API
  return {
    init,
    openTeacherPanel,
    closeTeacherPanel
  };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  TeacherPanel.init();
});