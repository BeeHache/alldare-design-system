# Workspace Guidelines for AI Agents (AGENTS.md)

This repository defines the centralized **Alldare Design System** (design tokens, vectors, and string assets) and compiles them for downstream consumption by the Web and Kotlin Multiplatform (KMP) Mobile applications.

---

## 🛠️ Repository Architecture & Pipeline

### 1. Token Mappings (`/tokens/`)
All visual and structural tokens are declared as raw JSON structures and compiled via Style Dictionary.
*   **Colors (`colors.json`):** Semantic brand and theme colors.
*   **Typography (`typography.json`):** Font families and size scales.
*   **Spacing (`spacing.json`):** Centralized layout padding and margins.
*   **Borders (`borders.json`):** Rounded shapes and border widths.
*   **Animations (`animations.json`):** Transition durations.
*   **Strings (`strings.json`):** Standard UX copy and localized strings.

### 2. Vector Asset Registry (`/assets/svgs/`)
*   Master SVGs are stored here.
*   The asynchronous compiler (`build.js`) converts SVGs to native Android Vector XML Drawables (`svg2vectordrawable`) for mobile and copies clean SVGs directly into the Web assets directory.

### 3. Build & Compilation Pipeline
*   **Build command:** Run `npm run build` to run the token and asset pipeline.
*   **Outputs:**
    *   **Web (Angular):** Outputs directly to `alldare-frontend/src/assets/design-tokens.css`.
    *   **Mobile (KMP Compose):** Outputs Kotlin constants to `alldare-mobile/shared/src/commonMain/kotlin/online/alldare/mobile/shared/theme/DesignTokens.kt` and XML drawables to `alldare-mobile/androidApp/src/main/res/drawable/`.

---

## 📜 Coding & Contribution Standards

1.  **Prevent Name Collisions:**
    *   Style Dictionary uses a flat name resolution. Ensure tokens in different namespaces (e.g. `border.radius.sm` vs `spacing.sm`) do not result in identical target names.
    *   Maintain the `name/cti/kebab` transform inside `build.js` for KMP outputs to prevent Flat KMP Class namespace conflicts.
2.  **Downstream Verification:**
    *   After running `npm run build`, verify that the generated CSS variables compile inside Angular (`npm run build` in web frontend) and Gradle formats (`./gradlew compileKotlin` in mobile).
3.  **Preserve Comments & Structure:** Keep helper functions and transformation rules inside `build.js` intact unless explicitly requested.
