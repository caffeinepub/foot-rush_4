# Foot Rush

## Current State
The site has a theme switcher with 4 themes: Blue, Crimson, Forest, Midnight. Themes are defined in store/themeStore.tsx as OKLCH token objects.

## Requested Changes (Diff)

### Add
- 4 new modern color themes: Sunset (coral/orange), Violet (purple), Teal (cyan/teal), Rose (warm pink/rose gold)

### Modify
- store/themeStore.tsx: extend ThemeId type and themes array with the 4 new entries

### Remove
- Nothing

## Implementation Plan
1. Add sunset, violet, teal, rose to ThemeId union
2. Append 4 new theme objects with OKLCH tokens to themes array
