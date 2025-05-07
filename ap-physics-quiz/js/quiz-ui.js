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