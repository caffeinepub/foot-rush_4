# Foot Rush — Colorful Theme Redesign

## Current State
The site has a clean light theme (white/cream backgrounds, blue accents). A theme switcher exists in the header with 8 themes, but all themes use a single-accent approach on mostly neutral backgrounds. The site feels monochromatic despite the theme switcher.

## Requested Changes (Diff)

### Add
- Vibrant multi-color gradient backgrounds across page sections (not just one accent color)
- Colorful gradient cards and section dividers
- Rainbow/multi-stop gradient marquee bar
- Colorful animated gradient hero overlay
- Vibrant gradient buttons with hover effects
- Colorful section backgrounds that alternate between different vivid hues

### Modify
- index.css: Update CSS variables to a vivid, bright multi-color default palette. Use bright, saturated OKLCH colors. Background sections should have colorful tinted backgrounds (light purples, teals, pinks, oranges), not just white/cream.
- HomePage.tsx: Add colorful gradient overlays to hero, colorful feature strip (each feature in a different vibrant hue), colorful category cards with vivid gradients, colorful CTA section with multi-color gradient background
- ProductCard.tsx: Add colorful hover states, badge colors
- Header.tsx: Add colorful gradient accent bar at top (rainbow), colorful promo bar with gradient
- Footer.tsx: Colorful footer with gradient background

### Remove
- Monotone/neutral section backgrounds

## Implementation Plan
1. Update index.css with a vibrant colorful default palette and add colorful gradient utility classes
2. Update HomePage.tsx sections to use vibrant colored backgrounds and gradients
3. Update Header.tsx with rainbow gradient top bar and vibrant promo bar
4. Update Footer.tsx with colorful gradient background
5. Update ProductCard.tsx with colorful accents
6. Validate and build
