// Simple test for the physics quiz application
console.log("Starting physics quiz app test...");

// Test CSV loading
async function testCSVLoading() {
    try {
        console.log("Testing CSV loading...");
        const response = await fetch('data/ap-physics-questions.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n').filter(line => line.trim());
        console.log(`✓ AP Physics CSV loaded: ${lines.length} lines`);
        
        const earthResponse = await fetch('data/earth-science-questions.csv');
        const earthCsvText = await earthResponse.text();
        const earthLines = earthCsvText.split('\n').filter(line => line.trim());
        console.log(`✓ Earth Science CSV loaded: ${earthLines.length} lines`);
        
        return true;
    } catch (error) {
        console.error("✗ CSV loading failed:", error);
        return false;
    }
}

// Test module availability
function testModules() {
    const modules = ['PhysicsQuizApp', 'QuizData', 'QuizUI', 'QuizStorage', 'Utils'];
    let allModulesAvailable = true;
    
    modules.forEach(moduleName => {
        if (typeof window[moduleName] !== 'undefined') {
            console.log(`✓ ${moduleName} module available`);
        } else {
            console.error(`✗ ${moduleName} module not available`);
            allModulesAvailable = false;
        }
    });
    
    return allModulesAvailable;
}

// Run tests
async function runTests() {
    console.log("=== Physics Quiz Application Test ===");
    
    const csvTest = await testCSVLoading();
    const moduleTest = testModules();
    
    if (csvTest && moduleTest) {
        console.log("✓ All tests passed! Application should be working correctly.");
    } else {
        console.error("✗ Some tests failed. Check the issues above.");
    }
}

// Run tests when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runTests);
} else {
    runTests();
}