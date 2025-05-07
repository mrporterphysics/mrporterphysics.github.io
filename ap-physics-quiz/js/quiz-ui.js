/**
 * Quiz UI - Handles UI interactions and display for AP Physics 1 Quiz App
 * Enhanced with LaTeX support, image-based questions, and performance optimizations
 */

const QuizUI = (function() {
  // DOM elements - will be initialized in setup()
  let elements = {
    panels: {},
    buttons: {},
    displays: {},
    inputs: {},
    selectors: {}
  };
  
  // Cache for loaded images
  const imageCache = {};
  
  // Setup UI elements
  function setup() {
    // Performance monitoring
    Utils.performance.start('UISetup');
    
    // Get panel elements
    elements.panels.setup = Utils.getElement('setupPanel');
    elements.panels.quiz = Utils.getElement('quizPanel');
    elements.panels.results = Utils.getElement('resultsPanel');
    
    // Get button elements
    elements.buttons.start = Utils.getElement('startQuiz');
    elements.buttons.showAnswer = Utils.getElement('showAnswer');
    elements.buttons.next = Utils.getElement('nextQuestion');
    elements.buttons.restart = Utils.getElement('restartQuiz');
    elements.buttons.backToSetup = Utils.getElement('backToSetup');
    elements.buttons.tryAgain = Utils.getElement('tryAgain');
    elements.buttons.reviewMissed = Utils.getElement('reviewMissed');
    elements.buttons.newQuiz = Utils.getElement('newQuiz');
    
    // Get display elements
    elements.displays.question = Utils.getElement('questionText');
    elements.displays.feedback = Utils.getElement('feedback');
    elements.displays.answerReveal = Utils.getElement('answerReveal');
    elements.displays.currentQuestion = Utils.getElement('currentQuestion');
    elements.displays.totalQuestions = Utils.getElement('totalQuestions');
    elements.displays.correctCount = Utils.getElement('correctCount');
    elements.displays.incorrectCount = Utils.getElement('incorrectCount');
    elements.displays.accuracyRate = Utils.getElement('accuracyRate');
    elements.displays.progressFill = Utils.getElement('progressFill');
    elements.displays.finalCorrect = Utils.getElement('finalCorrect');
    elements.displays.finalTotal = Utils.getElement('finalTotal');
    elements.displays.missedQuestions = Utils.getElement('missedQuestions');
    elements.displays.missedQuestionsSection = Utils.getElement('missedQuestionsSection');
    
    // Get input elements
    elements.inputs.answerInput = Utils.getElement('answerInput');
    elements.inputs.tfOptions = Utils.getElement('tfOptions');
    elements.inputs.mcOptions = Utils.getElement('mcOptions');
    
    // Get selector elements
    elements.selectors.modeOptions = document.querySelectorAll('.mode-option');
    elements.selectors.topicButtons = document.querySelectorAll('.topic-btn');
    elements.selectors.questionTypeButtons = document.querySelectorAll('.question-type-btn');
    
    // Create image container if it doesn't exist
    if (!document.getElementById('imageContainer')) {
      const imageContainer = document.createElement('div');
      imageContainer.id = 'imageContainer';
      imageContainer.className = 'image-container';
      
      // Insert after question text
      elements.displays.question.parentNode.insertBefore(
        imageContainer,
        elements.displays.question.nextSibling
      );
      
      // Store reference
      elements.displays.imageContainer = imageContainer;
    } else {
      elements.displays.imageContainer = document.getElementById('imageContainer');
    }
    
    // Create timer display if it doesn't exist
    if (!document.getElementById('quizTimer')) {
      const timerContainer = document.createElement('div');
      timerContainer.className = 'timer-container';
      
      const timerLabel = document.createElement('div');
      timerLabel.className = 'timer-label';
      timerLabel.textContent = 'Time:';
      timerContainer.appendChild(timerLabel);
      
      const timerDisplay = document.createElement('div');
      timerDisplay.id = 'quizTimer';
      timerDisplay.className = 'timer-display';
      timerDisplay.textContent = '00:00';
      timerContainer.appendChild(timerDisplay);
      
      // Insert at the beginning of the control panel
      const controlPanel = elements.buttons.showAnswer.closest('.control-panel');
      controlPanel.insertBefore(timerContainer, controlPanel.firstChild);
      
      // Store reference
      elements.displays.timer = timerDisplay;
    } else {
      elements.displays.timer = document.getElementById('quizTimer');
    }
    
    // Create resume quiz button if needed
    if (QuizStorage && QuizStorage.hasSavedQuiz()) {
      addResumeButton();
    }
    
    Utils.performance.end('UISetup');
    Utils.debug('UI elements initialized');
    return true;
  }
  
  // Add resume button to the setup panel
  function addResumeButton() {
    if (!elements.buttons.resume) {
      const resumeBtn = document.createElement('button');
      resumeBtn.className = 'btn resume-btn';
      resumeBtn.textContent = 'Resume Previous Quiz';
      resumeBtn.id = 'resumeQuiz';
      
      // Insert before the Start Quiz button
      elements.buttons.start.parentNode.insertBefore(resumeBtn, elements.buttons.start);
      
      // Store reference
      elements.buttons.resume = resumeBtn;
    }
  }
  
  // Show a specific panel and hide others
  function showPanel(panelName) {
    Utils.performance.start('showPanel');
    
    for (const name in elements.panels) {
      elements.panels[name].style.display = name === panelName ? 'block' : 'none';
    }
    
    // Clear image container when switching panels
    if (elements.displays.imageContainer) {
      elements.displays.imageContainer.innerHTML = '';
      elements.displays.imageContainer.style.display = 'none';
    }
    
    Utils.performance.end('showPanel');
    Utils.debug(`Showing panel: ${panelName}`);
    return true;
  }

  /**
   * Display a question
   * @param {Object} question - The question object
   * @param {number} index - Current question index
   * @param {number} total - Total number of questions
   * @return {boolean} Success status
   */
  function displayQuestion(question, index, total) {
    Utils.performance.start('displayQuestion');
    
    if (!question) {
      Utils.debug('No question provided to display');
      return false;
    }
    
    // Update question number
    elements.displays.currentQuestion.textContent = index + 1;
    elements.displays.totalQuestions.textContent = total;
    
    // Display question text with LaTeX rendering
    elements.displays.question.innerHTML = Utils.renderMarkdownWithLaTeX(question.question);
    
    // Reset UI
    elements.inputs.tfOptions.style.display = 'none';
    elements.inputs.answerInput.style.display = 'none';
    elements.inputs.mcOptions.style.display = 'none';
    elements.inputs.mcOptions.innerHTML = '';
    elements.displays.feedback.textContent = '';
    elements.displays.feedback.className = 'quiz-feedback';
    elements.displays.answerReveal.style.display = 'none';
    
    // Clear any previous image
    elements.displays.imageContainer.innerHTML = '';
    elements.displays.imageContainer.style.display = 'none';
    
    // Set up appropriate input method based on question type
    if (question.type === 'tf') {
      displayTrueFalseQuestion(question);
    } else if (question.type === 'fill') {
      displayFillQuestion(question);
    } else if (question.type === 'mc') {
      displayMultipleChoiceQuestion(question);
    } else if (question.type === 'matching') {
      displayMatchingQuestion(question);
    } else if (question.type === 'image') {
      displayImageQuestion(question);
    }
    
    Utils.performance.end('displayQuestion');
    Utils.debug('Question displayed', { id: question.id, type: question.type });
    return true;
  }
  
  // Display a true/false question
  function displayTrueFalseQuestion(question) {
    elements.inputs.tfOptions.style.display = 'block';
    elements.inputs.tfOptions.querySelectorAll('.choice-item').forEach(opt => {
      opt.classList.remove('selected');
      // Add accessibility attributes
      opt.setAttribute('role', 'radio');
      opt.setAttribute('aria-checked', 'false');
      opt.setAttribute('tabindex', '0');
    });
  }
  
  // Display a fill-in-the-blank question
  function displayFillQuestion(question) {
    elements.inputs.answerInput.style.display = 'block';
    elements.inputs.answerInput.value = '';
    elements.inputs.answerInput.placeholder = 'Your answer...';
    elements.inputs.answerInput.setAttribute('aria-label', 'Enter your answer');
    elements.inputs.answerInput.focus();
  }
  
  /**
   * Display a multiple-choice question
   * @param {Object} question - The multiple choice question
   */
  function displayMultipleChoiceQuestion(question) {
    elements.inputs.mcOptions.style.display = 'block';
    elements.inputs.mcOptions.setAttribute('role', 'radiogroup');
    elements.inputs.mcOptions.setAttribute('aria-label', 'Multiple choice options');
    
    // Create option elements
    question.options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.className = 'choice-item';
      optionElement.setAttribute('data-answer', option.label);
      optionElement.setAttribute('role', 'radio');
      optionElement.setAttribute('aria-checked', 'false');
      optionElement.setAttribute('tabindex', '0');
      
      const labelElement = document.createElement('strong');
      labelElement.textContent = `${option.label}.`;
      optionElement.appendChild(labelElement);
      
      const textSpan = document.createElement('span');
      textSpan.className = 'mc-text';
      textSpan.innerHTML = Utils.renderMarkdownWithLaTeX(option.text);
      optionElement.appendChild(textSpan);
      
      elements.inputs.mcOptions.appendChild(optionElement);
    });
  }
  
  /**
   * Display a matching question
   * @param {Object} question - The matching question
   */
  function displayMatchingQuestion(question) {
    elements.inputs.mcOptions.style.display = 'block';
    
    // Create a description block
    const descriptionBlock = document.createElement('div');
    descriptionBlock.className = 'matching-description';
    descriptionBlock.textContent = 'Select the matching option from the dropdown:';
    elements.inputs.mcOptions.appendChild(descriptionBlock);
    
    // Create a select dropdown
    const selectElement = document.createElement('select');
    selectElement.className = 'matching-select';
    selectElement.id = 'matchingSelect';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select your answer --';
    selectElement.appendChild(defaultOption);
    
    // Add options
    question.matchingOptions.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.label;
      optionElement.textContent = `${option.label}. ${option.text}`;
      selectElement.appendChild(optionElement);
    });
    
    elements.inputs.mcOptions.appendChild(selectElement);
  }
  
  /**
   * Display an image-based question
   * @param {Object} question - The image question
   */
  function displayImageQuestion(question) {
    Utils.performance.start('displayImageQuestion');
    
    // Show image container
    elements.displays.imageContainer.style.display = 'block';
    
    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'image-loading';
    loadingIndicator.innerHTML = '<div class="spinner"></div><span>Loading image...</span>';
    elements.displays.imageContainer.appendChild(loadingIndicator);
    
    // Load the image
    loadImage(question.imageUrl)
      .then(image => {
        // Remove loading indicator
        elements.displays.imageContainer.removeChild(loadingIndicator);
        
        // Add the image to the container
        elements.displays.imageContainer.appendChild(image);
      })
      .catch(error => {
        // Show error message
        loadingIndicator.innerHTML = '<div class="error-icon">!</div><span>Failed to load image</span>';
        console.error('Error loading image:', error);
      });
    
    // Display multiple choice options
    displayMultipleChoiceQuestion(question);
    
    Utils.performance.end('displayImageQuestion');
  }

  /**
 * Drag and Drop Question Type Implementation
 * 
 * This file contains functions to:
 * 1. Process drag and drop questions from CSV
 * 2. Display drag and drop questions in the UI
 * 3. Check drag and drop answers
 */

// Add to CSVImport.js
function processDragDropQuestion(data) {
  // Parse items from CSV (expect JSON strings for items and targets)
  let items = [];
  let targets = [];
  let correctMatches = {};
  
  // Process drag items
  if (data.items) {
    try {
      // Try parsing as JSON first
      items = JSON.parse(data.items);
    } catch (error) {
      // Fall back to comma-separated list
      items = data.items.split(',').map(item => item.trim());
    }
  }
  
  // Process drop targets
  if (data.targets) {
    try {
      // Try parsing as JSON first
      targets = JSON.parse(data.targets);
    } catch (error) {
      // Fall back to comma-separated list
      targets = data.targets.split(',').map(target => target.trim());
    }
  }
  
  // Process correct matches
  if (data.answer) {
    try {
      // Try parsing as JSON first (preferred format)
      correctMatches = JSON.parse(data.answer);
    } catch (error) {
      // Fall back to parsing as item:target pairs separated by semicolons
      // Format: "Force:Newton; Energy:Joule; Power:Watt"
      const pairs = data.answer.split(';');
      pairs.forEach(pair => {
        const [item, target] = pair.split(':').map(part => part.trim());
        if (item && target) {
          correctMatches[item] = target;
        }
      });
    }
  }
  
  return {
    id: parseInt(data.id) || generateId(),
    question: data.question.trim(),
    items: items,
    targets: targets,
    answer: correctMatches,
    topic: data.topic ? data.topic.trim() : 'general',
    explanation: data.explanation ? data.explanation.trim() : '',
    type: 'drag-drop'
  };
}

// Add to quiz-ui.js
function displayDragDropQuestion(question) {
  // Create drag and drop container if it doesn't exist
  let dragDropContainer = document.getElementById('dragDropContainer');
  
  if (!dragDropContainer) {
    dragDropContainer = document.createElement('div');
    dragDropContainer.id = 'dragDropContainer';
    dragDropContainer.className = 'drag-drop-container';
    
    // Insert after question text
    elements.displays.question.parentNode.insertBefore(
      dragDropContainer,
      elements.displays.question.nextSibling
    );
  }
  
  // Clear container
  dragDropContainer.innerHTML = '';
  
  // Add instructions
  const instructions = document.createElement('div');
  instructions.className = 'drag-drop-instructions';
  instructions.textContent = 'Drag each item from the left column and drop it to its matching category in the right column:';
  dragDropContainer.appendChild(instructions);
  
  // Create two-column layout
  const columnsContainer = document.createElement('div');
  columnsContainer.className = 'drag-drop-columns';
  
  // Left column - draggable items
  const leftColumn = document.createElement('div');
  leftColumn.className = 'drag-items-column';
  
  // Add column header
  const leftHeader = document.createElement('div');
  leftHeader.className = 'column-header';
  leftHeader.textContent = 'Items';
  leftColumn.appendChild(leftHeader);
  
  // Create draggable items
  const shuffledItems = Utils.shuffleArray([...question.items]);
  
  shuffledItems.forEach(item => {
    const dragItem = document.createElement('div');
    dragItem.className = 'drag-item';
    dragItem.setAttribute('draggable', 'true');
    dragItem.setAttribute('data-item', item);
    dragItem.innerHTML = Utils.renderMarkdownWithLaTeX(item);
    
    // Add drag event listeners
    dragItem.addEventListener('dragstart', handleDragStart);
    dragItem.addEventListener('dragend', handleDragEnd);
    
    leftColumn.appendChild(dragItem);
  });
  
  // Right column - drop targets
  const rightColumn = document.createElement('div');
  rightColumn.className = 'drop-targets-column';
  
  // Add column header
  const rightHeader = document.createElement('div');
  rightHeader.className = 'column-header';
  rightHeader.textContent = 'Categories';
  rightColumn.appendChild(rightHeader);
  
  // Create drop targets
  question.targets.forEach(target => {
    const dropTarget = document.createElement('div');
    dropTarget.className = 'drop-target';
    dropTarget.setAttribute('data-target', target);
    
    // Create target label
    const targetLabel = document.createElement('div');
    targetLabel.className = 'target-label';
    targetLabel.innerHTML = Utils.renderMarkdownWithLaTeX(target);
    dropTarget.appendChild(targetLabel);
    
    // Create drop zone
    const dropZone = document.createElement('div');
    dropZone.className = 'drop-zone';
    dropZone.innerHTML = '<div class="drop-placeholder">Drop items here</div>';
    
    // Add drop event listeners
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    
    dropTarget.appendChild(dropZone);
    rightColumn.appendChild(dropTarget);
  });
  
  // Add columns to container
  columnsContainer.appendChild(leftColumn);
  columnsContainer.appendChild(rightColumn);
  dragDropContainer.appendChild(columnsContainer);
  
  // Reset button
  const resetButton = document.createElement('button');
  resetButton.className = 'btn reset-btn';
  resetButton.textContent = 'Reset Matches';
  resetButton.addEventListener('click', () => {
    // Reset all drag items and drop zones
    resetDragDrop(dragDropContainer);
  });
  
  dragDropContainer.appendChild(resetButton);
  
  // Show the container
  dragDropContainer.style.display = 'block';
}

// Drag and drop event handlers
function handleDragStart(e) {
  // Set the data to be dragged
  e.dataTransfer.setData('text/plain', e.target.getAttribute('data-item'));
  e.dataTransfer.effectAllowed = 'move';
  
  // Add dragging class
  this.classList.add('dragging');
}

function handleDragEnd(e) {
  // Remove dragging class
  this.classList.remove('dragging');
}

function handleDragOver(e) {
  // Prevent default to allow drop
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
  // Add highlight class
  this.classList.add('drag-over');
}

function handleDragLeave(e) {
  // Remove highlight class
  this.classList.remove('drag-over');
  
  // Get the dragged item
  const itemId = e.dataTransfer.getData('text/plain');
  const draggedItem = document.querySelector(`.drag-item[data-item="${itemId}"]`);
  
  if (!draggedItem) return;
  
  // Get the drop target
  const dropZone = e.currentTarget;
  const dropTarget = dropZone.closest('.drop-target');
  const targetId = dropTarget.getAttribute('data-target');
  
  // Remove placeholder if it exists
  const placeholder = dropZone.querySelector('.drop-placeholder');
  if (placeholder) {
    dropZone.removeChild(placeholder);
  }
  
  // Create a copy of the dragged item for the drop zone
  const itemCopy = document.createElement('div');
  itemCopy.className = 'dropped-item';
  itemCopy.setAttribute('data-item', itemId);
  itemCopy.setAttribute('data-target', targetId);
  itemCopy.innerHTML = draggedItem.innerHTML;
  
  // Add remove button to the copied item
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-item-btn';
  removeBtn.innerHTML = '&times;';
  removeBtn.addEventListener('click', function() {
    // Remove the item from the drop zone
    dropZone.removeChild(itemCopy);
    
    // Show the original item in the left column
    draggedItem.style.display = 'block';
    
    // Add placeholder if drop zone is empty
    if (dropZone.children.length === 0) {
      const newPlaceholder = document.createElement('div');
      newPlaceholder.className = 'drop-placeholder';
      newPlaceholder.textContent = 'Drop items here';
      dropZone.appendChild(newPlaceholder);
    }
  });
  
  itemCopy.appendChild(removeBtn);
  
  // Add the copy to the drop zone
  dropZone.appendChild(itemCopy);
  
  // Hide the original item
  draggedItem.style.display = 'none';
}

// Reset all drag items and drop zones
function resetDragDrop(container) {
  // Show all original drag items
  const dragItems = container.querySelectorAll('.drag-item');
  dragItems.forEach(item => {
    item.style.display = 'block';
  });
  
  // Clear all drop zones
  const dropZones = container.querySelectorAll('.drop-zone');
  dropZones.forEach(zone => {
    zone.innerHTML = '';
    
    // Add placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'drop-placeholder';
    placeholder.textContent = 'Drop items here';
    zone.appendChild(placeholder);
  });
}

// Add to QuizData.js in checkAnswer function
function checkDragDropAnswer(question) {
  const dropTargets = document.querySelectorAll('.drop-target');
  let allCorrect = true;
  const userMatches = {};
  
  // Go through each drop target and check its items
  dropTargets.forEach(target => {
    const targetId = target.getAttribute('data-target');
    const dropZone = target.querySelector('.drop-zone');
    const droppedItems = dropZone.querySelectorAll('.dropped-item');
    
    // For each dropped item, check if it's in the correct target
    droppedItems.forEach(item => {
      const itemId = item.getAttribute('data-item');
      userMatches[itemId] = targetId;
      
      const correctTarget = question.answer[itemId];
      if (correctTarget !== targetId) {
        allCorrect = false;
      }
    });
  });
  
  // Also check if all required matches are present
  for (const item in question.answer) {
    if (!userMatches.hasOwnProperty(item)) {
      allCorrect = false;
      break;
    }
  }
  
  return allCorrect;
}

// Get the user's answers for drag and drop
function getDragDropUserAnswer() {
  const dropTargets = document.querySelectorAll('.drop-target');
  const userMatches = {};
  
  // Go through each drop target and collect its items
  dropTargets.forEach(target => {
    const targetId = target.getAttribute('data-target');
    const dropZone = target.querySelector('.drop-zone');
    const droppedItems = dropZone.querySelectorAll('.dropped-item');
    
    // For each dropped item, record which target it's in
    droppedItems.forEach(item => {
      const itemId = item.getAttribute('data-item');
      userMatches[itemId] = targetId;
    });
  });
  
  return userMatches;
}

// Add to QuizUI.js in showCorrectAnswer function
function showDragDropCorrectAnswer(question) {
  let answerText = `<strong>Correct Matches:</strong><ul>`;
  
  // Get user's answers
  const userAnswers = getDragDropUserAnswer();
  
  // Display correct matches
  for (const item in question.answer) {
    const correctTarget = question.answer[item];
    const userTarget = userAnswers[item] || 'Not matched';
    const isCorrect = userTarget === correctTarget;
    
    answerText += `<li><strong>${item}</strong> → ${correctTarget}`;
    
    if (!isCorrect) {
      answerText += ` <span class="incorrect">(You matched: ${userTarget})</span>`;
    } else {
      answerText += ` <span class="correct">✓</span>`;
    }
    
    answerText += `</li>`;
  }
  
  answerText += `</ul>`;
  
  // Add explanation if available
  if (question.explanation) {
    answerText += `<br><strong>Explanation:</strong> ${Utils.renderMarkdownWithLaTeX(question.explanation)}`;
  }
  
  return answerText;
}

// Add CSS styles for drag and drop questions
const dragDropStyles = `
.drag-drop-container {
  margin: 15px 0;
  background-color: var(--bg);
  border-radius: 8px;
  padding: 10px;
  border: 1px solid var(--ui);
}

.drag-drop-instructions {
  margin-bottom: 10px;
  color: var(--tx-2);
  font-style: italic;
}

.drag-drop-columns {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

@media (max-width: 600px) {
  .drag-drop-columns {
    flex-direction: column;
  }
}

.drag-items-column,
.drop-targets-column {
  flex: 1;
  min-width: 0;
}

.column-header {
  font-weight: bold;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid var(--ui);
  color: var(--tx);
}

.drag-item {
  background-color: var(--bg-2);
  border: 1px solid var(--ui);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 8px;
  cursor: move;
  transition: background-color 0.2s, transform 0.2s;
}

.drag-item:hover {
  background-color: var(--ui);
}

.drag-item.dragging {
  opacity: 0.7;
  background-color: var(--ui-2);
}

.drop-target {
  margin-bottom: 15px;
}

.target-label {
  background-color: var(--accent-secondary);
  color: var(--paper);
  padding: 8px 12px;
  border-radius: 5px 5px 0 0;
  font-weight: 500;
}

.drop-zone {
  min-height: 80px;
  border: 2px dashed var(--ui);
  border-radius: 0 0 5px 5px;
  padding: 10px;
  background-color: var(--bg-2);
  transition: background-color 0.2s;
}

.drop-zone.drag-over {
  background-color: var(--ui);
  border-color: var(--accent-primary);
}

.drop-placeholder {
  color: var(--tx-3);
  text-align: center;
  padding: 20px 0;
  font-style: italic;
}

.dropped-item {
  background-color: var(--bg);
  border: 1px solid var(--ui-2);
  border-left: 3px solid var(--accent-primary);
  border-radius: 4px;
  padding: 8px 30px 8px 10px;
  margin-bottom: 5px;
  position: relative;
}

.remove-item-btn {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--tx-3);
  font-size: 18px;
  cursor: pointer;
  padding: 2px 5px;
  border-radius: 50%;
}

.remove-item-btn:hover {
  color: var(--accent-danger);
  background-color: var(--ui);
}

.reset-btn {
  background-color: var(--ui);
  color: var(--tx);
  margin-top: 10px;
}

.reset-btn:hover {
  background-color: var(--ui-2);
}
`;

// Add to utils.js or app.js to load all the new CSS styles
function addQuestionTypeStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    ${orderedListStyles}
    ${diagramLabelingStyles}
    ${dragDropStyles}
    ${numericalStyles || ''}
  `;
  document.head.appendChild(styleElement);
}

// Call this function during app initialization
function initializeAdvancedQuestionTypes() {
  // Add CSS styles
  addQuestionTypeStyles();
  
  // Register new question types with QuizData
  if (typeof QuizData !== 'undefined') {
    // Update checkAnswer function to handle new question types
    const originalCheckAnswer = QuizData.checkAnswer;
    QuizData.checkAnswer = function(question, userAnswer) {
      if (!question) return false;
      
      switch (question.type) {
        case 'ordered-list':
          return checkOrderedListAnswer(question);
        case 'diagram-labeling':
          return checkDiagramLabelingAnswer(question);
        case 'drag-drop':
          return checkDragDropAnswer(question);
        case 'numerical':
          return checkNumericalAnswer(question, userAnswer);
        default:
          // Use the original check function for standard question types
          return originalCheckAnswer(question, userAnswer);
      }
    };
  }
  
  // Update QuizUI to display new question types
  if (typeof QuizUI !== 'undefined') {
    // Update displayQuestion function to handle new question types
    const originalDisplayQuestion = QuizUI.displayQuestion;
    QuizUI.displayQuestion = function(question, index, total) {
      if (!question) return false;
      
      // Update question number and total
      if (typeof index !== 'undefined' && typeof total !== 'undefined') {
        elements.displays.currentQuestion.textContent = index + 1;
        elements.displays.totalQuestions.textContent = total;
      }
      
      // Display question text
      elements.displays.question.innerHTML = Utils.renderMarkdownWithLaTeX(question.question);
      
      // Reset UI elements
      resetQuizUI();
      
      // Display based on question type
      switch (question.type) {
        case 'ordered-list':
          displayOrderedListQuestion(question);
          break;
        case 'diagram-labeling':
          displayDiagramLabelingQuestion(question);
          break;
        case 'drag-drop':
          displayDragDropQuestion(question);
          break;
        case 'numerical':
          displayNumericalQuestion(question);
          break;
        default:
          // Use the original display function for standard question types
          return originalDisplayQuestion(question, index, total);
      }
      
      return true;
    };
    
    // Update showCorrectAnswer function
    const originalShowCorrectAnswer = QuizUI.showCorrectAnswer;
    QuizUI.showCorrectAnswer = function(question) {
      if (!question) return false;
      
      let answerText = '';
      
      switch (question.type) {
        case 'ordered-list':
          answerText = showOrderedListCorrectAnswer(question);
          break;
        case 'diagram-labeling':
          answerText = showDiagramLabelingCorrectAnswer(question);
          break;
        case 'drag-drop':
          answerText = showDragDropCorrectAnswer(question);
          break;
        case 'numerical':
          answerText = showNumericalCorrectAnswer(question);
          break;
        default:
          // Use the original function for standard question types
          return originalShowCorrectAnswer(question);
      }
      
      // Display the answer
      elements.displays.answerReveal.innerHTML = answerText;
      elements.displays.answerReveal.style.display = 'block';
      
      return true;
    };
    
    // Update getUserAnswer function
    const originalGetUserAnswer = QuizUI.getUserAnswer;
    QuizUI.getUserAnswer = function(questionType) {
      switch (questionType) {
        case 'ordered-list':
          // For ordered list, get the current order from the DOM
          const listItems = document.querySelectorAll('#sortableList .sortable-item');
          return Array.from(listItems).map(item => item.getAttribute('data-value'));
        case 'diagram-labeling':
          return getDiagramLabelingUserAnswer();
        case 'drag-drop':
          return getDragDropUserAnswer();
        case 'numerical':
          return elements.inputs.answerInput.value.trim();
        default:
          // Use the original function for standard question types
          return originalGetUserAnswer(questionType);
      }
    };
    
    // Helper function to reset UI elements
    function resetQuizUI() {
      // Hide standard input elements
      elements.inputs.tfOptions.style.display = 'none';
      elements.inputs.answerInput.style.display = 'none';
      elements.inputs.answerInput.setAttribute('type', 'text');
      elements.inputs.mcOptions.style.display = 'none';
      elements.inputs.mcOptions.innerHTML = '';
      
      // Hide any existing special containers
      const containers = [
        document.getElementById('orderedListContainer'),
        document.getElementById('dragDropContainer'),
        document.getElementById('labelingArea')
      ];
      
      containers.forEach(container => {
        if (container) container.style.display = 'none';
      });
      
      // Clear feedback and answer reveal
      elements.displays.feedback.textContent = '';
      elements.displays.feedback.className = 'quiz-feedback';
      elements.displays.answerReveal.style.display = 'none';
      
      // Clear image container if it's not needed
      const imgContainer = elements.displays.imageContainer;
      if (imgContainer) {
        imgContainer.innerHTML = '';
        imgContainer.style.display = 'none';
      }
      
      // Hide units display if it exists
      const unitsDisplay = document.getElementById('unitsDisplay');
      if (unitsDisplay) {
        unitsDisplay.style.display = 'none';
      }
    }
  }
  
  // Update CSV import to handle new question types
  if (typeof CSVImport !== 'undefined') {
    const originalParseCSV = CSVImport.parseCSV;
    CSVImport.parseCSV = function(csvText) {
      // Get base result from original function
      const questions = originalParseCSV(csvText);
      
      // Add new question types to the container if not already present
      if (!questions.ordered) questions.ordered = [];
      if (!questions.diagram) questions.diagram = [];
      if (!questions.dragdrop) questions.dragdrop = [];
      if (!questions.numerical) questions.numerical = [];
      
      // Process each line for new question types
      const lines = csvText.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(header => header.trim());
      
      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length < 3) continue;
        
        const questionData = {};
        headers.forEach((header, index) => {
          questionData[header] = values[index] || '';
        });
        
        // Determine question type
        const type = questionData.type ? questionData.type.toLowerCase().trim() : '';
        
        // Process based on type
        if (type === 'ordered-list' || type === 'ordered') {
          questions.ordered.push(processOrderedListQuestion(questionData));
        } else if (type === 'diagram-labeling' || type === 'diagram') {
          questions.diagram.push(processDiagramLabelingQuestion(questionData));
        } else if (type === 'drag-drop' || type === 'dragdrop') {
          questions.dragdrop.push(processDragDropQuestion(questionData));
        } else if (type === 'numerical') {
          questions.numerical.push(processNumericalQuestion(questionData));
        }
      }
      
      return questions;
    };
  }
}
  
  /**
   * Load an image with caching
   * @param {string} url - The image URL
   * @return {Promise<HTMLImageElement>} - Promise resolving to the image element
   */
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      // Check cache first
      if (imageCache[url]) {
        // Clone the cached image
        const cachedImage = imageCache[url].cloneNode(true);
        return resolve(cachedImage);
      }
      
      // Create new image
      const image = new Image();
      image.className = 'question-image';
      image.alt = 'Question image';
      
      // Set up event handlers
      image.onload = function() {
        // Cache the image
        imageCache[url] = image.cloneNode(true);
        resolve(image);
      };
      
      image.onerror = function() {
        reject(new Error(`Failed to load image from ${url}`));
      };
      
      // Set source to start loading
      image.src = url;
    });
  }
  
  // Show feedback for an answer
  function showAnswerFeedback(isCorrect) {
    elements.displays.feedback.textContent = isCorrect ? 'Correct!' : 'Incorrect';
    elements.displays.feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    
    // Add animation
    elements.displays.feedback.classList.add('feedback-animation');
    
    // Remove animation class after animation completes
    setTimeout(() => {
      elements.displays.feedback.classList.remove('feedback-animation');
    }, 500);
    
    return true;
  }
  
  /**
   * Show the correct answer
   * @param {Object} question - The question object
   * @return {boolean} Success status
   */
  function showCorrectAnswer(question) {
    Utils.performance.start('showCorrectAnswer');
    
    if (!question) {
      Utils.debug('No question provided for showing answer');
      return false;
    }
    
    // Build answer text
    let answerText = `<strong>Correct Answer:</strong> `;
    
    if (question.type === 'tf') {
      answerText += question.answer === 'true' ? 'True' : 'False';
    } else if (question.type === 'fill') {
      answerText += Utils.renderMarkdownWithLaTeX(question.answer);
      
      // Show alternate answers if available
      if (question.alternateAnswers && question.alternateAnswers.length > 0) {
        answerText += '<br><small>(Also accepted: ' + 
          question.alternateAnswers.map(ans => Utils.renderMarkdownWithLaTeX(ans)).join(', ') + 
          ')</small>';
      }
    } else if (question.type === 'mc' || question.type === 'image') {
      const option = question.options.find(opt => opt.label === question.answer);
      if (option) {
        answerText += `${question.answer}. ${Utils.renderMarkdownWithLaTeX(option.text)}`;
      } else {
        answerText += question.answer;
      }
    } else if (question.type === 'matching') {
      const option = question.matchingOptions.find(opt => opt.label === question.answer);
      if (option) {
        answerText += `${question.answer}. ${option.text}`;
      } else {
        answerText += question.answer;
      }
    }
    
    // Add explanation if available
    if (question.explanation) {
      answerText += `<br><br><strong>Explanation:</strong> ${Utils.renderMarkdownWithLaTeX(question.explanation)}`;
    }
    
    // Display answer
    elements.displays.answerReveal.innerHTML = answerText;
    elements.displays.answerReveal.style.display = 'block';
    
    // Add slide-in animation
    elements.displays.answerReveal.classList.add('answer-reveal-animation');
    
    // Remove animation class after animation completes
    setTimeout(() => {
      elements.displays.answerReveal.classList.remove('answer-reveal-animation');
    }, 500);
    
    Utils.performance.end('showCorrectAnswer');
    Utils.debug('Showing correct answer', { id: question.id });
    return true;
  }
  
  // Update progress display
  function updateProgress(questionsAnswered, totalQuestions, correctCount, incorrectCount) {
    Utils.performance.start('updateProgress');
    
    // Update counters
    elements.displays.correctCount.textContent = correctCount;
    elements.displays.incorrectCount.textContent = incorrectCount;
    
    // Calculate and update accuracy
    const accuracy = questionsAnswered > 0 ? Math.round((correctCount / questionsAnswered) * 100) : 0;
    elements.displays.accuracyRate.textContent = Utils.formatPercentage(accuracy);
    
    // Update progress bar
    const progress = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0;
    
    // Use requestAnimationFrame for smooth progress bar animation
    requestAnimationFrame(() => {
      elements.displays.progressFill.style.width = Utils.formatPercentage(progress);
      elements.displays.progressFill.textContent = Utils.formatPercentage(progress);
    });
    
    Utils.performance.end('updateProgress');
    Utils.debug('Progress updated', { questionsAnswered, totalQuestions, correctCount, incorrectCount });
    return true;
  }
  
  /**
   * Display results at the end of the quiz
   * @param {Object} results - Object containing quiz results
   * @return {boolean} Success status
   */
  function showResults(results) {
    Utils.performance.start('showResults');
    
    // Update results display
    elements.displays.finalCorrect.textContent = results.correctCount;
    elements.displays.finalTotal.textContent = results.totalQuestions;
    
    // Show missed questions if any
    if (results.missedQuestions && results.missedQuestions.length > 0) {
      elements.displays.missedQuestionsSection.style.display = 'block';
      elements.displays.missedQuestions.innerHTML = '';
      
      // Create a div for each missed question
      results.missedQuestions.forEach(question => {
        const missedQuestionDiv = document.createElement('div');
        missedQuestionDiv.className = 'missed-question';
        
        // Question text
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<strong>Question:</strong> ${Utils.renderMarkdownWithLaTeX(question.question)}`;
        missedQuestionDiv.appendChild(questionDiv);
        
        // Add image if it's an image question
        if (question.type === 'image' && question.imageUrl) {
          const imgContainer = document.createElement('div');
          imgContainer.className = 'missed-question-image';
          
          const img = document.createElement('img');
          img.src = question.imageUrl;
          img.alt = 'Question image';
          img.loading = 'lazy'; // Lazy load images for better performance
          imgContainer.appendChild(img);
          
          missedQuestionDiv.appendChild(imgContainer);
        }
        
        // Answer text
        let answerText = `<strong>Correct Answer:</strong> `;
        if (question.type === 'tf') {
          answerText += question.answer === 'true' ? 'True' : 'False';
        } else if (question.type === 'fill') {
          answerText += question.answer;
        } else if (question.type === 'mc' || question.type === 'image') {
          const option = question.options.find(opt => opt.label === question.answer);
          answerText += `${question.answer}. ${option ? option.text : ''}`;
        } else if (question.type === 'matching') {
          const option = question.matchingOptions.find(opt => opt.label === question.answer);
          answerText += `${question.answer}. ${option ? option.text : ''}`;
        }
        
        const answerDiv = document.createElement('div');
        answerDiv.className = 'missed-answer';
        answerDiv.innerHTML = answerText;
        missedQuestionDiv.appendChild(answerDiv);
        
        // Explanation if available
        if (question.explanation) {
          const explanationDiv = document.createElement('div');
          explanationDiv.className = 'missed-explanation';
          explanationDiv.innerHTML = Utils.renderMarkdownWithLaTeX(question.explanation);
          missedQuestionDiv.appendChild(explanationDiv);
        }
        
        elements.displays.missedQuestions.appendChild(missedQuestionDiv);
      });
    } else {
      elements.displays.missedQuestionsSection.style.display = 'none';
    }
    
    // Show/hide review missed button
    elements.buttons.reviewMissed.style.display = 
      results.missedQuestions && results.missedQuestions.length > 0 ? 'inline-block' : 'none';
    
    // Show results panel
    showPanel('results');
    
    Utils.performance.end('showResults');
    Utils.debug('Showing results', results);
    return true;
  }
  
  // Get the selected topic, question type, and mode
  function getSelections() {
    const selections = {
      questionType: 'all',
      topic: 'all',
      mode: 'test',
      timerEnabled: false
    };
    
    // Get selected question type
    const activeTypeBtn = document.querySelector('.question-type-btn.active');
    if (activeTypeBtn) {
      selections.questionType = activeTypeBtn.getAttribute('data-type');
    }
    
    // Get selected topic
    const activeTopicBtn = document.querySelector('.topic-btn.active');
    if (activeTopicBtn) {
      selections.topic = activeTopicBtn.getAttribute('data-topic');
    }
    
    // Get selected mode
    const activeModeOption = document.querySelector('.mode-option.active');
    if (activeModeOption) {
      selections.mode = activeModeOption.getAttribute('data-mode');
    }
    
    // Get timer setting if available
    const timerOption = document.querySelector('.timer-option.active');
    if (timerOption) {
      selections.timerEnabled = timerOption.getAttribute('data-timer') !== 'off';
      selections.timerType = timerOption.getAttribute('data-timer');
    }
    
    Utils.debug('Current selections', selections);
    return selections;
  }
  
  // Get the user's answer based on the current question type
  function getUserAnswer(questionType) {
    let userAnswer = null;
    
    if (questionType === 'tf') {
      const selectedOption = elements.inputs.tfOptions.querySelector('.choice-item.selected');
      if (selectedOption) {
        userAnswer = selectedOption.getAttribute('data-answer');
      }
    } else if (questionType === 'fill') {
      userAnswer = elements.inputs.answerInput.value.trim();
    } else if (questionType === 'mc' || questionType === 'image') {
      const selectedOption = elements.inputs.mcOptions.querySelector('.choice-item.selected');
      if (selectedOption) {
        userAnswer = selectedOption.getAttribute('data-answer');
      }
    } else if (questionType === 'matching') {
      const selectElement = document.getElementById('matchingSelect');
      if (selectElement) {
        userAnswer = selectElement.value;
      }
    }
    
    return userAnswer;
  }
  
  // Attach event handlers for a specific question type
  function attachQuestionTypeHandlers(questionType, callback) {
    if (questionType === 'tf') {
      elements.inputs.tfOptions.querySelectorAll('.choice-item').forEach(option => {
        // Mouse click handler
        option.addEventListener('click', function() {
          // Clear previous selections
          elements.inputs.tfOptions.querySelectorAll('.choice-item').forEach(opt => {
            opt.classList.remove('selected');
            opt.setAttribute('aria-checked', 'false');
          });
          
          // Select this option
          this.classList.add('selected');
          this.setAttribute('aria-checked', 'true');
          
          // Call callback if provided
          if (typeof callback === 'function') {
            const answer = this.getAttribute('data-answer');
            callback(answer);
          }
        });
        
        // Keyboard handler for accessibility
        option.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            
            // Clear previous selections
            elements.inputs.tfOptions.querySelectorAll('.choice-item').forEach(opt => {
              opt.classList.remove('selected');
              opt.setAttribute('aria-checked', 'false');
            });
            
            // Select this option
            this.classList.add('selected');
            this.setAttribute('aria-checked', 'true');
            
            // Call callback if provided
            if (typeof callback === 'function') {
              const answer = this.getAttribute('data-answer');
              callback(answer);
            }
          }
        });
      });
    } else if (questionType === 'mc' || questionType === 'image') {
      elements.inputs.mcOptions.querySelectorAll('.choice-item').forEach(option => {
        // Mouse click handler
        option.addEventListener('click', function() {
          // Clear previous selections
          elements.inputs.mcOptions.querySelectorAll('.choice-item').forEach(opt => {
            opt.classList.remove('selected');
            opt.setAttribute('aria-checked', 'false');
          });
          
          // Select this option
          this.classList.add('selected');
          this.setAttribute('aria-checked', 'true');
          
          // Call callback if provided
          if (typeof callback === 'function') {
            const answer = this.getAttribute('data-answer');
            callback(answer);
          }
        });
        
        // Keyboard handler for accessibility
        option.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            
            // Clear previous selections
            elements.inputs.mcOptions.querySelectorAll('.choice-item').forEach(opt => {
              opt.classList.remove('selected');
              opt.setAttribute('aria-checked', 'false');
            });
            
            // Select this option
            this.classList.add('selected');
            this.setAttribute('aria-checked', 'true');
            
            // Call callback if provided
            if (typeof callback === 'function') {
              const answer = this.getAttribute('data-answer');
              callback(answer);
            }
          }
        });
      });
    } else if (questionType === 'fill') {
      // Add debounced input handler for learning mode
      const debouncedCallback = Utils.debounce((e) => {
        if (typeof callback === 'function') {
          callback(e.target.value.trim());
        }
      }, 500);
      
      elements.inputs.answerInput.addEventListener('input', debouncedCallback);
      
      // Add enter key handler
      elements.inputs.answerInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          if (typeof callback === 'function') {
            callback(this.value.trim());
          }
        }
      });
    } else if (questionType === 'matching') {
      const selectElement = document.getElementById('matchingSelect');
      if (selectElement) {
        selectElement.addEventListener('change', function() {
          if (typeof callback === 'function') {
            callback(this.value);
          }
        });
      }
    }
  }
  
  /**
   * Initialize the timer
   * @param {string} timerType - Type of timer ('countdown' or 'stopwatch')
   * @param {number} duration - Duration in seconds (for countdown timer)
   */
  function initTimer(timerType = 'stopwatch', duration = 0) {
    if (!elements.displays.timer) return;
    
    // Reset timer display
    elements.displays.timer.textContent = '00:00';
    elements.displays.timer.classList.remove('timer-warning', 'timer-danger');
    
    // Show timer container
    elements.displays.timer.parentNode.style.display = 'flex';
    
    return true;
  }
  
  /**
   * Update the timer display
   * @param {number} seconds - Total seconds elapsed/remaining
   * @param {boolean} isCountdown - Whether this is a countdown timer
   */
  function updateTimer(seconds, isCountdown = false) {
    if (!elements.displays.timer) return;
    
    // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    // Format the time as MM:SS
    elements.displays.timer.textContent = 
      `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    
    // Add warning classes for countdown timer
    if (isCountdown) {
      if (seconds <= 30 && seconds > 10) {
        elements.displays.timer.classList.add('timer-warning');
        elements.displays.timer.classList.remove('timer-danger');
      } else if (seconds <= 10) {
        elements.displays.timer.classList.add('timer-danger');
        elements.displays.timer.classList.remove('timer-warning');
      } else {
        elements.displays.timer.classList.remove('timer-warning', 'timer-danger');
      }
    }
  }
  
  /**
   * Clear all event listeners for a specific element
   * Used for performance optimization and memory management
   * @param {HTMLElement} element - The element to clean
   */
  function clearEventListeners(element) {
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
    return clone;
  }
  
  // Public API
  return {
    setup,
    showPanel,
    displayQuestion,
    showAnswerFeedback,
    showCorrectAnswer,
    updateProgress,
    showResults,
    getSelections,
    getUserAnswer,
    attachQuestionTypeHandlers,
    initTimer,
    updateTimer,
    clearEventListeners,
    addResumeButton,
    elements
  };
})();