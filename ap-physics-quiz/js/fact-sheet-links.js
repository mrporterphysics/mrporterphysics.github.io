/**
 * Fact Sheet Direct Links System
 * Provides contextual links to specific fact sheet sections from quiz questions
 */

const FactSheetLinks = {
    // Fact sheet section mappings
    sectionMappings: {
        // Kinematics sections
        'kinematic-definitions': {
            title: 'Kinematic Definitions',
            keywords: ['position', 'displacement', 'velocity', 'acceleration', 'motion'],
            url: 'factsheet-complete.html#kinematic-definitions'
        },
        'kinematic-equations': {
            title: 'Kinematic Equations',
            keywords: ['kinematic equation', 'uniformly accelerated', 'constant acceleration'],
            url: 'factsheet-complete.html#kinematic-equations'
        },

        // Forces sections
        'force-definitions': {
            title: 'Force Definitions',
            keywords: ['force', 'newton', 'contact force', 'field force'],
            url: 'factsheet-complete.html#force-definitions'
        },
        'newtons-laws': {
            title: "Newton's Laws",
            keywords: ['newton\'s law', 'inertia', 'net force', 'action reaction'],
            url: 'factsheet-complete.html#newtons-laws'
        },
        'equilibrium': {
            title: 'Equilibrium',
            keywords: ['equilibrium', 'static', 'balanced forces', 'net force zero'],
            url: 'factsheet-complete.html#equilibrium'
        },
        'friction': {
            title: 'Friction',
            keywords: ['friction', 'static friction', 'kinetic friction', 'coefficient'],
            url: 'factsheet-complete.html#friction'
        },

        // Energy sections
        'work-energy': {
            title: 'Work and Energy',
            keywords: ['work', 'energy', 'kinetic energy', 'potential energy', 'joule'],
            url: 'factsheet-complete.html#work-energy'
        },
        'conservation-energy': {
            title: 'Conservation of Energy',
            keywords: ['conservation of energy', 'mechanical energy', 'energy conservation'],
            url: 'factsheet-complete.html#conservation-energy'
        },
        'power': {
            title: 'Power',
            keywords: ['power', 'watt', 'rate of work', 'rate of energy'],
            url: 'factsheet-complete.html#power'
        },

        // Momentum sections
        'momentum': {
            title: 'Momentum',
            keywords: ['momentum', 'impulse', 'collision', 'conservation of momentum'],
            url: 'factsheet-complete.html#momentum'
        },

        // Rotation sections
        'rotation': {
            title: 'Rotational Motion',
            keywords: ['rotation', 'angular', 'torque', 'moment of inertia', 'rotational'],
            url: 'factsheet-complete.html#rotation'
        },

        // Gravitation sections
        'gravitation': {
            title: 'Gravitation',
            keywords: ['gravity', 'gravitational', 'universal gravitation', 'orbital'],
            url: 'factsheet-complete.html#gravitation'
        },

        // Simple Harmonic Motion sections
        'shm': {
            title: 'Simple Harmonic Motion',
            keywords: ['harmonic', 'oscillation', 'spring', 'pendulum', 'periodic'],
            url: 'factsheet-complete.html#shm'
        },

        // Waves sections
        'waves': {
            title: 'Waves',
            keywords: ['wave', 'frequency', 'wavelength', 'amplitude', 'wave speed'],
            url: 'factsheet-complete.html#waves'
        },

        // Fluids sections
        'fluids': {
            title: 'Fluids',
            keywords: ['fluid', 'pressure', 'density', 'buoyancy', 'bernoulli'],
            url: 'factsheet-complete.html#fluids'
        }
    },

    // Usage tracking
    linkUsage: {},

    // Initialize the system
    init: function () {
        this.loadUsageData();
        this.setupEventListeners();
        console.log('Fact Sheet Links system initialized');
    },

    // Find relevant fact sheet sections for a question
    findRelevantSections: function (question) {
        const relevantSections = [];
        const questionText = (question.question + ' ' + (question.explanation || '')).toLowerCase();
        const questionTopic = question.topic ? question.topic.toLowerCase() : '';

        // Check each section mapping
        for (const [sectionId, section] of Object.entries(this.sectionMappings)) {
            let score = 0;

            // Check topic match first (high priority)
            if (questionTopic && sectionId.includes(questionTopic)) {
                score += 10;
            }

            // Check keyword matches
            const keywordMatches = section.keywords.filter(keyword =>
                questionText.includes(keyword.toLowerCase())
            ).length;

            score += keywordMatches * 3;

            // Check partial topic matches
            if (questionTopic === 'kinematics' && sectionId.startsWith('kinematic')) score += 8;
            if (questionTopic === 'forces' && (sectionId.includes('force') || sectionId.includes('newton') || sectionId === 'equilibrium' || sectionId === 'friction')) score += 8;
            if (questionTopic === 'energy' && (sectionId.includes('work') || sectionId.includes('energy') || sectionId === 'power')) score += 8;
            if (questionTopic === 'momentum' && sectionId === 'momentum') score += 8;
            if (questionTopic === 'rotation' && sectionId === 'rotation') score += 8;
            if (questionTopic === 'gravitation' && sectionId === 'gravitation') score += 8;
            if (questionTopic === 'shm' && sectionId === 'shm') score += 8;
            if (questionTopic === 'waves' && sectionId === 'waves') score += 8;
            if (questionTopic === 'fluids' && sectionId === 'fluids') score += 8;

            if (score > 0) {
                relevantSections.push({
                    id: sectionId,
                    title: section.title,
                    url: section.url,
                    score: score
                });
            }
        }

        // Sort by relevance score (highest first) and limit to top 3
        return relevantSections
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    },

    // Create fact sheet link elements for a question
    createFactSheetLinks: function (question) {
        const relevantSections = this.findRelevantSections(question);

        if (relevantSections.length === 0) {
            return null;
        }

        const linksContainer = document.createElement('div');
        linksContainer.className = 'fact-sheet-links';

        const header = document.createElement('div');
        header.className = 'fact-sheet-links-header';
        header.innerHTML = '<i class="icon">📋</i> Related Fact Sheet Sections:';
        linksContainer.appendChild(header);

        const linksList = document.createElement('div');
        linksList.className = 'fact-sheet-links-list';

        relevantSections.forEach(section => {
            const linkButton = document.createElement('button');
            linkButton.className = 'fact-sheet-link-btn';
            linkButton.innerHTML = `<i class="icon">🔗</i> ${section.title}`;
            linkButton.setAttribute('data-section-id', section.id);
            linkButton.setAttribute('data-section-url', section.url);

            linkButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.openFactSheetSection(section.id, section.url, section.title);
            });

            linksList.appendChild(linkButton);
        });

        linksContainer.appendChild(linksList);
        return linksContainer;
    },

    // Open fact sheet section in new tab
    openFactSheetSection: function (sectionId, url, title) {
        // Track usage
        this.trackLinkUsage(sectionId);

        // Open in new tab
        window.open(url, '_blank');

        // Show brief confirmation
        this.showLinkConfirmation(title);
    },

    // Track fact sheet link usage
    trackLinkUsage: function (sectionId) {
        if (!this.linkUsage[sectionId]) {
            this.linkUsage[sectionId] = 0;
        }
        this.linkUsage[sectionId]++;

        // Save to storage
        Utils.storage.set('fact_sheet_link_usage', this.linkUsage);

        console.log(`Fact sheet link used: ${sectionId} (${this.linkUsage[sectionId]} times)`);
    },

    // Show link confirmation message
    showLinkConfirmation: function (title) {
        // Remove any existing confirmation
        const existingConfirmation = document.querySelector('.fact-sheet-confirmation');
        if (existingConfirmation) {
            existingConfirmation.remove();
        }

        const confirmation = document.createElement('div');
        confirmation.className = 'fact-sheet-confirmation';
        confirmation.innerHTML = `
            <i class="icon">✅</i>
            Opened: ${title}
        `;

        document.body.appendChild(confirmation);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            confirmation.classList.add('fade-out');
            setTimeout(() => {
                if (confirmation.parentNode) {
                    confirmation.parentNode.removeChild(confirmation);
                }
            }, 300);
        }, 3000);
    },

    // Load usage data from storage
    loadUsageData: function () {
        this.linkUsage = Utils.storage.get('fact_sheet_link_usage', {});
    },

    // Setup event listeners
    setupEventListeners: function () {
        // Listen for question display events to add links
        document.addEventListener('questionDisplayed', (event) => {
            const question = event.detail.question;
            this.addLinksToQuestion(question);
        });
    },

    // Add links to currently displayed question
    addLinksToQuestion: function (question) {
        // Remove any existing fact sheet links
        const existingLinks = document.querySelector('.fact-sheet-links');
        if (existingLinks) {
            existingLinks.remove();
        }

        // Create new links
        const linksElement = this.createFactSheetLinks(question);
        if (!linksElement) return;

        // Find the fact-sheet-container - it should be after answer-options in the DOM
        const factSheetContainer = document.getElementById('fact-sheet-container');

        if (factSheetContainer) {
            // Clear and append to the designated container
            factSheetContainer.innerHTML = '';
            factSheetContainer.appendChild(linksElement);
        } else {
            // Container not found - create it and insert after answer-options
            const answerOptions = document.getElementById('answer-options');
            if (answerOptions && answerOptions.parentNode) {
                const container = document.createElement('div');
                container.id = 'fact-sheet-container';
                container.className = 'fact-sheet-section';
                container.appendChild(linksElement);

                // Insert the container after answer-options
                if (answerOptions.nextSibling) {
                    answerOptions.parentNode.insertBefore(container, answerOptions.nextSibling);
                } else {
                    answerOptions.parentNode.appendChild(container);
                }
            }
        }
    },

    // Get usage statistics
    getUsageStatistics: function () {
        const stats = {
            totalClicks: Object.values(this.linkUsage).reduce((sum, count) => sum + count, 0),
            sectionsUsed: Object.keys(this.linkUsage).length,
            mostUsedSections: Object.entries(this.linkUsage)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([sectionId, count]) => ({
                    section: this.sectionMappings[sectionId]?.title || sectionId,
                    count: count
                }))
        };

        return stats;
    },

    // Show usage analytics
    showUsageAnalytics: function () {
        const stats = this.getUsageStatistics();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal-content fact-sheet-analytics">
                <div class="modal-header">
                    <h2><i class="icon">📊</i> Fact Sheet Usage Analytics</h2>
                    <button class="close-modal" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="stats-overview">
                        <div class="stat-card">
                            <div class="stat-number">${stats.totalClicks}</div>
                            <div class="stat-label">Total Fact Sheet Links Clicked</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${stats.sectionsUsed}</div>
                            <div class="stat-label">Different Sections Accessed</div>
                        </div>
                    </div>
                    
                    <div class="most-used-sections">
                        <h3>Most Referenced Sections:</h3>
                        <div class="sections-list">
                            ${stats.mostUsedSections.map(section => `
                                <div class="section-usage">
                                    <span class="section-name">${section.section}</span>
                                    <span class="usage-count">${section.count} clicks</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Focus management
        modal.querySelector('.close-modal').focus();
    }
};

// Add CSS for fact sheet links
const factSheetLinksCSS = `
/* Fact Sheet Links Styling */
.fact-sheet-links {
    margin: 20px 0;
    padding: 16px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 8px;
    font-family: inherit;
}

.fact-sheet-links-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-weight: 500;
    color: var(--text-primary);
    font-size: 0.9rem;
}

.fact-sheet-links-header .icon {
    font-size: 1rem;
}

.fact-sheet-links-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.fact-sheet-link-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: var(--bg-primary);
    border: 1px solid var(--border-light);
    border-radius: 6px;
    color: var(--text-primary);
    font-size: 0.85rem;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
}

.fact-sheet-link-btn:hover {
    background: var(--blue-light);
    border-color: var(--blue);
    transform: translateY(-1px);
}

.fact-sheet-link-btn:active {
    transform: translateY(0);
}

.fact-sheet-link-btn .icon {
    font-size: 0.9rem;
    opacity: 0.7;
}

/* Confirmation message */
.fact-sheet-confirmation {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--green);
    color: var(--bg-primary);
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 10000;
    animation: slideInFade 0.3s ease;
}

.fact-sheet-confirmation.fade-out {
    animation: fadeOut 0.3s ease forwards;
}

.fact-sheet-confirmation .icon {
    font-size: 1rem;
}

/* Analytics modal styling */
.fact-sheet-analytics .stats-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
}

.fact-sheet-analytics .stat-card {
    text-align: center;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 8px;
    border: 1px solid var(--border);
}

.fact-sheet-analytics .stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: var(--blue);
    margin-bottom: 4px;
}

.fact-sheet-analytics .stat-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
}

.fact-sheet-analytics .most-used-sections h3 {
    margin-bottom: 12px;
    color: var(--text-primary);
}

.fact-sheet-analytics .sections-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.fact-sheet-analytics .section-usage {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    background: var(--bg-secondary);
    border-radius: 6px;
    border: 1px solid var(--border-light);
}

.fact-sheet-analytics .section-name {
    font-weight: 500;
    color: var(--text-primary);
}

.fact-sheet-analytics .usage-count {
    font-size: 0.85rem;
    color: var(--text-secondary);
    background: var(--bg-primary);
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid var(--border-light);
}

/* Mobile responsive */
@media (max-width: 768px) {
    .fact-sheet-links {
        margin: 16px 0;
        padding: 12px;
    }
    
    .fact-sheet-links-list {
        gap: 6px;
    }
    
    .fact-sheet-link-btn {
        padding: 12px;
        font-size: 0.8rem;
    }
    
    .fact-sheet-confirmation {
        top: 10px;
        right: 10px;
        left: 10px;
        text-align: center;
    }
}

/* Animations */
@keyframes slideInFade {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeOut {
    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}
`;

// Inject CSS
const factSheetLinksStyleSheet = document.createElement('style');
factSheetLinksStyleSheet.textContent = factSheetLinksCSS;
document.head.appendChild(factSheetLinksStyleSheet);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FactSheetLinks.init());
} else {
    FactSheetLinks.init();
}