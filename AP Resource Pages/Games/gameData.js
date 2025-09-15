// Game Data and Configuration
const GAME_CONFIG = {
    SESSION_TIME: 20 * 60, // 20 minutes in seconds
    LEVELS: [
        { name: "Novice Explorer", minPoints: 0, maxPoints: 100, description: "Learn basic graph reading and identify positive/negative slopes" },
        { name: "Graph Detective", minPoints: 100, maxPoints: 250, description: "Slope interpretation, matching motion descriptions to graphs" },
        { name: "Motion Analyst", minPoints: 250, maxPoints: 500, description: "Area under curves, quantitative calculations" },
        { name: "Pattern Master", minPoints: 500, maxPoints: 800, description: "Multi-representation matching (x-t ↔ v-t)" },
        { name: "Curve Interpreter", minPoints: 800, maxPoints: 1200, description: "Non-linear motion, parabolic curves" },
        { name: "Acceleration Expert", minPoints: 1200, maxPoints: 1700, description: "Inferring acceleration from position-time concavity" },
        { name: "Multi-Graph Wizard", minPoints: 1700, maxPoints: 2300, description: "Three-graph coordination (x-t, v-t, a-t)" },
        { name: "Misconception Crusher", minPoints: 2300, maxPoints: 3000, description: "Advanced error identification challenges" },
        { name: "Physics Sage", minPoints: 3000, maxPoints: 4000, description: "Real-world scenario interpretation" },
        { name: "Kinematics Grandmaster", minPoints: 4000, maxPoints: 999999, description: "Master-level synthesis problems" }
    ],
    BADGES: [
        { id: 'graph-reader', name: 'Graph Reader', description: 'Complete 25 basic matching activities', icon: '📊', requirement: 25, type: 'count' },
        { id: 'slope-master', name: 'Slope Master', description: 'Perfect score on 10 slope interpretation tasks', icon: '📈', requirement: 10, type: 'perfect' },
        { id: 'area-calculator', name: 'Area Calculator', description: 'Successfully solve 15 area-under-curve problems', icon: '📐', requirement: 15, type: 'count' },
        { id: 'sketch-artist', name: 'Sketch Artist', description: 'Create 20 accurate hand-drawn graphs', icon: '✏️', requirement: 20, type: 'count' },
        { id: 'misconception-hunter', name: 'Misconception Hunter', description: 'Identify 30 common physics errors', icon: '🔍', requirement: 30, type: 'count' },
        { id: 'speed-demon', name: 'Speed Demon', description: 'Complete session in under 15 minutes with >85% accuracy', icon: '⚡', requirement: 85, type: 'speed' },
        { id: 'perfectionist', name: 'Perfectionist', description: 'Achieve 100% accuracy in any 10-question set', icon: '🎯', requirement: 100, type: 'accuracy' },
        { id: 'comeback-kid', name: 'Comeback Kid', description: 'Improve from <60% to >90% accuracy in same topic', icon: '📈', requirement: 90, type: 'improvement' },
        { id: 'consistency-crown', name: 'Consistency Crown', description: 'Maintain >80% accuracy across 5 consecutive sessions', icon: '👑', requirement: 80, type: 'consistency' },
        { id: 'explorer', name: 'Explorer', description: 'Try every activity type available at current level', icon: '🧭', requirement: 1, type: 'variety' }
    ],
    DAILY_CHALLENGES: [
        { name: 'Misconception Monday', description: 'Focus on identifying and correcting common errors', bonus: 1.5 },
        { name: 'Sketch Tuesday', description: 'Emphasis on hand-drawing accurate graphs', bonus: 1.5 },
        { name: 'Quantitative Wednesday', description: 'Calculation-heavy problems with numerical answers', bonus: 1.5 },
        { name: 'Multi-Rep Thursday', description: 'Complex three-graph coordination challenges', bonus: 1.5 },
        { name: 'Free-Play Friday', description: 'Student choice of activity types with bonus multipliers', bonus: 1.3 }
    ]
};

// Question Templates by Level and Type
const QUESTION_TEMPLATES = {
    // Level 1: Novice Explorer (0-100 pts)
    level1: [
        {
            type: 'graph-reading',
            difficulty: 1,
            points: 10,
            template: {
                question: "Look at this position-time graph. Is the object moving in the positive or negative direction?",
                graphType: "position-time",
                graphData: { slope: "positive", intercept: 0, type: "linear" },
                answers: ["Positive direction", "Negative direction", "Not moving", "Cannot determine"],
                correct: 0,
                explanation: "A positive slope on a position-time graph means the object is moving in the positive direction.",
                misconceptions: ["Students often confuse positive position with positive velocity"]
            }
        },
        {
            type: 'slope-identification',
            difficulty: 1,
            points: 15,
            template: {
                question: "What does the slope represent on a velocity-time graph?",
                graphType: "velocity-time",
                graphData: { slope: "positive", intercept: 5, type: "linear" },
                answers: ["Acceleration", "Velocity", "Position", "Time"],
                correct: 0,
                explanation: "The slope of a velocity-time graph represents acceleration.",
                misconceptions: ["Students may think slope represents velocity on any graph"]
            }
        }
    ],
    
    // Level 2: Graph Detective (100-250 pts)
    level2: [
        {
            type: 'misconception-identification',
            difficulty: 2,
            points: 25,
            template: {
                question: "A student says 'Since the position is positive, the velocity must be positive.' Is this correct?",
                scenario: "position-velocity-confusion",
                answers: ["Always correct", "Sometimes correct", "Never correct", "Only for linear motion"],
                correct: 1,
                explanation: "Position and velocity are independent. An object can have positive position while moving in the negative direction.",
                misconceptions: ["Common confusion between position value and direction of motion"]
            }
        }
    ],
    
    // Level 3: Motion Analyst (250-500 pts)
    level3: [
        {
            type: 'area-calculation',
            difficulty: 3,
            points: 30,
            template: {
                question: "Calculate the displacement represented by the area under this velocity-time graph.",
                graphType: "velocity-time",
                graphData: { shape: "rectangle", base: 4, height: 10 },
                answers: ["40 m", "14 m", "2.5 m", "10 m"],
                correct: 0,
                explanation: "Area under v-t graph = displacement. Rectangle area = base × height = 4s × 10m/s = 40m",
                misconceptions: ["Students may add base + height instead of multiplying"]
            }
        },
        {
            type: 'quantitative-analysis',
            difficulty: 3,
            points: 35,
            template: {
                question: "An object moves with constant acceleration from rest. After 5 seconds, its velocity is 20 m/s. What is its acceleration?",
                graphType: "velocity-time",
                calculation: true,
                answers: ["4 m/s²", "2 m/s²", "100 m/s²", "25 m/s²"],
                correct: 0,
                explanation: "a = Δv/Δt = (20 - 0)/(5 - 0) = 4 m/s²",
                misconceptions: ["Students may multiply instead of divide"]
            }
        }
    ],
    
    // Level 4: Pattern Master (500-800 pts)
    level4: [
        {
            type: 'multi-representation',
            difficulty: 4,
            points: 40,
            template: {
                question: "Match the position-time graph with its corresponding velocity-time graph.",
                graphType: "multi-graph",
                primaryGraph: { type: "position-time", shape: "parabolic-up" },
                answers: [
                    { type: "velocity-time", shape: "linear-positive", correct: true },
                    { type: "velocity-time", shape: "parabolic", correct: false },
                    { type: "velocity-time", shape: "constant", correct: false },
                    { type: "velocity-time", shape: "linear-negative", correct: false }
                ],
                explanation: "A parabolic position graph (constant acceleration) corresponds to a linear velocity graph.",
                misconceptions: ["Students may think parabolic position means parabolic velocity"]
            }
        }
    ],
    
    // Level 5: Curve Interpreter (800-1200 pts)
    level5: [
        {
            type: 'concavity-analysis',
            difficulty: 5,
            points: 45,
            template: {
                question: "This position-time graph curves upward. What does this tell us about the acceleration?",
                graphType: "position-time",
                graphData: { concavity: "up", shape: "parabolic" },
                answers: ["Acceleration is positive", "Acceleration is negative", "Acceleration is zero", "Cannot determine"],
                correct: 0,
                explanation: "Upward concavity (curves up) on x-t graph indicates positive acceleration.",
                misconceptions: ["Students may not connect concavity to acceleration"]
            }
        }
    ]
};

// Sample Questions for Different Activity Types
const SAMPLE_QUESTIONS = [
    {
        id: 1,
        type: 'graph-matching',
        level: 1,
        points: 15,
        question: "A car starts from rest and accelerates at a constant rate. Which graph best represents its velocity over time?",
        scenario: "A red car begins at a stop sign and accelerates uniformly down a straight road.",
        graphType: "velocity-time",
        animation: {
            type: 'constant-acceleration',
            initialVelocity: 0,
            acceleration: 2,
            duration: 4000,
            showVelocityVector: true,
            vehicleType: 'car'
        },
        options: [
            {
                id: 'a',
                description: "Linear line starting at origin with positive slope",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 20 },
                correct: true
            },
            {
                id: 'b', 
                description: "Horizontal line above x-axis",
                graphData: { type: 'horizontal', y: 15 },
                correct: false
            },
            {
                id: 'c',
                description: "Parabolic curve starting at origin",
                graphData: { type: 'parabolic', a: 0.2, b: 0, c: 0 },
                correct: false
            },
            {
                id: 'd',
                description: "Linear line with negative slope", 
                graphData: { type: 'linear', startX: 0, startY: 20, endX: 10, endY: 0 },
                correct: false
            }
        ],
        explanation: "Constant acceleration from rest produces a linear velocity-time graph starting at the origin.",
        commonMistakes: [
            "Confusing constant acceleration with constant velocity",
            "Thinking acceleration means curved graphs everywhere"
        ],
        hints: [
            "What does 'constant acceleration' mean for the slope of a v-t graph?",
            "If the car starts 'from rest', what should the initial velocity be?"
        ]
    },
    
    {
        id: 2,
        type: 'misconception-identification',
        level: 2,
        points: 25,
        question: "A student looks at this position-time graph and says: 'The object is slowing down because the graph is going down.' Identify the error in reasoning.",
        graphType: "position-time",
        studentStatement: "The object is slowing down because the position values are decreasing.",
        graphData: { type: 'linear', slope: -5, intercept: 50 },
        options: [
            {
                id: 'a',
                text: "The student is correct - decreasing position means slowing down",
                correct: false
            },
            {
                id: 'b',
                text: "The student confused position with velocity - constant negative slope means constant velocity in negative direction",
                correct: true
            },
            {
                id: 'c',
                text: "The graph shows acceleration, not velocity",
                correct: false
            },
            {
                id: 'd',
                text: "Position-time graphs cannot show speed information",
                correct: false
            }
        ],
        explanation: "The slope of a position-time graph represents velocity, not the y-values. A straight line means constant velocity, not changing speed.",
        misconception: "position-value-velocity-confusion",
        remediation: "Remember: slope of position-time graph = velocity. The y-values represent position, not speed."
    },

    {
        id: 3,
        type: 'graph-matching',
        level: 2,
        points: 25,
        question: "An object moves with constant velocity. Which position-time graph best represents this motion?",
        scenario: "A car travels down a highway at a steady 60 mph without speeding up or slowing down.",
        graphType: "position-time",
        options: [
            {
                id: 'a',
                description: "Linear line with positive slope",
                graphData: { type: 'linear', startX: 0, startY: 5, endX: 10, endY: 20 },
                correct: true
            },
            {
                id: 'b',
                description: "Horizontal line",
                graphData: { type: 'horizontal', y: 10 },
                correct: false
            },
            {
                id: 'c',
                description: "Parabolic curve starting at origin",
                graphData: { type: 'parabolic', a: 0.2, b: 0, c: 5 },
                correct: false
            },
            {
                id: 'd',
                description: "Steep linear line",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 25 },
                correct: false
            }
        ],
        explanation: "Constant velocity means position changes at a steady rate, producing a straight line on a position-time graph.",
        commonMistakes: [
            "Thinking constant velocity means horizontal line",
            "Confusing position-time with velocity-time graphs"
        ],
        hints: [
            "What happens to position when velocity is constant?",
            "A straight line means constant rate of change"
        ]
    },

    {
        id: 4,
        type: 'area-under-curve',
        level: 3,
        points: 35,
        question: "Calculate the total displacement by finding the area under this velocity-time graph.",
        graphType: "velocity-time",
        graphData: {
            type: 'complex',
            regions: [
                { shape: 'triangle', base: 2, height: 10, xStart: 0 },
                { shape: 'rectangle', base: 3, height: 10, xStart: 2 },
                { shape: 'triangle', base: 2, height: -5, xStart: 5 }
            ]
        },
        calculation: {
            steps: [
                "Area of first triangle: ½ × 2s × 10m/s = 10m",
                "Area of rectangle: 3s × 10m/s = 30m", 
                "Area of second triangle: ½ × 2s × (-5m/s) = -5m",
                "Total displacement: 10m + 30m + (-5m) = 35m"
            ],
            answer: 35,
            units: "m"
        },
        options: [
            { text: "35 m", correct: true },
            { text: "45 m", correct: false, error: "Forgot negative area" },
            { text: "40 m", correct: false, error: "Calculation error" },
            { text: "25 m", correct: false, error: "Wrong triangle area formula" }
        ],
        hints: [
            "Break the graph into simple geometric shapes",
            "Remember that areas below the x-axis are negative",
            "Add all areas algebraically for total displacement"
        ]
    },

    // New Animated Question Types
    {
        id: 5,
        type: 'animation-interpretation',
        level: 2,
        points: 30,
        question: "Watch this animation and identify which position-time graph best represents the motion.",
        animation: {
            type: 'constant-velocity',
            velocity: 8,
            duration: 4000
        },
        options: [
            {
                id: 'a',
                description: "Linear line with positive slope",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 15 },
                correct: true
            },
            {
                id: 'b',
                description: "Horizontal line",
                graphData: { type: 'horizontal', y: 10 },
                correct: false
            },
            {
                id: 'c',
                description: "Parabolic curve",
                graphData: { type: 'parabolic', a: 0.3, b: 0, c: 0 },
                correct: false
            },
            {
                id: 'd',
                description: "Linear line with negative slope",
                graphData: { type: 'linear', startX: 0, startY: 15, endX: 10, endY: 0 },
                correct: false
            }
        ],
        explanation: "Constant velocity motion produces a linear position-time graph with constant slope.",
        hints: [
            "Watch how the object's position changes over time",
            "Constant velocity means constant rate of position change",
            "The slope of position vs. time equals velocity"
        ]
    },


    {
        id: 6,
        type: 'graph-animation-match',
        level: 4,
        points: 40,
        question: "Match the pendulum animation with its corresponding velocity-time graph.",
        animation: {
            type: 'pendulum',
            initialAngle: Math.PI / 6,
            duration: 8000
        },
        scenario: "A pendulum swings back and forth with simple harmonic motion.",
        options: [
            {
                id: 'a',
                description: "Sinusoidal wave",
                graphData: { type: 'sinusoidal', amplitude: 10, period: 2 },
                correct: true
            },
            {
                id: 'b',
                description: "Linear sawtooth pattern",
                graphData: { type: 'sawtooth' },
                correct: false
            },
            {
                id: 'c',
                description: "Constant horizontal line",
                graphData: { type: 'horizontal', y: 0 },
                correct: false
            },
            {
                id: 'd',
                description: "Linear decreasing line",
                graphData: { type: 'linear', startX: 0, startY: 15, endX: 10, endY: 5 },
                correct: false
            }
        ],
        explanation: "Simple harmonic motion like a pendulum produces sinusoidal velocity vs. time graphs.",
        hints: [
            "Notice the pendulum's velocity changes as it swings",
            "Maximum speed occurs at the bottom of the swing",
            "The motion is periodic and symmetric"
        ]
    },

    // Additional Kinematic Graph Matching Questions
    {
        id: 7,
        type: 'graph-matching',
        level: 2,
        points: 20,
        question: "An object starts with a positive velocity and slows down to a stop. Which position-time graph represents this motion?",
        scenario: "A car is moving forward but applies the brakes and comes to a complete stop.",
        graphType: "position-time",
        options: [
            {
                id: 'a',
                description: "Upward curving line that levels off",
                graphData: { type: 'parabolic', a: -0.1, b: 3, c: 0 },
                correct: true
            },
            {
                id: 'b',
                description: "Straight line with positive slope",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 15 },
                correct: false
            },
            {
                id: 'c',
                description: "Downward curving parabola",
                graphData: { type: 'parabolic', a: 0.2, b: -2, c: 5 },
                correct: false
            },
            {
                id: 'd',
                description: "Horizontal line",
                graphData: { type: 'horizontal', y: 10 },
                correct: false
            }
        ],
        explanation: "When an object slows down from positive velocity to rest, position increases at a decreasing rate, creating an upward curve that levels off.",
        commonMistakes: [
            "Confusing position graphs with velocity graphs",
            "Not understanding that slowing down means decreasing slope, not negative position"
        ],
        hints: [
            "Think about how position changes when velocity decreases",
            "The slope of position vs. time represents velocity"
        ]
    },

    {
        id: 8,
        type: 'graph-matching',
        level: 3,
        points: 25,
        question: "Match this velocity-time graph to its corresponding acceleration-time graph.",
        primaryGraph: {
            type: "velocity-time",
            data: { type: 'linear', startX: 0, startY: 5, endX: 10, endY: 15 }
        },
        graphType: "acceleration-time",
        options: [
            {
                id: 'a',
                description: "Horizontal line above zero",
                graphData: { type: 'horizontal', y: 1 },
                correct: true
            },
            {
                id: 'b',
                description: "Linear increasing line",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 5 },
                correct: false
            },
            {
                id: 'c',
                description: "Horizontal line at zero",
                graphData: { type: 'horizontal', y: 0 },
                correct: false
            },
            {
                id: 'd',
                description: "Linear decreasing line",
                graphData: { type: 'linear', startX: 0, startY: 2, endX: 10, endY: -1 },
                correct: false
            }
        ],
        explanation: "A linear velocity-time graph indicates constant acceleration. The slope of the v-t graph gives the acceleration value.",
        commonMistakes: [
            "Thinking acceleration graph should match velocity graph shape",
            "Confusing the slope with the y-values"
        ],
        hints: [
            "What does the slope of a velocity-time graph represent?",
            "If velocity changes at a constant rate, what does that say about acceleration?"
        ]
    },

    {
        id: 9,
        type: 'graph-matching',
        level: 3,
        points: 30,
        question: "An object undergoes constant positive acceleration from rest. Which set of graphs correctly shows position, velocity, and acceleration vs. time?",
        graphType: "multi-graph",
        options: [
            {
                id: 'a',
                description: "Position: parabolic up, Velocity: linear up, Acceleration: horizontal",
                correct: true,
                multiGraphs: {
                    position: { type: 'parabolic', a: 0.2, b: 0, c: 0 },
                    velocity: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 8 },
                    acceleration: { type: 'horizontal', y: 1 }
                }
            },
            {
                id: 'b',
                description: "Position: linear up, Velocity: horizontal, Acceleration: zero",
                correct: false,
                multiGraphs: {
                    position: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 10 },
                    velocity: { type: 'horizontal', y: 5 },
                    acceleration: { type: 'horizontal', y: 0 }
                }
            },
            {
                id: 'c',
                description: "Position: linear up, Velocity: parabolic up, Acceleration: linear up",
                correct: false,
                multiGraphs: {
                    position: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 8 },
                    velocity: { type: 'parabolic', a: 0.1, b: 0, c: 0 },
                    acceleration: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 3 }
                }
            },
            {
                id: 'd',
                description: "Position: horizontal, Velocity: linear down, Acceleration: horizontal negative",
                correct: false,
                multiGraphs: {
                    position: { type: 'horizontal', y: 5 },
                    velocity: { type: 'linear', startX: 0, startY: 5, endX: 10, endY: 0 },
                    acceleration: { type: 'horizontal', y: -0.5 }
                }
            }
        ],
        explanation: "Constant acceleration produces: quadratic position (parabolic), linear velocity, and constant acceleration graphs.",
        teachingPoints: [
            "Position is the integral of velocity (parabolic when velocity is linear)",
            "Velocity is the integral of acceleration (linear when acceleration is constant)",
            "Acceleration is constant (horizontal line)"
        ],
        hints: [
            "Think about the mathematical relationships: position = ∫velocity, velocity = ∫acceleration",
            "Starting from rest means initial velocity = 0"
        ]
    },

    {
        id: 10,
        type: 'graph-matching',
        level: 4,
        points: 35,
        question: "This position-time graph shows an object that speeds up, moves at constant velocity, then slows down. Which velocity-time graph matches?",
        primaryGraph: {
            type: "position-time",
            data: { type: 'piecewise', segments: [
                { startX: 0, endX: 3, type: 'parabolic', a: 0.5, b: 0, c: 0 },
                { startX: 3, endX: 7, type: 'linear', slope: 3, intercept: 4.5 },
                { startX: 7, endX: 10, type: 'parabolic', a: -0.3, b: 4.2, c: -10.25 }
            ]}
        },
        graphType: "velocity-time",
        options: [
            {
                id: 'a',
                description: "Linear up, then horizontal, then linear down",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 3, type: 'linear', slope: 1, intercept: 0 },
                    { startX: 3, endX: 7, type: 'horizontal', y: 3 },
                    { startX: 7, endX: 10, type: 'linear', slope: -1, intercept: 10 }
                ]},
                correct: true
            },
            {
                id: 'b',
                description: "Parabolic up, then linear up, then parabolic down",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 3, type: 'parabolic', a: 0.3, b: 0, c: 0 },
                    { startX: 3, endX: 7, type: 'linear', slope: 0.5, intercept: 2 },
                    { startX: 7, endX: 10, type: 'parabolic', a: -0.2, b: 3, c: -8 }
                ]},
                correct: false
            },
            {
                id: 'c',
                description: "Constant horizontal line",
                graphData: { type: 'horizontal', y: 2 },
                correct: false
            },
            {
                id: 'd',
                description: "Linear up throughout",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 8 },
                correct: false
            }
        ],
        explanation: "The slope of position-time gives velocity. Curved position → changing velocity (linear). Straight position → constant velocity (horizontal).",
        commonMistakes: [
            "Thinking velocity graph should have same shape as position graph",
            "Not understanding that slope of position-time equals velocity"
        ],
        hints: [
            "Look at how steep the position graph is at each segment",
            "Curved segments have changing slope, straight segments have constant slope"
        ]
    },

    {
        id: 11,
        type: 'misconception-identification',
        level: 2,
        points: 25,
        question: "A student says: 'The object is moving backward because the acceleration graph is below zero.' What's wrong with this reasoning?",
        graphType: "acceleration-time",
        studentStatement: "Negative acceleration always means moving backward.",
        graphData: { type: 'horizontal', y: -2 },
        options: [
            {
                id: 'a',
                text: "The student is correct - negative acceleration means backward motion",
                correct: false
            },
            {
                id: 'b',
                text: "Negative acceleration means slowing down, not necessarily moving backward",
                correct: true
            },
            {
                id: 'c',
                text: "Acceleration graphs don't show direction of motion",
                correct: false
            },
            {
                id: 'd',
                text: "The graph is showing velocity, not acceleration",
                correct: false
            }
        ],
        explanation: "Negative acceleration can mean either slowing down while moving forward, or speeding up while moving backward. Direction depends on velocity, not acceleration.",
        misconception: "acceleration-direction-confusion",
        remediation: "Remember: acceleration tells you how velocity is changing, not which direction you're moving. An object can have negative acceleration while moving forward (slowing down)."
    },

    {
        id: 12,
        type: 'area-under-curve',
        level: 3,
        points: 30,
        question: "Find the displacement during the motion shown in this velocity-time graph.",
        graphType: "velocity-time",
        graphData: {
            type: 'complex',
            regions: [
                { shape: 'rectangle', base: 3, height: 8, xStart: 0 },
                { shape: 'triangle', base: 2, height: -4, xStart: 3 },
                { shape: 'rectangle', base: 3, height: 4, xStart: 5 }
            ]
        },
        calculation: {
            steps: [
                "First rectangle: 3s × 8m/s = 24m",
                "Triangle: ½ × 2s × (-4m/s) = -4m", 
                "Second rectangle: 3s × 4m/s = 12m",
                "Total displacement: 24m + (-4m) + 12m = 32m"
            ],
            answer: 32,
            units: "m"
        },
        options: [
            { text: "32 m", correct: true },
            { text: "40 m", correct: false, error: "Ignored negative area" },
            { text: "28 m", correct: false, error: "Calculation error" },
            { text: "36 m", correct: false, error: "Wrong triangle area formula" }
        ],
        hints: [
            "Break into geometric shapes: rectangles and triangles",
            "Areas below the time axis are negative",
            "Add all areas algebraically for displacement"
        ]
    },

    // Kinematic Motion Graphs - Questions 13-50 (Position, Velocity, Acceleration Relationships Only)

    {
        id: 13,
        type: 'graph-matching',
        level: 2,
        points: 20,
        question: "A ball is thrown vertically upward. Which velocity-time graph best represents its motion until it returns to the starting height?",
        scenario: "Air resistance is negligible. The ball goes up, stops momentarily, then falls back down.",
        graphType: "velocity-time",
        options: [
            {
                id: 'a',
                description: "Linear line from positive to negative, crossing zero",
                graphData: { type: 'linear', startX: 0, startY: 15, endX: 6, endY: -15 },
                correct: true
            },
            {
                id: 'b',
                description: "Parabolic curve opening downward",
                graphData: { type: 'parabolic', a: -0.3, b: 0, c: 12 },
                correct: false
            },
            {
                id: 'c',
                description: "V-shaped graph with sharp point at zero",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 3, type: 'linear', slope: -5, intercept: 15 },
                    { startX: 3, endX: 6, type: 'linear', slope: 5, intercept: -15 }
                ]},
                correct: false
            },
            {
                id: 'd',
                description: "Horizontal line at zero velocity",
                graphData: { type: 'horizontal', y: 0 },
                correct: false
            }
        ],
        explanation: "Under constant gravitational acceleration, velocity changes linearly with time. The ball starts with positive velocity, decreases linearly to zero at the peak, then continues decreasing (becoming negative) as it falls.",
        standards: ["AP Physics 1: 3.A.1", "Regents: Motion in One Dimension"],
        commonMistakes: [
            "Thinking velocity graph should be curved like the trajectory",
            "Confusing position and velocity graphs"
        ]
    },

    {
        id: 14,
        type: 'graph-matching',
        level: 3,
        points: 25,
        question: "An object moves with the acceleration shown. If it starts from rest, which velocity-time graph matches?",
        primaryGraph: {
            type: "acceleration-time",
            data: { type: 'piecewise', segments: [
                { startX: 0, endX: 2, type: 'horizontal', y: 3 },
                { startX: 2, endX: 5, type: 'horizontal', y: 0 },
                { startX: 5, endX: 7, type: 'horizontal', y: -2 }
            ]}
        },
        graphType: "velocity-time",
        options: [
            {
                id: 'a',
                description: "Linear up, then horizontal, then linear down",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 2, type: 'linear', slope: 3, intercept: 0 },
                    { startX: 2, endX: 5, type: 'horizontal', y: 6 },
                    { startX: 5, endX: 7, type: 'linear', slope: -2, intercept: 16 }
                ]},
                correct: true
            },
            {
                id: 'b',
                description: "Horizontal, then linear up, then linear down",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 2, type: 'horizontal', y: 3 },
                    { startX: 2, endX: 5, type: 'linear', slope: 2, intercept: -1 },
                    { startX: 5, endX: 7, type: 'linear', slope: -2, intercept: 13 }
                ]},
                correct: false
            },
            {
                id: 'c',
                description: "Same shape as acceleration graph",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 2, type: 'horizontal', y: 3 },
                    { startX: 2, endX: 5, type: 'horizontal', y: 0 },
                    { startX: 5, endX: 7, type: 'horizontal', y: -2 }
                ]},
                correct: false
            },
            {
                id: 'd',
                description: "Parabolic curves matching acceleration",
                graphData: { type: 'parabolic', a: 0.2, b: -1, c: 2 },
                correct: false
            }
        ],
        explanation: "Velocity is the integral of acceleration. Constant acceleration produces linear velocity changes. The areas under the a-t graph give the velocity changes.",
        standards: ["AP Physics 1: 3.A.1.3", "Regents: Acceleration and Velocity"]
    },

    {
        id: 15,
        type: 'area-under-curve',
        level: 3,
        points: 30,
        question: "Calculate the change in velocity from this acceleration-time graph.",
        graphType: "acceleration-time",
        graphData: {
            type: 'complex',
            regions: [
                { shape: 'rectangle', base: 4, height: 2.5, xStart: 0 },
                { shape: 'triangle', base: 3, height: -1.5, xStart: 4 },
                { shape: 'rectangle', base: 2, height: 1, xStart: 7 }
            ]
        },
        calculation: {
            steps: [
                "Rectangle 1: 4s × 2.5m/s² = 10m/s",
                "Triangle: ½ × 3s × (-1.5m/s²) = -2.25m/s", 
                "Rectangle 2: 2s × 1m/s² = 2m/s",
                "Total Δv: 10 + (-2.25) + 2 = 9.75m/s"
            ],
            answer: 9.75,
            units: "m/s"
        },
        options: [
            { text: "9.75 m/s", correct: true },
            { text: "14.25 m/s", correct: false, error: "Forgot negative area" },
            { text: "12 m/s", correct: false, error: "Wrong triangle calculation" },
            { text: "7.5 m/s", correct: false, error: "Arithmetic error" }
        ],
        explanation: "The area under an acceleration-time graph equals the change in velocity. Include negative areas.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Graphical Analysis"]
    },

    // Advanced Kinematic Motion Graphs - Position/Velocity/Acceleration Relationships
    {
        id: 16,
        type: 'graph-matching',
        level: 3,
        points: 25,
        question: "An object starts from rest and undergoes constant acceleration of 2 m/s². Which position-time graph matches?",
        scenario: "Object starts at position x₀ = 5m with zero initial velocity",
        graphType: "position-time",
        options: [
            {
                id: 'a',
                description: "Parabola opening upward: x = 5 + t²",
                graphData: { type: 'parabolic', a: 1, b: 0, c: 5 },
                correct: true
            },
            {
                id: 'b',
                description: "Linear line: x = 5 + 2t",
                graphData: { type: 'linear', startX: 0, startY: 5, endX: 4, endY: 13 },
                correct: false
            },
            {
                id: 'c',
                description: "Parabola through origin: x = t²",
                graphData: { type: 'parabolic', a: 1, b: 0, c: 0 },
                correct: false
            },
            {
                id: 'd',
                description: "Horizontal line: x = 5",
                graphData: { type: 'horizontal', y: 5 },
                correct: false
            }
        ],
        explanation: "For constant acceleration from rest: x = x₀ + v₀t + ½at² = 5 + 0 + ½(2)t² = 5 + t². This creates a parabola opening upward.",
        standards: ["AP Physics 1: 3.A.1", "Regents: Kinematic Equations"]
    },

    {
        id: 17,
        type: 'misconception-identification',
        level: 2,
        points: 25,
        question: "A student says: 'Since the velocity graph is horizontal, the position must also be horizontal.' Identify the error.",
        graphType: "velocity-time",
        studentStatement: "Horizontal velocity graph means horizontal position graph.",
        graphData: { type: 'horizontal', y: 5 },
        options: [
            {
                id: 'a',
                text: "The student is correct - both graphs have the same shape",
                correct: false
            },
            {
                id: 'b',
                text: "Constant velocity means position changes at a constant rate, creating a linear position-time graph",
                correct: true
            },
            {
                id: 'c',
                text: "Position graphs are always horizontal when velocity is constant",
                correct: false
            },
            {
                id: 'd',
                text: "The graphs are unrelated to each other",
                correct: false
            }
        ],
        explanation: "Constant velocity means position changes at a steady rate. The position-time graph will be a straight line with constant positive slope, not horizontal.",
        misconception: "velocity-position-graph-confusion",
        standards: ["AP Physics 1: 3.A.1", "Regents: Motion Graph Relationships"]
    },

    // Position-Time Graph Analysis
    {
        id: 18,
        type: 'graph-matching',
        level: 4,
        points: 35,
        question: "From this position-time graph, determine which sections show positive, zero, and negative acceleration.",
        primaryGraph: {
            type: "position-time",
            data: { type: 'piecewise', segments: [
                { startX: 0, endX: 3, type: 'parabolic', a: 0.5, b: 0, c: 0 },
                { startX: 3, endX: 6, type: 'linear', slope: 3, intercept: 4.5 },
                { startX: 6, endX: 9, type: 'parabolic', a: -0.2, b: 2.4, c: -2.2 }
            ]}
        },
        graphType: "acceleration-analysis",
        options: [
            {
                id: 'a',
                text: "0-3s: positive acceleration, 3-6s: zero acceleration, 6-9s: negative acceleration",
                correct: true
            },
            {
                id: 'b',
                text: "0-3s: zero acceleration, 3-6s: positive acceleration, 6-9s: positive acceleration",
                correct: false
            },
            {
                id: 'c',
                text: "All sections show positive acceleration",
                correct: false
            },
            {
                id: 'd',
                text: "Cannot determine acceleration from position-time graphs",
                correct: false
            }
        ],
        explanation: "Acceleration is revealed by the concavity of position-time graphs: concave up = positive acceleration, straight = zero acceleration, concave down = negative acceleration.",
        standards: ["AP Physics 1: 3.A.1.4", "Regents: Concavity and Acceleration"]
    },

    {
        id: 19,
        type: 'area-under-curve',
        level: 3,
        points: 30,
        question: "Calculate the displacement of an object using this velocity-time graph over 6 seconds.",
        graphType: "velocity-time",
        graphData: {
            type: 'complex',
            regions: [
                { shape: 'triangle', base: 2, height: 4, xStart: 0 },
                { shape: 'rectangle', base: 2, height: 4, xStart: 2 },
                { shape: 'triangle', base: 2, height: -4, xStart: 4 }
            ]
        },
        calculation: {
            steps: [
                "Triangle 1: ½ × 2s × 4m/s = 4m",
                "Rectangle: 2s × 4m/s = 8m",
                "Triangle 2: ½ × 2s × (-4m/s) = -4m",
                "Total displacement: 4m + 8m + (-4m) = 8m"
            ],
            answer: 8,
            units: "m"
        },
        options: [
            { text: "8 m", correct: true },
            { text: "12 m", correct: false, error: "Ignored negative displacement" },
            { text: "16 m", correct: false, error: "Added all areas as positive" },
            { text: "4 m", correct: false, error: "Only counted first triangle" }
        ],
        explanation: "Displacement equals the area under a velocity-time graph. Areas below the time axis represent negative displacement.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Displacement"],
        teachingPoints: [
            "Area under v-t graph gives displacement",
            "Positive area = positive displacement",
            "Negative area = negative displacement"
        ]
    },

    {
        id: 20,
        type: 'graph-matching',
        level: 3,
        points: 25,
        question: "An object moves with decreasing speed in the positive direction, then stops. Which velocity-time graph represents this motion?",
        graphType: "velocity-time",
        options: [
            {
                id: 'a',
                description: "Linear decrease from positive to zero",
                graphData: { type: 'linear', startX: 0, startY: 8, endX: 10, endY: 0 },
                correct: true
            },
            {
                id: 'b',
                description: "Linear increase from zero to positive",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 8 },
                correct: false
            },
            {
                id: 'c',
                description: "Parabolic curve from positive to zero",
                graphData: { type: 'parabolic', a: -0.08, b: 0, c: 8 },
                correct: false
            },
            {
                id: 'd',
                description: "Horizontal line at constant positive velocity",
                graphData: { type: 'horizontal', y: 5 },
                correct: false
            }
        ],
        explanation: "Decreasing speed in the positive direction means velocity decreases linearly from a positive value to zero.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Velocity-Time Graphs"],
        commonMistakes: [
            "Confusing decreasing speed with negative velocity",
            "Thinking curved motion requires curved graphs"
        ],
        hints: [
            "Speed decreasing means velocity magnitude is getting smaller",
            "Positive direction means velocity starts positive"
        ]
    },

    {
        id: 21,
        type: 'graph-matching',
        level: 4,
        points: 30,
        question: "An object undergoes uniformly accelerated motion from rest. Which position-time graph correctly represents this motion?",
        graphType: "position-time",
        options: [
            {
                id: 'a',
                description: "Parabolic curve opening upward",
                graphData: { type: 'parabolic', a: 0.5, b: 0, c: 0 },
                correct: true
            },
            {
                id: 'b',
                description: "Straight line through origin",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 10 },
                correct: false
            },
            {
                id: 'c',
                description: "Horizontal line at zero",
                graphData: { type: 'horizontal', y: 0 },
                correct: false
            },
            {
                id: 'd',
                description: "Parabolic curve opening downward",
                graphData: { type: 'parabolic', a: -0.5, b: 0, c: 10 },
                correct: false
            }
        ],
        explanation: "Uniform acceleration from rest produces quadratic position-time relationship: x = ½at². This creates an upward-opening parabola.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Position-Time Graphs"],
        teachingPoints: [
            "Constant acceleration → quadratic position",
            "Starting from rest means x₀ = 0 and v₀ = 0",
            "The parabola's concavity indicates acceleration direction"
        ]
    },

    {
        id: 22,
        type: 'interpretation',
        level: 4,
        points: 35,
        question: "Looking at this velocity-time graph, what can you conclude about the object's motion during the middle segment (4-8 seconds)?",
        primaryGraph: {
            type: "velocity-time",
            data: { type: 'piecewise', segments: [
                { startX: 0, endX: 4, type: 'linear', slope: 2, intercept: 0 },
                { startX: 4, endX: 8, type: 'horizontal', y: 8 },
                { startX: 8, endX: 12, type: 'linear', slope: -1, intercept: 16 }
            ]}
        },
        options: [
            {
                id: 'a',
                text: "Constant velocity, zero acceleration",
                correct: true
            },
            {
                id: 'b',
                text: "Increasing velocity, positive acceleration",
                correct: false
            },
            {
                id: 'c',
                text: "Zero velocity, maximum acceleration",
                correct: false
            },
            {
                id: 'd',
                text: "Decreasing velocity, negative acceleration",
                correct: false
            }
        ],
        explanation: "A horizontal line on a velocity-time graph indicates constant velocity and zero acceleration.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Velocity Analysis"],
        commonMistakes: [
            "Thinking horizontal v-t line means zero velocity",
            "Confusing velocity magnitude with acceleration"
        ]
    },

    {
        id: 23,
        type: 'graph-matching',
        level: 4,
        points: 30,
        question: "An object throws upward reaches maximum height then falls back down. Which acceleration-time graph represents this motion?",
        scenario: "Consider the entire flight from launch to landing, ignoring air resistance",
        graphType: "acceleration-time",
        options: [
            {
                id: 'a',
                description: "Constant negative acceleration",
                graphData: { type: 'horizontal', y: -9.8 },
                correct: true
            },
            {
                id: 'b',
                description: "Negative acceleration decreasing to zero at peak",
                graphData: { type: 'linear', startX: 0, startY: -9.8, endX: 10, endY: 0 },
                correct: false
            },
            {
                id: 'c',
                description: "Acceleration changing from positive to negative",
                graphData: { type: 'linear', startX: 0, startY: 9.8, endX: 10, endY: -9.8 },
                correct: false
            },
            {
                id: 'd',
                description: "Zero acceleration throughout the motion",
                graphData: { type: 'horizontal', y: 0 },
                correct: false
            }
        ],
        explanation: "Gravitational acceleration is constant throughout projectile motion. The acceleration is always -9.8 m/s² downward, regardless of the object's velocity or position.",
        standards: ["AP Physics 1: 3.A.1.2", "Regents: Kinematics - Free Fall"],
        commonMistakes: [
            "Thinking acceleration changes at the peak",
            "Confusing velocity with acceleration",
            "Believing upward motion has positive acceleration"
        ]
    },

    {
        id: 24,
        type: 'graph-interpretation',
        level: 4,
        points: 35,
        question: "An object's velocity changes from 10 m/s to -5 m/s over 3 seconds. What is the object's acceleration?",
        scenario: "The object undergoes constant acceleration during this time interval",
        calculation: {
            steps: [
                "Acceleration = (final velocity - initial velocity) / time",
                "a = (vf - vi) / t",
                "a = (-5 m/s - 10 m/s) / 3s",
                "a = -15 m/s / 3s = -5 m/s²"
            ],
            answer: -5,
            units: "m/s²"
        },
        options: [
            { text: "-5 m/s²", correct: true },
            { text: "5 m/s²", correct: false, error: "Forgot to account for the sign" },
            { text: "-15 m/s²", correct: false, error: "Used total velocity change without dividing by time" },
            { text: "1.67 m/s²", correct: false, error: "Used incorrect formula" }
        ],
        explanation: "Acceleration is the rate of change of velocity. Since velocity changed from positive to negative, acceleration must be negative.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Acceleration Calculation"],
        teachingPoints: [
            "Acceleration = Δv/Δt",
            "Negative acceleration means velocity is decreasing or changing direction",
            "Sign of acceleration depends on coordinate system"
        ]
    },

    // More Complex Kinematics
    {
        id: 25,
        type: 'graph-matching',
        level: 3,
        points: 25,
        question: "Two cars start from rest at the same time. Car A accelerates at 2 m/s² for 4s, then maintains constant speed. Car B accelerates at 1 m/s² throughout. Which graph shows their position difference vs. time?",
        graphType: "position-difference-time",
        options: [
            {
                id: 'a',
                description: "Parabolic increase, then linear increase, then parabolic decrease",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 4, type: 'parabolic', a: 0.5, b: 0, c: 0 },
                    { startX: 4, endX: 8, type: 'parabolic', a: -0.5, b: 8, c: -16 },
                    { startX: 8, endX: 12, type: 'parabolic', a: -0.5, b: 8, c: -16 }
                ]},
                correct: true
            },
            {
                id: 'b',
                description: "Linear increase throughout",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 12, endY: 24 },
                correct: false
            },
            {
                id: 'c',
                description: "Constant difference after t = 4s",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 4, type: 'parabolic', a: 0.5, b: 0, c: 0 },
                    { startX: 4, endX: 12, type: 'horizontal', y: 8 }
                ]},
                correct: false
            },
            {
                id: 'd',
                description: "Parabolic throughout",
                graphData: { type: 'parabolic', a: 0.25, b: 0, c: 0 },
                correct: false
            }
        ],
        explanation: "Initially Car A gains more distance (higher acceleration). After t=4s, Car B's continued acceleration eventually makes it catch up and pass Car A.",
        standards: ["AP Physics 1: 3.A.1", "Regents: Relative Motion"]
    },

    {
        id: 26,
        type: 'graph-interpretation',
        level: 4,
        points: 35,
        question: "Look at this position-time graph with three distinct regions. In which region is the object moving the fastest?",
        primaryGraph: {
            type: "position-time",
            data: { type: 'piecewise', segments: [
                { startX: 0, endX: 3, type: 'linear', slope: 2, intercept: 0 },
                { startX: 3, endX: 6, type: 'linear', slope: 5, intercept: -9 },
                { startX: 6, endX: 9, type: 'linear', slope: 1, intercept: 12 }
            ]}
        },
        options: [
            { text: "Region 2 (3-6 seconds)", correct: true },
            { text: "Region 1 (0-3 seconds)", correct: false },
            { text: "Region 3 (6-9 seconds)", correct: false },
            { text: "The speed is the same in all regions", correct: false }
        ],
        explanation: "The steepest slope on a position-time graph indicates the highest speed. Region 2 has the steepest slope at 5 m/s.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Position-Time Analysis"],
        teachingPoints: [
            "Slope of position-time graph = velocity",
            "Steeper slope = higher speed",
            "Compare absolute values of slopes for speed comparison"
        ],
        commonMistakes: [
            "Confusing steepness with height on the graph",
            "Forgetting that negative slopes still represent motion"
        ]
    },

    {
        id: 27,
        type: 'graph-matching',
        level: 3,
        points: 30,
        question: "An object starts from rest and accelerates uniformly for 4 seconds, then decelerates uniformly for 3 seconds until it stops. Which velocity-time graph represents this motion?",
        graphType: "velocity-time",
        options: [
            {
                id: 'a',
                description: "Linear increase then linear decrease to zero",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 4, type: 'linear', slope: 2, intercept: 0 },
                    { startX: 4, endX: 7, type: 'linear', slope: -8/3, intercept: 32/3 }
                ]},
                correct: true
            },
            {
                id: 'b',
                description: "Parabolic increase then parabolic decrease",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 4, type: 'parabolic', a: 0.5, b: 0, c: 0 },
                    { startX: 4, endX: 7, type: 'parabolic', a: -0.89, b: 7.11, c: -12.44 }
                ]},
                correct: false
            },
            {
                id: 'c',
                description: "Linear increase then constant velocity",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 4, type: 'linear', slope: 2, intercept: 0 },
                    { startX: 4, endX: 7, type: 'horizontal', y: 8 }
                ]},
                correct: false
            },
            {
                id: 'd',
                description: "Linear increase then immediate stop",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 4, type: 'linear', slope: 2, intercept: 0 },
                    { startX: 4, endX: 7, type: 'horizontal', y: 0 }
                ]},
                correct: false
            }
        ],
        explanation: "Uniform acceleration produces linear velocity changes. The object reaches maximum velocity at t=4s, then decelerates linearly back to zero.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Uniformly Accelerated Motion"],
        teachingPoints: [
            "Uniform acceleration → linear velocity-time graph",
            "Starting from rest means v₀ = 0",
            "Deceleration to stop means final velocity = 0"
        ]
    },

    {
        id: 28,
        type: 'graph-matching',
        level: 4,
        points: 35,
        question: "An object moves with the velocity shown in this graph. Which position-time graph matches this motion?",
        primaryGraph: {
            type: "velocity-time",
            data: { type: 'piecewise', segments: [
                { startX: 0, endX: 2, type: 'linear', slope: 3, intercept: 0 },
                { startX: 2, endX: 5, type: 'horizontal', y: 6 },
                { startX: 5, endX: 7, type: 'linear', slope: -2, intercept: 16 }
            ]}
        },
        graphType: "position-time",
        options: [
            {
                id: 'a',
                description: "Parabolic up, linear up, parabolic down (concave down)",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 2, type: 'parabolic', a: 1.5, b: 0, c: 0 },
                    { startX: 2, endX: 5, type: 'linear', slope: 6, intercept: -6 },
                    { startX: 5, endX: 7, type: 'parabolic', a: -1, b: 16, c: -57 }
                ]},
                correct: true
            },
            {
                id: 'b',
                description: "Same shape as velocity graph",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 2, type: 'linear', slope: 3, intercept: 0 },
                    { startX: 2, endX: 5, type: 'horizontal', y: 6 },
                    { startX: 5, endX: 7, type: 'linear', slope: -2, intercept: 16 }
                ]},
                correct: false
            },
            {
                id: 'c',
                description: "Linear increase throughout",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 7, endY: 35 },
                correct: false
            },
            {
                id: 'd',
                description: "All parabolic segments opening upward",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 2, type: 'parabolic', a: 1.5, b: 0, c: 0 },
                    { startX: 2, endX: 5, type: 'parabolic', a: 1, b: -4, c: 10 },
                    { startX: 5, endX: 7, type: 'parabolic', a: 1, b: -10, c: 50 }
                ]},
                correct: false
            }
        ],
        explanation: "Position is the integral of velocity. Linear velocity produces parabolic position, constant velocity produces linear position.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Integration Relationships"],
        teachingPoints: [
            "Position = integral of velocity",
            "Increasing velocity → concave up position curve",
            "Decreasing velocity → concave down position curve"
        ]
    },

    {
        id: 29,
        type: 'graph-interpretation',
        level: 3,
        points: 25,
        question: "This position-time graph shows an object that changes direction. At what time does the object change direction?",
        primaryGraph: {
            type: "position-time",
            data: { type: 'parabolic', a: -0.5, b: 4, c: 2 }
        },
        options: [
            { text: "t = 4 seconds", correct: true },
            { text: "t = 2 seconds", correct: false },
            { text: "t = 6 seconds", correct: false },
            { text: "The object never changes direction", correct: false }
        ],
        explanation: "An object changes direction when its velocity is zero. On a position-time graph, this occurs at the turning point (maximum or minimum) where the slope equals zero.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Direction Changes"],
        teachingPoints: [
            "Direction change occurs when velocity = 0",
            "On x-t graph, look for peaks or valleys",
            "The slope of x-t graph is velocity"
        ],
        commonMistakes: [
            "Confusing position = 0 with velocity = 0",
            "Thinking direction changes when acceleration = 0"
        ]
    },

    {
        id: 30,
        type: 'calculation',
        level: 2,
        points: 20,
        question: "An object travels 50 meters in 10 seconds at constant velocity. What is its velocity?",
        scenario: "The object moves in a straight line with no acceleration",
        calculation: {
            steps: [
                "Velocity = displacement / time",
                "v = Δx / Δt",
                "v = 50 m / 10 s",
                "v = 5 m/s"
            ],
            answer: 5,
            units: "m/s"
        },
        options: [
            { text: "5 m/s", correct: true },
            { text: "500 m/s", correct: false, error: "Multiplied instead of dividing" },
            { text: "0.2 m/s", correct: false, error: "Inverted the formula" },
            { text: "10 m/s", correct: false, error: "Used incorrect time value" }
        ],
        explanation: "For constant velocity motion, velocity equals total displacement divided by total time.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Basic Velocity"],
        teachingPoints: [
            "Velocity = displacement / time",
            "Constant velocity means no acceleration",
            "Units: meters per second (m/s)"
        ]
    },

    // Advanced Kinematics - Questions 31-50
    {
        id: 31,
        type: 'misconception-identification',
        level: 3,
        points: 30,
        question: "A student says: 'The velocity graph is increasing, so the object is speeding up.' Looking at this v-t graph, identify the misconception.",
        graphType: "velocity-time",
        studentStatement: "Increasing velocity graph always means speeding up.",
        graphData: { type: 'linear', startX: 0, startY: -10, endX: 5, endY: -2 },
        options: [
            {
                id: 'a',
                text: "The student is correct - increasing velocity means speeding up",
                correct: false
            },
            {
                id: 'b',
                text: "The object is slowing down because velocity is becoming less negative (closer to zero)",
                correct: true
            },
            {
                id: 'c',
                text: "Speed cannot be determined from velocity graphs",
                correct: false
            },
            {
                id: 'd',
                text: "The graph shows acceleration, not velocity",
                correct: false
            }
        ],
        explanation: "Speed is the magnitude of velocity. Moving from -10 m/s to -2 m/s means the object is slowing down (speed decreasing from 10 m/s to 2 m/s) even though velocity is increasing.",
        misconception: "velocity-increase-speed-confusion",
        standards: ["AP Physics 1: 3.A.1", "Regents: Motion Analysis"],
        remediation: "Speed = |velocity|. When velocity becomes less negative, the object slows down if moving in negative direction."
    },

    {
        id: 32,
        type: 'graph-matching',
        level: 4,
        points: 40,
        question: "An elevator accelerates upward, moves at constant speed, then decelerates to a stop. Which acceleration-time graph matches?",
        scenario: "The entire motion takes 10 seconds: 3s accelerating, 4s constant speed, 3s decelerating.",
        graphType: "acceleration-time",
        options: [
            {
                id: 'a',
                description: "Positive, then zero, then negative acceleration",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 3, type: 'horizontal', y: 2 },
                    { startX: 3, endX: 7, type: 'horizontal', y: 0 },
                    { startX: 7, endX: 10, type: 'horizontal', y: -2 }
                ]},
                correct: true
            },
            {
                id: 'b',
                description: "Decreasing throughout (always negative)",
                graphData: { type: 'linear', startX: 0, startY: 2, endX: 10, endY: -2 },
                correct: false
            },
            {
                id: 'c',
                description: "Parabolic increase then decrease",
                graphData: { type: 'parabolic', a: -0.1, b: 1, c: 0 },
                correct: false
            },
            {
                id: 'd',
                description: "Always positive acceleration",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 3, type: 'horizontal', y: 3 },
                    { startX: 3, endX: 7, type: 'horizontal', y: 1 },
                    { startX: 7, endX: 10, type: 'horizontal', y: 0.5 }
                ]},
                correct: false
            }
        ],
        explanation: "Accelerating upward requires positive acceleration, constant speed needs zero acceleration, and decelerating (slowing down) requires negative acceleration.",
        standards: ["AP Physics 1: 3.A.1", "Regents: Elevator Physics"]
    },

    {
        id: 33,
        type: 'graph-matching',
        level: 4,
        points: 35,
        question: "From this position-time graph, determine the acceleration during the curved portion (0-4s).",
        primaryGraph: {
            type: "position-time",
            data: { type: 'piecewise', segments: [
                { startX: 0, endX: 4, type: 'parabolic', a: 1.25, b: 0, c: 0 },
                { startX: 4, endX: 8, type: 'linear', slope: 10, intercept: -20 }
            ]}
        },
        graphType: "position-time-analysis",
        options: [
            {
                id: 'a',
                text: "2.5 m/s² (constant positive acceleration)",
                correct: true
            },
            {
                id: 'b',
                text: "1.25 m/s² (half the parabolic coefficient)",
                correct: false
            },
            {
                id: 'c',
                text: "5 m/s² (twice the parabolic coefficient)",
                correct: false
            },
            {
                id: 'd',
                text: "Cannot determine acceleration from position graph",
                correct: false
            }
        ],
        explanation: "For x = ½at², the coefficient of t² is ½a. Since the coefficient is 1.25, acceleration a = 2 × 1.25 = 2.5 m/s².",
        standards: ["AP Physics 1: 3.A.1.4", "Regents: Concavity Analysis"],
        hints: [
            "The equation x = x₀ + v₀t + ½at² gives the relationship",
            "The coefficient of t² in the parabolic equation is ½a"
        ]
    },

    {
        id: 34,
        type: 'area-under-curve',
        level: 4,
        points: 40,
        question: "Calculate the total displacement of an object using this velocity-time graph.",
        graphType: "velocity-time",
        graphData: {
            type: 'complex',
            regions: [
                { shape: 'triangle', base: 2, height: 8, xStart: 0 },
                { shape: 'rectangle', base: 3, height: 8, xStart: 2 },
                { shape: 'triangle', base: 1.5, height: -4, xStart: 5 }
            ]
        },
        calculation: {
            steps: [
                "Triangle 1: ½ × 2s × 8m/s = 8m",
                "Rectangle: 3s × 8m/s = 24m",
                "Triangle 2: ½ × 1.5s × (-4m/s) = -3m",
                "Total displacement: 8m + 24m + (-3m) = 29m"
            ],
            answer: 29,
            units: "m"
        },
        options: [
            { text: "29 m", correct: true },
            { text: "32 m", correct: false, error: "Ignored negative displacement" },
            { text: "35 m", correct: false, error: "Added all areas as positive" },
            { text: "11 m", correct: false, error: "Only counted first triangle" }
        ],
        explanation: "Displacement equals the area under a velocity-time graph. Areas below the axis represent negative displacement.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Displacement from v-t Graph"]
    },

    {
        id: 35,
        type: 'graph-interpretation',
        level: 3,
        points: 25,
        question: "Looking at this acceleration-time graph, during which time interval is the object speeding up?",
        primaryGraph: {
            type: "acceleration-time",
            data: { type: 'piecewise', segments: [
                { startX: 0, endX: 2, type: 'horizontal', y: 3 },
                { startX: 2, endX: 4, type: 'horizontal', y: 0 },
                { startX: 4, endX: 6, type: 'horizontal', y: -2 }
            ]}
        },
        scenario: "Object starts from rest at t = 0",
        options: [
            { text: "0-2 seconds and 4-6 seconds", correct: false },
            { text: "0-2 seconds only", correct: true },
            { text: "4-6 seconds only", correct: false },
            { text: "2-4 seconds only", correct: false }
        ],
        explanation: "Object speeds up when velocity and acceleration have the same sign. Starting from rest with positive acceleration (0-2s), it speeds up. During 4-6s, it has positive velocity but negative acceleration, so it slows down.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Speeding Up vs. Slowing Down"],
        teachingPoints: [
            "Speed increases when v and a have same sign",
            "Speed decreases when v and a have opposite signs",
            "Analyze each time interval separately"
        ]
    },

    {
        id: 36,
        type: 'graph-matching',
        level: 3,
        points: 30,
        question: "An object travels at constant speed for 3 seconds, then accelerates for 2 seconds, then moves at a new constant speed. Which velocity-time graph represents this motion?",
        graphType: "velocity-time",
        options: [
            {
                id: 'a',
                description: "Horizontal line, then sloped line, then horizontal line at higher level",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 3, type: 'horizontal', y: 5 },
                    { startX: 3, endX: 5, type: 'linear', slope: 3, intercept: -4 },
                    { startX: 5, endX: 8, type: 'horizontal', y: 11 }
                ]},
                correct: true
            },
            {
                id: 'b',
                description: "Parabolic curves throughout",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 3, type: 'parabolic', a: 0.1, b: 0, c: 5 },
                    { startX: 3, endX: 5, type: 'parabolic', a: 1, b: -6, c: 14 },
                    { startX: 5, endX: 8, type: 'parabolic', a: -0.1, b: 1.6, c: 3 }
                ]},
                correct: false
            },
            {
                id: 'c',
                description: "Linear increase throughout",
                graphData: { type: 'linear', startX: 0, startY: 5, endX: 8, endY: 11 },
                correct: false
            },
            {
                id: 'd',
                description: "Horizontal line, parabolic curve, horizontal line",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 3, type: 'horizontal', y: 5 },
                    { startX: 3, endX: 5, type: 'parabolic', a: 1.5, b: -9, c: 18.5 },
                    { startX: 5, endX: 8, type: 'horizontal', y: 11 }
                ]},
                correct: false
            }
        ],
        explanation: "Constant speed produces horizontal lines on v-t graphs. Constant acceleration produces straight sloped lines on v-t graphs.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Motion with Multiple Phases"]
    },

    {
        id: 37,
        type: 'graph-matching',
        level: 2,
        points: 20,
        question: "A car brakes to a stop from 20 m/s in 4 seconds. Which position-time graph shows this motion?",
        scenario: "Constant deceleration to rest",
        graphType: "position-time",
        options: [
            {
                id: 'a',
                description: "Upward curving parabola that levels off",
                graphData: { type: 'parabolic', a: -2.5, b: 20, c: 0 },
                correct: true
            },
            {
                id: 'b',
                description: "Downward curving parabola",
                graphData: { type: 'parabolic', a: 2.5, b: -20, c: 80 },
                correct: false
            },
            {
                id: 'c',
                description: "Linear decrease to zero",
                graphData: { type: 'linear', startX: 0, startY: 20, endX: 4, endY: 0 },
                correct: false
            },
            {
                id: 'd',
                description: "Straight line with constant slope",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 4, endY: 40 },
                correct: false
            }
        ],
        explanation: "Braking motion: initial velocity > 0, constant negative acceleration. Position increases but at decreasing rate, creating upward curve that flattens.",
        standards: ["AP Physics 1: 3.A.1", "Regents: Braking Motion"]
    },

    {
        id: 38,
        type: 'misconception-identification',
        level: 2,
        points: 25,
        question: "A student says: 'The steeper the position-time graph, the greater the acceleration.' What's wrong with this reasoning?",
        graphType: "position-time",
        studentStatement: "Steeper position-time graphs show greater acceleration.",
        graphData: { type: 'linear', startX: 0, startY: 0, endX: 5, endY: 25 },
        options: [
            {
                id: 'a',
                text: "The student is correct - steeper slopes mean more acceleration",
                correct: false
            },
            {
                id: 'b',
                text: "Slope of position-time gives velocity, not acceleration. This shows constant velocity (zero acceleration)",
                correct: true
            },
            {
                id: 'c',
                text: "Position graphs cannot show any motion information",
                correct: false
            },
            {
                id: 'd',
                text: "Only curved graphs show acceleration",
                correct: false
            }
        ],
        explanation: "Slope of position-time = velocity. Straight line = constant slope = constant velocity = zero acceleration. Only curved position graphs show acceleration.",
        misconception: "slope-acceleration-confusion",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Graph Interpretation"]
    },

    {
        id: 39,
        type: 'calculation',
        level: 4,
        points: 40,
        question: "An object accelerates from rest at 3 m/s² for 4 seconds. How far does it travel during this time?",
        scenario: "Constant acceleration from rest",
        calculation: {
            steps: [
                "Using kinematic equation: x = v₀t + ½at²",
                "Initial velocity v₀ = 0 (starts from rest)",
                "x = 0 + ½(3 m/s²)(4s)²",
                "x = ½(3)(16) = 24 m"
            ],
            answer: 24,
            units: "m"
        },
        options: [
            { text: "24 m", correct: true },
            { text: "12 m", correct: false, error: "Forgot the ½ factor" },
            { text: "48 m", correct: false, error: "Used wrong formula" },
            { text: "6 m", correct: false, error: "Only calculated vt, ignored acceleration term" }
        ],
        explanation: "For motion starting from rest with constant acceleration: distance = ½at². This comes from the kinematic equation x = v₀t + ½at² with v₀ = 0.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Constant Acceleration"],
        teachingPoints: [
            "x = v₀t + ½at² is the fundamental position equation",
            "Starting from rest means v₀ = 0",
            "Constant acceleration problems use kinematic equations"
        ]
    },

    {
        id: 40,
        type: 'area-under-curve',
        level: 3,
        points: 35,
        question: "Calculate the net displacement from this complex velocity-time graph.",
        graphType: "velocity-time",
        graphData: {
            type: 'complex',
            regions: [
                { shape: 'triangle', base: 2, height: 6, xStart: 0 },
                { shape: 'triangle', base: 2, height: -8, xStart: 2 },
                { shape: 'rectangle', base: 3, height: 4, xStart: 4 },
                { shape: 'triangle', base: 1, height: -4, xStart: 7 }
            ]
        },
        calculation: {
            steps: [
                "Triangle 1: ½ × 2s × 6m/s = 6m",
                "Triangle 2: ½ × 2s × (-8m/s) = -8m",
                "Rectangle: 3s × 4m/s = 12m",
                "Triangle 3: ½ × 1s × (-4m/s) = -2m",
                "Net displacement: 6 + (-8) + 12 + (-2) = 8m"
            ],
            answer: 8,
            units: "m"
        },
        options: [
            { text: "8 m", correct: true },
            { text: "28 m", correct: false, error: "Added all areas as positive" },
            { text: "18 m", correct: false, error: "Ignored some negative areas" },
            { text: "0 m", correct: false, error: "Calculation error" }
        ],
        explanation: "Net displacement = algebraic sum of areas under v-t graph. Positive and negative areas must be added algebraically.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Graphical Analysis"]
    },

    {
        id: 41,
        type: 'graph-matching',
        level: 4,
        points: 35,
        question: "An object starts with positive velocity and experiences constant negative acceleration until it comes to rest. Which position-time graph shows this motion?",
        scenario: "Object decelerates uniformly to a stop",
        graphType: "position-time",
        options: [
            {
                id: 'a',
                description: "Upward curving parabola that levels off",
                graphData: { type: 'parabolic', a: -1, b: 8, c: 0 },
                correct: true
            },
            {
                id: 'b',
                description: "Downward curving parabola",
                graphData: { type: 'parabolic', a: 1, b: -8, c: 16 },
                correct: false
            },
            {
                id: 'c',
                description: "Straight line with positive slope",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 8, endY: 32 },
                correct: false
            },
            {
                id: 'd',
                description: "Horizontal line at zero",
                graphData: { type: 'horizontal', y: 0 },
                correct: false
            }
        ],
        explanation: "With positive initial velocity and negative acceleration, position increases but at a decreasing rate, creating an upward-opening parabola that eventually levels off.",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Deceleration to Rest"],
        teachingPoints: [
            "Positive velocity + negative acceleration = concave down position curve",
            "Object eventually stops when velocity reaches zero",
            "Position continues to increase until velocity becomes zero"
        ]
    },

    {
        id: 42,
        type: 'graph-interpretation',
        level: 3,
        points: 30,
        question: "This velocity-time graph shows three distinct phases of motion. During which phase is the object's acceleration the greatest?",
        primaryGraph: {
            type: "velocity-time",
            data: { type: 'piecewise', segments: [
                { startX: 0, endX: 2, type: 'linear', slope: 4, intercept: 0 },
                { startX: 2, endX: 5, type: 'linear', slope: 1, intercept: 6 },
                { startX: 5, endX: 7, type: 'linear', slope: -3, intercept: 24 }
            ]}
        },
        options: [
            { text: "Phase 1 (0-2 seconds)", correct: true },
            { text: "Phase 2 (2-5 seconds)", correct: false },
            { text: "Phase 3 (5-7 seconds)", correct: false },
            { text: "All phases have equal acceleration", correct: false }
        ],
        explanation: "Acceleration equals the slope of the velocity-time graph. Phase 1: a = 4 m/s², Phase 2: a = 1 m/s², Phase 3: a = -3 m/s². Greatest magnitude is 4 m/s².",
        standards: ["AP Physics 1: 3.A.1.1", "Regents: Kinematics - Acceleration from v-t Graphs"],
        teachingPoints: [
            "Acceleration = slope of velocity-time graph",
            "Steeper slope = greater acceleration magnitude",
            "Compare absolute values for 'greatest' acceleration"
        ]
    },

    {
        id: 43,
        type: 'misconception-identification',
        level: 4,
        points: 35,
        question: "Looking at this position-time graph, a student says: 'The object accelerates, then moves at constant speed, then accelerates again.' What's the actual motion?",
        graphType: "position-time",
        studentStatement: "Curved parts show acceleration, straight parts show constant speed.",
        graphData: { type: 'piecewise', segments: [
            { startX: 0, endX: 3, type: 'parabolic', a: 2, b: 0, c: 0 },
            { startX: 3, endX: 6, type: 'linear', slope: 12, intercept: -18 },
            { startX: 6, endX: 8, type: 'parabolic', a: -3, b: 48, c: -126 }
        ]},
        options: [
            {
                id: 'a',
                text: "Student is correct - curved=acceleration, straight=constant speed",
                correct: false
            },
            {
                id: 'b',
                text: "Object has positive acceleration, then constant velocity, then negative acceleration",
                correct: true
            },
            {
                id: 'c',
                text: "The graph shows velocity, not position",
                correct: false
            },
            {
                id: 'd',
                text: "Motion cannot be determined from this graph",
                correct: false
            }
        ],
        explanation: "Position-time analysis: Curved upward = positive acceleration, straight = constant velocity, curved downward = negative acceleration. The student correctly identified the pattern.",
        misconception: "position-graph-motion-analysis",
        standards: ["AP Physics 1: 3.A.1.4", "Regents: Advanced Graph Analysis"]
    },

    {
        id: 44,
        type: 'graph-matching',
        level: 3,
        points: 25,
        question: "A ball bounces vertically on the ground with decreasing height each bounce. Which graph shows speed vs. time?",
        scenario: "Ball loses energy with each bounce, reaching lower maximum heights",
        graphType: "speed-time",
        options: [
            {
                id: 'a',
                description: "Repeating triangular pattern with decreasing peaks",
                graphData: { type: 'piecewise', segments: [
                    { startX: 0, endX: 0.5, type: 'linear', slope: -20, intercept: 10 },
                    { startX: 0.5, endX: 1, type: 'linear', slope: 20, intercept: -10 },
                    { startX: 1, endX: 1.4, type: 'linear', slope: -20, intercept: 20 },
                    { startX: 1.4, endX: 1.8, type: 'linear', slope: 20, intercept: -28 }
                ]},
                correct: true
            },
            {
                id: 'b',
                description: "Decreasing exponential curve",
                graphData: { type: 'exponential', base: 0.7, coefficient: 15 },
                correct: false
            },
            {
                id: 'c',
                description: "Sinusoidal wave with decreasing amplitude",
                graphData: { type: 'sinusoidal', amplitude: 8, period: 1, phase: 0, yShift: 8 },
                correct: false
            },
            {
                id: 'd',
                description: "Linear decrease to zero",
                graphData: { type: 'linear', startX: 0, startY: 15, endX: 3, endY: 0 },
                correct: false
            }
        ],
        explanation: "Speed decreases linearly during upward motion (deceleration due to gravity), reaches zero at peak, then increases linearly during downward motion. Each bounce has lower maximum speed.",
        standards: ["AP Physics 1: 3.A.1", "Regents: Bouncing Ball Analysis"]
    },

    {
        id: 45,
        type: 'area-under-curve',
        level: 4,
        points: 40,
        question: "A variable force stretches a spring. Find the elastic potential energy stored using this Force vs. compression graph.",
        graphType: "force-compression",
        graphData: {
            type: 'complex',
            regions: [
                { shape: 'triangle', base: 0.05, height: 100, xStart: 0 },
                { shape: 'triangle', base: 0.03, height: 60, xStart: 0.05 },
                { shape: 'rectangle', base: 0.02, height: 160, xStart: 0.08 }
            ]
        },
        calculation: {
            steps: [
                "Triangle 1: ½ × 0.05m × 100N = 2.5J",
                "Triangle 2: ½ × 0.03m × 60N = 0.9J",
                "Rectangle: 0.02m × 160N = 3.2J",
                "Total elastic PE: 2.5J + 0.9J + 3.2J = 6.6J"
            ],
            answer: 6.6,
            units: "J"
        },
        options: [
            { text: "6.6 J", correct: true },
            { text: "5.4 J", correct: false, error: "Missing rectangle contribution" },
            { text: "8.2 J", correct: false, error: "Calculation error" },
            { text: "3.4 J", correct: false, error: "Only counted triangles" }
        ],
        explanation: "Elastic potential energy = work done compressing spring = area under Force vs. compression graph.",
        standards: ["AP Physics 1: 4.C.3", "Regents: Elastic Energy"]
    },

    {
        id: 46,
        type: 'graph-matching',
        level: 4,
        points: 40,
        question: "A satellite orbits Earth in circular motion. Which graph shows gravitational force vs. orbital radius?",
        scenario: "Various circular orbital radii from low Earth orbit to geosynchronous",
        graphType: "gravitational-force-radius",
        options: [
            {
                id: 'a',
                description: "Inverse square relationship: F ∝ 1/r²",
                graphData: { type: 'inverse', coefficient: 1000, power: 2 },
                correct: true
            },
            {
                id: 'b',
                description: "Inverse linear relationship: F ∝ 1/r",
                graphData: { type: 'inverse', coefficient: 500, power: 1 },
                correct: false
            },
            {
                id: 'c',
                description: "Linear decrease: F = kr",
                graphData: { type: 'linear', startX: 1, startY: 100, endX: 10, endY: 10 },
                correct: false
            },
            {
                id: 'd',
                description: "Exponential decay",
                graphData: { type: 'exponential', base: 0.8, coefficient: 200 },
                correct: false
            }
        ],
        explanation: "Newton's Law of Universal Gravitation: F = GMm/r². Gravitational force decreases as the square of the distance.",
        standards: ["AP Physics 1: 3.F.2", "Regents: Universal Gravitation"]
    },

    {
        id: 47,
        type: 'graph-matching',
        level: 3,
        points: 30,
        question: "A pendulum swings with small amplitude. Which graph shows the relationship between restoring force and angular displacement?",
        scenario: "Simple pendulum with small angles (θ < 15°)",
        graphType: "restoring-force-displacement",
        options: [
            {
                id: 'a',
                description: "Linear relationship: F = -kθ",
                graphData: { type: 'linear', startX: -0.3, startY: 6, endX: 0.3, endY: -6 },
                correct: true
            },
            {
                id: 'b',
                description: "Sinusoidal relationship",
                graphData: { type: 'sinusoidal', amplitude: 8, period: 1.2, phase: 0 },
                correct: false
            },
            {
                id: 'c',
                description: "Parabolic relationship",
                graphData: { type: 'parabolic', a: 50, b: 0, c: 0 },
                correct: false
            },
            {
                id: 'd',
                description: "Inverse relationship",
                graphData: { type: 'inverse', coefficient: 2 },
                correct: false
            }
        ],
        explanation: "For small angles, sin(θ) ≈ θ, so restoring force F = -mg sin(θ) ≈ -mgθ. This gives a linear relationship between force and displacement.",
        standards: ["AP Physics 1: 3.D.1", "Regents: Pendulum Motion"]
    },

    {
        id: 48,
        type: 'misconception-identification',
        level: 3,
        points: 30,
        question: "A student analyzes this force-time graph and says: 'Since force is always positive, the object only speeds up.' What's the error?",
        graphType: "force-time",
        studentStatement: "Positive force always means speeding up.",
        graphData: { type: 'sinusoidal', amplitude: 10, period: 4, phase: 0, yShift: 10 },
        options: [
            {
                id: 'a',
                text: "Student is correct - positive force means acceleration in positive direction",
                correct: false
            },
            {
                id: 'b',
                text: "The object can slow down if moving in negative direction while force is positive",
                correct: true
            },
            {
                id: 'c',
                text: "Force graphs don't show speed changes",
                correct: false
            },
            {
                id: 'd',
                text: "Only the magnitude of force matters for speed",
                correct: false
            }
        ],
        explanation: "If an object moves in the negative direction and experiences positive force, it slows down (speed decreases) even though it accelerates in the positive direction.",
        misconception: "force-direction-speed-confusion",
        standards: ["AP Physics 1: 3.B.1", "Regents: Force and Motion Analysis"]
    },

    {
        id: 49,
        type: 'graph-matching',
        level: 4,
        points: 40,
        question: "Two identical springs in series support a mass. How does the effective spring constant compare to a single spring?",
        scenario: "Mass m hanging from two identical springs (k each) connected in series",
        graphType: "force-displacement-comparison",
        options: [
            {
                id: 'a',
                description: "Half the slope: k_eff = k/2",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 25 },
                correct: true
            },
            {
                id: 'b',
                description: "Same slope: k_eff = k",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 50 },
                correct: false
            },
            {
                id: 'c',
                description: "Double the slope: k_eff = 2k",
                graphData: { type: 'linear', startX: 0, startY: 0, endX: 10, endY: 100 },
                correct: false
            },
            {
                id: 'd',
                description: "Quadratic relationship",
                graphData: { type: 'parabolic', a: 2.5, b: 0, c: 0 },
                correct: false
            }
        ],
        explanation: "Springs in series: 1/k_eff = 1/k₁ + 1/k₂. For identical springs: 1/k_eff = 1/k + 1/k = 2/k, so k_eff = k/2.",
        standards: ["AP Physics 1: 3.D.2", "Regents: Springs in Series"]
    },

    {
        id: 50,
        type: 'area-under-curve',
        level: 4,
        points: 45,
        question: "This power-time graph shows energy consumption. Calculate the total energy used in 10 seconds.",
        graphType: "power-time",
        graphData: {
            type: 'complex',
            regions: [
                { shape: 'rectangle', base: 3, height: 50, xStart: 0 },
                { shape: 'triangle', base: 4, height: 25, xStart: 3 },
                { shape: 'triangle', base: 2, height: -30, xStart: 7 },
                { shape: 'rectangle', base: 1, height: 45, xStart: 9 }
            ]
        },
        calculation: {
            steps: [
                "Rectangle 1: 3s × 50W = 150J",
                "Triangle 1: ½ × 4s × 25W = 50J",
                "Triangle 2: ½ × 2s × (-30W) = -30J",
                "Rectangle 2: 1s × 45W = 45J",
                "Total energy: 150J + 50J + (-30J) + 45J = 215J"
            ],
            answer: 215,
            units: "J"
        },
        options: [
            { text: "215 J", correct: true },
            { text: "245 J", correct: false, error: "Ignored negative energy" },
            { text: "275 J", correct: false, error: "Added all areas as positive" },
            { text: "170 J", correct: false, error: "Missing final rectangle" }
        ],
        explanation: "Energy = ∫P dt = area under Power-time graph. Negative power represents energy returned to source (regenerative braking, etc.).",
        standards: ["AP Physics 1: 4.C.2", "Regents: Energy and Power"]
    }
];

// Leaderboard sample data (would be stored in localStorage or backend)
const SAMPLE_LEADERBOARD = [
    { rank: 1, name: "PhysicsAce2024", points: 3850, level: "Physics Sage", streak: 12 },
    { rank: 2, name: "GraphMaster", points: 3420, level: "Misconception Crusher", streak: 8 },
    { rank: 3, name: "MotionExpert", points: 2890, level: "Misconception Crusher", streak: 15 },
    { rank: 4, name: "KinematicKid", points: 2650, level: "Multi-Graph Wizard", streak: 5 },
    { rank: 5, name: "VelocityVixen", points: 2200, level: "Multi-Graph Wizard", streak: 7 }
];

// Daily challenge rotation (based on day of week)
function getDailyChallenge() {
    const day = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const challenges = GAME_CONFIG?.DAILY_CHALLENGES;
    
    if (!challenges || !Array.isArray(challenges)) {
        // Fallback challenge if GAME_CONFIG not loaded
        return {
            name: 'Daily Challenge',
            description: 'Complete today\'s physics challenge',
            bonus: 1.5
        };
    }
    
    // Map Sunday to Friday (index 4), Monday to index 0, etc.
    const challengeIndex = day === 0 ? 4 : day - 1;
    return challenges[challengeIndex] || challenges[0];
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GAME_CONFIG,
        QUESTION_TEMPLATES,
        SAMPLE_QUESTIONS,
        SAMPLE_LEADERBOARD,
        getDailyChallenge
    };
}