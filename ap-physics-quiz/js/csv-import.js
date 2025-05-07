/**
 * Enhanced CSV Import functionality for the AP Physics 1 Quiz
 * Includes support for Markdown, LaTeX, image-based questions, and better parsing
 */

const CSVImport = (function() {
  /**
   * Parse CSV text into question objects
   * @param {string} csvText - The CSV text content
   * @return {Object} Object containing questions by type
   */
  function parseCSV(csvText) {
    // Performance monitoring
    Utils.performance.start('parseCSV');
    
    // Split by lines
    const lines = csvText.split('\n').filter(line => line.trim());
    
    // Get headers (assuming first line contains headers)
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Prepare question containers
    const questions = {
      tf: [],
      fill: [],
      mc: [],
      matching: [],
      image: [] // Added support for image-based questions
    };
    
    // Process each line (skipping the header)
    for (let i = 1; i < lines.length; i++) {
      // Skip empty lines
      if (!lines[i].trim()) continue;
      
      const values = parseCSVLine(lines[i]);
      
      // Make sure we have enough values
      if (values.length < Math.min(3, headers.length)) {
        console.warn(`Line ${i+1} has too few values. Skipping.`);
        continue;
      }
      
      // Create an object with the headers as keys
      const questionData = {};
      headers.forEach((header, index) => {
        questionData[header] = values[index] || '';
      });
      
      // Skip if no question text is provided
      if (!questionData.question || questionData.question.trim() === '') {
        console.warn(`Line ${i+1} has no question text. Skipping.`);
        continue;
      }
      
      // Determine the question type and process accordingly
      const questionType = questionData.type ? questionData.type.toLowerCase().trim() : determineQuestionType(questionData);
      
      try {
        if (questionType === 'tf') {
          questions.tf.push(processTrueFalseQuestion(questionData));
        } else if (questionType === 'fill') {
          questions.fill.push(processFillInBlankQuestion(questionData));
        } else if (questionType === 'mc') {
          questions.mc.push(processMultipleChoiceQuestion(questionData));
        } else if (questionType === 'matching') {
          questions.matching.push(processMatchingQuestion(questionData));
        } else if (questionType === 'image') {
          questions.image.push(processImageQuestion(questionData));
        } else {
          console.warn(`Unknown question type: ${questionType} on line ${i+1}. Skipping.`);
        }
      } catch (error) {
        console.error(`Error processing question on line ${i+1}:`, error);
      }
    }
    
    Utils.performance.end('parseCSV');
    return questions;
  }
  
  /**
   * Improved CSV line parsing that properly handles quoted fields
   * and LaTeX expressions with commas inside them
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
        // Check if this is an escaped quote ("")
        if (i + 1 < line.length && line[i + 1] === '"') {
          currentValue += '"';
          i++; // Skip the next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
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
  
  /**
   * Determine the question type based on its content
   * @param {Object} questionData - The question data
   * @return {string} The question type (tf, fill, mc, matching, or image)
   */
  function determineQuestionType(questionData) {
    if (questionData.type) {
      return questionData.type.toLowerCase();
    }
    
    const question = questionData.question || '';
    const questionId = parseInt(questionData.id) || 0;
    
    // Check by ID range (convention: 151-200 are matching questions, 201-250 are image questions)
    if (questionId >= 151 && questionId <= 200) {
      return 'matching';
    } else if (questionId >= 201 && questionId <= 250) {
      return 'image';
    }
    
    // Check by imageUrl field
    if (questionData.imageUrl || questionData.image) {
      return 'image';
    }
    
    // Check by content
    if (question.toLowerCase().includes('true or false')) {
      return 'tf';
    } else if (question.includes('__________') || question.includes('____')) {
      return 'fill';
    } else if (questionData.optionA || questionData.options || questionData['option A']) {
      return 'mc';
    } else if (question.includes('Match') || questionData.matches) {
      return 'matching';
    }
    
    // Default to multiple choice
    return 'mc';
  }
  
  /**
   * Process a True/False question
   * @param {Object} data - The question data
   * @return {Object} Processed True/False question
   */
  function processTrueFalseQuestion(data) {
    return {
      id: parseInt(data.id) || generateId(),
      question: data.question.trim(),
      answer: data.answer.toLowerCase().trim(),
      topic: data.topic ? data.topic.trim() : 'general',
      explanation: data.explanation ? data.explanation.trim() : '',
      type: 'tf'
    };
  }
  
  /**
   * Process a Fill in the Blank question
   * @param {Object} data - The question data
   * @return {Object} Processed Fill in the Blank question
   */
  function processFillInBlankQuestion(data) {
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
      id: parseInt(data.id) || generateId(),
      question: question,
      answer: data.answer.trim(),
      alternateAnswers: alternateAnswers,
      topic: data.topic ? data.topic.trim() : 'general',
      explanation: data.explanation ? data.explanation.trim() : '',
      type: 'fill'
    };
  }

  /**
 * Ordered List Question Type Implementation
 * 
 * This file contains functions to:
 * 1. Process ordered list questions from CSV
 * 2. Display ordered list questions in the UI
 * 3. Check ordered list answers
 */

// Add to CSVImport.js
function processOrderedListQuestion(data) {
  // Parse items from CSV (expect JSON string or comma-separated items)
  let items = [];
  
  if (data.items) {
    try {
      // Try parsing as JSON first
      items = JSON.parse(data.items);
    } catch (error) {
      // Fall back to comma-separated list
      items = data.items.split(',').map(item => item.trim());
    }
  }
  
  // Parse correct order from CSV
  let correctOrder = [];
  if (data.answer) {
    try {
      // Try parsing as JSON first
      correctOrder = JSON.parse(data.answer);
    } catch (error) {
      // Fall back to comma-separated list of indices or values
      const orderStrings = data.answer.split(',').map(item => item.trim());
      // Check if the answers are indices (numbers) or the actual items
      if (!isNaN(parseInt(orderStrings[0]))) {
        // Indices
        correctOrder = orderStrings.map(idx => parseInt(idx));
      } else {
        // Item values
        correctOrder = orderStrings;
      }
    }
  }
  
  return {
    id: parseInt(data.id) || generateId(),
    question: data.question.trim(),
    items: items,
    answer: correctOrder,
    topic: data.topic ? data.topic.trim() : 'general',
    explanation: data.explanation ? data.explanation.trim() : '',
    type: 'ordered-list'
  };
}

// Add to quiz-ui.js
function displayOrderedListQuestion(question) {
  // Create ordered list container if it doesn't exist
  let orderedListContainer = document.getElementById('orderedListContainer');
  
  if (!orderedListContainer) {
    orderedListContainer = document.createElement('div');
    orderedListContainer.id = 'orderedListContainer';
    orderedListContainer.className = 'ordered-list-container';
    
    // Insert after question text
    elements.displays.question.parentNode.insertBefore(
      orderedListContainer,
      elements.displays.question.nextSibling
    );
  }
  
  // Clear container
  orderedListContainer.innerHTML = '';
  
  // Add instructions
  const instructions = document.createElement('div');
  instructions.className = 'ordered-list-instructions';
  instructions.textContent = 'Arrange the items in the correct order by dragging them up or down:';
  orderedListContainer.appendChild(instructions);
  
  // Create sortable list
  const listElement = document.createElement('ul');
  listElement.className = 'sortable-list';
  listElement.id = 'sortableList';
  
  // Shuffle items for display
  const shuffledItems = Utils.shuffleArray([...question.items]);
  
  // Add items to the list
  shuffledItems.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'sortable-item';
    listItem.setAttribute('data-value', item);
    listItem.draggable = true;
    
    // Add drag handle
    const dragHandle = document.createElement('div');
    dragHandle.className = 'drag-handle';
    dragHandle.innerHTML = '&#8942;&#8942;'; // Unicode for vertical dots
    listItem.appendChild(dragHandle);
    
    // Add item content
    const itemContent = document.createElement('div');
    itemContent.className = 'item-content';
    itemContent.innerHTML = Utils.renderMarkdownWithLaTeX(item);
    listItem.appendChild(itemContent);
    
    // Add to list
    listElement.appendChild(listItem);
  });
  
  orderedListContainer.appendChild(listElement);
  
  // Initialize drag-and-drop functionality
  initSortableList(listElement);
  
  // Show the container
  orderedListContainer.style.display = 'block';
}

// Set up drag and drop for ordered lists
function initSortableList(listElement) {
  const items = listElement.querySelectorAll('.sortable-item');
  let draggedItem = null;
  
  items.forEach(item => {
    // Drag start event
    item.addEventListener('dragstart', function() {
      draggedItem = this;
      setTimeout(() => {
        this.classList.add('dragging');
      }, 0);
    });
    
    // Drag end event
    item.addEventListener('dragend', function() {
      this.classList.remove('dragging');
      draggedItem = null;
    });
    
    // Drag over event (required for drop to work)
    item.addEventListener('dragover', function(e) {
      e.preventDefault();
    });
    
    // Drag enter event
    item.addEventListener('dragenter', function(e) {
      e.preventDefault();
      if (this !== draggedItem) {
        const rect = this.getBoundingClientRect();
        const midpoint = (rect.top + rect.bottom) / 2;
        
        if (e.clientY < midpoint) {
          // Insert before
          listElement.insertBefore(draggedItem, this);
        } else {
          // Insert after
          listElement.insertBefore(draggedItem, this.nextSibling);
        }
      }
    });
  });
}

// Add to QuizData.js in checkAnswer function
function checkOrderedListAnswer(question) {
  // Get the current order of items from the DOM
  const listItems = document.querySelectorAll('#sortableList .sortable-item');
  const userOrder = Array.from(listItems).map(item => item.getAttribute('data-value'));
  
  // Simple case: exact match of the entire sequence
  if (question.answer.length === userOrder.length) {
    let allCorrect = true;
    
    for (let i = 0; i < question.answer.length; i++) {
      // Check if the answer is an index or the actual item value
      if (typeof question.answer[i] === 'number') {
        // It's an index into the items array
        if (userOrder[i] !== question.items[question.answer[i]]) {
          allCorrect = false;
          break;
        }
      } else {
        // It's the actual item value
        if (userOrder[i] !== question.answer[i]) {
          allCorrect = false;
          break;
        }
      }
    }
    
    return allCorrect;
  }
  
  return false;
}

// Add to QuizUI.js in showCorrectAnswer function
function showOrderedListCorrectAnswer(question) {
  let answerText = `<strong>Correct Order:</strong><ol>`;
  
  // Display the correct order
  if (typeof question.answer[0] === 'number') {
    // Answer is indices into items array
    for (let i = 0; i < question.answer.length; i++) {
      const index = question.answer[i];
      answerText += `<li>${Utils.renderMarkdownWithLaTeX(question.items[index])}</li>`;
    }
  } else {
    // Answer is the actual item values
    for (let i = 0; i < question.answer.length; i++) {
      answerText += `<li>${Utils.renderMarkdownWithLaTeX(question.answer[i])}</li>`;
    }
  }
  
  answerText += `</ol>`;
  
  // Add explanation if available
  if (question.explanation) {
    answerText += `<br><strong>Explanation:</strong> ${Utils.renderMarkdownWithLaTeX(question.explanation)}`;
  }
  
  return answerText;
}

// Add CSS styles for ordered list questions
const orderedListStyles = `
.ordered-list-container {
  margin: 15px 0;
  background-color: var(--bg);
  border-radius: 8px;
  padding: 10px;
  border: 1px solid var(--ui);
}

.ordered-list-instructions {
  margin-bottom: 10px;
  color: var(--tx-2);
  font-style: italic;
}

.sortable-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sortable-item {
  display: flex;
  align-items: center;
  background-color: var(--bg-2);
  border: 1px solid var(--ui);
  border-radius: 5px;
  margin-bottom: 8px;
  padding: 10px;
  cursor: move;
  transition: background-color 0.2s, transform 0.2s;
}

.sortable-item:hover {
  background-color: var(--ui);
}

.sortable-item.dragging {
  opacity: 0.7;
  transform: scale(1.02);
  background-color: var(--ui-2);
}

.drag-handle {
  color: var(--tx-3);
  margin-right: 10px;
  font-size: 18px;
  cursor: grab;
}

.item-content {
  flex: 1;
}
`;

/**
 * Diagram Labeling Question Type Implementation
 * 
 * This file contains functions to:
 * 1. Process diagram labeling questions from CSV
 * 2. Display diagram labeling questions in the UI
 * 3. Check diagram labeling answers
 */

// Add to CSVImport.js
function processDiagramLabelingQuestion(data) {
  // Parse labels from CSV (expect JSON string or comma-separated items)
  let labels = [];
  
  if (data.labels) {
    try {
      // Try parsing as JSON first
      labels = JSON.parse(data.labels);
    } catch (error) {
      // Fall back to comma-separated list
      labels = data.labels.split(',').map(label => label.trim());
    }
  }
  
  // Parse correct answers from CSV (mapping of label position to label)
  let correctLabels = {};
  if (data.answer) {
    try {
      // Try parsing as JSON first
      correctLabels = JSON.parse(data.answer);
    } catch (error) {
      // Fall back to parsing as key-value pairs separated by semicolons
      // Format: "1:Force; 2:Mass; 3:Acceleration"
      const pairs = data.answer.split(';');
      pairs.forEach(pair => {
        const [position, label] = pair.split(':').map(item => item.trim());
        if (position && label) {
          correctLabels[position] = label;
        }
      });
    }
  }
  
  return {
    id: parseInt(data.id) || generateId(),
    question: data.question.trim(),
    imageUrl: data.imageUrl || data.image || '',
    labels: labels,
    answer: correctLabels,
    topic: data.topic ? data.topic.trim() : 'general',
    explanation: data.explanation ? data.explanation.trim() : '',
    type: 'diagram-labeling'
  };
}

// Add to quiz-ui.js
function displayDiagramLabelingQuestion(question) {
  // Show image container
  elements.displays.imageContainer.style.display = 'block';
  elements.displays.imageContainer.innerHTML = '';
  
  // Add loading indicator
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'image-loading';
  loadingIndicator.innerHTML = '<div class="spinner"></div><span>Loading diagram...</span>';
  elements.displays.imageContainer.appendChild(loadingIndicator);
  
  // Create diagram container
  const diagramContainer = document.createElement('div');
  diagramContainer.className = 'diagram-container';
  
  // Load the image
  loadImage(question.imageUrl)
    .then(image => {
      // Remove loading indicator
      elements.displays.imageContainer.removeChild(loadingIndicator);
      
      // Add the diagram image to the container
      image.className = 'diagram-image';
      diagramContainer.appendChild(image);
      
      // Create labeling points based on the number of expected labels
      const labelPositions = Object.keys(question.answer);
      
      labelPositions.forEach((position, index) => {
        // Create label point marker
        const labelPoint = document.createElement('div');
        labelPoint.className = 'label-point';
        labelPoint.setAttribute('data-position', position);
        
        // Position markers evenly around the image
        // This is a simple positioning strategy - in a real app, you'd store coordinates in the CSV
        const angle = (index / labelPositions.length) * 2 * Math.PI;
        const radius = 42; // Distance from center in percentage
        
        // Calculate position (center + radius * direction)
        const xPos = 50 + radius * Math.cos(angle);
        const yPos = 50 + radius * Math.sin(angle);
        
        labelPoint.style.left = `${xPos}%`;
        labelPoint.style.top = `${yPos}%`;
        
        // Add label number
        const labelNum = document.createElement('span');
        labelNum.className = 'label-number';
        labelNum.textContent = position;
        labelPoint.appendChild(labelNum);
        
        diagramContainer.appendChild(labelPoint);
      });
      
      // Add diagram container to image container
      elements.displays.imageContainer.appendChild(diagramContainer);
      
      // Create label selection area
      createLabelSelectionArea(question, labelPositions);
    })
    .catch(error => {
      // Show error message
      loadingIndicator.innerHTML = '<div class="error-icon">!</div><span>Failed to load diagram</span>';
      console.error('Error loading diagram image:', error);
    });
}

// Create the label selection area for the diagram
function createLabelSelectionArea(question, labelPositions) {
  // Create the label selection area
  const labelingArea = document.createElement('div');
  labelingArea.className = 'labeling-area';
  labelingArea.id = 'labelingArea';
  
  // Add instructions
  const instructions = document.createElement('div');
  instructions.className = 'labeling-instructions';
  instructions.textContent = 'Match each label with the corresponding position in the diagram:';
  labelingArea.appendChild(instructions);
  
  // Create a selection dropdown for each position
  labelPositions.forEach(position => {
    const labelGroup = document.createElement('div');
    labelGroup.className = 'label-group';
    
    // Create label for the position
    const posLabel = document.createElement('label');
    posLabel.className = 'position-label';
    posLabel.textContent = `Position ${position}:`;
    posLabel.setAttribute('for', `select-pos-${position}`);
    labelGroup.appendChild(posLabel);
    
    // Create select element
    const select = document.createElement('select');
    select.className = 'label-select';
    select.id = `select-pos-${position}`;
    select.setAttribute('data-position', position);
    
    // Add default "Select" option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select label --';
    select.appendChild(defaultOption);
    
    // Add options for each label
    question.labels.forEach(label => {
      const option = document.createElement('option');
      option.value = label;
      option.textContent = label;
      select.appendChild(option);
    });
    
    labelGroup.appendChild(select);
    labelingArea.appendChild(labelGroup);
  });
  
  // Append to image container
  elements.displays.imageContainer.appendChild(labelingArea);
}

// Add to QuizData.js in checkAnswer function
function checkDiagramLabelingAnswer(question) {
  const selects = document.querySelectorAll('#labelingArea .label-select');
  let allCorrect = true;
  
  // Check each position
  selects.forEach(select => {
    const position = select.getAttribute('data-position');
    const userLabel = select.value;
    const correctLabel = question.answer[position];
    
    if (userLabel !== correctLabel) {
      allCorrect = false;
    }
  });
  
  return allCorrect;
}

// Get the user's answers for diagram labeling
function getDiagramLabelingUserAnswer() {
  const selects = document.querySelectorAll('#labelingArea .label-select');
  const userAnswers = {};
  
  selects.forEach(select => {
    const position = select.getAttribute('data-position');
    userAnswers[position] = select.value;
  });
  
  return userAnswers;
}

// Add to QuizUI.js in showCorrectAnswer function
function showDiagramLabelingCorrectAnswer(question) {
  let answerText = `<strong>Correct Labels:</strong><ul>`;
  
  // Get user's answers
  const userAnswers = getDiagramLabelingUserAnswer();
  
  // Display correct answers for each position
  Object.entries(question.answer).forEach(([position, label]) => {
    const userLabel = userAnswers[position];
    const isCorrect = userLabel === label;
    
    answerText += `<li>Position ${position}: <strong>${label}</strong>`;
    
    if (!isCorrect) {
      answerText += ` <span class="incorrect">(You selected: ${userLabel || 'None'})</span>`;
    } else {
      answerText += ` <span class="correct">✓</span>`;
    }
    
    answerText += `</li>`;
  });
  
  answerText += `</ul>`;
  
  // Add explanation if available
  if (question.explanation) {
    answerText += `<br><strong>Explanation:</strong> ${Utils.renderMarkdownWithLaTeX(question.explanation)}`;
  }
  
  return answerText;
}

// Add highlighting to selected label points
function initLabelPointHighlighting() {
  // Add event listeners to select elements
  const selects = document.querySelectorAll('#labelingArea .label-select');
  
  selects.forEach(select => {
    select.addEventListener('change', function() {
      const position = this.getAttribute('data-position');
      const labelPoint = document.querySelector(`.label-point[data-position="${position}"]`);
      
      // Remove highlighting from all positions
      document.querySelectorAll('.label-point').forEach(point => {
        point.classList.remove('selected', 'has-label');
      });
      
      // Add highlighting to selected position
      if (this.value) {
        labelPoint.classList.add('selected', 'has-label');
        
        // Create or update label text
        let labelText = labelPoint.querySelector('.label-text');
        if (!labelText) {
          labelText = document.createElement('div');
          labelText.className = 'label-text';
          labelPoint.appendChild(labelText);
        }
        
        labelText.textContent = this.value;
      } else {
        // Remove label text if no selection
        const labelText = labelPoint.querySelector('.label-text');
        if (labelText) {
          labelPoint.removeChild(labelText);
        }
      }
    });
  });
  
  // Add click handler to label points to focus corresponding select
  const labelPoints = document.querySelectorAll('.label-point');
  
  labelPoints.forEach(point => {
    point.addEventListener('click', function() {
      const position = this.getAttribute('data-position');
      const select = document.querySelector(`#select-pos-${position}`);
      
      if (select) {
        select.focus();
      }
    });
  });
}

// Add CSS styles for diagram labeling
const diagramLabelingStyles = `
.diagram-container {
  position: relative;
  max-width: 100%;
  margin: 0 auto 20px;
}

.diagram-image {
  display: block;
  max-width: 100%;
  max-height: 400px;
  margin: 0 auto;
  border-radius: 8px;
}

.label-point {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--accent-primary);
  color: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  z-index: 5;
}

.label-point:hover {
  transform: translate(-50%, -50%) scale(1.1);
  background-color: var(--accent-secondary);
}

.label-point.selected {
  background-color: var(--accent-success);
  transform: translate(-50%, -50%) scale(1.1);
}

.label-number {
  font-size: 12px;
}

.label-text {
  position: absolute;
  background-color: var(--bg);
  border: 1px solid var(--ui);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  white-space: nowrap;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--tx);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.labeling-area {
  margin-top: 20px;
  padding: 15px;
  background-color: var(--bg);
  border: 1px solid var(--ui);
  border-radius: 8px;
}

.labeling-instructions {
  margin-bottom: 10px;
  color: var(--tx-2);
  font-style: italic;
}

.label-group {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.position-label {
  flex: 0 0 100px;
  font-weight: 500;
}

.label-select {
  flex: 1;
  padding: 8px;
  border: 1px solid var(--ui);
  border-radius: 4px;
  background-color: var(--bg);
  color: var(--tx);
}

.label-select:focus {
  border-color: var(--accent-primary);
  outline: none;
}
`;

/**
 * Drag and Drop Question Type Implementation (Continued)
 */

function handleDragLeave(e) {
  // Remove highlight class
  this.classList.remove('drag-over');
}

function handleDrop(e) {
  // Prevent default behavior
  e.preventDefault();
  
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
   * Process a Multiple Choice question
   * @param {Object} data - The question data
   * @return {Object} Processed Multiple Choice question
   */
  function processMultipleChoiceQuestion(data) {
    // Handle options
    const options = [];
    
    // Check for options in format optionA, optionB, etc.
    if (data.optionA || data.optionB) {
      ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
        const optionKey = `option${letter}`;
        if (data[optionKey]) {
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
        if (data[optionKey]) {
          options.push({
            label: letter,
            text: data[optionKey].trim()
          });
        }
      });
    }
    // Check for options as JSON string
    else if (data.options && typeof data.options === 'string') {
      try {
        const parsedOptions = JSON.parse(data.options);
        parsedOptions.forEach(option => {
          options.push({
            label: option.label,
            text: option.text.trim()
          });
        });
      } catch (error) {
        console.error('Error parsing options JSON:', error);
      }
    }
    
    return {
      id: parseInt(data.id) || generateId(),
      question: data.question.trim(),
      options: options,
      answer: data.answer.trim(),
      topic: data.topic ? data.topic.trim() : 'general',
      explanation: data.explanation ? data.explanation.trim() : '',
      type: 'mc'
    };
  }
  
  /**
   * Process a Matching question from the CSV
   * @param {Object} data - The question data
   * @return {Object} Processed Matching question
   */
  function processMatchingQuestion(data) {
    // Create standard matching options A-E
    const matchingOptions = [
      { label: 'A', text: 'Option A' },
      { label: 'B', text: 'Option B' },
      { label: 'C', text: 'Option C' },
      { label: 'D', text: 'Option D' },
      { label: 'E', text: 'Option E' }
    ];
    
    // Try to get matching options from CSV if available
    if (data.optionA || data.optionB) {
      for (let i = 0; i < matchingOptions.length; i++) {
        const letter = matchingOptions[i].label;
        const optionKey = `option${letter}`;
        if (data[optionKey]) {
          matchingOptions[i].text = data[optionKey].trim();
        }
      }
    }
    
    return {
      id: parseInt(data.id) || generateId(),
      question: data.question.trim(),
      answer: data.answer.trim(),
      matchingOptions: matchingOptions,
      topic: data.topic ? data.topic.trim() : 'general',
      explanation: data.explanation ? data.explanation.trim() : '',
      type: 'matching'
    };
  }
  
  /**
   * Process an Image question from the CSV
   * @param {Object} data - The question data
   * @return {Object} Processed Image question
   */
  function processImageQuestion(data) {
    // Get image URL from either imageUrl or image field
    const imageUrl = data.imageUrl || data.image || '';
    
    // Process options similar to multiple choice
    const options = [];
    
    if (data.optionA || data.optionB) {
      ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
        const optionKey = `option${letter}`;
        if (data[optionKey]) {
          options.push({
            label: letter,
            text: data[optionKey].trim()
          });
        }
      });
    } else if (data['option A'] || data['option B']) {
      ['A', 'B', 'C', 'D', 'E'].forEach(letter => {
        const optionKey = `option ${letter}`;
        if (data[optionKey]) {
          options.push({
            label: letter,
            text: data[optionKey].trim()
          });
        }
      });
    } else if (data.options && typeof data.options === 'string') {
      try {
        const parsedOptions = JSON.parse(data.options);
        parsedOptions.forEach(option => {
          options.push({
            label: option.label,
            text: option.text.trim()
          });
        });
      } catch (error) {
        console.error('Error parsing options JSON for image question:', error);
      }
    }
    
    return {
      id: parseInt(data.id) || generateId(),
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
   * Generate a random ID for a question
   * @return {number} A random ID
   */
  function generateId() {
    return Math.floor(Math.random() * 10000) + 1000;
  }
  
  /**
   * Create an enhanced file input for CSV import with drag-and-drop support
   * @param {Function} callback - Function to call with parsed questions
   * @return {HTMLElement} The enhanced import container
   */
  function createFileInput(callback) {
    // Create container
    const container = document.createElement('div');
    container.className = 'import-container';
    
    // Create title
    const title = document.createElement('h3');
    title.textContent = 'Import Questions';
    container.appendChild(title);
    
    // Create instructions
    const instructions = document.createElement('p');
    instructions.className = 'import-instructions';
    instructions.textContent = 'Upload a CSV file with your quiz questions or drag and drop the file below.';
    container.appendChild(instructions);
    
    // Create drop area
    const dropArea = document.createElement('div');
    dropArea.className = 'drop-area';
    dropArea.innerHTML = '<div class="drop-message">Drag & drop CSV file here<br>or click to select file</div>';
    container.appendChild(dropArea);
    
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.style.display = 'none';
    container.appendChild(fileInput);
    
    // Create sample link
    const sampleLink = document.createElement('a');
    sampleLink.href = 'data/sample-questions.csv';
    sampleLink.textContent = 'Download sample CSV template';
    sampleLink.className = 'sample-link';
    sampleLink.download = 'sample-questions.csv';
    container.appendChild(sampleLink);
    
    // Add event listeners for drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Highlight drop area when dragging over it
    ['dragenter', 'dragover'].forEach(eventName => {
      dropArea.addEventListener(eventName, highlight);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
      dropArea.addEventListener(eventName, unhighlight);
    });
    
    function highlight() {
      dropArea.classList.add('highlight');
    }
    
    function unhighlight() {
      dropArea.classList.remove('highlight');
    }
    
    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop);
    
    function handleDrop(e) {
      const files = e.dataTransfer.files;
      if (files.length) {
        handleFiles(files);
      }
    }
    
    // Handle file selection via button
    dropArea.addEventListener('click', () => {
      fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });
    
    function handleFiles(files) {
      const file = files[0];
      if (!file) return;
      
      // Create a loading indicator
      const loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'loading-indicator';
      loadingIndicator.innerHTML = '<div class="spinner"></div><div>Processing file...</div>';
      container.appendChild(loadingIndicator);
      
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const csvText = e.target.result;
          const questions = parseCSV(csvText);
          
          // Remove loading indicator
          container.removeChild(loadingIndicator);
          
          // Display import success message
          const successMsg = document.createElement('div');
          successMsg.className = 'success-message';
          
          const totalQuestions = Object.values(questions).reduce((acc, arr) => acc + arr.length, 0);
          
          successMsg.innerHTML = `
            <div class="success-icon">✓</div>
            <h4>Successfully imported ${totalQuestions} questions!</h4>
            <ul>
              <li>True/False: ${questions.tf.length}</li>
              <li>Fill in the Blank: ${questions.fill.length}</li>
              <li>Multiple Choice: ${questions.mc.length}</li>
              <li>Matching: ${questions.matching.length}</li>
              <li>Image-based: ${questions.image.length}</li>
            </ul>
          `;
          container.appendChild(successMsg);
          
          // Auto-remove success message after 5 seconds
          setTimeout(() => {
            if (container.contains(successMsg)) {
              container.removeChild(successMsg);
            }
          }, 5000);
          
          if (callback) callback(questions);
        } catch (error) {
          // Remove loading indicator
          container.removeChild(loadingIndicator);
          
          // Display error message
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.innerHTML = `
            <div class="error-icon">!</div>
            <h4>Error processing CSV file</h4>
            <p>${error.message}</p>
          `;
          container.appendChild(errorMsg);
          
          // Auto-remove error message after 5 seconds
          setTimeout(() => {
            if (container.contains(errorMsg)) {
              container.removeChild(errorMsg);
            }
          }, 5000);
          
          console.error('Error importing CSV:', error);
        }
      };
      
      reader.onerror = (e) => {
        // Remove loading indicator
        container.removeChild(loadingIndicator);
        
        // Display error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.innerHTML = `
          <div class="error-icon">!</div>
          <h4>Error reading file</h4>
          <p>The file could not be read. Please try again.</p>
        `;
        container.appendChild(errorMsg);
        
        console.error('File reading error:', e);
      };
      
      reader.readAsText(file);
    }
    
    // Add the new enhanced CSV import styles
    addImportStyles();
    
    return container;
  }
  
  /**
   * Create a text area for direct CSV paste
   * @param {Function} callback - Function to call with parsed questions
   * @return {HTMLElement} The text area container
   */
  function createTextArea(callback) {
    // Create container
    const container = document.createElement('div');
    container.className = 'import-container';
    
    // Create header
    const header = document.createElement('h3');
    header.textContent = 'Import from Text';
    container.appendChild(header);
    
    // Create instructions
    const instructions = document.createElement('p');
    instructions.className = 'import-instructions';
    instructions.textContent = 'Paste your CSV data below and click "Import" to add questions.';
    container.appendChild(instructions);
    
    // Create text area
    const textArea = document.createElement('textarea');
    textArea.rows = 10;
    textArea.className = 'quiz-input csv-textarea';
    textArea.placeholder = "id,type,question,answer,topic,explanation,optionA,optionB,optionC,optionD\n1,tf,True or False: Displacement indicates the total distance an object travels.,false,kinematics,Displacement only indicates how far an object ends up from its initial position...";
    container.appendChild(textArea);
    
    // Create button
    const button = document.createElement('button');
    button.textContent = 'Import Questions';
    button.className = 'btn';
    container.appendChild(button);
    
    button.addEventListener('click', () => {
      const csvText = textArea.value;
      if (!csvText.trim()) {
        alert('Please paste CSV data first');
        return;
      }
      
      // Create a loading indicator
      const loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'loading-indicator';
      loadingIndicator.innerHTML = '<div class="spinner"></div><div>Processing data...</div>';
      container.appendChild(loadingIndicator);
      
      try {
        // Parse CSV text
        const questions = parseCSV(csvText);
        
        // Remove loading indicator
        container.removeChild(loadingIndicator);
        
        // Display success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        
        const totalQuestions = Object.values(questions).reduce((acc, arr) => acc + arr.length, 0);
        
        successMsg.innerHTML = `
          <div class="success-icon">✓</div>
          <h4>Successfully imported ${totalQuestions} questions!</h4>
          <ul>
            <li>True/False: ${questions.tf.length}</li>
            <li>Fill in the Blank: ${questions.fill.length}</li>
            <li>Multiple Choice: ${questions.mc.length}</li>
            <li>Matching: ${questions.matching.length}</li>
            <li>Image-based: ${questions.image.length}</li>
          </ul>
        `;
        container.appendChild(successMsg);
        
        // Clear textarea
        textArea.value = '';
        
        // Auto-remove success message after 5 seconds
        setTimeout(() => {
          if (container.contains(successMsg)) {
            container.removeChild(successMsg);
          }
        }, 5000);
        
        if (callback) callback(questions);
      } catch (error) {
        // Remove loading indicator
        container.removeChild(loadingIndicator);
        
        // Display error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.innerHTML = `
          <div class="error-icon">!</div>
          <h4>Error processing CSV data</h4>
          <p>${error.message}</p>
        `;
        container.appendChild(errorMsg);
        
        console.error('Error parsing CSV data:', error);
      }
    });
    
    // Add import styles
    addImportStyles();
    
    return container;
  }
  
  /**
   * Add CSS styles for the enhanced import interface
   */
  function addImportStyles() {
    // Check if styles are already added
    if (document.getElementById('csv-import-styles')) {
      return;
    }
    
    const styleElement = document.createElement('style');
    styleElement.id = 'csv-import-styles';
    styleElement.textContent = `
      .import-container {
        margin: 20px 0;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }
      
      .import-container h3 {
        margin-top: 0;
        color: #2c3e50;
      }
      
      .import-instructions {
        color: #7f8c8d;
        margin-bottom: 15px;
      }
      
      .drop-area {
        border: 2px dashed #bdc3c7;
        border-radius: 8px;
        padding: 30px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        background-color: #f9f9f9;
        margin-bottom: 15px;
      }
      
      .drop-area:hover {
        border-color: #3498db;
        background-color: #f0f8ff;
      }
      
      .drop-area.highlight {
        border-color: #3498db;
        background-color: #e1f0fa;
      }
      
      .drop-message {
        color: #7f8c8d;
        font-size: 16px;
        line-height: 1.5;
      }
      
      .sample-link {
        display: inline-block;
        margin-top: 10px;
        font-size: 14px;
        color: #3498db;
        text-decoration: none;
      }
      
      .sample-link:hover {
        text-decoration: underline;
      }
      
      .loading-indicator {
        display: flex;
        align-items: center;
        margin: 15px 0;
        padding: 10px;
        background-color: #f5f5f5;
        border-radius: 5px;
      }
      
      .spinner {
        width: 20px;
        height: 20px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 10px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .success-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 15px 0;
        padding: 15px;
        background-color: #e6f7e9;
        border-radius: 5px;
        animation: fadeIn 0.5s;
      }
      
      .success-icon {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #27ae60;
        color: white;
        border-radius: 50%;
        margin-bottom: 10px;
        font-weight: bold;
      }
      
      .error-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 15px 0;
        padding: 15px;
        background-color: #fde8e8;
        border-radius: 5px;
        animation: fadeIn 0.5s;
      }
      
      .error-icon {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e74c3c;
        color: white;
        border-radius: 50%;
        margin-bottom: 10px;
        font-weight: bold;
      }
      
      .csv-textarea {
        font-family: monospace;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-radius: 5px;
        resize: vertical;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    
    document.head.appendChild(styleElement);
  }
  
  /**
   * Create a sample CSV file content
   * @return {string} Sample CSV content for download
   */
  function generateSampleCSV() {
    return `id,type,question,answer,topic,explanation,optionA,optionB,optionC,optionD,imageUrl,alternateAnswers
1,tf,True or False: Displacement indicates the total distance an object travels.,false,kinematics,Displacement only indicates how far an object ends up from its initial position.,,,,,, 
2,tf,True or False: Average velocity is displacement divided by the time interval over which that displacement occurred.,true,kinematics,Average velocity is defined as the total displacement divided by the time interval.,,,,,,
3,fill,The units of acceleration are ____.,m/s²,kinematics,Acceleration is the rate of change of velocity measured in meters per second per second.,,,,,,"m/s/s,meters per second squared"
4,mc,Which of the following is the correct definition of instantaneous velocity?,B,kinematics,Instantaneous velocity is the velocity at a single moment in time.,The total distance traveled divided by the total time,How fast an object is moving at a specific moment in time,The change in position divided by time,The slope of a velocity-time graph,,
5,image,Identify what this position-time graph indicates about the object's motion.,C,kinematics,The parabolic shape with positive curvature indicates positive acceleration.,The object is moving at constant velocity,The object is at rest,The object is moving with constant acceleration,The object is slowing down,https://example.com/physics/position-time-graph.png,
6,matching,Displacement,A,kinematics,Displacement is the straight-line distance and direction from initial to final position.,How far an object ends up from its initial position,The total path length traveled by an object,The time it takes to move from one position to another,The average speed of an object,The direction of motion,
`;
  }
  
  /**
   * Generate sample template and add download link to the page
   */
  function addSampleTemplate() {
    // Create blob with sample data
    const sampleData = generateSampleCSV();
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    // Find or create the download link
    let sampleLink = document.getElementById('sample-csv-template');
    
    if (!sampleLink) {
      sampleLink = document.createElement('a');
      sampleLink.id = 'sample-csv-template';
      sampleLink.className = 'sample-template-link';
      sampleLink.textContent = 'Download sample CSV template';
      
      // Style the link
      sampleLink.style.display = 'inline-block';
      sampleLink.style.margin = '10px 0';
      sampleLink.style.color = '#3498db';
      
      // Add to the setup panel
      const setupPanel = document.getElementById('setupPanel');
      if (setupPanel) {
        setupPanel.appendChild(sampleLink);
      }
    }
    
    // Update link
    sampleLink.href = url;
    sampleLink.download = 'sample-questions.csv';
  }
  
  // Public API
  return {
    parseCSV,
    createFileInput,
    createTextArea,
    addSampleTemplate,
    generateSampleCSV
  };
})();