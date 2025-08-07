/**
 * Theme Toggle Functionality for Flexoki Theme
 * Handles switching between light and dark themes with persistence
 */

class ThemeManager {
  constructor() {
    this.storageKey = 'physics-site-theme';
    this.defaultTheme = 'light';
    this.currentTheme = this.getStoredTheme() || this.defaultTheme;
    
    this.init();
  }

  init() {
    // Set initial theme
    this.applyTheme(this.currentTheme);
    
    // Create and insert theme toggle if it doesn't exist
    this.createThemeToggle();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Listen for system theme changes
    this.listenForSystemThemeChanges();
  }

  getStoredTheme() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (e) {
      console.warn('localStorage not available for theme storage');
      return null;
    }
  }

  storeTheme(theme) {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (e) {
      console.warn('localStorage not available for theme storage');
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.storeTheme(theme);
    
    // Update toggle button text/icon
    this.updateToggleButton();
    
    // Dispatch custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('themeChange', { 
      detail: { theme: theme } 
    }));
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }

  createThemeToggle() {
    // Check if toggle already exists
    if (document.querySelector('.theme-toggle')) {
      return;
    }

    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Toggle theme');
    toggle.setAttribute('title', 'Toggle between light and dark theme');
    
    // Try to add to navigation, fallback to header
    const nav = document.querySelector('.site-nav') || 
                 document.querySelector('nav') || 
                 document.querySelector('header');
    
    if (nav) {
      nav.appendChild(toggle);
    } else {
      // Fallback: create a floating toggle
      toggle.style.position = 'fixed';
      toggle.style.top = '20px';
      toggle.style.right = '20px';
      toggle.style.zIndex = '1000';
      document.body.appendChild(toggle);
    }
  }

  updateToggleButton() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      const isDark = this.currentTheme === 'dark';
      toggle.textContent = isDark ? 'Light' : 'Dark';
      toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
      toggle.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    }
  }

  setupEventListeners() {
    // Theme toggle click
    document.addEventListener('click', (e) => {
      if (e.target.matches('.theme-toggle')) {
        e.preventDefault();
        this.toggleTheme();
      }
    });

    // Keyboard support (Space or Enter on theme toggle)
    document.addEventListener('keydown', (e) => {
      if (e.target.matches('.theme-toggle') && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        this.toggleTheme();
      }
    });

    // Keyboard shortcut: Ctrl+Shift+T (or Cmd+Shift+T on Mac)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  listenForSystemThemeChanges() {
    // Only listen if user hasn't set a preference
    if (!this.getStoredTheme()) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleSystemThemeChange = (e) => {
        if (!this.getStoredTheme()) { // Only if user hasn't set preference
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      };

      // Set initial theme based on system preference if no stored preference
      if (mediaQuery.matches && this.currentTheme === this.defaultTheme) {
        this.applyTheme('dark');
      }

      // Listen for changes
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    }
  }

  // Public method to get current theme
  getCurrentTheme() {
    return this.currentTheme;
  }

  // Public method to set theme programmatically
  setTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
      this.applyTheme(theme);
    }
  }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
  });
} else {
  window.themeManager = new ThemeManager();
}

// Also initialize immediately for faster theme application
window.themeManager = new ThemeManager();