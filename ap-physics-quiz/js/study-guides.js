/**
 * Comprehensive Study Guides System
 * Integrated with fact sheet content for AP Physics learning
 */

const StudyGuides = {
    // Study guide data organized by topic
    guideData: {
        kinematics: {
            title: "Kinematics - Motion in One and Two Dimensions",
            icon: "🚀",
            sections: [
                {
                    title: "Key Concepts",
                    content: [
                        "Position (x): Location of object relative to origin",
                        "Displacement (Δx): Change in position (vector)",
                        "Distance: Total path traveled (scalar)",
                        "Velocity (v): Rate of change of position (vector)",
                        "Speed: Magnitude of velocity (scalar)",
                        "Acceleration (a): Rate of change of velocity (vector)"
                    ]
                },
                {
                    title: "Essential Formulas",
                    content: [
                        "v = Δx/Δt (average velocity)",
                        "a = Δv/Δt (average acceleration)",
                        "v = v₀ + at (velocity with constant acceleration)",
                        "x = x₀ + v₀t + ½at² (position with constant acceleration)",
                        "v² = v₀² + 2a(x - x₀) (velocity-position relation)",
                        "x = x₀ + ½(v₀ + v)t (average velocity method)"
                    ]
                },
                {
                    title: "Problem-Solving Strategy",
                    content: [
                        "1. Identify known and unknown quantities",
                        "2. Choose appropriate coordinate system",
                        "3. Select the kinematic equation that relates known/unknown quantities",
                        "4. Substitute values and solve algebraically first",
                        "5. Check units and reasonableness of answer"
                    ]
                }
            ],
            practiceQuestions: ["kinematics"],
            factSheetSections: ["Kinematic Definitions", "Kinematic Equations"]
        },

        forces: {
            title: "Forces and Newton's Laws",
            icon: "⚡",
            sections: [
                {
                    title: "Newton's Laws",
                    content: [
                        "First Law: Object at rest stays at rest, object in motion stays in motion (inertia)",
                        "Second Law: F = ma (net force equals mass times acceleration)",
                        "Third Law: For every action, there is an equal and opposite reaction"
                    ]
                },
                {
                    title: "Types of Forces",
                    content: [
                        "Gravitational: F = mg (weight)",
                        "Normal: Perpendicular contact force from surface",
                        "Friction: f = μN (kinetic), f ≤ μₛN (static)",
                        "Tension: Force transmitted through rope, string, or cable",
                        "Spring: F = kx (Hooke's law)",
                        "Applied: External force applied to object"
                    ]
                },
                {
                    title: "Problem-Solving Strategy",
                    content: [
                        "1. Draw a free-body diagram",
                        "2. Choose coordinate system (align with motion if possible)",
                        "3. Apply Newton's second law: ΣF = ma",
                        "4. Write component equations: ΣFₓ = maₓ, ΣFᵧ = maᵧ",
                        "5. Solve the system of equations"
                    ]
                }
            ],
            practiceQuestions: ["forces"],
            factSheetSections: ["Newton's Laws", "Forces", "Equilibrium"]
        },

        energy: {
            title: "Work, Energy, and Power",
            icon: "🔋",
            sections: [
                {
                    title: "Energy Types",
                    content: [
                        "Kinetic Energy: KE = ½mv² (energy of motion)",
                        "Gravitational PE: PE = mgh (energy due to height)",
                        "Elastic PE: PE = ½kx² (energy stored in springs)",
                        "Total Mechanical Energy: E = KE + PE"
                    ]
                },
                {
                    title: "Work and Power",
                    content: [
                        "Work: W = F·d·cos(θ) = F∥d (force parallel to displacement)",
                        "Work-Energy Theorem: W_net = ΔKE",
                        "Power: P = W/t = F·v (rate of doing work)",
                        "Conservative forces: Work independent of path (gravity, springs)",
                        "Non-conservative forces: Work depends on path (friction, air resistance)"
                    ]
                },
                {
                    title: "Conservation of Energy",
                    content: [
                        "In absence of non-conservative forces: E₁ = E₂",
                        "With non-conservative forces: E₁ = E₂ + W_non-conservative",
                        "Energy is never created or destroyed, only transformed"
                    ]
                }
            ],
            practiceQuestions: ["energy"],
            factSheetSections: ["Work", "Energy", "Conservation Laws"]
        },

        momentum: {
            title: "Linear Momentum and Collisions",
            icon: "💥",
            sections: [
                {
                    title: "Momentum Concepts",
                    content: [
                        "Momentum: p = mv (mass times velocity, vector quantity)",
                        "Impulse: J = Δp = FΔt (change in momentum)",
                        "Impulse-Momentum Theorem: FΔt = Δ(mv)"
                    ]
                },
                {
                    title: "Conservation of Momentum",
                    content: [
                        "In isolated systems: Σp_initial = Σp_final",
                        "Applies to all collisions and interactions",
                        "Works even when kinetic energy is not conserved"
                    ]
                },
                {
                    title: "Types of Collisions",
                    content: [
                        "Elastic: Both momentum and kinetic energy conserved",
                        "Inelastic: Only momentum conserved, objects may stick together",
                        "Perfectly inelastic: Objects stick together after collision",
                        "Explosions: Objects initially at rest fly apart"
                    ]
                }
            ],
            practiceQuestions: ["momentum"],
            factSheetSections: ["Momentum", "Conservation Laws", "Collisions"]
        },

        rotation: {
            title: "Rotational Motion and Torque",
            icon: "🌀",
            sections: [
                {
                    title: "Rotational Kinematics",
                    content: [
                        "Angular position: θ (in radians)",
                        "Angular velocity: ω = Δθ/Δt",
                        "Angular acceleration: α = Δω/Δt",
                        "Linear-angular relationships: v = rω, a = rα"
                    ]
                },
                {
                    title: "Rotational Dynamics",
                    content: [
                        "Moment of inertia: I = Σmr² (rotational 'mass')",
                        "Torque: τ = rF sin(θ) = rF⊥ (rotational 'force')",
                        "Newton's 2nd law for rotation: τ = Iα",
                        "Angular momentum: L = Iω"
                    ]
                },
                {
                    title: "Conservation Laws",
                    content: [
                        "Conservation of angular momentum: L_initial = L_final",
                        "Rotational kinetic energy: KE_rot = ½Iω²",
                        "Total kinetic energy: KE_total = ½mv² + ½Iω²"
                    ]
                }
            ],
            practiceQuestions: ["rotation"],
            factSheetSections: ["Rotational Motion", "Torque", "Angular Momentum"]
        },

        gravitation: {
            title: "Gravitation and Orbital Motion",
            icon: "🪐",
            sections: [
                {
                    title: "Universal Gravitation",
                    content: [
                        "Newton's law: F = GMm/r²",
                        "Gravitational field: g = GM/r²",
                        "Weight vs. mass: Weight = mg (varies with location)"
                    ]
                },
                {
                    title: "Orbital Motion",
                    content: [
                        "Circular orbital velocity: v = √(GM/r)",
                        "Orbital period: T = 2π√(r³/GM) (Kepler's 3rd law)",
                        "Centripetal force = Gravitational force: mv²/r = GMm/r²"
                    ]
                },
                {
                    title: "Energy in Orbits",
                    content: [
                        "Gravitational PE: U = -GMm/r",
                        "Total orbital energy: E = KE + PE = -GMm/(2r)",
                        "Escape velocity: v_escape = √(2GM/r)"
                    ]
                }
            ],
            practiceQuestions: ["gravitation"],
            factSheetSections: ["Gravitation", "Orbital Motion"]
        },

        shm: {
            title: "Simple Harmonic Motion",
            icon: "〰️",
            sections: [
                {
                    title: "SHM Characteristics",
                    content: [
                        "Restoring force: F = -kx (proportional to displacement)",
                        "Acceleration: a = -ω²x (toward equilibrium)",
                        "Motion is sinusoidal: x(t) = A cos(ωt + φ)"
                    ]
                },
                {
                    title: "SHM Parameters",
                    content: [
                        "Amplitude (A): Maximum displacement from equilibrium",
                        "Angular frequency: ω = √(k/m) for springs",
                        "Period: T = 2π/ω = 2π√(m/k) for springs",
                        "Frequency: f = 1/T = ω/(2π)"
                    ]
                },
                {
                    title: "Energy in SHM",
                    content: [
                        "Total energy: E = ½kA² (constant)",
                        "At maximum displacement: E = PE = ½kA²",
                        "At equilibrium: E = KE = ½mv_max²",
                        "Energy transformation: PE ↔ KE continuously"
                    ]
                }
            ],
            practiceQuestions: ["shm"],
            factSheetSections: ["Simple Harmonic Motion", "Oscillations"]
        },

        fluids: {
            title: "Fluid Mechanics",
            icon: "💧",
            sections: [
                {
                    title: "Fluid Statics",
                    content: [
                        "Pressure: P = F/A (force per unit area)",
                        "Hydrostatic pressure: P = P₀ + ρgh",
                        "Pascal's principle: Pressure applied to fluid is transmitted equally"
                    ]
                },
                {
                    title: "Buoyancy",
                    content: [
                        "Archimedes' principle: F_buoyant = ρ_fluid × V_displaced × g",
                        "Object floats when: ρ_object < ρ_fluid",
                        "Apparent weight: W_apparent = W_actual - F_buoyant"
                    ]
                },
                {
                    title: "Fluid Dynamics",
                    content: [
                        "Continuity equation: A₁v₁ = A₂v₂ (conservation of mass)",
                        "Bernoulli's equation: P + ½ρv² + ρgh = constant",
                        "Applications: Venturi effect, airplane lift, hydraulic systems"
                    ]
                }
            ],
            practiceQuestions: ["fluids"],
            factSheetSections: ["Fluids", "Pressure", "Buoyancy"]
        },

        waves: {
            title: "Waves and Sound",
            icon: "🌊",
            sections: [
                {
                    title: "Wave Properties",
                    content: [
                        "Wavelength (λ): Distance between consecutive crests",
                        "Frequency (f): Number of waves per second",
                        "Period (T): Time for one complete wave",
                        "Wave equation: v = fλ"
                    ]
                },
                {
                    title: "Wave Types",
                    content: [
                        "Transverse: Vibration perpendicular to wave direction",
                        "Longitudinal: Vibration parallel to wave direction (sound)",
                        "Mechanical: Require medium (sound, water waves)",
                        "Electromagnetic: Don't require medium (light, radio)"
                    ]
                },
                {
                    title: "Wave Behavior",
                    content: [
                        "Reflection: Wave bounces off boundary",
                        "Refraction: Wave bends when entering new medium",
                        "Interference: Waves add constructively or destructively",
                        "Superposition: Net displacement = sum of individual displacements"
                    ]
                }
            ],
            practiceQuestions: ["waves"],
            factSheetSections: ["Waves", "Sound", "Wave Properties"]
        }
    },

    // Initialize study guides system
    init: function() {
        this.addStudyGuideAccess();
        this.setupEventListeners();
    },

    // Add study guide access to the main interface
    addStudyGuideAccess: function() {
        const studyResources = document.querySelector('.study-resources');
        if (studyResources) {
            const guideLink = document.createElement('a');
            guideLink.href = '#';
            guideLink.className = 'resource-link study-guide-link';
            guideLink.innerHTML = '📖 Interactive Study Guides';
            guideLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showStudyGuideMenu();
            });
            
            const resourceLinks = studyResources.querySelector('.resource-links');
            if (resourceLinks) {
                resourceLinks.appendChild(guideLink);
                
                const guideDescription = document.createElement('p');
                guideDescription.className = 'text-muted';
                guideDescription.textContent = 'Topic-based study guides with integrated practice questions';
                resourceLinks.appendChild(guideDescription);
            }
        }
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Listen for topic selection to show relevant study guide
        document.addEventListener('subjectSelected', (event) => {
            const subject = event.detail.subject;
            if (subject !== 'all' && this.guideData[subject]) {
                this.addQuickGuideAccess(subject);
            }
        });
    },

    // Add quick access to study guide for selected topic
    addQuickGuideAccess: function(topic) {
        const startScreen = document.getElementById('start-screen');
        if (startScreen && !document.getElementById('quick-guide-access')) {
            const quickAccess = document.createElement('div');
            quickAccess.id = 'quick-guide-access';
            quickAccess.className = 'quick-guide-access';
            quickAccess.innerHTML = `
                <div class="quick-guide-content">
                    <span class="guide-icon">${this.guideData[topic].icon}</span>
                    <span class="guide-text">Study ${this.guideData[topic].title} before starting?</span>
                    <button class="btn btn-secondary btn-sm" onclick="StudyGuides.showStudyGuide('${topic}')">
                        📖 Open Guide
                    </button>
                </div>
            `;
            
            const startButton = document.querySelector('.start-btn').parentNode;
            startButton.parentNode.insertBefore(quickAccess, startButton);
        }
    },

    // Show study guide menu
    showStudyGuideMenu: function() {
        const modal = document.createElement('div');
        modal.className = 'study-guide-modal';
        modal.innerHTML = `
            <div class="study-guide-menu">
                <div class="menu-header">
                    <h3>📖 AP Physics Study Guides</h3>
                    <button class="close-menu">×</button>
                </div>
                
                <div class="guide-grid">
                    ${Object.entries(this.guideData).map(([key, guide]) => `
                        <div class="guide-card" onclick="StudyGuides.showStudyGuide('${key}')">
                            <div class="guide-icon">${guide.icon}</div>
                            <div class="guide-title">${guide.title}</div>
                            <div class="guide-sections">${guide.sections.length} sections</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="menu-footer">
                    <p class="text-muted">
                        Each guide includes key concepts, formulas, and problem-solving strategies 
                        integrated with practice questions and fact sheet references.
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event handlers
        modal.querySelector('.close-menu').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    },

    // Show specific study guide
    showStudyGuide: function(topic) {
        const guide = this.guideData[topic];
        if (!guide) return;
        
        // Close any existing modals
        const existingModals = document.querySelectorAll('.study-guide-modal, .study-guide-viewer');
        existingModals.forEach(modal => modal.remove());
        
        const modal = document.createElement('div');
        modal.className = 'study-guide-viewer';
        modal.innerHTML = `
            <div class="guide-content">
                <div class="guide-header">
                    <div class="guide-title-section">
                        <span class="guide-icon-large">${guide.icon}</span>
                        <div>
                            <h2>${guide.title}</h2>
                            <p class="guide-subtitle">Comprehensive study guide with practice integration</p>
                        </div>
                    </div>
                    <div class="guide-controls">
                        <button class="btn btn-secondary" onclick="StudyGuides.printGuide('${topic}')">🖨️ Print</button>
                        <button class="close-guide">×</button>
                    </div>
                </div>
                
                <div class="guide-body">
                    <div class="guide-sections">
                        ${guide.sections.map((section, index) => `
                            <div class="guide-section">
                                <h3>${section.title}</h3>
                                <div class="section-content">
                                    ${section.content.map(item => `<div class="content-item">${item}</div>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="guide-actions">
                        <div class="action-section">
                            <h4>🎯 Practice Questions</h4>
                            <p>Test your understanding with ${topic} questions</p>
                            <button class="btn btn-primary" onclick="StudyGuides.startTopicPractice('${topic}')">
                                Start ${guide.title} Practice
                            </button>
                        </div>
                        
                        <div class="action-section">
                            <h4>📋 Fact Sheet Reference</h4>
                            <p>Quick access to relevant formulas and definitions</p>
                            <div class="fact-sheet-links">
                                ${guide.factSheetSections.map(section => `
                                    <button class="btn btn-secondary btn-sm" onclick="StudyGuides.openFactSheetSection('${section}')">
                                        ${section}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="guide-footer">
                    <div class="study-tips">
                        <h4>💡 Study Tips</h4>
                        <ul>
                            <li>Review key concepts before attempting practice problems</li>
                            <li>Use the fact sheet as a quick reference during problem solving</li>
                            <li>Focus on understanding the physics, not just memorizing formulas</li>
                            <li>Practice with different question types to build confidence</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event handlers
        modal.querySelector('.close-guide').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Track study guide usage
        this.trackGuideUsage(topic);
    },

    // Start topic-specific practice
    startTopicPractice: function(topic) {
        // Close guide modal
        const modal = document.querySelector('.study-guide-viewer');
        if (modal) modal.remove();
        
        // Set topic filter and start quiz
        const topicButton = document.querySelector(`[data-subject="${topic}"]`);
        if (topicButton) {
            // Clear other selections
            document.querySelectorAll('.subject-btn').forEach(btn => btn.classList.remove('active'));
            topicButton.classList.add('active');
            
            // Set learning mode
            document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
            const learningMode = document.querySelector('[data-mode="learning"]');
            if (learningMode) learningMode.classList.add('active');
            
            // Start the quiz
            const startButton = document.getElementById('start-quiz');
            if (startButton) startButton.click();
        }
    },

    // Open specific fact sheet section
    openFactSheetSection: function(sectionName) {
        // This would integrate with the existing fact sheet system
        const factSheetUrl = 'factsheet-complete.html#' + sectionName.replace(/\s+/g, '-').toLowerCase();
        window.open(factSheetUrl, '_blank');
    },

    // Print study guide
    printGuide: function(topic) {
        const guide = this.guideData[topic];
        if (!guide) return;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${guide.title} - Study Guide</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    h1 { color: #2c5aa0; border-bottom: 2px solid #2c5aa0; }
                    h2 { color: #4a7c59; margin-top: 30px; }
                    .content-item { margin: 8px 0; padding-left: 20px; }
                    .section { margin-bottom: 25px; }
                    @media print { body { margin: 20px; } }
                </style>
            </head>
            <body>
                <h1>${guide.icon} ${guide.title}</h1>
                <p><em>AP Physics 1 Study Guide</em></p>
                
                ${guide.sections.map(section => `
                    <div class="section">
                        <h2>${section.title}</h2>
                        ${section.content.map(item => `<div class="content-item">• ${item}</div>`).join('')}
                    </div>
                `).join('')}
                
                <div class="section">
                    <h2>Recommended Practice</h2>
                    <div class="content-item">• Use the interactive quiz to practice ${topic} questions</div>
                    <div class="content-item">• Reference the AP Physics 1 fact sheet for quick formula lookup</div>
                    <div class="content-item">• Focus on understanding concepts, not just memorizing formulas</div>
                </div>
                
                <p style="margin-top: 40px; text-align: center; color: #666;">
                    Generated from AP Physics Quiz Application - ${new Date().toLocaleDateString()}
                </p>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    },

    // Track study guide usage
    trackGuideUsage: function(topic) {
        try {
            let guideStats = Utils.storage.get('study_guide_stats', {
                totalGuideViews: 0,
                topicViews: {},
                lastAccessed: {}
            });
            
            guideStats.totalGuideViews++;
            guideStats.topicViews[topic] = (guideStats.topicViews[topic] || 0) + 1;
            guideStats.lastAccessed[topic] = new Date().toISOString();
            
            Utils.storage.set('study_guide_stats', guideStats);
            
        } catch (error) {
            Utils.handleError(error, 'StudyGuides.trackGuideUsage');
        }
    },

    // Get study guide analytics
    getGuideAnalytics: function() {
        try {
            const stats = Utils.storage.get('study_guide_stats', {
                totalGuideViews: 0,
                topicViews: {},
                lastAccessed: {}
            });
            
            return {
                totalViews: stats.totalGuideViews,
                mostViewedTopics: Object.entries(stats.topicViews)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 3),
                recentlyAccessed: Object.entries(stats.lastAccessed)
                    .sort(([,a], [,b]) => new Date(b) - new Date(a))
                    .slice(0, 5)
            };
            
        } catch (error) {
            Utils.handleError(error, 'StudyGuides.getGuideAnalytics');
            return null;
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => StudyGuides.init());
} else {
    StudyGuides.init();
}