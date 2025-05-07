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