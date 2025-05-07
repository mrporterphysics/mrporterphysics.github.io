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
    
    if (typeof CSVImport !== 'undefined') {
      originalFunctions.parseCSV = CSVImport.parseCSV;
    }
    
    // Patch QuizData functions
    patchQuizDataFunctions();
    
    // Patch QuizUI functions
    patchQuizUIFunctions();
    
    // Patch CSVImport functions
    patchCSVImportFunctions();
    
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
          return QuizUI.elements.inputs.answerInput.value.trim();
        default:
          // Use the original function for standard question types
          if (originalFunctions.getUserAnswer) {
            return originalFunctions.getUserAnswer(questionType);
          }
          return null;
      }
    };
  }
  
  // Patch CSVImport functions to handle new question types
  function patchCSVImportFunctions() {
    if (typeof CSVImport === 'undefined') {
      console.warn("CSVImport not found. Cannot patch CSV import functions.");
      return;
    }
    
    // Extend parseCSV function to handle new question types
    const originalParseCSV = CSVImport.parseCSV;
    CSVImport.parseCSV = function(csvText) {
      // Get standard question types using original function
      const questions = originalParseCSV(csvText);
      
      // Add containers for new question types if they don't exist
      if (!questions.ordered) questions.ordered = [];
      if (!questions.diagram) questions.diagram = [];
      if (!questions.dragdrop) questions.dragdrop = [];
      if (!questions.numerical) questions.numerical = [];
      
      // Process each line for new question types
      const lines = csvText.split('\n').filter(line => line.trim());
      if (lines.length <= 1) return questions; // Just header or empty
      
      const headers = lines[0].split(',').map(header => header.trim());
      
      for (let i = 1; i < lines.length; i++) {
        const values = CSVImport.parseCSVLine ? 
                    CSVImport.parseCSVLine(lines[i]) : 
                    lines[i].split(',');
        
        if (values.length < 3) continue; // Skip if too few values
        
        const questionData = {};
        headers.forEach((header, index) => {
          if (index < values.length) {
            questionData[header] = values[index] || '';
          }
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