# CSS Themes

## Files

- `flexoki-theme.css` - the site theme (Flexoki-based, light/dark)

`styles-old.css` was removed: nothing referenced it, and its hardcoded dark-mode values
predated the CSS custom-property system, so it conflicted with the current theme. Git history
has it if it is ever needed.

## Flexoki Theme Features

- **Color Scheme**: Based on the Flexoki color palette by Steph Ango
- **Theme Toggle**: Light/dark mode with user preference persistence
- **Responsive Design**: Mobile-friendly layouts
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Performance**: CSS custom properties for efficient theme switching

## Usage

The theme automatically loads with light mode as default. Users can toggle between light and dark modes using:

1. The theme toggle button in the header
2. Keyboard shortcut: `Alt+Shift+T`
   (not `Ctrl/Cmd+Shift+T` - that is the browser's "reopen closed tab")

Theme preference is saved in localStorage and persists across sessions.