/**
 * Fact Sheet Integration Module
 * Handles linking between quiz questions and fact sheet content
 */

const FactSheetIntegration = (function() {
  let topicMapping = {};
  let questionTypeMapping = {};
  let factSheetSectionIds = {};
  
  /**
   * Initialize the fact sheet integration system
   */
  async function init() {
    try {
      const response = await fetch('question-factsheet-mapping.json');
      const mappingData = await response.json();
      
      topicMapping = mappingData.topicMapping || {};
      questionTypeMapping = mappingData.questionTypeMapping || {};
      factSheetSectionIds = mappingData.factSheetSectionIds || {};
      
      console.log('Fact sheet integration initialized');
      return true;
    } catch (error) {
      console.error('Failed to load fact sheet mapping:', error);
      return false;
    }
  }
  
  /**
   * Get fact sheet sections relevant to a question's topic
   */
  function getRelevantSections(questionTopic) {
    const topic = questionTopic?.toLowerCase();
    if (!topic || !topicMapping[topic]) {
      return null;
    }
    
    return {
      sections: topicMapping[topic].factSheetSections,
      primarySection: topicMapping[topic].primarySection,
      description: topicMapping[topic].description
    };
  }
  
  /**
   * Create fact sheet reference button for a question
   */
  function createFactSheetButton(question) {
    const relevantSections = getRelevantSections(question.topic);
    if (!relevantSections) return null;
    
    const button = document.createElement('button');
    button.className = 'fact-sheet-btn';
    button.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <book>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      <span>Reference</span>
    `;
    
    button.title = `View ${relevantSections.description} in fact sheet`;
    
    button.addEventListener('click', () => {
      openFactSheetModal(question, relevantSections);
    });
    
    return button;
  }
  
  /**
   * Create quick reference tooltip
   */
  function createQuickReference(question) {
    const relevantSections = getRelevantSections(question.topic);
    if (!relevantSections) return null;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'fact-sheet-tooltip';
    
    const typeInfo = questionTypeMapping[question.type] || {};
    
    tooltip.innerHTML = `
      <div class="tooltip-header">
        <span class="topic-badge">${question.topic}</span>
        <span class="type-icon">${typeInfo.icon || '📋'}</span>
      </div>
      <div class="tooltip-content">
        <p class="description">${relevantSections.description}</p>
        <div class="sections-list">
          <strong>Related sections:</strong>
          <ul>
            ${relevantSections.sections.slice(0, 3).map(sectionId => 
              `<li><a href="factsheet-complete.html#${sectionId}" target="_blank" class="section-link">
                ${factSheetSectionIds[sectionId] || sectionId}
              </a></li>`
            ).join('')}
          </ul>
        </div>
        <div class="usage-tip">
          <em>${typeInfo.factSheetUsage || 'Use fact sheet for reference'}</em>
        </div>
      </div>
    `;
    
    return tooltip;
  }
  
  /**
   * Open fact sheet modal with relevant content
   */
  function openFactSheetModal(question, relevantSections) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fact-sheet-modal';
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="closeFactSheetModal()"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <book>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </book>
            </svg>
            Fact Sheet Reference: ${question.topic}
          </h3>
          <button class="close-btn" onclick="closeFactSheetModal()">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="question-context">
            <div class="question-preview">
              <strong>Current Question:</strong>
              <p>${question.question}</p>
              <div class="question-meta">
                <span class="type-badge">${question.type.toUpperCase()}</span>
                <span class="topic-badge">${question.topic}</span>
              </div>
            </div>
          </div>
          
          <div class="reference-sections">
            <h4>Relevant Fact Sheet Sections:</h4>
            <div class="section-grid">
              ${relevantSections.sections.map(sectionId => `
                <div class="section-card">
                  <h5>${factSheetSectionIds[sectionId] || sectionId}</h5>
                  <a href="factsheet-complete.html#${sectionId}" target="_blank" class="open-section-btn">
                    Open in New Tab
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15,3 21,3 21,9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              `).join('')}
            </div>
            
            <div class="modal-actions">
              <button class="primary-btn" onclick="window.open('factsheet-complete.html#${relevantSections.primarySection}', '_blank')">
                View Primary Section
              </button>
              <button class="secondary-btn" onclick="closeFactSheetModal()">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles if not already present
    if (!document.querySelector('#fact-sheet-modal-styles')) {
      addModalStyles();
    }
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Focus management
    const firstButton = modal.querySelector('button');
    if (firstButton) firstButton.focus();
  }
  
  /**
   * Close fact sheet modal
   */
  function closeFactSheetModal() {
    const modal = document.querySelector('.fact-sheet-modal');
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  }
  
  /**
   * Add modal styles to document
   */
  function addModalStyles() {
    const styles = document.createElement('style');
    styles.id = 'fact-sheet-modal-styles';
    styles.textContent = `
      .fact-sheet-btn {
        background: var(--accent-ui);
        color: var(--accent-tx);
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.85em;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s ease;
        margin-left: 10px;
      }
      
      .fact-sheet-btn:hover {
        background: var(--accent-ui-hover);
        transform: translateY(-1px);
      }
      
      .fact-sheet-btn .icon {
        width: 16px;
        height: 16px;
      }
      
      .fact-sheet-tooltip {
        background: var(--ui-2);
        border: 1px solid var(--ui-3);
        border-radius: 8px;
        padding: 12px;
        margin: 10px 0;
        font-size: 0.9em;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .tooltip-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      
      .topic-badge, .type-badge {
        background: var(--accent-ui);
        color: var(--accent-tx);
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.75em;
        font-weight: 600;
        text-transform: capitalize;
      }
      
      .type-icon {
        font-size: 1.2em;
      }
      
      .sections-list ul {
        margin: 5px 0;
        padding-left: 20px;
      }
      
      .sections-list li {
        margin: 3px 0;
      }
      
      .section-link {
        color: var(--accent-ui);
        text-decoration: none;
        font-weight: 500;
      }
      
      .section-link:hover {
        text-decoration: underline;
      }
      
      .usage-tip {
        color: var(--tx-3);
        font-size: 0.85em;
        margin-top: 8px;
      }
      
      .fact-sheet-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
      }
      
      .modal-content {
        background: var(--bg);
        border: 1px solid var(--ui-3);
        border-radius: 12px;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      }
      
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid var(--ui-3);
        background: var(--ui-1);
        border-radius: 12px 12px 0 0;
      }
      
      .modal-header h3 {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--tx-1);
      }
      
      .modal-header .icon {
        width: 24px;
        height: 24px;
        color: var(--accent-ui);
      }
      
      .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--tx-2);
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: all 0.2s ease;
      }
      
      .close-btn:hover {
        background: var(--ui-3);
        color: var(--tx-1);
      }
      
      .modal-body {
        padding: 20px;
      }
      
      .question-context {
        background: var(--ui-2);
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 20px;
      }
      
      .question-preview p {
        margin: 10px 0;
        font-style: italic;
      }
      
      .question-meta {
        display: flex;
        gap: 10px;
        margin-top: 10px;
      }
      
      .section-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin: 15px 0;
      }
      
      .section-card {
        background: var(--ui-1);
        border: 1px solid var(--ui-3);
        border-radius: 8px;
        padding: 15px;
        text-align: center;
      }
      
      .section-card h5 {
        margin: 0 0 10px 0;
        color: var(--tx-1);
        font-size: 0.95em;
      }
      
      .open-section-btn {
        background: var(--accent-ui);
        color: var(--accent-tx);
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        text-decoration: none;
        font-size: 0.85em;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s ease;
      }
      
      .open-section-btn:hover {
        background: var(--accent-ui-hover);
        transform: translateY(-1px);
      }
      
      .open-section-btn .icon {
        width: 14px;
        height: 14px;
      }
      
      .modal-actions {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid var(--ui-3);
      }
      
      .primary-btn, .secondary-btn {
        padding: 10px 20px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
      }
      
      .primary-btn {
        background: var(--accent-ui);
        color: var(--accent-tx);
      }
      
      .primary-btn:hover {
        background: var(--accent-ui-hover);
      }
      
      .secondary-btn {
        background: var(--ui-3);
        color: var(--tx-2);
      }
      
      .secondary-btn:hover {
        background: var(--ui-4);
        color: var(--tx-1);
      }
      
      @media (max-width: 768px) {
        .modal-content {
          width: 95%;
          max-height: 90vh;
        }
        
        .section-grid {
          grid-template-columns: 1fr;
        }
        
        .modal-actions {
          flex-direction: column;
        }
      }
    `;
    
    document.head.appendChild(styles);
  }
  
  /**
   * Get topic statistics for analytics
   */
  function getTopicStatistics() {
    return {
      totalTopics: Object.keys(topicMapping).length,
      mappedSections: Object.keys(factSheetSectionIds).length,
      questionTypes: Object.keys(questionTypeMapping).length
    };
  }
  
  // Public API
  return {
    init,
    getRelevantSections,
    createFactSheetButton,
    createQuickReference,
    openFactSheetModal,
    closeFactSheetModal: closeFactSheetModal,
    getTopicStatistics
  };
})();

// Make closeFactSheetModal globally accessible for onclick handlers
window.closeFactSheetModal = FactSheetIntegration.closeFactSheetModal;