# Web Artifacts Builder Skill

This skill enables creation of sophisticated, feature-rich web applications using modern frontend technologies and bundling tools.

## Purpose

Enable Claude to create more complex frontend artifacts by leveraging React, Tailwind CSS, shadcn/ui components, and bundling multiple files into standalone HTML applications.

## Technology Stack

- **React**: Component-based UI framework
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible UI components
- **Parcel**: Zero-config bundler for creating single-file HTML artifacts

## When to Use This Skill

Use this skill when building:
- Interactive web applications with multiple components
- Feature-rich tools (whiteboards, task managers, calculators)
- Standalone HTML artifacts that need to work offline
- Applications requiring state management and complex interactions

## Project Setup for React Artifacts

### 1. Initialize React Project

```bash
# Create new directory for the artifact
mkdir my-web-app
cd my-web-app

# Initialize npm project
npm init -y

# Install dependencies
npm install react react-dom
npm install -D parcel
```

### 2. Install Tailwind CSS (Optional but Recommended)

```bash
npm install -D tailwindcss postcss
npx tailwindcss init

# Create tailwind.config.js
cat > tailwind.config.js << EOF
module.exports = {
  content: ["./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Create styles.css with Tailwind directives
cat > src/styles.css << EOF
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF
```

### 3. Project Structure

```
my-web-app/
├── src/
│   ├── index.html      # Entry point
│   ├── App.jsx         # Main React component
│   ├── components/     # Additional components
│   └── styles.css      # Tailwind styles
├── package.json
└── tailwind.config.js
```

### 4. Basic Entry Point (src/index.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Web App</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./index.jsx"></script>
</body>
</html>
```

### 5. Basic React Entry (src/index.jsx)

```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

## Building Single-File HTML Artifacts

### Using Parcel to Bundle

```bash
# Development server
npm parcel src/index.html

# Production build (creates single bundled file)
npx parcel build src/index.html --dist-dir dist --no-source-maps

# The output in dist/index.html is a standalone file
```

### Adding to package.json

```json
{
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html --dist-dir dist --no-source-maps"
  }
}
```

## Using shadcn/ui Components

### Setup shadcn/ui

```bash
# Initialize shadcn/ui (requires manual setup)
npx shadcn-ui@latest init

# Install specific components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

### Common Components to Use

- **Button**: Interactive buttons with variants
- **Card**: Container for grouped content
- **Dialog**: Modal dialogs
- **Input**: Form inputs
- **Select**: Dropdown selects
- **Tabs**: Tabbed interfaces
- **Accordion**: Collapsible content

## Application to This Physics Education Project

### Use Cases

1. **Enhanced Quiz Application**
   - Build on existing `ap-physics-quiz` with React components
   - Add state management for quiz progress
   - Create interactive visualizations for physics concepts

2. **Interactive Simulations**
   - Physics simulation tools (projectile motion, forces, waves)
   - Mathematical visualizations
   - Data plotting tools

3. **Student Tools**
   - Formula reference apps
   - Unit converters
   - Problem-solving calculators

4. **Presentation Enhancements**
   - Interactive slides with React components
   - Embedded mini-apps within Marp presentations
   - Real-time demonstrations

### Example: Physics Calculator Component

```jsx
import React, { useState } from 'react';

function PhysicsCalculator() {
  const [mass, setMass] = useState('');
  const [acceleration, setAcceleration] = useState('');
  const [force, setForce] = useState(null);

  const calculateForce = () => {
    setForce(parseFloat(mass) * parseFloat(acceleration));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Force Calculator (F = ma)</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Mass (kg)"
          value={mass}
          onChange={(e) => setMass(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Acceleration (m/s²)"
          value={acceleration}
          onChange={(e) => setAcceleration(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          onClick={calculateForce}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Calculate Force
        </button>
        {force !== null && (
          <div className="text-xl font-semibold text-center">
            Force: {force.toFixed(2)} N
          </div>
        )}
      </div>
    </div>
  );
}

export default PhysicsCalculator;
```

## Best Practices

1. **Component Organization**: Keep components small and focused
2. **State Management**: Use useState for simple state, useContext for shared state
3. **Accessibility**: Ensure keyboard navigation and screen reader support
4. **Performance**: Minimize re-renders with useMemo and useCallback
5. **Styling**: Use Tailwind for rapid development, CSS modules for complex styling
6. **Testing**: Test interactive elements before bundling

## Workflow for Creating Artifacts

1. **Plan**: Identify features and component structure
2. **Setup**: Initialize project with required dependencies
3. **Develop**: Build components with hot-reload (npm run dev)
4. **Style**: Apply Tailwind classes or custom CSS
5. **Test**: Verify all interactions work correctly
6. **Bundle**: Create single-file artifact (npm run build)
7. **Deploy**: Copy bundled HTML to appropriate directory

## Integration with GitHub Pages

For this Jekyll site:

```bash
# Build artifact
npm run build

# Copy to site directory
cp dist/index.html ../path/to/tools/my-tool.html

# Commit and push - GitHub Pages will serve it automatically
```

## Resources

- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com
- Parcel: https://parceljs.org

## Notes

This skill enables creation of sophisticated, self-contained web applications that can be deployed as standalone HTML files on GitHub Pages, perfect for educational tools and interactive physics demonstrations.
