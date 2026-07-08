# Alldare Design System

Centralized package containing design tokens, vector assets, and copy resources for the Alldare Platform.

This package automatically builds and distributes assets directly into the:
1.  **Web App:** Angular client (`alldare-frontend`) via standard CSS variables.
2.  **Mobile App:** Kotlin Multiplatform client (`alldare-mobile`) via compiled Kotlin type properties and native Android Vector Drawables.

---

## 📁 Repository Structure

*   `tokens/`: Source design tokens defined in JSON format:
    *   `colors.json`: Brand, surface, and feedback colors.
    *   `typography.json`: Typography size scales and font families.
    *   `spacing.json`: Layout padding, margins, and grid sizing.
    *   `borders.json`: Border widths and corner rounding profiles.
    *   `animations.json`: Standard transition durations.
    *   `strings.json`: Shared user-facing copy and localized string tokens.
*   `assets/svgs/`: Source vector graphics (e.g. brand, login icons).
*   `build.js`: The compiler pipeline task. Runs Style Dictionary and `svg2vectordrawable` translators.

---

## 🚀 Commands

### Installation
Install dependencies for Style Dictionary and asset translators:
```bash
npm install
```

### Compiling Tokens & Assets
Compile all JSON tokens and vector assets, and distribute them to frontend and mobile source trees:
```bash
npm run build
```
