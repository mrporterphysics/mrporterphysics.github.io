# AP Physics 1 Quiz Application

An interactive web application for AP Physics 1 students to practice and review key concepts through multiple question types and study modes.

## Features

- **Multiple Question Types**: True/False, Fill-in-the-Blank, and Multiple Choice
- **Topic Filtering**: Focus on specific physics topics like Kinematics, Forces, Energy, etc.
- **Study Modes**:
  - **Test Mode**: Answer questions in sequence with results at the end
  - **Learning Mode**: Immediate feedback with explanations after each answer
  - **Review Mode**: Focus on previously missed questions
- **Progress Tracking**: Real-time accuracy statistics and progress bar
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## File Structure

```
ap-physics-quiz/
│
├── index.html              # Main HTML file
│
├── css/
│   ├── styles.css          # Main stylesheet
│   └── responsive.css      # Responsive design styles
│
├── js/
│   ├── app.js              # Main application logic
│   ├── quiz-data.js        # Question data and management
│   ├── quiz-ui.js          # UI-related functions
│   └── utils.js            # Utility functions
│
└── README.md               # Documentation
```

## Installation

1. Download or clone the repository
2. Open `index.html` in your web browser
3. No server or build process required - it works offline!

## Usage

1. Select the question type you want to practice (or use "All Question Types")
2. Choose a specific physics topic or use "All Topics"
3. Select your preferred study mode
4. Click "Start Quiz" to begin practicing
5. Answer questions and receive feedback based on your selected mode
6. Review your results at the end

## Extending the Question Set

The application currently includes a basic set of physics questions. To add more:

1. Open `js/quiz-data.js`
2. Add questions to the `basicQuestions` or `extendedQuestions` objects following the existing format
3. For a larger question set, implement the `loadFullQuestionSet()` function to parse your complete questions

## For Teachers

This application can be customized for your classroom needs:

- Modify the questions to match your curriculum
- Add additional topics or question types
- Export and share student results
- Integrate with learning management systems

## Browser Compatibility

This application works on all modern browsers:
- Chrome, Firefox, Safari, Edge (latest versions)
- Works on desktop and mobile devices

## Future Enhancements

Planned improvements include:
- Timer functionality for timed quizzes
- Student accounts to track progress over time
- Additional question formats (matching, drag-and-drop)
- Visual aids and diagrams for physics concepts

## License

Free to use for educational purposes.

## Credits

Developed for high school physics students to enhance learning and exam preparation.