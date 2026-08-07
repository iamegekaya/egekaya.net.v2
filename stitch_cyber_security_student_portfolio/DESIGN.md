---
name: Bit & Aperture
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#383939'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#292a2a'
  surface-container-highest: '#343535'
  on-surface: '#e3e2e2'
  on-surface-variant: '#b9ccb2'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#303031'
  outline: '#84967e'
  outline-variant: '#3b4b37'
  surface-tint: '#00e639'
  primary: '#ebffe2'
  on-primary: '#003907'
  primary-container: '#00ff41'
  on-primary-container: '#007117'
  inverse-primary: '#006e16'
  secondary: '#a1d494'
  on-secondary: '#0a3909'
  secondary-container: '#23501e'
  on-secondary-container: '#90c283'
  tertiary: '#fcf8f8'
  on-tertiary: '#313030'
  tertiary-container: '#dfdcdb'
  on-tertiary-container: '#626060'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#72ff70'
  primary-fixed-dim: '#00e639'
  on-primary-fixed: '#002203'
  on-primary-fixed-variant: '#00530e'
  secondary-fixed: '#bcf0ae'
  secondary-fixed-dim: '#a1d494'
  on-secondary-fixed: '#002201'
  on-secondary-fixed-variant: '#23501e'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#343535'
typography:
  display-lg:
    fontFamily: JetBrains Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 32px
  stack-lg: 64px
---

## Brand & Style

This design system bridges the precision of cybersecurity with the artistic clarity of photography. The aesthetic is **High-Tech Minimalism**, characterized by expansive negative space, hyper-legible monospaced accents, and a dual-mode personality that shifts from a "command line" atmosphere to a "gallery" experience.

The target audience includes technical recruiters and creative collaborators. The UI should evoke a sense of controlled expertise, technical depth, and meticulous attention to detail. Key visual pillars include:
- **Functional Transparency:** Using subtle borders and overlays to show structural hierarchy.
- **Digital Precision:** Utilizing monospaced type for data points and metadata.
- **Visual Breathability:** Prioritizing focus on imagery and code blocks through generous whitespace.

## Colors

The palette is designed for high-contrast legibility and thematic shift between cybersecurity (Dark Mode) and professional photography (Light Mode).

### Dark Mode (Default)
- **Background:** Deep Charcoal (`#0A0A0A`) to True Black (`#000000`).
- **Primary Accent:** Matrix Green (`#00FF41`). Used for terminal prompts, active states, and success indicators.
- **Surface:** Dark Gray (`#161616`) for cards and containers.

### Light Mode
- **Background:** Soft Alabaster (`#FBFBFB`).
- **Primary Accent:** Forest Green (`#1B3022`). Used for high-contrast headers and meaningful actions.
- **Surface:** Crisp White (`#FFFFFF`) with thin Silver (`#E0E0E0`) borders.

**Functional Colors:**
- **Warning:** Amber (`#FFB000`) for security alerts or low-light photo warnings.
- **Error:** Crimson (`#FF3E3E`) for critical vulnerabilities or failed states.

## Typography

The typography system relies on a strict hierarchy between **JetBrains Mono** (technical/security data) and **Inter** (narrative/descriptive text).

- **Headlines:** Always use JetBrains Mono. In Dark Mode, headlines may have a subtle `0 0 8px` glow in the primary accent color to mimic a CRT display.
- **Body Text:** Inter is used for descriptions, photo captions, and long-form blog posts to ensure maximum readability.
- **Metadata:** Use `label-caps` for photo EXIF data (ISO, Shutter Speed) and security flags (CVE IDs, Risk Levels).
- **Code Snippets:** Use `code-sm` with a distinct background container and syntax highlighting that matches the primary/secondary palette.

## Layout & Spacing

The design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **Thematic Grid:** For technical projects, the grid should be visible as thin 1px lines (Dark Mode: `#1A1A1A`, Light Mode: `#F0F0F0`) to emphasize the "structured" nature of security.
- **Photography Layouts:** Use asymmetrical "No Grid" placements for photo galleries to create a dynamic, editorial feel, while maintaining safe margins.
- **Breakpoints:**
  - Mobile: < 768px (Single column stacked).
  - Tablet: 768px - 1024px (2-column grids for project cards).
  - Desktop: > 1024px (Full 12-column layout with 1200px max-width).

## Elevation & Depth

This design system avoids traditional drop shadows in favor of **Tonal Layering** and **Luminescent Borders**.

- **Depth in Dark Mode:** Achieved through surface color shifts. A background is `#000000`, a card is `#121212`, and an active state is `#1E1E1E`. 
- **The "Glow" Effect:** Instead of shadows, elevated elements in Dark Mode use a thin `1px` border of the primary color with a `box-shadow: 0 0 10px rgba(0, 255, 65, 0.2)`.
- **Light Mode Depth:** Uses "Ghost Borders"—ultra-thin 1px lines in a slightly darker shade than the background. 
- **Glassmorphism:** Use only for the navigation bar (`backdrop-filter: blur(12px)`) to provide a sense of context while scrolling.

## Shapes

To maintain a "technical" and "sharp" feel, the design system uses minimal roundedness.

- **Standard Components:** 4px (`rounded-sm`) for buttons, input fields, and tags.
- **Cards & Images:** 8px (`rounded-lg`) to provide a slight visual softening for photography.
- **Interactive States:** On hover, shapes should remain consistent, but border weight may increase or the primary "glow" may activate.

## Components

### Buttons
- **Primary:** Solid Primary Green background with Black text (Dark Mode) or Forest Green with White text (Light Mode). 
- **Ghost:** 1px border with Monospaced text. On hover, the background fills slightly (10% opacity).
- **States:** Hover triggers a slight outer glow in Dark Mode.

### Cards
- **Project Cards:** Feature a monospaced "Status" tag at the top right (e.g., `[STABLE]`, `[WIP]`). Background is a dark surface with no shadow.
- **Photo Cards:** Minimalist. No visible border until hover. Text overlay appears at the bottom with EXIF data in `label-caps`.

### Inputs & Terminal
- **Fields:** Single bottom border (1px) instead of a full box for a cleaner look. Focus state turns the border Primary Green.
- **Terminal Component:** A dedicated container for code/security tools with a "red, yellow, green" dot window decoration at the top left.

### Navigation
- **Desktop:** A minimalist horizontal bar with monospaced links.
- **Mobile:** A "Hamburger" menu that, when clicked, opens a full-screen overlay with large-scale monospaced typography and a "Command Line" prompt at the bottom.

### Chips & Tags
- Rectangular with 2px corner radius. Used for "Languages" (Python, C++) or "Camera Gear" (Sony A7IV, 35mm).