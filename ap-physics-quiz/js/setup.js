// Setup script for AP Physics Quiz App
// This script checks the folder structure and helps ensure all necessary files are in place

(function() {
    console.log("AP Physics Quiz App - Setup Assistant");
    console.log("=====================================");
    
    // Check if we're running in a browser
    if (typeof window !== 'undefined') {
      const requiredFolders = ['js', 'css', 'data'];
      const requiredFiles = [
        'index.html',
        'js/app.js',
        'js/quiz-data.js',
        'js/quiz-ui.js',
        'js/utils.js',
        'js/quiz-storage.js',
        'js/question-parser.js',
        'js/advanced-question-types.js',
        'css/styles-flexoki.css',
        'css/responsive.css',
        'data/ap-physics-questions.csv'
      ];
      
      // Check and create folder structure if needed
      console.log("\nChecking folder structure...");
      let foldersOK = true;
      
      for (const folder of requiredFolders) {
        try {
          const folderExists = checkPathExists(folder);
          if (!folderExists) {
            console.error(`❌ Missing folder: ${folder}`);
            foldersOK = false;
          } else {
            console.log(`✓ Folder exists: ${folder}`);
          }
        } catch (err) {
          console.error(`Error checking folder: ${folder}`, err);
          foldersOK = false;
        }
      }
      
      if (!foldersOK) {
        console.warn("\n⚠️ Some folders are missing. Please create the required folder structure.");
      }
      
      // Check required files
      console.log("\nChecking required files...");
      let filesOK = true;
      
      for (const file of requiredFiles) {
        try {
          const fileExists = checkPathExists(file);
          if (!fileExists) {
            console.error(`❌ Missing file: ${file}`);
            filesOK = false;
          } else {
            console.log(`✓ File exists: ${file}`);
          }
        } catch (err) {
          console.error(`Error checking file: ${file}`, err);
          filesOK = false;
        }
      }
      
      if (!filesOK) {
        console.warn("\n⚠️ Some files are missing. Please make sure all required files are in place.");
      }
      
      // Overall status
      console.log("\nOverall setup status:");
      if (foldersOK && filesOK) {
        console.log("✅ All required folders and files are in place!");
        console.log("You can now open index.html in your browser to start the quiz app.");
      } else {
        console.log("❌ Setup is incomplete. Please fix the issues above before running the app.");
      }
      
      // Check browser compatibility
      checkBrowserCompatibility();
    } else {
      console.error("This script is designed to run in a browser environment.");
    }
    
    /**
     * Check if a path exists (folder or file)
     * This is a simple check and may not work in all browsers
     */
    function checkPathExists(path) {
      try {
        // For simplicity, we'll just try to make a HEAD request for the file
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', path, false);
        xhr.send();
        
        // If status is 200, the file exists
        return xhr.status === 200;
      } catch (err) {
        console.error(`Error checking path: ${path}`, err);
        return false;
      }
    }
    
    /**
     * Check browser compatibility
     */
    function checkBrowserCompatibility() {
      console.log("\nChecking browser compatibility...");
      
      const features = {
        'Fetch API': typeof fetch !== 'undefined',
        'Promises': typeof Promise !== 'undefined',
        'Arrow Functions': (() => {}).toString().includes('=>'),
        'localStorage': typeof localStorage !== 'undefined',
        'ES6 Classes': typeof class {} !== 'undefined',
        'CSS Grid': CSS.supports('display', 'grid'),
        'CSS Flexbox': CSS.supports('display', 'flex')
      };
      
      let allFeaturesSupported = true;
      
      for (const [feature, supported] of Object.entries(features)) {
        if (supported) {
          console.log(`✓ ${feature} is supported`);
        } else {
          console.error(`❌ ${feature} is NOT supported`);
          allFeaturesSupported = false;
        }
      }
      
      if (allFeaturesSupported) {
        console.log("✅ Your browser supports all required features!");
      } else {
        console.warn("⚠️ Your browser does not support all required features. Please consider using a modern browser like Chrome, Firefox, or Edge.");
      }
    }
  })();