# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based GitHub Pages website for Mr. Porter's Physics Classes, serving as a central hub for physics education resources, daily agendas, presentations, and interactive tools. The site is hosted at mrporterphysics.github.io and includes content for AP Physics, Regents Physics, Earth Science, Physical Science, and coding/game development courses.

## Site Architecture

### Jekyll Configuration
- **Framework**: Jekyll with minima theme and Kramdown markdown
- **Hosting**: GitHub Pages (automatically builds from master branch)  
- **Custom Styling**: Uses Fira Code and Inconsolata fonts with custom CSS themes
- **No build process required** - Jekyll builds automatically on GitHub Pages

### Directory Structure

- **`Daily Plan/`** - Organized by academic year (20242025/, 20232024/, etc.)
  - `Daily Slides/` - Contains Marp-generated presentation slides (.md → .html)
  - `images/` - Course-specific images and graphics
- **`Presentations/`** - Subject-organized presentations (AP Review/, AP SHM/, Forces/, etc.)
- **`ap-physics-quiz/`** - Standalone interactive quiz application (see existing CLAUDE.md)
- **`Coding/`** - Student game projects and coding resources
- **`PorterThemes/`** - Custom CSS themes for different courses
- **`AP Resource Pages/`** - Additional practice and review materials

### Content Types

1. **Marp Presentations**: Markdown files converted to HTML slides using Marp theme system
2. **Jekyll Pages**: Standard markdown files processed by Jekyll (.md)
3. **Interactive Tools**: Standalone web applications (quiz tools, games)
4. **Static Assets**: Images, videos, CSS themes, and PDFs

## Development Workflow

### Adding New Content

1. **Daily Agendas**: Add entries to appropriate `.md` file in `Daily Plan/YYYY2025/Daily Slides/`
2. **New Presentations**: Create in subject-specific folder under `Presentations/`
3. **Quiz Questions**: Edit CSV files in `ap-physics-quiz/data/`
4. **Images/Assets**: Add to appropriate `images/` subdirectory

### Marp Presentation Format
Daily slides use YAML frontmatter:
```yaml
---
title: Course Name YYYY-YYYY
marp: true
theme: physics2024 
paginate: true
footer: Custom footer text
math: mathjax
---
```

### Theme System
- **Main Theme**: Flexoki-based modern theme (`css/flexoki-theme.css`)
- **Theme Toggle**: JavaScript-powered light/dark mode switching (`js/theme-toggle.js`)
- **Legacy Themes**: Custom course themes in `PorterThemes/Schodack/` for Marp presentations
- **User Preference**: Theme selection persisted in localStorage, defaults to light mode
- **Accessibility**: High contrast ratios and keyboard navigation support

### File Naming Conventions
- Academic year format: YYYY2025 (e.g., 20242025)
- Course abbreviations: AP (AP Physics), RP (Regents Physics), EarthSci, etc.
- Date format in slides: YYYY.MM.DD

## Key Features

- **Multi-Course Support**: AP Physics, Regents Physics, Earth Science, Physical Science, Coding
- **Interactive Elements**: Quiz applications, embedded videos, mathematical notation (MathJax)
- **Responsive Design**: Mobile-friendly layouts with custom CSS
- **Resource Organization**: Hierarchical structure by year, course, and topic
- **GitHub Pages Integration**: Automatic deployment from master branch

## Common Tasks

### Adding a New Daily Agenda Entry
Edit the appropriate `.md` file in `Daily Plan/20242025/Daily Slides/` and add using the established format with date headers and agenda items.

### Creating New Presentations
1. Create new folder under `Presentations/` if needed
2. Add markdown source and any required assets
3. Follow existing presentation structure and theming

### Updating Quiz Content
Edit CSV files in `ap-physics-quiz/data/` - the application loads questions dynamically.

### Theme Customization
- **CSS Variables**: All colors defined as CSS custom properties in `:root` and `[data-theme="dark"]`
- **Theme Toggle**: Use `window.themeManager.setTheme('light'|'dark')` or `window.themeManager.toggleTheme()`
- **Custom Colors**: Modify Flexoki color variables in `css/flexoki-theme.css`
- **Responsive Breakpoints**: 768px (tablet) and 480px (mobile) breakpoints defined

## Navigation and URLs
- Main site navigation defined in `_config.yml` header_pages
- Presentation links use relative paths from site root
- Quiz tools and games are standalone applications with their own navigation