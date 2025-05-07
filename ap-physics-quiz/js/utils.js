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
      if (textContent.includes('$') || textContent.includes('#') || textContent.includes('_')) {
        // If the text might contain LaTeX or Markdown, use innerHTML with rendering
        element.innerHTML = renderMarkdownWithLaTeX(textContent);
      } else {
        element.textContent = textContent;
      }
    }
    
    // Append to parent if provided
    if (parent) {
      parent.appendChild(element);
    }
    
    return element;
  }

  /**
   * Enhanced function to convert Markdown with LaTeX to HTML
   * @param {string} text - Text containing Markdown and LaTeX
   * @return {string} Processed HTML
   */
  function renderMarkdownWithLaTeX(text) {
    if (!text) return '';
    
    // Check if the required libraries are loaded
    if (typeof marked === 'undefined') {
      console.warn('Markdown library not loaded. Loading marked...');
      return text;
    }
    
    try {
      // First convert LaTeX delimiters to placeholders to protect them during markdown processing
      let processedText = text;
      const latexExpressions = [];
      
      // Handle display math ($$...$$)
      processedText = processedText.replace(/\$\$([\s\S]*?)\$\$/g, (match, content) => {
        latexExpressions.push({ type: 'display', content });
        return `##LATEX_DISPLAY_${latexExpressions.length - 1}##`;
      });
      
      // Handle inline math ($...$)
      processedText = processedText.replace(/\$([^\$]+?)\$/g, (match, content) => {
        latexExpressions.push({ type: 'inline', content });
        return `##LATEX_INLINE_${latexExpressions.length - 1}##`;
      });
      
      // Process Markdown
      let html = marked.parse(processedText);
      
      // Replace LaTeX placeholders with actual LaTeX
      latexExpressions.forEach((expr, index) => {
        const placeholder = expr.type === 'display' 
          ? `##LATEX_DISPLAY_${index}##`
          : `##LATEX_INLINE_${index}##`;
          
        if (expr.type === 'display') {
          html = html.replace(placeholder, `<div class="math math-display">$$${expr.content}$$</div>`);
        } else {
          html = html.replace(placeholder, `<span class="math math-inline">$${expr.content}$</span>`);
        }
      });
      
      // Create a temporary element to process the HTML
      const element = document.createElement('div');
      element.innerHTML = html;
      
      // Process any LaTeX with KaTeX if available
      if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(element, {
          delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
          ],
          throwOnError: false
        });
      } else {
        console.warn('KaTeX library not loaded for LaTeX rendering.');
      }
      
      return element.innerHTML;
    } catch (error) {
      console.error('Error rendering Markdown/LaTeX:', error);
      return text;
    }
  }

  /**
   * Debounce function to limit how often a function can be called
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @return {Function} Debounced function
   */
  function debounce(func, wait = 300) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  /**
   * Throttle function to limit how often a function can be called
   * @param {Function} func - Function to throttle
   * @param {number} limit - Limit time in milliseconds
   * @return {Function} Throttled function
   */
  function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Performance measurement utilities
  const performance = {
    /**
     * Starts measuring performance 
     * @param {string} label - Label for the measurement
     */
    start: function(label) {
      if (typeof window.performance !== 'undefined' && window.performance.mark) {
        window.performance.mark(`${label}:start`);
      }
    },
    
    /**
     * Ends measuring performance and logs result
     * @param {string} label - Label for the measurement
     */
    end: function(label) {
      if (typeof window.performance !== 'undefined' && window.performance.mark) {
        window.performance.mark(`${label}:end`);
        window.performance.measure(label, `${label}:start`, `${label}:end`);
        const measure = window.performance.getEntriesByName(label)[0];
        console.log(`${label}: ${measure.duration.toFixed(2)}ms`);
      }
    }
  };

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
    renderMarkdownWithLaTeX,
    debounce,
    throttle,
    performance,
    debug,
    setDebugMode
  };
})();