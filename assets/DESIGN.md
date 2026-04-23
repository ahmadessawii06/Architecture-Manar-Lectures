# Design System Specification: Editorial Academic Excellence

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **The Digital Scholar**. Unlike standard Learning Management Systems that feel utilitarian and rigid, this system adopts a high-end editorial approach. It treats educational content with the prestige of a premium digital publication, utilizing intentional asymmetry, breathing room, and deep tonal layering.

We move away from the "boxed-in" feel of traditional tables and grids. By leveraging expansive whitespace and subtle glassmorphism, we create an environment that reduces cognitive load, allowing students to focus on what matters: the curriculum. The layout is structured yet fluid, using a "nested depth" philosophy to guide the eye through lecture series and weekly milestones.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a vibrant, authoritative blue, supported by a sophisticated range of cool neutrals that provide depth without the need for harsh dividers.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Structural boundaries must be defined exclusively through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background creates a clear but soft distinction.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of premium materials.
- **Base Layer:** `surface` (#f5f6ff) – The expansive canvas.
- **Sectioning:** `surface-container-low` (#ecf0ff) – Large grouping areas (e.g., the background for a "Week" block).
- **Interactive Cards:** `surface-container-lowest` (#ffffff) – High-priority interactive elements that "pop" against the lower layers.

### Glass & Gradient Rule
To achieve a signature look, primary hero elements (like the Header Banner) must use a subtle linear gradient: 
- **From:** `primary` (#005da4) 
- **To:** `primary-container` (#4fa4ff) at a 135-degree angle.
For floating overlays or navigation, use Glassmorphism by applying `surface` colors at 80% opacity with a `backdrop-filter: blur(12px)`.

---

## 3. Typography
The typography system uses a dual-font approach to balance academic authority with modern readability.

*   **Display & Headlines (Manrope):** A geometric sans-serif that feels contemporary and structural. Use `display-lg` for course titles to command attention.
*   **Body & Titles (Inter):** Chosen for its exceptional legibility at small sizes. Use `title-md` for lecture names and `body-md` for descriptive content.
*   **Functional Labels (Work Sans):** Used for badges and micro-copy. Its slightly wider stance ensures that metadata (like dates and lecture numbers) remains distinct and legible even at `label-sm`.

---

## 4. Elevation & Depth
Depth in this system is an atmospheric quality, not a structural one.

*   **The Layering Principle:** Avoid shadows for static content. Achieve lift by placing a `surface-container-lowest` card on a `surface-container-low` background. 
*   **Ambient Shadows:** For "floating" components like active lecture cards or modals, use a highly diffused shadow: `box-shadow: 0 12px 32px rgba(26, 47, 80, 0.06)`. Note that the shadow uses a tinted version of `on-surface` (#1a2f50) rather than pure black to maintain a natural, airy feel.
*   **The Ghost Border:** If a boundary is required for accessibility (e.g., input fields), use `outline-variant` (#9aadd6) at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### The Header Banner
A large, rounded-corner container (`xl` scale: 1.5rem) featuring the primary gradient. Content should be center-aligned with high-contrast `on-primary` text. Use internal padding of `spacing-10` to ensure an editorial, spacious feel.

### Lecture Cards
- **Structure:** Use `surface-container-lowest` for the card body. 
- **Header:** A `primary` color badge for the lecture number (rounded-full).
- **Spacing:** Utilize `spacing-4` (1.4rem) for internal padding.
- **No Dividers:** Separate date, topic, and button using vertical whitespace (`spacing-3`) rather than horizontal lines.
- **Button:** The "Watch Lecture" button should use the `primary` color with a subtle `primary-dim` hover state.

### Weekly Grouping Sidebar
Instead of a standard vertical list, use a bold, rotated "WEEKS" indicator or a high-contrast sidebar using `headline-lg` in `on-surface-variant`. This creates a strong anchor point for the eye and breaks the horizontal monotony of the grid.

### Badges & Chips
- **Lecture Badges:** Use `surface-tint` with `on-primary` text.
- **Status Chips:** Use `secondary-container` for highlighted alerts (e.g., "New") to provide a warm counterpoint to the dominant blue.

---

## 6. Do's and Don'ts

### Do
*   **Do** use `spacing-8` or `spacing-10` between major sections to create an "expensive" feel.
*   **Do** use the `primary` gradient for CTAs and Hero sections to add "soul" to the interface.
*   **Do** leverage the `surface-container` tiers to create hierarchy without adding visual noise.
*   **Do** ensure all interactive elements have a `DEFAULT` (0.5rem) or `lg` (1rem) corner radius.

### Don't
*   **Don't** use black (#000000) for text. Always use `on-surface` (#1a2f50) for a softer, more professional contrast.
*   **Don't** use 1px solid borders to separate "Week 1" from "Week 2." Use a background shift to `surface-container-low`.
*   **Don't** cram content. If a card feels tight, increase the `spacing` token rather than shrinking the font.
*   **Don't** use standard drop shadows. If a shadow doesn't look like "ambient light," it is too heavy.