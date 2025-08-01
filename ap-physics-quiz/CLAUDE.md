# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive web-based quiz application for AP Physics 1 and Earth Science students. The app supports multiple question types (True/False, Fill-in-the-Blank, Multiple Choice, Matching, Image-based) with different study modes and progress tracking.

## Architecture

The application uses a modular JavaScript architecture with the following key components:

- **PhysicsQuizApp** (app.js) - Main application controller and CSV parser
- **QuizData** (quiz-data.js) - Question data management and filtering
- **QuizUI** (quiz-ui.js) - User interface management and DOM manipulation
- **QuizStorage** (quiz-storage.js) - Local storage for progress and settings
- **Utils** (utils.js) - Shared utility functions and performance monitoring

## Data Flow

1. Questions are loaded from CSV files (`data/ap-physics-questions.csv`, `data/earth-science-questions.csv`)
2. CSV data is parsed by `parseCSVDirectly()` in app.js into structured question objects
3. Questions are filtered by type/topic through QuizData module
4. UI renders questions and handles user interactions
5. Progress and missed questions are tracked in QuizStorage

## Key Features

- **Course Selection**: Toggle between AP Physics and Earth Science with dynamic topic buttons
- **Question Types**: Supports tf, fill, mc, matching, and image question types from CSV
- **Study Modes**: Test (no feedback), Learning (immediate feedback), Review (missed questions only)
- **CSV Import**: Flexible CSV parser handles quoted fields and multiple answer formats
- **Local Storage**: Saves quiz progress, settings, and statistics
- **LaTeX Support**: Uses KaTeX for mathematical notation rendering
- **Responsive Design**: Flexoki color scheme with dark/light mode toggle

## Development Commands

No build process required - open `index.html` directly in browser. The application is client-side only with no dependencies beyond CDN-loaded libraries (KaTeX, Marked.js).

## CSV Question Format

Questions are stored in CSV files with columns: id, type, question, answer, topic, explanation, optionA-E, alternateAnswers. The parser in app.js handles various CSV formats and converts them to standardized question objects.

## Adding New Questions

1. Edit the appropriate CSV file in the `data/` directory
2. Follow existing column structure
3. Refresh the page - questions load dynamically

## Performance Monitoring

The app includes built-in performance monitoring via Utils.performance for tracking load times and identifying bottlenecks during development.