# Agent Context: alldare-design-system

> [!IMPORTANT]
> This repository acts as the single source of truth for all visual tokens and asset primitives across the Alldare ecosystem. Do not modify token structures or asset configurations without an approved design system alignment plan.

## 1. Project Purpose
Centralizes, maintains, and compiles cross-platform design tokens (colors, type, sizing), vector iconography, and unified UI localized strings into native, platform-specific codebases for the Angular web and Kotlin Multiplatform (KMP) mobile layers.

---

## 2. Core Tech Stack & Commands
* **Runtime:** Node.js v20+ / Style Dictionary engine.
* **Package Manager:** `npm` (Local to this submodule workspace context).
* **Local Execution Commands:**
    - Install Pipeline Dependencies: `npm install`
    - Compile Tokens & Assets: `npm run build`

---

## 3. Directory Layout & Pipeline Mapping
The compilation pipeline inside `build.js` maps output files directly across the parent workspace. Ensure your relative directories match this flat topology before execution:

```text
alldare/
├── alldare-design-system/     <-- You are here
├── alldare-frontend/
└── alldare-mobile/