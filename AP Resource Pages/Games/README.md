# KinemaQuest: Graph Master Challenge

An educational physics game focused on kinematics graph interpretation for AP Physics 1 students.

## Game Overview

KinemaQuest is a comprehensive gamified learning system where students master position-time, velocity-time, and acceleration-time graph relationships through engaging challenges, point-based progression, and achievement unlocks.

## Features

### Core Gameplay
- **10 Progressive Levels**: From Novice Explorer to Kinematics Grandmaster
- **Multiple Activity Types**: Graph matching, misconception identification, sketching challenges, and quantitative analysis
- **Accuracy-First Scoring**: Rewards understanding over speed
- **20-Minute Sessions**: Perfect for classroom use or homework

### Gamification Elements
- **Point System**: Earn points for correct answers with multipliers for streaks and first attempts
- **Achievement Badges**: 10 unique badges for different accomplishments
- **Level Progression**: Unlock new content and challenges as you advance
- **Daily Challenges**: Rotating weekly challenges with bonus multipliers
- **Leaderboards**: Class and personal progress tracking

### Educational Focus
- **Misconception Targeting**: Addresses common physics graph interpretation errors
- **Multi-Representation**: Links position, velocity, and acceleration graphs
- **Standards Aligned**: AP Physics 1, NY Regents Physics, and NGSS/NYSSLS
- **Immediate Feedback**: Detailed explanations for every answer

## Files Structure

```
Games/
├── index.html          # Main game interface
├── styles.css          # Game styling and responsive design
├── gameData.js         # Questions, levels, badges, and configuration
├── gameEngine.js       # Core game logic and player management
├── app.js             # UI controller and event handling
└── README.md          # This documentation
```

## Technical Implementation

### Game Engine (`gameEngine.js`)
- Player data persistence using localStorage
- Session management with timers
- Point calculation with multipliers
- Achievement system
- Graph rendering utilities

### User Interface (`app.js`)
- Screen management (welcome, game, results, progress)
- Dynamic question display
- Interactive graph rendering
- Real-time feedback and animations

### Game Data (`gameData.js`)
- Question templates by difficulty level
- Badge definitions and requirements
- Daily challenge rotation
- Sample leaderboard data

## Getting Started

1. Open `index.html` in a web browser
2. Click "Start 20-Minute Session" to begin
3. Answer questions by clicking on options
4. View progress and badges in the Progress tab
5. Try Daily Challenges for bonus points

## Educational Standards Alignment

### AP Physics 1
- **Unit 1**: LO 1.3.A; EK 1.3.A.1, 1.3.A.4 (i–iv); LO 1.2.B
- **Practices**: 1.C, 2.A, 2.C, 3.B (Analyzing data, Using mathematics)

### NY Regents Physics
- **HS-PS2-1**: Analyzing and interpreting data
- **Practices**: Using Math & Computational Thinking

### NGSS/NYSSLS
- **HS-PS2-1, HS-PS2-2**: Motion and forces
- **DCI PS2.A**: Forces and motion
- **Crosscutting**: Patterns, Cause & Effect, Systems

## Common Misconceptions Addressed

1. **Position vs. Velocity Confusion**: Students thinking positive position means positive velocity
2. **Slope Interpretation**: Confusing what slopes represent on different graph types
3. **Area Meaning**: Understanding that area under v-t graphs represents displacement
4. **Concavity and Acceleration**: Connecting curve shape to acceleration direction
5. **Constant vs. Zero**: Distinguishing between constant values and zero values

## Future Enhancements

- **Sketch Recognition**: Advanced hand-drawing validation
- **Multiplayer Challenges**: Real-time competition between students
- **Teacher Dashboard**: Detailed analytics and progress reports
- **Question Bank Expansion**: Additional scenarios and difficulty levels
- **Accessibility Features**: Screen reader support and keyboard navigation
- **Mobile Optimization**: Touch-friendly interface for tablets

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

Requires JavaScript enabled and supports HTML5 Canvas for graph rendering.

## Usage in Classroom

### Individual Practice
- Students can work through sessions at their own pace
- Progress is saved locally between sessions
- Immediate feedback helps reinforce concepts

### Competitive Elements
- Use leaderboards to motivate participation
- Daily challenges create engagement
- Badge system rewards different types of achievement

### Assessment Preparation
- Question types mirror AP Physics 1 and Regents exam formats
- Emphasis on graph interpretation skills
- Builds confidence through progressive difficulty

## License

Created for educational use in physics classrooms. Part of the Mr. Porter Physics educational resource collection.