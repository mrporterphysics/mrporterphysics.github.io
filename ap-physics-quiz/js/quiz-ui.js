/**
 * Quiz UI - Handles UI interactions and display for AP Physics 1 Quiz App
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
    
    // Setup UI elements
    function setup() {
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
      
      Utils.debug('UI elements initialized');
      return true;
    }
    
    // Show a specific panel and hide others
    function showPanel(panelName) {
      for (const name in elements.panels) {
        elements.panels[name].style.display = name === panelName ? 'block' : 'none';
      }
      Utils.debug(`Showing panel: ${panelName}`);
    }
    
    // Display a question
    function displayQuestion(question, index, total) {
      if (!question) {
        Utils.debug('No question provided to display');
        return false;
      }
      
      // Update question number
      elements.displays.currentQuestion.textContent = index + 1;
      elements.displays.totalQuestions.textContent = total;
      
      // Display question text
      elements.displays.question.textContent = question.question;
      
      // Reset UI
      elements.inputs.tfOptions.style.display = 'none';
      elements.inputs.answerInput.style.display = 'none';
      elements.inputs.mcOptions.style.display = 'none';
      elements.inputs.mcOptions.innerHTML = '';
      elements.displays.feedback.textContent = '';
      elements.displays.feedback.className = 'quiz-feedback';
      elements.displays.answerReveal.style.display = 'none';
      
      // Set up appropriate input method based on question type
      if (question.type === 'tf') {
        displayTrueFalseQuestion(question);
      } else if (question.type === 'fill') {
        displayFillQuestion(question);
      } else if (question.type === 'mc') {
        displayMultipleChoiceQuestion(question);
      }
      
      Utils.debug('Question displayed', { id: question.id, type: question.type });
      return true;
    }
    
    // Display a true/false question
    function displayTrueFalseQuestion(question) {
      elements.inputs.tfOptions.style.display = 'block';
      elements.inputs.tfOptions.querySelectorAll('.choice-item').forEach(opt => {
        opt.classList.remove('selected');
      });
    }
    
    // Display a fill-in-the-blank question
    function displayFillQuestion(question) {
      elements.inputs.answerInput.style.display = 'block';
      elements.inputs.answerInput.value = '';
      elements.inputs.answerInput.focus();
    }
    
    // Display a multiple-choice question
    function displayMultipleChoiceQuestion(question) {
      elements.inputs.mcOptions.style.display = 'block';
      
      // Create option elements
      question.options.forEach(option => {
        const optionElement = Utils.createElement('div', {
          className: 'choice-item',
          'data-answer': option.label
        }, '', elements.inputs.mcOptions);
        
        Utils.createElement('strong', {}, `${option.label}.`, optionElement);
        Utils.createElement('span', { className: 'mc-text' }, option.text, optionElement);
      });
    }
    
    // Show feedback for an answer
    function showAnswerFeedback(isCorrect) {
      elements.displays.feedback.textContent = isCorrect ? 'Correct!' : 'Incorrect';
      elements.displays.feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
      return true;
    }
    
    // Show the correct answer
    function showCorrectAnswer(question) {
      if (!question) {
        Utils.debug('No question provided for showing answer');
        return false;
      }
      
      // Build answer text
      let answerText = `<strong>Correct Answer:</strong> `;
      
      if (question.type === 'tf') {
        answerText += question.answer === 'true' ? 'True' : 'False';
      } else if (question.type === 'fill') {
        answerText += question.answer;
      } else if (question.type === 'mc') {
        const option = question.options.find(opt => opt.label === question.answer);
        answerText += `${question.answer}. ${option.text}`;
      }
      
      // Add explanation if available
      if (question.explanation) {
        answerText += `<br><br><strong>Explanation:</strong> ${question.explanation}`;
      }
      
      // Display answer
      elements.displays.answerReveal.innerHTML = answerText;
      elements.displays.answerReveal.style.display = 'block';
      
      Utils.debug('Showing correct answer', { id: question.id });
      return true;
    }
    
    // Update progress display
    function updateProgress(questionsAnswered, totalQuestions, correctCount, incorrectCount) {
      // Update counters
      elements.displays.correctCount.textContent = correctCount;
      elements.displays.incorrectCount.textContent = incorrectCount;
      
      // Calculate and update accuracy
      const accuracy = totalQuestions > 0 ? Math.round((correctCount / questionsAnswered) * 100) : 0;
      elements.displays.accuracyRate.textContent = Utils.formatPercentage(accuracy);
      
      // Update progress bar
      const progress = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0;
      elements.displays.progressFill.style.width = Utils.formatPercentage(progress);
      elements.displays.progressFill.textContent = Utils.formatPercentage(progress);
      
      Utils.debug('Progress updated', { questionsAnswered, totalQuestions, correctCount, incorrectCount });
      return true;
    }
    
    // Display results at the end of the quiz
    function showResults(correctCount, totalQuestions, missedQuestions) {
      // Update results display
      elements.displays.finalCorrect.textContent = correctCount;
      elements.displays.finalTotal.textContent = totalQuestions;
      
      // Show missed questions if any
      if (missedQuestions && missedQuestions.length > 0) {
        elements.displays.missedQuestionsSection.style.display = 'block';
        elements.displays.missedQuestions.innerHTML = '';
        
        // Create a div for each missed question
        missedQuestions.forEach(question => {
          const missedQuestionDiv = Utils.createElement('div', {
            className: 'missed-question'
          }, '', elements.displays.missedQuestions);
          
          // Question text
          Utils.createElement('div', {}, `<strong>Question:</strong> ${question.question}`, missedQuestionDiv);
          
          // Answer text
          let answerText = `<strong>Correct Answer:</strong> `;
          if (question.type === 'tf') {
            answerText += question.answer === 'true' ? 'True' : 'False';
          } else if (question.type === 'fill') {
            answerText += question.answer;
          } else if (question.type === 'mc') {
            const option = question.options.find(opt => opt.label === question.answer);
            answerText += `${question.answer}. ${option.text}`;
          }
          
          Utils.createElement('div', {
            className: 'missed-answer'
          }, answerText, missedQuestionDiv);
          
          // Explanation if available
          if (question.explanation) {
            Utils.createElement('div', {
              className: 'missed-explanation'
            }, question.explanation, missedQuestionDiv);
          }
        });
      } else {
        elements.displays.missedQuestionsSection.style.display = 'none';
      }
      
      // Show/hide review missed button
      elements.buttons.reviewMissed.style.display = 
        missedQuestions && missedQuestions.length > 0 ? 'inline-block' : 'none';
      
      // Show results panel
      showPanel('results');
      
      Utils.debug('Showing results', { correctCount, totalQuestions, missedQuestions });
      return true;
    }
    
    // Get the selected topic, question type, and mode
    function getSelections() {
      const selections = {
        questionType: 'all',
        topic: 'all',
        mode: 'test'
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
      } else if (questionType === 'mc') {
        const selectedOption = elements.inputs.mcOptions.querySelector('.choice-item.selected');
        if (selectedOption) {
          userAnswer = selectedOption.getAttribute('data-answer');
        }
      }
      
      return userAnswer;
    }
    
    // Attach event handlers for a specific question type
    function attachQuestionTypeHandlers(questionType, callback) {
      if (questionType === 'tf') {
        elements.inputs.tfOptions.querySelectorAll('.choice-item').forEach(option => {
          option.addEventListener('click', function() {
            // Clear previous selections
            elements.inputs.tfOptions.querySelectorAll('.choice-item').forEach(opt => {
              opt.classList.remove('selected');
            });
            
            // Select this option
            this.classList.add('selected');
            
            // Call callback if provided
            if (typeof callback === 'function') {
              const answer = this.getAttribute('data-answer');
              callback(answer);
            }
          });
        });
      } else if (questionType === 'mc') {
        elements.inputs.mcOptions.querySelectorAll('.choice-item').forEach(option => {
          option.addEventListener('click', function() {
            // Clear previous selections
            elements.inputs.mcOptions.querySelectorAll('.choice-item').forEach(opt => {
              opt.classList.remove('selected');
            });
            
            // Select this option
            this.classList.add('selected');
            
            // Call callback if provided
            if (typeof callback === 'function') {
              const answer = this.getAttribute('data-answer');
              callback(answer);
            }
          });
        });
      }
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
      elements
    };
  })();