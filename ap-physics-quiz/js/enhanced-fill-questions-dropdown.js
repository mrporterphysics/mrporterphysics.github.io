/**
 * Enhanced Fill-in-the-Blank Questions with Dropdown Implementation
 * 
 * This implementation converts all fill-in-the-blank questions to use
 * dropdown selection menus instead of text input fields.
 * Balanced fix that properly cleans up without removing new dropdowns.
 */

// Wrap everything in an IIFE that waits for document and all scripts to load
(function() {
  // Initialize only after all scripts are loaded
  function initializeDropdowns() {
    // Check if QuizUI is defined and has the necessary methods
    if (typeof QuizUI === 'undefined' || typeof QuizUI.displayQuestion !== 'function') {
      console.error('Enhanced dropdowns: QuizUI not fully loaded. Will retry in 500ms.');
      setTimeout(initializeDropdowns, 500);
      return;
    }

    console.log('Enhanced dropdowns: QuizUI detected, initializing enhanced fill-in-blank dropdowns.');
    
    // Store original functions to extend them
    const originalDisplayQuestion = QuizUI.displayQuestion;
    const originalAttachHandlers = QuizUI.attachQuestionTypeHandlers;
    const originalGetUserAnswer = QuizUI.getUserAnswer;
    
    // Also make sure QuizData is available
    let originalCheckAnswer = null;
    if (typeof QuizData !== 'undefined' && typeof QuizData.checkAnswer === 'function') {
      originalCheckAnswer = QuizData.checkAnswer;
    } else {
      console.warn('Enhanced dropdowns: QuizData.checkAnswer not available. Some features may be limited.');
    }
    
    // Current mode for detecting learning mode
    let currentMode = 'test';
    // Track current dropdown container to avoid removing it
    let currentDropdownId = null;
    
    // Override the display question function
    QuizUI.displayQuestion = function(question, index, total) {
      // For fill-in-blank questions, use dropdown display
      if (question && question.type === 'fill') {
        try {
          // First update question number and total
          if (typeof index !== 'undefined' && typeof total !== 'undefined') {
            this.elements.displays.currentQuestion.textContent = index + 1;
            this.elements.displays.totalQuestions.textContent = total;
          }
          
          // Display question text with LaTeX rendering
          this.elements.displays.question.innerHTML = Utils.renderMarkdownWithLaTeX(question.question);
          
          // Reset UI elements
          this.elements.inputs.tfOptions.style.display = 'none';
          this.elements.inputs.mcOptions.style.display = 'none';
          this.elements.inputs.mcOptions.innerHTML = '';
          this.elements.displays.feedback.textContent = '';
          this.elements.displays.feedback.className = 'quiz-feedback';
          this.elements.displays.answerReveal.style.display = 'none';
          
          // Clear any previous image
          if (this.elements.displays.imageContainer) {
            this.elements.displays.imageContainer.innerHTML = '';
            this.elements.displays.imageContainer.style.display = 'none';
          }
          
          // Hide standard input
          this.elements.inputs.answerInput.style.display = 'none';
          
          // Important: Clear old dropdowns BEFORE creating a new one
          clearOldDropdowns();
          
          // Display as dropdown
          displayDropdownQuestion(question);
          
          return true;
        } catch (error) {
          console.error('Error in enhanced displayQuestion:', error);
          // Fall back to original display function on error
          return originalDisplayQuestion.call(this, question, index, total);
        }
      } else {
        // For other question types, use the original display function but clear old dropdowns first
        clearOldDropdowns();
        return originalDisplayQuestion.call(this, question, index, total);
      }
    };
    
    // Function to clear old dropdowns, but preserve the current one
    function clearOldDropdowns() {
      const allDropdowns = document.querySelectorAll('.fill-dropdown-container');
      let removedCount = 0;
      
      allDropdowns.forEach(dropdown => {
        // Skip the current dropdown if we're tracking it
        if (currentDropdownId && dropdown.id === currentDropdownId) {
          console.log(`Keeping current dropdown: ${currentDropdownId}`);
          return;
        }
        
        if (dropdown && dropdown.parentNode) {
          dropdown.parentNode.removeChild(dropdown);
          removedCount++;
        }
      });
      
      if (removedCount > 0) {
        console.log(`Cleared ${removedCount} old dropdown containers`);
      }
    }
    
    // Override the attach handlers function
    QuizUI.attachQuestionTypeHandlers = function(questionType, callback) {
      if (questionType === 'fill') {
        try {
          // Get dropdown element if it exists
          const dropdown = document.getElementById('fillDropdown');
          if (dropdown) {
            // Add change event listener
            dropdown.addEventListener('change', function() {
              // Update hidden answerInput with dropdown value
              QuizUI.elements.inputs.answerInput.value = this.value;
              
              // In learning mode, check answer immediately on change
              if (currentMode === 'learn' && typeof callback === 'function') {
                callback(this.value);
              }
            });
          }
          
          // Get submit button if available and attach handler
          const submitBtn = document.getElementById('fillSubmitBtn');
          if (submitBtn) {
            // Remove existing event listeners to prevent duplicates
            const newBtn = submitBtn.cloneNode(true);
            submitBtn.parentNode.replaceChild(newBtn, submitBtn);
            
            // Add click event listener to the new button
            newBtn.addEventListener('click', function(event) {
              console.log("Submit button clicked");
              event.preventDefault();
              
              // Get the dropdown value
              const dropdown = document.getElementById('fillDropdown');
              const userAnswer = dropdown ? dropdown.value : '';
              
              // Update hidden input with dropdown value
              QuizUI.elements.inputs.answerInput.value = userAnswer;
              
              // Call the callback function to check the answer
              if (typeof callback === 'function') {
                callback(userAnswer);
              } else {
                // If callback not available, try to trigger answer checking through the UI
                const showAnswerBtn = document.getElementById('showAnswer');
                if (showAnswerBtn) {
                  showAnswerBtn.click();
                }
              }
            });
          }
        } catch (error) {
          console.error('Error in enhanced attachQuestionTypeHandlers:', error);
          // Fall back to original handler on error
          return originalAttachHandlers.call(this, questionType, callback);
        }
      } else {
        // For other question types, use the original handler function
        return originalAttachHandlers.call(this, questionType, callback);
      }
    };
    
    // Override the getUserAnswer function to handle our custom inputs
    QuizUI.getUserAnswer = function(questionType) {
      if (questionType === 'fill') {
        try {
          // Check for dropdown element
          const dropdown = document.getElementById('fillDropdown');
          if (dropdown) {
            return dropdown.value;
          }
          
          // Fall back to the hidden answerInput
          return this.elements.inputs.answerInput.value.trim();
        } catch (error) {
          console.error('Error in enhanced getUserAnswer:', error);
          // Fall back to original function on error
          return originalGetUserAnswer.call(this, questionType);
        }
      } else {
        // For other question types, use the original approach
        return originalGetUserAnswer.call(this, questionType);
      }
    };
    
    // Extend checkAnswer to ensure proper handling of alternate answers
    // Only if QuizData is available
    if (originalCheckAnswer) {
      QuizData.checkAnswer = function(question, userAnswer) {
        if (!question || userAnswer === null || userAnswer === undefined) {
          return false;
        }
        
        if (question.type === 'fill') {
          try {
            // For fill-in-the-blank questions, do special handling
            userAnswer = String(userAnswer).trim().toLowerCase();
            
            // Direct match with main answer
            if (userAnswer === String(question.answer).toLowerCase()) {
              return true;
            }
            
            // Check alternate answers if available
            if (question.alternateAnswers) {
              // Handle both array and string formats
              const alternates = Array.isArray(question.alternateAnswers) 
                ? question.alternateAnswers 
                : question.alternateAnswers.split(',');
                
              // Check each alternate answer
              for (let alt of alternates) {
                if (alt && userAnswer === alt.trim().toLowerCase()) {
                  return true;
                }
              }
            }
            
            return false;
          } catch (error) {
            console.error('Error in enhanced checkAnswer:', error);
            // Fall back to original function on error
            return originalCheckAnswer.call(this, question, userAnswer);
          }
        } else {
          // For other question types, use the original function
          return originalCheckAnswer.call(this, question, userAnswer);
        }
      };
    }
    
    /**
     * Display a fill-in-blank question with dropdown
     * @param {Object} question - The question object
     */
    function displayDropdownQuestion(question) {
      // Create container with a unique ID based on the question ID if available
      const containerId = `fill-dropdown-container-${question.id || Math.random().toString(36).substr(2, 9)}`;
      const container = document.createElement('div');
      container.className = 'fill-dropdown-container';
      container.id = containerId;
      
      // Update current dropdown ID tracking
      currentDropdownId = containerId;
      
      // Create dropdown
      const select = document.createElement('select');
      select.id = 'fillDropdown';
      select.className = 'fill-dropdown-select';
      
      // Add placeholder option
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = '-- Select your answer --';
      placeholder.selected = true;
      placeholder.disabled = true;
      select.appendChild(placeholder);
      
      // Collect all options from the question object
      const options = [];
      
      // Add the correct answer as an option
      options.push(question.answer);
      
      // Add alternate answers if available
      if (question.alternateAnswers) {
        // Handle both array and string formats
        const alternates = Array.isArray(question.alternateAnswers) 
          ? question.alternateAnswers 
          : String(question.alternateAnswers).split(',');
          
        for (let alt of alternates) {
          if (alt && typeof alt === 'string' && alt.trim() !== '') {
            options.push(alt.trim());
          }
        }
      }
      
      // Add provided options from optionA-optionE if available
      for (let i = 0; i < 5; i++) {
        const letter = String.fromCharCode(65 + i); // A, B, C, D, E
        const optionKey = `option${letter}`;
        
        if (question[optionKey] && question[optionKey] !== question.answer && 
            !options.includes(question[optionKey])) {
          options.push(question[optionKey]);
        }
      }
      
      // Make sure we have at least 4-5 options
      if (options.length < 4) {
        // Add domain-specific distractor options based on the question type
        const additionalOptions = generateOptions(question);
        
        // Add only the options we don't already have
        for (const option of additionalOptions) {
          if (!options.includes(option)) {
            options.push(option);
            if (options.length >= 5) break;
          }
        }
      }
      
      // Remove duplicates and shuffle
      const uniqueOptions = [...new Set(options)];
      const shuffledOptions = Utils.shuffleArray(uniqueOptions);
      
      // Add options to dropdown
      shuffledOptions.forEach(option => {
        if (!option) return; // Skip empty options
        
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
      });
      
      // Create submit button
      const submitBtn = document.createElement('button');
      submitBtn.id = 'fillSubmitBtn';
      submitBtn.className = 'btn fill-submit-btn';
      submitBtn.textContent = 'Submit';
      submitBtn.type = 'button'; // Explicitly set type to button to avoid form submission
      
      // Add elements to container
      container.appendChild(select);
      container.appendChild(submitBtn);
      
      // Add container after question text
      const questionElement = QuizUI.elements.displays.question;
      if (questionElement && questionElement.parentNode) {
        questionElement.parentNode.insertBefore(container, questionElement.nextSibling);
      } else {
        console.error('Question element or parent not found for adding dropdown');
        // Try adding to quiz area as fallback
        const quizArea = document.querySelector('.quiz-area');
        if (quizArea) {
          quizArea.appendChild(container);
        }
      }
      
      // Update hidden answerInput value when dropdown changes
      select.addEventListener('change', function() {
        if (QuizUI.elements.inputs.answerInput) {
          QuizUI.elements.inputs.answerInput.value = this.value;
        }
      });
      
      // Add direct event handler for the submit button
      submitBtn.addEventListener('click', function(event) {
        event.preventDefault();
        console.log("Submit button clicked (direct handler)");
        
        // Update the hidden input with dropdown value
        if (QuizUI.elements.inputs.answerInput) {
          QuizUI.elements.inputs.answerInput.value = select.value;
        }
        
        // Try different approaches to trigger answer checking
        
        // Approach 1: Try to find showAnswer button and click it
        const showAnswerBtn = document.getElementById('showAnswer');
        if (showAnswerBtn) {
          console.log("Clicking show answer button");
          showAnswerBtn.click();
          return;
        }
        
        // Approach 2: Try to find PhysicsQuizApp and use its function
        if (typeof window.PhysicsQuizApp !== 'undefined' && 
            typeof window.PhysicsQuizApp.checkAnswer === 'function') {
          console.log("Using PhysicsQuizApp.checkAnswer");
          window.PhysicsQuizApp.checkAnswer();
          return;
        }
        
        // Approach 3: If all else fails, try next question button
        const nextButton = document.getElementById('nextQuestion');
        if (nextButton) {
          console.log("Clicking next question button");
          nextButton.click();
          return;
        }
        
        console.warn("Could not find a way to trigger answer checking");
      });
    }
    
    /**
     * Generate plausible wrong options for fill-in-blank questions
     * @param {Object} question - The question object
     * @return {Array} Array of plausible options
     */
    function generateOptions(question) {
      const answer = question.answer;
      const topic = question.topic;
      const options = [];
      
      // Domain-specific options based on physics topics
      const topicBasedOptions = {
        'kinematics': ['velocity', 'position', 'distance', 'time', 'displacement', 'speed', 'acceleration'],
        'forces': ['mass', 'weight', 'normal force', 'friction', 'tension', 'gravity', 'air resistance'],
        'energy': ['kinetic energy', 'potential energy', 'work', 'power', 'heat', 'mechanical energy', 'thermal energy'],
        'momentum': ['impulse', 'collision', 'conservation', 'elastic', 'inelastic', 'recoil'],
        'rotation': ['torque', 'moment of inertia', 'angular velocity', 'angular acceleration', 'angular momentum', 'centripetal force'],
        'gravitation': ['gravitational field', 'orbit', 'satellite', 'planet', 'mass', 'distance', 'G'],
        'shm': ['amplitude', 'frequency', 'period', 'oscillation', 'displacement', 'restoring force'],
        'fluids': ['pressure', 'density', 'flow rate', 'buoyancy', 'Archimedes', 'viscosity']
      };
      
      // Get topic-specific options
      if (topic && topicBasedOptions[topic]) {
        options.push(...topicBasedOptions[topic].slice(0, 3));
      }
      
      // Special cases based on answer type
      
      // For equations
      if (answer && answer.includes && answer.includes('=')) {
        if (answer.includes('F = ma')) {
          options.push('F = mv');
          options.push('F = mv²');
          options.push('F = m/a');
        } else if (answer.includes('½mv²')) {
          options.push('mv²');
          options.push('mv');
          options.push('m²v');
        } else if (answer.includes('mgh')) {
          options.push('mg');
          options.push('mh');
          options.push('m²gh');
        }
      }
      
      // For angular measures
      if (answer && answer.includes) {
        if (answer.includes('sin')) {
          options.push(answer.replace('sin', 'cos'));
          options.push(answer.replace('sin', 'tan'));
        } else if (answer.includes('cos')) {
          options.push(answer.replace('cos', 'sin'));
          options.push(answer.replace('cos', 'tan'));
        }
      }
      
      // For directional answers
      if (answer === 'away') {
        options.push('toward');
        options.push('perpendicular to');
      } else if (answer === 'opposite') {
        options.push('same as');
        options.push('perpendicular to');
      } else if (answer === 'parallel') {
        options.push('perpendicular');
        options.push('tangential');
      }
      
      // For numerical answers
      if (answer && /^\d+(\.\d+)?$/.test(answer)) {
        // Generate numbers around the correct answer
        const numAnswer = parseFloat(answer);
        options.push(String(numAnswer * 0.5)); // Half
        options.push(String(numAnswer * 2));   // Double
        options.push(String(numAnswer + 1));   // Plus one
      }
      
      // For physical constants
      if (answer && answer.includes && answer.includes('10⁻¹¹')) {
        options.push('6.7 × 10⁻¹²');
        options.push('6.7 × 10⁻¹⁰');
      }
      
      // For units
      if (answer === 'm/s²') {
        options.push('m/s');
        options.push('kg·m/s²');
        options.push('N·s');
      } else if (answer === 'joules') {
        options.push('watts');
        options.push('newtons');
        options.push('pascal');
      } else if (answer === 'kg·m/s') {
        options.push('kg·m/s²');
        options.push('kg·m²/s');
        options.push('N·m');
      }
      
      // General wrong answers for physics
      const generalOptions = [
        'velocity', 'force', 'energy', 'momentum', 'mass', 'weight',
        'distance', 'displacement', 'acceleration', 'speed', 'power',
        'time', 'pressure', 'volume', 'density', 'temperature'
      ];
      
      // Add some general options if we don't have enough
      if (options.length < 5) {
        options.push(...generalOptions.slice(0, 5 - options.length));
      }
      
      return options;
    }
    
    // Add CSS for dropdown elements
    function addStyles() {
      // Check if styles already exist
      if (document.getElementById('fill-dropdown-styles')) {
        return;
      }
      
      const styleElement = document.createElement('style');
      styleElement.id = 'fill-dropdown-styles';
      styleElement.textContent = `
        /* Fill-in-blank dropdown styles */
        .fill-dropdown-container {
          margin: 15px 0;
          background-color: var(--bg-2, #f8f9fa);
          border-radius: 8px;
          padding: 15px;
          border: 1px solid var(--ui, #dee2e6);
          transition: background-color 0.3s, border-color 0.3s;
        }
        
        .fill-dropdown-select {
          width: 100%;
          padding: 12px 15px;
          font-size: 1em;
          border: 1px solid var(--ui, #dee2e6);
          border-radius: 5px;
          background-color: var(--bg, #ffffff);
          color: var(--tx, #212529);
          margin-bottom: 10px;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          font-family: 'Courier New', monospace;
        }
        
        .fill-dropdown-select:focus {
          border-color: var(--accent-primary, #3498db);
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }
        
        .fill-dropdown-select option {
          padding: 10px;
          font-family: 'Courier New', monospace;
        }
        
        /* Submit button styles */
        .fill-submit-btn {
          background-color: var(--accent-primary, #3498db);
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
          font-size: 1em;
          width: 100%;
        }
        
        .fill-submit-btn:hover {
          background-color: var(--accent-secondary, #2980b9);
          transform: translateY(-1px);
        }
        
        .fill-submit-btn:active {
          transform: translateY(1px);
        }
        
        /* Dropdown hover effect */
        .fill-dropdown-select:hover {
          border-color: var(--accent-primary, #3498db);
        }
        
        /* Animation for the dropdown */
        @keyframes dropdown-pulse {
          0% { border-color: var(--ui, #dee2e6); }
          50% { border-color: var(--accent-primary, #3498db); }
          100% { border-color: var(--ui, #dee2e6); }
        }
        
        .fill-dropdown-select.pulse {
          animation: dropdown-pulse 2s infinite;
        }
        
        /* Dark mode adjustments */
        [data-theme="dark"] .fill-dropdown-container {
          background-color: var(--ui, #343a40);
          border-color: var(--ui-2, #495057);
        }
        
        [data-theme="dark"] .fill-dropdown-select {
          background-color: var(--bg-2, #212529);
          border-color: var(--ui-2, #495057);
          color: var(--tx, #f8f9fa);
        }
        
        /* Responsive adjustments */
        @media (max-width: 600px) {
          .fill-dropdown-select {
            font-size: 0.9em;
            padding: 10px;
          }
          
          .fill-submit-btn {
            padding: 10px 15px;
            font-size: 0.9em;
          }
        }
      `;
      
      document.head.appendChild(styleElement);
    }
    
    // Get current mode from the app
    function getCurrentMode() {
      const modeOptions = document.querySelectorAll('.mode-option');
      let mode = 'test'; // Default mode
      
      modeOptions.forEach(option => {
        if (option.classList.contains('active')) {
          mode = option.getAttribute('data-mode');
        }
      });
      
      return mode;
    }
    
    // Add styles
    addStyles();
    
    // Intercept the Next Question button to properly handle dropdown cleaning
    const nextQuestionBtn = document.getElementById('nextQuestion');
    if (nextQuestionBtn) {
      const originalClickHandler = nextQuestionBtn.onclick;
      
      nextQuestionBtn.addEventListener('click', function(event) {
        // We will NOT clear dropdowns here - let the displayQuestion function handle it
        console.log("Next Question clicked - new question will be displayed soon");
        
        // Not calling original click handler - allow normal event flow
      }, true); // Use capturing phase to run before other handlers
    }
    
    // Check for current mode
    currentMode = getCurrentMode();
    
    // Add listeners for mode changes
    const modeOptions = document.querySelectorAll('.mode-option');
    modeOptions.forEach(option => {
      option.addEventListener('click', function() {
        currentMode = this.getAttribute('data-mode');
      });
    });
    
    // Add global event delegation handler for submit buttons
    // This helps catch dynamically created submit buttons
    document.addEventListener('click', function(event) {
      if (event.target && event.target.id === 'fillSubmitBtn') {
        event.preventDefault();
        console.log('Submit button click detected via global handler');
        
        // Get the dropdown value
        const dropdown = document.getElementById('fillDropdown');
        const userAnswer = dropdown ? dropdown.value : '';
        
        // Update hidden input
        if (QuizUI && QuizUI.elements && QuizUI.elements.inputs) {
          QuizUI.elements.inputs.answerInput.value = userAnswer;
        }
        
        // Try to trigger answer checking
        const showAnswerBtn = document.getElementById('showAnswer');
        if (showAnswerBtn) {
          showAnswerBtn.click();
        }
      }
    });
    
    console.log('Enhanced Fill Question Dropdown module initialized');
  }

  // Try to initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Wait a bit after DOM is loaded to make sure all other scripts have run
      setTimeout(initializeDropdowns, 500);
    });
  } else {
    // DOM already loaded, wait a bit and initialize
    setTimeout(initializeDropdowns, 500);
  }
})();