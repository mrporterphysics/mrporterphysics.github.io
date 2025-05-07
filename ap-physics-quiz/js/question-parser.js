/**
 * Question Parser for AP Physics 1 Quiz
 * Parses questions from the paste.txt format
 */

const QuestionParser = (function() {
  
    /**
     * Parse the entire paste.txt content
     * @param {string} text - The full text content
     * @return {Object} Parsed questions by type
     */
    function parseQuestions(text) {
      // Create question containers
      const questions = {
        tf: [],      // True/False questions
        fill: [],    // Fill in the blank questions
        mc: [],      // Multiple choice questions
        matching: [] // Matching questions (if implemented)
      };
      
      try {
        // Split by major sections based on ## headers
        const sections = text.split('## ').filter(section => section.trim());
        
        // Process each section based on its type
        sections.forEach(section => {
          const sectionTitle = section.split('\n')[0].trim();
          
          if (sectionTitle.includes('True/False')) {
            questions.tf = parseTrueFalseQuestions(section);
          } 
          else if (sectionTitle.includes('Fill in the Blank')) {
            questions.fill = parseFillInBlankQuestions(section);
          }
          else if (sectionTitle.includes('Multiple Choice')) {
            questions.mc = parseMultipleChoiceQuestions(section);
          }
          else if (sectionTitle.includes('Matching')) {
            questions.matching = parseMatchingQuestions(section);
          }
        });
        
        console.log(`Parsed ${Object.values(questions).flat().length} total questions`);
        return questions;
        
      } catch (error) {
        console.error('Error parsing questions:', error);
        return questions;
      }
    }
    
    /**
     * Parse True/False questions
     * @param {string} sectionText - The True/False section text
     * @return {Array} Array of parsed True/False questions
     */
    function parseTrueFalseQuestions(sectionText) {
      const questions = [];
      const lines = sectionText.split('\n').filter(line => line.trim());
      
      // Skip the section title
      let currentLine = 1;
      
      while (currentLine < lines.length) {
        const line = lines[currentLine];
        
        // Check if this line contains a question
        if (/^\d+\./.test(line)) {
          const questionNumber = parseInt(line.match(/^(\d+)\./)[1]);
          const questionText = line.replace(/^\d+\.\s*/, '').trim();
          
          // Check if it contains "True or False" and extract the statement
          if (questionText.toLowerCase().includes('true or false:')) {
            const statement = questionText.replace(/true or false:\s*/i, '').trim();
            
            // Determine the answer (looking for the keyword "false" since most statements are true)
            // This is a heuristic and may need adjustment based on your data
            const answer = statement.toLowerCase().includes('always') || 
                           statement.toLowerCase().includes('never') || 
                           statement.toLowerCase().includes('only') ? 
                           'false' : 'true';
            
            // Add the question to the array
            questions.push({
              id: questionNumber,
              question: `True or False: ${statement}`,
              answer: answer,
              topic: determineTopic(statement),
              explanation: generateExplanation(statement, answer)
            });
          }
        }
        
        currentLine++;
      }
      
      return questions;
    }
    
    /**
     * Parse Fill in the Blank questions
     * @param {string} sectionText - The Fill in the Blank section text
     * @return {Array} Array of parsed Fill in the Blank questions
     */
    function parseFillInBlankQuestions(sectionText) {
      const questions = [];
      const lines = sectionText.split('\n').filter(line => line.trim());
      
      // Skip the section title
      let currentLine = 1;
      
      while (currentLine < lines.length) {
        const line = lines[currentLine];
        
        // Check if this line contains a question
        if (/^\d+\./.test(line)) {
          const questionNumber = parseInt(line.match(/^(\d+)\./)[1]);
          const questionText = line.replace(/^\d+\.\s*/, '').trim();
          
          // Check if it contains blanks (underscores)
          if (questionText.includes('__________')) {
            // For simplicity, we'll assume the answer is a placeholder
            // In a real implementation, you would need to provide the answers
            
            questions.push({
              id: questionNumber,
              question: questionText,
              answer: "[Answer for question " + questionNumber + "]",
              alternateAnswers: [],
              topic: determineTopic(questionText),
              explanation: "Explanation would go here."
            });
          }
        }
        
        currentLine++;
      }
      
      return questions;
    }
    
    /**
     * Parse Multiple Choice questions
     * @param {string} sectionText - The Multiple Choice section text
     * @return {Array} Array of parsed Multiple Choice questions
     */
    function parseMultipleChoiceQuestions(sectionText) {
      const questions = [];
      const lines = sectionText.split('\n').filter(line => line.trim());
      
      // Skip the section title
      let currentLine = 1;
      let currentQuestion = null;
      let currentOptions = [];
      
      while (currentLine < lines.length) {
        const line = lines[currentLine];
        
        // Check if this line contains a question
        if (/^\d+\./.test(line)) {
          // If we were building a previous question, save it first
          if (currentQuestion && currentOptions.length > 0) {
            // Assume the first option is correct for demonstration
            // In a real implementation, you need to determine the correct answer
            questions.push({
              id: currentQuestion.id,
              question: currentQuestion.text,
              options: currentOptions,
              answer: "A", // Placeholder - would need actual answer
              topic: determineTopic(currentQuestion.text),
              explanation: "Explanation would go here."
            });
            
            // Reset for new question
            currentOptions = [];
          }
          
          const questionNumber = parseInt(line.match(/^(\d+)\./)[1]);
          const questionText = line.replace(/^\d+\.\s*/, '').trim();
          
          currentQuestion = {
            id: questionNumber,
            text: questionText
          };
        }
        // Check if this line contains an option
        else if (/^\s*[A-D]\)/.test(line)) {
          const optionLabel = line.match(/^\s*([A-D])\)/)[1];
          const optionText = line.replace(/^\s*[A-D]\)\s*/, '').trim();
          
          currentOptions.push({
            label: optionLabel,
            text: optionText
          });
        }
        
        currentLine++;
      }
      
      // Don't forget to add the last question
      if (currentQuestion && currentOptions.length > 0) {
        questions.push({
          id: currentQuestion.id,
          question: currentQuestion.text,
          options: currentOptions,
          answer: "A", // Placeholder
          topic: determineTopic(currentQuestion.text),
          explanation: "Explanation would go here."
        });
      }
      
      return questions;
    }
    
    /**
     * Parse Matching questions (if implemented)
     * @param {string} sectionText - The Matching section text
     * @return {Array} Array of parsed Matching questions
     */
    function parseMatchingQuestions(sectionText) {
      // This would be implemented based on your matching question format
      return [];
    }
    
    /**
     * Determine the topic of a question based on keywords
     * @param {string} text - The question text
     * @return {string} The determined topic
     */
    function determineTopic(text) {
      text = text.toLowerCase();
      
      if (text.includes('velocity') || text.includes('acceleration') || text.includes('displacement') || 
          text.includes('motion') || text.includes('projectile')) {
        return 'kinematics';
      }
      else if (text.includes('force') || text.includes('newton') || text.includes('friction') || 
               text.includes('equilibrium')) {
        return 'forces';
      }
      else if (text.includes('energy') || text.includes('work') || text.includes('power') || 
               text.includes('joule') || text.includes('watt')) {
        return 'energy';
      }
      else if (text.includes('momentum') || text.includes('impulse') || text.includes('collision')) {
        return 'momentum';
      }
      else if (text.includes('rotation') || text.includes('torque') || text.includes('angular') || 
               text.includes('moment of inertia')) {
        return 'rotation';
      }
      else if (text.includes('gravity') || text.includes('gravitational') || text.includes('orbit') || 
               text.includes('planet')) {
        return 'gravitation';
      }
      else if (text.includes('harmonic') || text.includes('oscillation') || text.includes('pendulum') || 
               text.includes('spring')) {
        return 'shm';
      }
      else if (text.includes('fluid') || text.includes('pressure') || text.includes('density') || 
               text.includes('buoyancy') || text.includes('bernoulli')) {
        return 'fluids';
      }
      
      return 'general'; // Default topic
    }
    
    /**
     * Generate a simple explanation for True/False questions
     * This is just a placeholder - real explanations would be better
     */
    function generateExplanation(statement, answer) {
      if (answer === 'true') {
        return `This statement is correct: ${statement}`;
      } else {
        return `This statement is incorrect. The correct understanding is that the opposite is true.`;
      }
    }
    
    // Public API
    return {
      parseQuestions
    };
  })();
  
  // Usage example in quiz-data.js:
  /*
  function loadFullQuestionSet() {
    Utils.debug('Loading full question set from paste.txt');
    
    // Fetch the paste.txt file
    return fetch('data/paste.txt')
      .then(response => response.text())
      .then(text => {
        const parsedQuestions = QuestionParser.parseQuestions(text);
        
        // Add the parsed questions to quizData
        for (const type in parsedQuestions) {
          if (parsedQuestions[type].length > 0) {
            parsedQuestions[type].forEach(question => {
              question.type = type;
              quizData[type].push(question);
            });
          }
        }
        
        // Update all questions array
        allQuestions = [
          ...quizData.tf,
          ...quizData.fill,
          ...quizData.mc
        ];
        
        Utils.debug('Full question set loaded', { count: allQuestions.length });
        return allQuestions.length;
      })
      .catch(error => {
        console.error('Error loading questions:', error);
        // Fallback to extended questions if loading fails
        return loadExtendedQuestions();
      });
  }
  */