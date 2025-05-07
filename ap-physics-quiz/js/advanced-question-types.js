/**
 * Advanced Question Types for AP Physics 1 Quiz
 * Adds support for ordered lists, diagram labeling, and drag-drop questions
 */

const AdvancedQuestionTypes = (function() {
    // Store original functions to call them later
    const originalFunctions = {};
    
    // Style definitions for different question types
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
  
    const numericalStyles = `
      .numerical-container {
        margin: 15px 0;
        background-color: var(--bg);
        border-radius: 8px;
        padding: 15px;
        border: 1px solid var(--ui);
      }
  
      .numerical-instructions {
        margin-bottom: 10px;
        color: var(--tx-2);
        font-style: italic;
      }
  
      .numerical-input-group {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
  
      .numerical-input {
        flex: 1;
        padding: 10px;
        border: 1px solid var(--ui);
        border-radius: 4px;
        font-size: 1em;
        background-color: var(--bg);
        color: var(--tx);
        max-width: 200px;
      }
  
      .units-display {
        margin-left: 10px;
        font-weight: 500;
        color: var(--tx);
      }
  
      .tolerance-info {
        font-size: 0.9em;
        color: var(--tx-2);
        margin-top: 5px;
      }
    `;
  
    // Process question data handlers
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
  
    function processNumericalQuestion(data) {
      // Process numerical answer with tolerance
      let correctAnswer = parseFloat(data.answer);
      let tolerance = 0;
      let units = '';
      
      // Parse tolerance if provided
      if (data.tolerance) {
        tolerance = parseFloat(data.tolerance);
      } else {
        // Default tolerance of 2% if not specified
        tolerance = Math.abs(correctAnswer * 0.02);
      }
      
      // Parse units if provided
      if (data.units) {
        units = data.units.trim();
      }
      
      return {
        id: parseInt(data.id) || generateId(),
        question: data.question.trim(),
        answer: correctAnswer,
        tolerance: tolerance,
        units: units,
        topic: data.topic ? data.topic.trim() : 'general',
        explanation: data.explanation ? data.explanation.trim() : '',
        type: 'numerical'
      };
    }
  
    // Helper function to generate ID
    function generateId() {
      return Math.floor(Math.random() * 100000);
    }
  
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
  
    // Main initialization function to integrate with existing quiz
    function initialize() {
      console.log("Initializing Advanced Question Types...");
      
      // Add CSS styles
      addStyles();
      
      // Store original functions
      if (typeof QuizData !== 'undefined') {
        originalFunctions.checkAnswer = QuizData.checkAnswer;
      }
      
      if (typeof QuizUI !== 'undefined') {
        originalFunctions.displayQuestion = QuizUI.displayQuestion;
        originalFunctions.showCorrectAnswer = QuizUI.showCorrectAnswer;
        originalFunctions.getUserAnswer = QuizUI.getUserAnswer;
      }
      
      // Patch QuizData functions
      patchQuizDataFunctions();
      
      // Patch QuizUI functions
      patchQuizUIFunctions();
      
      // No longer trying to patch CSVImport functions - it's optional
      console.log("Advanced Question Types initialized.");
    }
    
    // Patch QuizData functions to handle new question types
    function patchQuizDataFunctions() {
      if (typeof QuizData === 'undefined') {
        console.warn("QuizData not found. Cannot patch question data functions.");
        return;
      }
      
      // Extend checkAnswer function to handle new question types
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
            if (originalFunctions.checkAnswer) {
              return originalFunctions.checkAnswer(question, userAnswer);
            }
            return false;
        }
      };
    }
    
    // Function to check numerical answer against tolerance
    function checkNumericalAnswer(question, userAnswer) {
      if (!userAnswer) return false;
      
      // Parse user's answer as a number
      const userVal = parseFloat(userAnswer);
      if (isNaN(userVal)) return false;
      
      // Get correct answer and tolerance
      const correctVal = parseFloat(question.answer);
      const tolerance = question.tolerance || (correctVal * 0.02); // Default 2% tolerance
      
      // Check if user's answer is within tolerance range
      return Math.abs(userVal - correctVal) <= tolerance;
    }
    
    // Function to check ordered list answer
    function checkOrderedListAnswer(question) {
      // Get current order of items from DOM
      const listItems = document.querySelectorAll('#sortableList .sortable-item');
      const userOrder = Array.from(listItems).map(item => item.getAttribute('data-value'));
      
      // Compare with correct order
      if (question.answer.length !== userOrder.length) return false;
      
      let correct = true;
      for (let i = 0; i < question.answer.length; i++) {
        // Handle both index-based and value-based answers
        if (typeof question.answer[i] === 'number') {
          // Index-based answer
          if (userOrder[i] !== question.items[question.answer[i]]) {
            correct = false;
            break;
          }
        } else {
          // Value-based answer
          if (userOrder[i] !== question.answer[i]) {
            correct = false;
            break;
          }
        }
      }
      
      return correct;
    }
    
    // Function to check diagram labeling answer
    function checkDiagramLabelingAnswer(question) {
      const selects = document.querySelectorAll('#labelingArea .label-select');
      let allCorrect = true;
      
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
    
    // Patch QuizUI functions to handle new question types
    function patchQuizUIFunctions() {
      if (typeof QuizUI === 'undefined') {
        console.warn("QuizUI not found. Cannot patch UI functions.");
        return;
      }
      
      // Extend displayQuestion function to handle new question types
      QuizUI.displayQuestion = function(question, index, total) {
        if (!question) return false;
        
        // Update question number and total
        if (typeof index !== 'undefined' && typeof total !== 'undefined') {
          QuizUI.elements.displays.currentQuestion.textContent = index + 1;
          QuizUI.elements.displays.totalQuestions.textContent = total;
        }
        
        // Display question text with LaTeX
        QuizUI.elements.displays.question.innerHTML = Utils.renderMarkdownWithLaTeX(question.question);
        
        // Reset UI elements
        resetQuizUI();
        
        // Display based on question type
        switch (question.type) {
          case 'ordered-list':
            displayOrderedListQuestion(question);
            return true;
          case 'diagram-labeling':
            displayDiagramLabelingQuestion(question);
            return true;
          case 'drag-drop':
            displayDragDropQuestion(question);
            return true;
          case 'numerical':
            displayNumericalQuestion(question);
            return true;
          default:
            // Use the original display function for standard question types
            if (originalFunctions.displayQuestion) {
              return originalFunctions.displayQuestion(question, index, total);
            }
            return false;
        }
      };
      
      // Function to display numerical question
      function displayNumericalQuestion(question) {
        // Create container if doesn't exist
        let container = document.getElementById('numericalContainer');
        if (!container) {
          container = document.createElement('div');
          container.id = 'numericalContainer';
          container.className = 'numerical-container';
          QuizUI.elements.displays.question.parentNode.insertBefore(
            container,
            QuizUI.elements.displays.question.nextSibling
          );
        }
        
        // Clear container
        container.innerHTML = '';
        
        // Add instructions
        const instructions = document.createElement('div');
        instructions.className = 'numerical-instructions';
        instructions.textContent = 'Enter your numerical answer below:';
        container.appendChild(instructions);
        
        // Create input group
        const inputGroup = document.createElement('div');
        inputGroup.className = 'numerical-input-group';
        
        // Create input
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'numerical-input';
        input.id = 'numericalInput';
        input.step = 'any'; // Allow decimal inputs
        input.placeholder = 'Enter your answer';
        inputGroup.appendChild(input);
        
        // Add units if specified
        if (question.units) {
          const units = document.createElement('div');
          units.className = 'units-display';
          units.id = 'unitsDisplay';
          units.textContent = question.units;
          inputGroup.appendChild(units);
        }
        
        container.appendChild(inputGroup);
        
        // Add tolerance info if specified
        if (question.tolerance) {
          const tolerance = document.createElement('div');
          tolerance.className = 'tolerance-info';
          tolerance.textContent = `Accepted within ±${question.tolerance} ${question.units || ''}`;
          container.appendChild(tolerance);
        }
        
        // Show the container
        container.style.display = 'block';
        
        // Set up input to use regular answerInput for answer checking
        QuizUI.elements.inputs.answerInput.style.display = 'none';
        input.addEventListener('input', function() {
          QuizUI.elements.inputs.answerInput.value = this.value;
        });
        
        // Focus the input
        input.focus();
      }
      
      // Function to display ordered list question
      function displayOrderedListQuestion(question) {
        // Create ordered list container if it doesn't exist
        let orderedListContainer = document.getElementById('orderedListContainer');
        
        if (!orderedListContainer) {
          orderedListContainer = document.createElement('div');
          orderedListContainer.id = 'orderedListContainer';
          orderedListContainer.className = 'ordered-list-container';
          
          // Insert after question text
          QuizUI.elements.displays.question.parentNode.insertBefore(
            orderedListContainer,
            QuizUI.elements.displays.question.nextSibling
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
          
          // Drop event
          item.addEventListener('drop', function(e) {
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
      
      // Function to display diagram labeling question
      function displayDiagramLabelingQuestion(question) {
        // Show image container
        QuizUI.elements.displays.imageContainer.style.display = 'block';
        QuizUI.elements.displays.imageContainer.innerHTML = '';
        
        // Add loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'image-loading';
        loadingIndicator.innerHTML = '<div class="spinner"></div><span>Loading diagram...</span>';
        QuizUI.elements.displays.imageContainer.appendChild(loadingIndicator);
        
        // Create diagram container
        const diagramContainer = document.createElement('div');
        diagramContainer.className = 'diagram-container';
        
        // Load the image
        loadImage(question.imageUrl)
          .then(image => {
            // Remove loading indicator
            QuizUI.elements.displays.imageContainer.removeChild(loadingIndicator);
            
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
            QuizUI.elements.displays.imageContainer.appendChild(diagramContainer);
            
            // Create label selection area
            createLabelSelectionArea(question, labelPositions);
          })
          .catch(error => {
            // Show error message
            loadingIndicator.innerHTML = '<div class="error-icon">!</div><span>Failed to load diagram</span>';
            console.error('Error loading diagram image:', error);
          });
      }
      
      // Helper function to load image
      function loadImage(url) {
        return new Promise((resolve, reject) => {
          // Handle missing url
          if (!url) {
            reject(new Error('No image URL provided'));
            return;
          }
          
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image from ${url}`));
          img.src = url;
        });
      }
      
      // Create the label selection area for diagram questions
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
        QuizUI.elements.displays.imageContainer.appendChild(labelingArea);
      }
      
      // Function to get diagram labeling user answers
      function getDiagramLabelingUserAnswer() {
        const selects = document.querySelectorAll('#labelingArea .label-select');
        const userAnswers = {};
        
        selects.forEach(select => {
          const position = select.getAttribute('data-position');
          userAnswers[position] = select.value;
        });
        
        return userAnswers;
      }
      
      // Function to show correct answers for diagram labeling
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
      
      // Function to display drag-drop question
      function displayDragDropQuestion(question) {
        // Create drag-drop container if it doesn't exist
        let dragDropContainer = document.getElementById('dragDropContainer');
        
        if (!dragDropContainer) {
          dragDropContainer = document.createElement('div');
          dragDropContainer.id = 'dragDropContainer';
          dragDropContainer.className = 'drag-drop-container';
          
          // Insert after question text
          QuizUI.elements.displays.question.parentNode.insertBefore(
            dragDropContainer,
            QuizUI.elements.displays.question.nextSibling
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
      
      // Function to show correct answers for numerical questions
      function showNumericalCorrectAnswer(question) {
        let answerText = `<strong>Correct Answer:</strong> ${question.answer}`;
        
        // Add units if available
        if (question.units) {
          answerText += ` ${question.units}`;
        }
        
        // Add tolerance info if available
        if (question.tolerance) {
          answerText += ` <span class="tolerance-info">(Accepted range: ${question.answer - question.tolerance} to ${question.answer + question.tolerance} ${question.units || ''})</span>`;
        }
        
        // Add explanation if available
        if (question.explanation) {
          answerText += `<br><br><strong>Explanation:</strong> ${Utils.renderMarkdownWithLaTeX(question.explanation)}`;
        }
        
        return answerText;
      }
      
      // Function to show correct answers for ordered list questions
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
      
      // Extend showCorrectAnswer function
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
            if (originalFunctions.showCorrectAnswer) {
              return originalFunctions.showCorrectAnswer(question);
            }
            return false;
        }
        
        // Display the answer
        QuizUI.elements.displays.answerReveal.innerHTML = answerText;
        QuizUI.elements.displays.answerReveal.style.display = 'block';
        
        // Add slide-in animation
        QuizUI.elements.displays.answerReveal.classList.add('answer-reveal-animation');
        
        // Remove animation class after animation completes
        setTimeout(() => {
          QuizUI.elements.displays.answerReveal.classList.remove('answer-reveal-animation');
        }, 500);
        
        return true;
      };
      
      // Extend getUserAnswer function
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
            const numericalInput = document.getElementById('numericalInput');
            return numericalInput ? numericalInput.value.trim() : QuizUI.elements.inputs.answerInput.value.trim();
          default:
            // Use the original function for standard question types
            if (originalFunctions.getUserAnswer) {
              return originalFunctions.getUserAnswer(questionType);
            }
            return null;
        }
      };
    }
    
    /**
     * Add CSS styles for advanced question types
     */
    function addStyles() {
      // Check if styles are already added
      if (document.getElementById('advanced-question-types-styles')) {
        return;
      }
      
      const styleElement = document.createElement('style');
      styleElement.id = 'advanced-question-types-styles';
      styleElement.textContent = `
        ${orderedListStyles}
        ${diagramLabelingStyles}
        ${dragDropStyles}
        ${numericalStyles}
      `;
      
      document.head.appendChild(styleElement);
    }
    
    /**
     * Reset Quiz UI elements
     */
    function resetQuizUI() {
      // Get UI elements from QuizUI
      const elements = QuizUI.elements;
      
      if (!elements) {
        console.warn("Cannot access QuizUI elements for reset");
        return;
      }
      
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
        document.getElementById('numericalContainer'),
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
  
    // Public API
    return {
      initialize,
      // Expose individual question type processors for direct use
      processNumericalQuestion,
      processOrderedListQuestion, 
      processDiagramLabelingQuestion,
      processDragDropQuestion
    };
  })();
  
  // Initialize when the DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Wait for other scripts to load
    setTimeout(AdvancedQuestionTypes.initialize, 100);
  });