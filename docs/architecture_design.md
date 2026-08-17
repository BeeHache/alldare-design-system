# Architecture Specification: `alldare-design-system`

This document defines the unified UX design tokens, iconography mappings, typography scales, and CSS component variables for **`alldare-design-system`**.

---

## 1. Domain & Shared UX Responsibilities

`alldare-design-system` is the centralized visual design specification shared between Web (`alldare-web`, `alldare-phase0-ui`) and Mobile (`alldare-mobile` Jetpack Compose / SwiftUI).

* **Design Tokens**: Standardized color HSL values, spacing units, border radii, and typography scales.
* **Iconography Registry**: Action symbol mappings (Likes, Comments, Reposts, Shares, Bookmark, Media Upload).
* **Forbidden Tropes Enforcement**: Strict design guardrails prohibiting purple fonts on dark backgrounds, glowing border outlines, over-nested cards, and non-functional decorative clutter.
