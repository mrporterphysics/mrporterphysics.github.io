# Equation Flashcards - Project Documentation

## Overview

An accessible flashcard application designed specifically to help a blind student memorize all 54 equations from the New York State Regents Physics Reference Table. The application features comprehensive text-to-speech support, full keyboard navigation, and two study modes (sequential review and spaced repetition).

## Purpose

This application was created to address a specific accessibility need: helping a blind student memorize physics equations to ease their problem-solving process, as searching through a braille reference table is difficult and time-consuming.

## Key Features

### Accessibility (WCAG 2.1 AA+)
- **Full Screen Reader Support**: ARIA landmarks, live regions, semantic HTML
- **Text-to-Speech Audio**: Web Speech API with custom pronunciation for Greek letters and math symbols
- **Complete Keyboard Navigation**: All features accessible via keyboard shortcuts
- **High Contrast**: Flexoki theme with excellent color contrast ratios
- **Focus Management**: Clear visual indicators and focus trapping in modals

### Study Modes
1. **Sequential Review**: Simple forward/backward navigation through all equations
2. **Spaced Repetition (SRS)**: SM-2 algorithm schedules reviews based on difficulty ratings

### Audio System
- Comprehensive pronunciation dictionary for physics symbols
- Customizable speech rate (0.5x - 2.0x)
- Voice selection
- Auto-read on card flip (toggleable)
- Manual audio controls

### Progress Tracking
- Equations reviewed per session
- Mastery levels (new → learning → familiar → mastered)
- Category-specific statistics
- Study streaks
- Export/import functionality

## File Structure

```
equation-flashcards/
├── index.html                          # Main HTML with semantic structure
├── css/
│   └── flashcard-styles.css           # Flexoki theme with accessibility
├── js/
│   ├── utils.js                       # Utility functions
│   ├── flashcard-storage.js           # localStorage wrapper
│   ├── flashcard-data.js              # CSV loading & filtering
│   ├── flashcard-audio.js             # TTS engine (CRITICAL)
│   ├── flashcard-ui.js                # Card rendering with ARIA
│   ├── flashcard-keyboard.js          # Keyboard navigation
│   ├── flashcard-sequential.js        # Sequential study mode
│   ├── flashcard-spaced-repetition.js # SRS mode
│   └── flashcard-app.js               # Main controller
├── data/
│   └── regents-equations.csv          # 54 physics equations
└── CLAUDE.md                           # This file
```

## Equation Data Format

CSV file with the following columns:
- `id`: Unique integer identifier
- `equation`: LaTeX/Unicode equation text
- `name`: Human-readable equation name
- `variables`: Semicolon-separated variable definitions with units
- `category`: Topic grouping (mechanics, electricity, waves, energy, modern, geometry)
- `difficulty`: 1-5 scale
- `audioDescription`: Phonetic pronunciation for TTS (e.g., "v equals v-naught plus a-t")
- `notes`: Optional context/usage tips

## Keyboard Shortcuts

### Card Navigation
- `Space` - Flip card
- `Arrow Right` or `N` - Next card
- `Arrow Left` or `B` - Previous card

### Audio Controls
- `A` or `P` - Play/pause audio
- `R` - Repeat audio
- `S` - Toggle auto-read

### SRS Rating (Spaced Repetition Mode)
- `1` - Very easy
- `2` - Easy
- `3` - Medium
- `4` - Hard
- `5` - Very hard

### Other
- `H` or `?` - Show keyboard help
- `Escape` - Close modals/cancel

## Audio Pronunciation System

The application includes a comprehensive pronunciation dictionary that converts physics symbols to spoken text:

### Greek Letters
- α → "alpha", β → "beta", δ/Δ → "delta", θ → "theta", λ → "lambda", μ → "mu", π → "pi", ω/Ω → "omega"

### Subscripts
- ₀ → "naught", ₁ → "sub one", ₂ → "sub two"

### Superscripts
- ² → "squared", ³ → "cubed"

### Math Operators
- = → "equals", × → "times", ÷ → "divided by", √ → "square root of"

### Fractions
- ½ → "one half", ⅓ → "one third", ¼ → "one quarter"

## Spaced Repetition Algorithm

The SRS mode implements the SM-2 algorithm:

1. New equations start with interval = 1 day, ease = 2.5
2. After rating each equation (1-5):
   - Rating ≥ 3 (correct): Increase interval, adjust ease
   - Rating < 3 (incorrect): Reset to 1 day, decrease ease
3. Next review date calculated based on interval
4. Equations classified by difficulty:
   - **New**: Never reviewed
   - **Learning**: Accuracy 60-80%
   - **Familiar**: Accuracy 70-90%, 2+ repetitions
   - **Mastered**: Accuracy ≥90%, 4+ repetitions
   - **Struggling**: Accuracy <50%

## Categories

Equations are organized into 6 categories:
1. **Mechanics** (25 equations): Kinematics, forces, momentum, energy
2. **Electricity** (13 equations): Circuits, Coulomb's Law, power
3. **Waves** (6 equations): Wave equation, refraction, reflection
4. **Energy** (4 equations): Work, power, conservation
5. **Modern Physics** (3 equations): Photons, E=mc²
6. **Geometry** (7 equations): Pythagorean theorem, trig, area formulas

## Browser Compatibility

### Recommended Browsers
- **Chrome/Edge** (best TTS support)
- **Safari** (excellent screen reader integration)
- **Firefox** (good overall support)

### Required Features
- Web Speech API (for text-to-speech)
- localStorage (for progress tracking)
- ES6 JavaScript
- CSS Grid and Flexbox

## Accessibility Testing

### Screen Readers Tested
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)

### Compliance
- WCAG 2.1 Level AA minimum
- Many AAA features (color contrast, focus indicators)
- Full keyboard accessibility
- No reliance on color alone

## Future Enhancements

Potential improvements:
1. Equation practice mode (solve problems)
2. Multiple language support
3. Custom equation sets
4. Study reminders/notifications
5. Offline progressive web app (PWA)
6. Mobile app versions

## For Developers

### Adding New Equations
1. Edit `data/regents-equations.csv`
2. Follow the CSV format exactly
3. Provide clear `audioDescription` for TTS
4. Test pronunciation with audio playback

### Modifying Audio Pronunciation
Edit `pronunciationMap` in `js/flashcard-audio.js`

### Customizing Theme
Modify CSS variables in `css/flashcard-styles.css`:
- Colors: `--fx-*` variables
- Spacing: `--spacing-*` variables
- Timing: `--transition-*` variables

### Debugging
- Open browser console (F12)
- All modules log their initialization: "✅ Module initialized"
- Audio system: "🔊 Speaking: ..."
- Errors: "❌ Error message"

## Credits

- **Design**: Flexoki color scheme by Steph Ango
- **Architecture**: Adapted from AP Physics Quiz application
- **TTS Engine**: Web Speech API
- **SRS Algorithm**: Modified SM-2 algorithm

## License

Created for educational use at Mr. Porter's Physics Classes.

## Contact

For issues or suggestions:
- GitHub: https://github.com/mrporterphysics
- Website: mrporterphysics.github.io

---

Built with ❤️ for accessibility and learning.
