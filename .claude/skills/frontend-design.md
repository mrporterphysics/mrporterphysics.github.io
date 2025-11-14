# Frontend Design Skill

This skill provides guidance for creating beautiful, distinctive frontend designs that avoid generic "AI slop" patterns.

## Core Principle

Commit to bold, cohesive aesthetics rather than safe, generic choices. Avoid distributional convergence (defaulting to overused patterns like Inter fonts and purple gradients).

## Typography

**Key Directive:** Choose fonts that are beautiful, unique, and interesting.

### Fonts to Avoid
- Inter, Roboto, Open Sans, Lato
- Generic system fonts

### Recommended Alternatives

**Code Aesthetic:**
- JetBrains Mono
- Fira Code (already used in this project!)
- Space Grotesk

**Editorial:**
- Playfair Display
- Crimson Pro
- Newsreader

**Technical:**
- IBM Plex family
- Source Sans 3

**Distinctive:**
- Bricolage Grotesque
- Newsreader

### Typography Strategy
- Use **high contrast pairings**: display + monospace, serif + geometric sans
- Employ extreme weight variations (100 vs 900)
- Create hierarchy with 3x+ size jumps
- Limit to 2-3 font families maximum

## Color & Theme

**Key Directive:** Commit to a cohesive aesthetic using CSS variables for consistency.

### Approach
- Dominant colors with sharp accents outperform timid, evenly-distributed palettes
- Draw inspiration from IDE themes (like this project's Flexoki theme!)
- Explore cultural aesthetics and nature-inspired palettes
- Use CSS custom properties (already implemented in this project's flexoki-theme.css)

### Best Practices
- Define all colors as CSS variables in `:root` and `[data-theme="dark"]`
- Create semantic color names (e.g., `--color-primary`, `--color-accent`)
- Ensure high contrast ratios for accessibility (4.5:1 minimum for text)
- Limit palette to 3-5 core colors with intentional accent colors

## Motion

**Key Directive:** Use CSS-only animations for HTML; Motion library for React when available.

### Focus Areas
- High-impact moments like orchestrated page loads
- Staggered reveals using `animation-delay`
- Entrance animations for key content sections

### Avoid
- Scattered micro-interactions without purpose
- Overly complex JavaScript animations
- Motion that distracts from content

### CSS Animation Patterns
```css
/* Staggered fade-in */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-1 { animation: fadeInUp 0.6s ease-out 0.1s backwards; }
.stagger-2 { animation: fadeInUp 0.6s ease-out 0.2s backwards; }
.stagger-3 { animation: fadeInUp 0.6s ease-out 0.3s backwards; }
```

## Backgrounds

**Key Directive:** Create atmosphere and depth rather than defaulting to solid colors.

### Methods
- **Layer CSS gradients** for rich, dynamic backgrounds
- **Geometric patterns** using repeating gradients or SVG patterns
- **Contextual effects** that match overall aesthetic
- **Subtle textures** for depth without distraction

### Examples
```css
/* Layered gradient background */
background:
  linear-gradient(135deg, var(--color-primary) 0%, transparent 50%),
  linear-gradient(45deg, var(--color-accent) 0%, transparent 50%),
  var(--color-background);

/* Geometric pattern */
background-image:
  repeating-linear-gradient(45deg, transparent, transparent 35px,
  rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px);
```

## Project-Specific Notes

This Jekyll-based physics education website already has:
- ✅ Fira Code and Inconsolata fonts (excellent choice!)
- ✅ Flexoki-based theme system with CSS variables
- ✅ Light/dark mode toggle with localStorage persistence
- ✅ High contrast ratios for accessibility

When enhancing this project:
- Build on existing Flexoki color palette
- Maintain educational focus with clear readability
- Enhance interactive elements (quiz tools) with purposeful motion
- Use backgrounds to create visual hierarchy for different course sections

## Application to This Project

When working on this physics education website:
1. **Presentations**: Use motion for slide transitions and content reveals
2. **Quiz Applications**: Add subtle animations for feedback states
3. **Daily Agendas**: Create visual hierarchy with backgrounds and typography
4. **Interactive Tools**: Enhance with cohesive color schemes from existing theme

## Token Budget

This skill is approximately 400 tokens—compact enough to load on demand without bloating context while delivering measurable improvements in frontend quality.