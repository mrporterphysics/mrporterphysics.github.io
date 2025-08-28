/**
 * Direct Fact Sheet Links System
 * Provides contextual links from questions to specific fact sheet sections
 */

const FactSheetLinks = {
    // Mapping of question topics/keywords to fact sheet sections
    sectionMappings: {
        // Kinematics mappings
        'kinematics': {
            'position': 'kinematic-definitions',
            'displacement': 'kinematic-definitions', 
            'velocity': 'kinematic-definitions',
            'acceleration': 'kinematic-definitions',
            'motion': 'kinematic-equations',
            'constant acceleration': 'kinematic-equations',
            'free fall': 'kinematic-equations'
        },

        // Forces mappings
        'forces': {
            'newton': 'newtons-laws',
            'force': 'forces',
            'friction': 'forces',
            'normal force': 'forces',
            'tension': 'forces',
            'weight': 'forces',
            'equilibrium': 'equilibrium',
            'net force': 'newtons-laws'
        },

        // Energy mappings
        'energy': {
            'work': 'work',
            'kinetic energy': 'energy',
            'potential energy': 'energy',
            'conservation': 'conservation-laws',
            'power': 'work',
            'joule': 'energy'
        },

        // Momentum mappings
        'momentum': {
            'momentum': 'momentum',
            'impulse': 'momentum',
            'collision': 'collisions',
            'conservation of momentum': 'conservation-laws'
        },

        // Rotation mappings
        'rotation': {
            'angular': 'rotational-motion',
            'torque': 'torque',
            'rotational': 'rotational-motion',
            'moment of inertia': 'rotational-motion',
            'angular momentum': 'angular-momentum'
        },

        // Additional mappings for other topics
        'gravitation': {
            'gravity': 'gravitation',
            'gravitational': 'gravitation',
            'orbital': 'orbital-motion',
            'weight': 'gravitation'
        },

        'waves': {
            'wave': 'waves',
            'frequency': 'wave-properties',
            'wavelength': 'wave-properties',
            'sound': 'sound',
            'interference': 'wave-behavior'
        },

        'fluids': {
            'pressure': 'pressure',
            'buoyancy': 'buoyancy',
            'fluid': 'fluids',
            'density': 'fluids'
        }
    },

    // Initialize fact sheet links system
    init: function() {
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Listen for question display to add fact sheet links
        document.addEventListener('questionDisplayed', (event) => {
            if (event.detail && event.detail.question) {
                this.addFactSheetLinks(event.detail.question);
            }
        });

        // Listen for existing fact sheet button clicks to enhance them
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('fact-sheet-btn') || 
                event.target.closest('.fact-sheet-btn')) {
                event.preventDefault();
                const question = this.getCurrentQuestion();
                if (question) {
                    this.openRelevantFactSheet(question);
                }
            }
        });
    },

    // Add contextual fact sheet links to the current question
    addFactSheetLinks: function(question) {
        // Find or create fact sheet section
        let factSheetSection = document.querySelector('.fact-sheet-section');
        if (!factSheetSection) {
            factSheetSection = document.createElement('div');
            factSheetSection.className = 'fact-sheet-section';
            
            const questionContainer = document.querySelector('.question-container');
            if (questionContainer) {
                questionContainer.appendChild(factSheetSection);
            }
        }

        // Generate relevant links
        const relevantSections = this.findRelevantSections(question);
        
        if (relevantSections.length > 0) {
            factSheetSection.innerHTML = `
                <div class="fact-sheet-links">
                    <h4>📚 Quick Reference</h4>
                    <p class="reference-intro">Relevant fact sheet sections for this question:</p>
                    <div class="reference-buttons">
                        ${relevantSections.map(section => `
                            <button class="btn btn-secondary btn-sm reference-btn" 
                                    onclick="FactSheetLinks.openFactSheetSection('${section.id}')">
                                ${section.icon} ${section.title}
                            </button>
                        `).join('')}
                        <button class="btn btn-outline btn-sm" 
                                onclick="FactSheetLinks.openFullFactSheet()">
                            📋 View Complete Fact Sheet
                        </button>
                    </div>
                    <div class="reference-tip">
                        💡 <em>Use these references to understand key concepts before answering</em>
                    </div>
                </div>
            `;
        } else {
            // Fallback - show general fact sheet link
            factSheetSection.innerHTML = `
                <div class="fact-sheet-links">
                    <h4>📚 Reference Available</h4>
                    <div class="reference-buttons">
                        <button class="btn btn-secondary btn-sm" 
                                onclick="FactSheetLinks.openFullFactSheet()">
                            📋 Open AP Physics Fact Sheet
                        </button>
                    </div>
                </div>
            `;
        }
    },

    // Find relevant fact sheet sections for a question
    findRelevantSections: function(question) {
        const relevantSections = [];
        const questionText = (question.question + ' ' + (question.explanation || '')).toLowerCase();
        
        // Define fact sheet sections with metadata
        const factSheetSections = {
            'kinematic-definitions': { 
                id: 'kinematic-definitions', 
                title: 'Kinematic Definitions', 
                icon: '📏',
                keywords: ['position', 'displacement', 'velocity', 'speed', 'acceleration']
            },
            'kinematic-equations': { 
                id: 'kinematic-equations', 
                title: 'Kinematic Equations', 
                icon: '🧮',
                keywords: ['equation', 'constant acceleration', 'motion', 'time', 'distance']
            },
            'newtons-laws': { 
                id: 'newtons-laws', 
                title: "Newton's Laws", 
                icon: '⚖️',
                keywords: ['newton', 'force', 'mass', 'acceleration', 'inertia', 'action', 'reaction']
            },
            'forces': { 
                id: 'forces', 
                title: 'Types of Forces', 
                icon: '⚡',
                keywords: ['friction', 'normal', 'tension', 'weight', 'applied', 'contact']
            },
            'equilibrium': { 
                id: 'equilibrium', 
                title: 'Equilibrium', 
                icon: '⚖️',
                keywords: ['equilibrium', 'balanced', 'static', 'net force', 'zero']
            },
            'work': { 
                id: 'work', 
                title: 'Work and Power', 
                icon: '🔧',
                keywords: ['work', 'power', 'joule', 'watt', 'energy transfer']
            },
            'energy': { 
                id: 'energy', 
                title: 'Energy Types', 
                icon: '🔋',
                keywords: ['kinetic', 'potential', 'mechanical', 'energy', 'joule']
            },
            'conservation-laws': { 
                id: 'conservation-laws', 
                title: 'Conservation Laws', 
                icon: '🔄',
                keywords: ['conservation', 'conserved', 'total', 'system', 'isolated']
            },
            'momentum': { 
                id: 'momentum', 
                title: 'Momentum & Impulse', 
                icon: '💥',
                keywords: ['momentum', 'impulse', 'collision', 'change in momentum']
            },
            'rotational-motion': { 
                id: 'rotational-motion', 
                title: 'Rotational Motion', 
                icon: '🌀',
                keywords: ['angular', 'rotational', 'rotation', 'torque', 'moment']
            },
            'waves': { 
                id: 'waves', 
                title: 'Wave Properties', 
                icon: '🌊',
                keywords: ['wave', 'frequency', 'wavelength', 'amplitude', 'period']
            },
            'gravitation': { 
                id: 'gravitation', 
                title: 'Gravitation', 
                icon: '🪐',
                keywords: ['gravity', 'gravitational', 'universal', 'orbital', 'planet']
            }
        };

        // Check each section for keyword matches
        Object.values(factSheetSections).forEach(section => {
            let matchCount = 0;
            section.keywords.forEach(keyword => {
                if (questionText.includes(keyword.toLowerCase())) {
                    matchCount++;
                }
            });

            // Add section if it has multiple keyword matches or high relevance
            if (matchCount >= 1) {
                section.relevanceScore = matchCount;
                relevantSections.push(section);
            }
        });

        // Sort by relevance and return top 3
        return relevantSections
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, 3);
    },

    // Open specific fact sheet section
    openFactSheetSection: function(sectionId) {
        const factSheetUrl = `factsheet-complete.html#${sectionId}`;
        
        // Track fact sheet section access
        this.trackFactSheetAccess(sectionId);
        
        // Open in new window/tab
        const newWindow = window.open(factSheetUrl, 'factsheet', 'width=800,height=600,scrollbars=yes,resizable=yes');
        
        if (!newWindow) {
            // Fallback if popup blocked
            window.location.href = factSheetUrl;
        }
    },

    // Open full fact sheet
    openFullFactSheet: function() {
        const factSheetUrl = 'factsheet-complete.html';
        
        // Track fact sheet access
        this.trackFactSheetAccess('full');
        
        // Open in new window/tab
        const newWindow = window.open(factSheetUrl, 'factsheet', 'width=900,height=700,scrollbars=yes,resizable=yes');
        
        if (!newWindow) {
            // Fallback if popup blocked
            window.location.href = factSheetUrl;
        }
    },

    // Get current question
    getCurrentQuestion: function() {
        if (window.PhysicsQuizApp && window.PhysicsQuizApp.currentQuestion) {
            return window.PhysicsQuizApp.currentQuestion;
        }
        return null;
    },

    // Track fact sheet access for analytics
    trackFactSheetAccess: function(sectionId) {
        try {
            let accessStats = Utils.storage.get('fact_sheet_access', {
                totalAccess: 0,
                sectionAccess: {},
                recentAccess: []
            });

            accessStats.totalAccess++;
            accessStats.sectionAccess[sectionId] = (accessStats.sectionAccess[sectionId] || 0) + 1;
            
            // Add to recent access (keep last 20)
            accessStats.recentAccess.unshift({
                section: sectionId,
                timestamp: new Date().toISOString(),
                question: this.getCurrentQuestion()?.id || 'unknown'
            });
            accessStats.recentAccess = accessStats.recentAccess.slice(0, 20);

            Utils.storage.set('fact_sheet_access', accessStats);

        } catch (error) {
            console.warn('Failed to track fact sheet access:', error);
        }
    },

    // Get fact sheet usage analytics
    getFactSheetAnalytics: function() {
        try {
            const stats = Utils.storage.get('fact_sheet_access', {
                totalAccess: 0,
                sectionAccess: {},
                recentAccess: []
            });

            const topSections = Object.entries(stats.sectionAccess)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5);

            return {
                totalAccess: stats.totalAccess,
                topSections: topSections,
                recentAccess: stats.recentAccess.slice(0, 5),
                uniqueSections: Object.keys(stats.sectionAccess).length
            };

        } catch (error) {
            console.warn('Failed to get fact sheet analytics:', error);
            return null;
        }
    },

    // Show fact sheet usage summary
    showUsageSummary: function() {
        const analytics = this.getFactSheetAnalytics();
        if (!analytics) return;

        const modal = document.createElement('div');
        modal.className = 'fact-sheet-analytics-modal';
        modal.innerHTML = `
            <div class="analytics-content">
                <div class="analytics-header">
                    <h3>📊 Fact Sheet Usage</h3>
                    <button class="close-analytics">×</button>
                </div>
                
                <div class="usage-stats">
                    <div class="stat-card">
                        <div class="stat-value">${analytics.totalAccess}</div>
                        <div class="stat-label">Total References</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${analytics.uniqueSections}</div>
                        <div class="stat-label">Sections Accessed</div>
                    </div>
                </div>

                ${analytics.topSections.length > 0 ? `
                    <div class="top-sections">
                        <h4>Most Referenced Sections</h4>
                        <div class="section-list">
                            ${analytics.topSections.map(([section, count]) => `
                                <div class="section-item">
                                    <span class="section-name">${section}</span>
                                    <span class="section-count">${count} times</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="analytics-footer">
                    <p>Keep using the fact sheet references to reinforce your understanding!</p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event handlers
        modal.querySelector('.close-analytics').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
};

// Add CSS for fact sheet links
const factSheetCSS = `
/* Fact Sheet Links */
.fact-sheet-section {
    margin: 20px 0;
    padding: 16px;
    background: var(--ui);
    border: 1px solid var(--ui-2);
    border-radius: 8px;
    border-left: 4px solid var(--bl);
}

.fact-sheet-links h4 {
    margin: 0 0 8px 0;
    color: var(--tx);
    font-size: 1rem;
}

.reference-intro {
    margin: 0 0 12px 0;
    color: var(--tx-2);
    font-size: 0.9rem;
}

.reference-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
}

.reference-btn {
    font-size: 0.85rem;
    padding: 6px 12px;
    border-radius: 6px;
    transition: all 0.2s ease;
}

.reference-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.reference-tip {
    font-size: 0.8rem;
    color: var(--tx-3);
    font-style: italic;
    margin-top: 8px;
}

/* Fact Sheet Analytics Modal */
.fact-sheet-analytics-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.analytics-content {
    background: var(--bg);
    border-radius: 12px;
    padding: 24px;
    max-width: 500px;
    width: 90%;
    border: 1px solid var(--ui-2);
}

.analytics-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--ui-2);
    padding-bottom: 12px;
}

.analytics-header h3 {
    margin: 0;
    color: var(--tx);
}

.close-analytics {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--tx-2);
    padding: 4px;
}

.usage-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 24px;
}

.stat-card {
    text-align: center;
    padding: 16px;
    background: var(--ui);
    border-radius: 8px;
    border: 1px solid var(--ui-2);
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--bl);
    margin-bottom: 4px;
}

.stat-label {
    font-size: 0.85rem;
    color: var(--tx-2);
}

.top-sections h4 {
    margin: 0 0 12px 0;
    color: var(--tx);
}

.section-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.section-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: var(--ui);
    border-radius: 6px;
    border: 1px solid var(--ui-2);
}

.section-name {
    font-weight: 500;
    color: var(--tx);
}

.section-count {
    font-size: 0.85rem;
    color: var(--bl);
    font-weight: 600;
}

.analytics-footer {
    margin-top: 20px;
    text-align: center;
    padding-top: 16px;
    border-top: 1px solid var(--ui-2);
}

.analytics-footer p {
    margin: 0;
    color: var(--tx-2);
    font-style: italic;
}

/* Mobile fact sheet adjustments */
@media (max-width: 480px) {
    .reference-buttons {
        flex-direction: column;
    }
    
    .reference-btn {
        text-align: center;
    }
    
    .usage-stats {
        grid-template-columns: 1fr;
    }
}
`;

// Inject fact sheet CSS
const factSheetStyleSheet = document.createElement('style');
factSheetStyleSheet.textContent = factSheetCSS;
document.head.appendChild(factSheetStyleSheet);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FactSheetLinks.init());
} else {
    FactSheetLinks.init();
}