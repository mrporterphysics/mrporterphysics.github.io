/**
 * Utility functions for the AP Physics 1 Quiz App
 */

const Utils = (function() {
    /**
     * Shuffles an array using Fisher-Yates algorithm
     * @param {Array} array - The array to shuffle
     * @return {Array} A new shuffled array
     */
    function shuffleArray(array) {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    }
  
    /**
     * Formats a percentage value
     * @param {number} value - The value to format as percentage
     * @return {string} Formatted percentage string
     */
    function formatPercentage(value) {
      return `${Math.round(value)}%`;
    }
  
    /**
     * Checks if two strings are similar (case insensitive, partial match)
     * @param {string} str1 - First string
     * @param {string} str2 - Second string
     * @param {boolean} partial - Whether to allow partial matching
     * @return {boolean} True if strings are similar
     */
    function stringSimilarity(str1, str2, partial = false) {
      if (!str1 || !str2) return false;
      
      str1 = str1.trim().toLowerCase();
      str2 = str2.trim().toLowerCase();
      
      if (str1 === str2) return true;
      
      if (partial && str1.length > 3) {
        return str2.includes(str1) || str1.includes(str2);
      }
      
      return false;
    }
  
    /**
     * Safely gets an element by ID with error handling
     * @param {string} id - The element ID to find
     * @return {HTMLElement|null} The found element or null
     */
    function getElement(id) {
      const element = document.getElementById(id);
      if (!element) {
        console.error(`Element with ID "${id}" not found`);
      }
      return element;
    }
  
    /**
     * Creates and appends an HTML element
     * @param {string} tag - The tag name
     * @param {Object} attributes - Element attributes
     * @param {string} textContent - Text content of the element
     * @param {HTMLElement} parent - Parent element to append to
     * @return {HTMLElement} The created element
     */
    function createElement(tag, attributes = {}, textContent = '', parent = null) {
      const element = document.createElement(tag);
      
      // Set attributes
      for (const [key, value] of Object.entries(attributes)) {
        if (key === 'className') {
          element.className = value;
        } else {
          element.setAttribute(key, value);
        }
      }
      
      // Set text content if provided
      if (textContent) {
        element.textContent = textContent;
      }
      
      // Append to parent if provided
      if (parent) {
        parent.appendChild(element);
      }
      
      return element;
    }
  
    /**
     * Logs debug information if debugging is enabled
     * @param {string} message - Message to log
     * @param {*} data - Optional data to log
     */
    let debugEnabled = false;
    
    function debug(message, data = null) {
      if (debugEnabled) {
        if (data) {
          console.log(`[DEBUG] ${message}`, data);
        } else {
          console.log(`[DEBUG] ${message}`);
        }
      }
    }
  
    /**
     * Enables or disables debug mode
     * @param {boolean} enabled - Whether debug mode should be enabled
     */
    function setDebugMode(enabled) {
      debugEnabled = enabled;
      debug(`Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }
  
    // Public API
    return {
      shuffleArray,
      formatPercentage,
      stringSimilarity,
      getElement,
      createElement,
      debug,
      setDebugMode
    };
  })();