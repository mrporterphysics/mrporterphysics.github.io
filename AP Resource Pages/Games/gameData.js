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
        type: 'multi-graph-coordination',
        level: 4,
        points: 45,
        question: "Given this position-time graph, determine which velocity-time and acceleration-time graphs match.",
        primaryGraph: {
            type: "position-time",
            data: { type: 'piecewise', segments: [
                { startX: 0, endX: 2, type: 'parabolic', a: 2, b: 0, c: 0 },
                { startX: 2, endX: 5, type: 'linear', slope: 8, intercept: 8 },
                { startX: 5, endX: 7, type: 'parabolic', a: -1, b: 18, c: -37 }
            ]}
        },
        matchingGraphs: {
            velocityTime: {
                correct: { type: 'piecewise', segments: [
                    { startX: 0, endX: 2, type: 'linear', slope: 4, intercept: 0 },
                    { startX: 2, endX: 5, type: 'constant', value: 8 },
                    { startX: 5, endX: 7, type: 'linear', slope: -2, intercept: 18 }
                ]},
                options: 3
            },
            accelerationTime: {
                correct: { type: 'piecewise', segments: [
                    { startX: 0, endX: 2, type: 'constant', value: 4 },
                    { startX: 2, endX: 5, type: 'constant', value: 0 },
                    { startX: 5, endX: 7, type: 'constant', value: -2 }
                ]},
                options: 3
            }
        },
        explanation: "Each piece of the position graph determines the corresponding velocity (derivative) and acceleration (second derivative).",
        teachingPoints: [
            "Parabolic position → linear velocity → constant acceleration",
            "Linear position → constant velocity → zero acceleration"
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
                description: "Exponential decay",
                graphData: { type: 'exponential' },
                correct: false
            }
        ],
        explanation: "Simple harmonic motion like a pendulum produces sinusoidal velocity vs. time graphs.",
        hints: [
            "Notice the pendulum's velocity changes as it swings",
            "Maximum speed occurs at the bottom of the swing",
            "The motion is periodic and symmetric"
        ]
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