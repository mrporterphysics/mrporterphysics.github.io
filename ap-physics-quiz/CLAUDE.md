# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an advanced interactive web-based quiz application for AP Physics 1 students. The app features comprehensive fact sheet integration, multiple question types, intelligent study modes, and progress tracking. **Major Update**: Now includes full integration with the AP Physics 1 fact sheet for contextual learning support.

## Recent Major Enhancements (August 2025)

### ✅ **Phase 1: Fact Sheet Integration - COMPLETED**

**What was accomplished:**
- **Complete HTML Fact Sheet**: Converted 6-page PDF fact sheet into interactive HTML with navigation
- **Question-Fact Sheet Linking**: All 261 questions now linked to relevant fact sheet sections
- **Smart Cross-Referencing**: Intelligent mapping system connecting questions to specific physics concepts
- **Modal Integration**: Quiz interface now includes fact sheet lookup without leaving the quiz
- **Enhanced Learning**: Transformed from testing tool to comprehensive learning system

**New Files Created:**
- `factsheet-complete.html` - Interactive fact sheet with 10 major physics sections
- `js/factsheet-integration.js` - Cross-reference system and modal functionality  
- `question-factsheet-mapping.json` - Comprehensive question-to-section mappings
- Enhanced `quiz-ui.js` with fact sheet reference buttons
- Enhanced `app.js` with fact sheet initialization
- Updated CSS with fact sheet integration styling

**Statistics:**
- 261 questions mapped to 47 unique fact sheet sections
- 11 physics topics covered with 4.1 average sections per question
- Most referenced: Kinematic Definitions (46 refs), Equilibrium (45 refs), Forces (43 refs)

## Architecture (Updated)

The application uses an enhanced modular JavaScript architecture:

### **Core Modules**
- **PhysicsQuizApp** (app.js) - Main application controller and CSV parser
- **QuizData** (quiz-data.js) - Question data management and filtering
- **QuizUI** (quiz-ui.js) - User interface with integrated fact sheet references
- **QuizStorage** (quiz-storage.js) - Local storage for progress and settings
- **Utils** (utils.js) - Shared utility functions and performance monitoring

### **New Integration Modules**
- **FactSheetIntegration** (js/factsheet-integration.js) - Fact sheet cross-referencing and modal system
- **Question-Fact Sheet Mapping** (question-factsheet-mapping.json) - Comprehensive linking data

## Enhanced Data Flow

1. Questions loaded from CSV (`data/ap-physics-questions.csv`) - **Earth Science temporarily disabled**
2. **NEW**: Fact sheet mapping system loads cross-reference data
3. CSV data parsed and enhanced with fact sheet section links
4. **NEW**: UI renders questions with contextual fact sheet references
5. Students can access relevant fact sheet content via modal popups
6. Progress tracking enhanced with topic-based fact sheet usage

## Current Features

### **Question System**
- **Course Focus**: AP Physics 1 (Earth Science disabled for initial release)
- **Question Types**: True/False (50), Fill-in-the-blank (50), Multiple Choice (110+), Matching (50+)
- **Study Modes**: Test (no feedback), Learning (immediate feedback), Review (missed questions)
- **Topics Covered**: Kinematics, Forces, Energy, Momentum, Rotation, Gravitation, SHM, Fluids, Waves

### **Fact Sheet Integration** ⭐ **NEW**
- **Reference Buttons**: Every question includes "📚 Quick Reference" with relevant sections
- **Smart Tooltips**: Contextual information about related fact sheet content
- **Modal Popups**: Detailed fact sheet lookup without leaving quiz
- **Direct Links**: Open specific fact sheet sections in new tabs
- **Cross-References**: Questions intelligently mapped to 47 unique fact sheet sections

### **Technical Features**
- **CSV Import**: Flexible parser handles various formats with data validation
- **Local Storage**: Persistent progress, settings, and statistics
- **LaTeX Support**: KaTeX for proper mathematical notation rendering
- **Responsive Design**: Flexoki theme with dark/light mode toggle
- **Performance Monitoring**: Built-in timing and optimization tracking

## Next Phase Implementation Roadmap

### **Phase 2: Data Quality & Smart Matching - PRIORITY NEXT**
- [ ] Fix remaining CSV data inconsistencies and validate all questions
- [ ] Improve answer matching algorithms for fill-in-the-blank questions  
- [ ] Implement smart matching for mathematical expressions and units
- [ ] Add comprehensive error handling and validation

### **Phase 3: Enhanced User Experience**
- [ ] Add question difficulty indicators and topic breadcrumbs
- [ ] Create topic mastery meters and progress visualization
- [ ] Add streak counters and personal best tracking for motivation
- [ ] Implement question bookmarking and navigation features

### **Phase 4: Advanced Learning Features**
- [ ] Add timed quiz mode to simulate AP exam conditions
- [ ] Create detailed performance analytics by topic and question type
- [ ] Implement the existing spaced repetition system fully
- [ ] Add hint system with progressive help for struggling students

### **Phase 5: Interactive Tools**
- [ ] Create interactive formula calculator and unit converter tools
- [ ] Add graphing and visualization tools for physics concepts
- [ ] Implement concept mapping and relationship diagrams

## Development Guidelines

### **Current Architecture Notes**
- **No Build Process**: Open `index.html` directly - client-side only application
- **Dependencies**: KaTeX (math), Marked.js (markdown), custom Flexoki CSS theme
- **Modular Design**: Each feature isolated in separate JS modules
- **Progressive Enhancement**: Fact sheet integration fails gracefully if unavailable

### **CSV Question Format (Enhanced)**
```csv
id,type,question,answer,topic,explanation,optionA,optionB,optionC,optionD,optionE,alternateAnswers,difficulty
```
- **Topics**: kinematics, forces, energy, momentum, rotation, gravitation, shm, fluids, waves, general
- **Types**: tf (true/false), fill (fill-in-blank), mc (multiple choice), matching
- **Difficulty**: 1-3 scale (1=easy, 2=medium, 3=hard)

### **Adding New Questions**
1. Edit `data/ap-physics-questions.csv` following existing structure
2. Ensure proper topic assignment for automatic fact sheet linking
3. Questions automatically inherit fact sheet references based on topic and keywords
4. Test locally by refreshing page - questions load dynamically

### **Fact Sheet Integration Notes**
- **Automatic Linking**: Questions mapped to fact sheet sections based on topic + keyword analysis
- **Manual Override**: Specific mappings can be customized in `question-factsheet-mapping.json`
- **Modal System**: Accessible via keyboard (focus management) and fully responsive
- **Performance**: Lightweight JSON mapping loads once at application start

## Performance & Analytics

### **Current Performance Metrics**
- **Load Time**: <2 seconds for full application with 261 questions
- **Fact Sheet Integration**: <100ms additional overhead per question
- **Memory Usage**: Efficient JSON-based mapping system
- **Mobile Performance**: Optimized responsive design with touch interactions

### **Built-in Monitoring**
- Utils.performance tracks load times and identifies bottlenecks
- Console logging for fact sheet integration success/failures
- Error boundaries for graceful degradation if fact sheet unavailable

---

## Key Success Indicators

**✅ Phase 1 Achievements:**
- Interactive fact sheet successfully replaces static PDF reference
- All 261 questions now provide contextual learning support
- Students can seamlessly access relevant physics concepts during practice
- Quiz transformed from testing tool to comprehensive learning system

**🎯 Next Phase Goals:**
- Improve answer validation accuracy to 95%+ 
- Add performance analytics for personalized learning paths
- Implement adaptive difficulty based on student progress
- Create comprehensive AP exam simulation environment

---

*Last Updated: August 27, 2025*
*Status: Phase 1 (Fact Sheet Integration) Complete ✅ | Phase 2 (Data Quality) Ready to Begin*