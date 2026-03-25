import { createContext, useContext, useEffect, useState } from "react";

export type ThemeId =
  | "blue"
  | "crimson"
  | "forest"
  | "midnight"
  | "sunset"
  | "violet"
  | "teal"
  | "rose";

interface ThemeDefinition {
  id: ThemeId;
  label: string;
  swatch: string;
  tokens: Record<string, string>;
}

export const themes: ThemeDefinition[] = [
  {
    id: "blue",
    label: "Blue",
    swatch: "oklch(0.55 0.18 255)",
    tokens: {
      "--background": "0.97 0.01 80",
      "--foreground": "0.18 0.01 250",
      "--card": "0.99 0 0",
      "--card-foreground": "0.18 0.01 250",
      "--popover": "0.99 0 0",
      "--popover-foreground": "0.18 0.01 250",
      "--primary": "0.55 0.18 255",
      "--primary-foreground": "0.99 0 0",
      "--secondary": "0.94 0.01 80",
      "--secondary-foreground": "0.18 0.01 250",
      "--muted": "0.9 0.01 80",
      "--muted-foreground": "0.5 0.01 80",
      "--accent": "0.55 0.18 255",
      "--accent-foreground": "0.99 0 0",
      "--border": "0 0 0 / 10%",
      "--input": "0 0 0 / 8%",
      "--ring": "0.55 0.18 255",
      "--electric": "0.55 0.18 255",
      "--sidebar": "0.97 0.01 80",
      "--sidebar-foreground": "0.18 0.01 250",
      "--sidebar-primary": "0.55 0.18 255",
      "--sidebar-primary-foreground": "0.99 0 0",
      "--sidebar-accent": "0.94 0.01 80",
      "--sidebar-accent-foreground": "0.18 0.01 250",
      "--sidebar-border": "0 0 0 / 10%",
      "--sidebar-ring": "0.55 0.18 255",
    },
  },
  {
    id: "crimson",
    label: "Crimson",
    swatch: "oklch(0.5 0.22 15)",
    tokens: {
      "--background": "0.97 0.005 20",
      "--foreground": "0.15 0.02 10",
      "--card": "0.99 0 0",
      "--card-foreground": "0.15 0.02 10",
      "--popover": "0.99 0 0",
      "--popover-foreground": "0.15 0.02 10",
      "--primary": "0.5 0.22 15",
      "--primary-foreground": "0.99 0 0",
      "--secondary": "0.94 0.005 20",
      "--secondary-foreground": "0.15 0.02 10",
      "--muted": "0.91 0.01 20",
      "--muted-foreground": "0.5 0.01 20",
      "--accent": "0.5 0.22 15",
      "--accent-foreground": "0.99 0 0",
      "--border": "0 0 0 / 10%",
      "--input": "0 0 0 / 8%",
      "--ring": "0.5 0.22 15",
      "--electric": "0.5 0.22 15",
      "--sidebar": "0.97 0.005 20",
      "--sidebar-foreground": "0.15 0.02 10",
      "--sidebar-primary": "0.5 0.22 15",
      "--sidebar-primary-foreground": "0.99 0 0",
      "--sidebar-accent": "0.91 0.01 20",
      "--sidebar-accent-foreground": "0.15 0.02 10",
      "--sidebar-border": "0 0 0 / 10%",
      "--sidebar-ring": "0.5 0.22 15",
    },
  },
  {
    id: "forest",
    label: "Forest",
    swatch: "oklch(0.42 0.14 155)",
    tokens: {
      "--background": "0.97 0.01 120",
      "--foreground": "0.18 0.03 150",
      "--card": "0.99 0 0",
      "--card-foreground": "0.18 0.03 150",
      "--popover": "0.99 0 0",
      "--popover-foreground": "0.18 0.03 150",
      "--primary": "0.42 0.14 155",
      "--primary-foreground": "0.99 0 0",
      "--secondary": "0.94 0.01 120",
      "--secondary-foreground": "0.18 0.03 150",
      "--muted": "0.91 0.01 120",
      "--muted-foreground": "0.5 0.02 130",
      "--accent": "0.42 0.14 155",
      "--accent-foreground": "0.99 0 0",
      "--border": "0 0 0 / 10%",
      "--input": "0 0 0 / 8%",
      "--ring": "0.42 0.14 155",
      "--electric": "0.42 0.14 155",
      "--sidebar": "0.97 0.01 120",
      "--sidebar-foreground": "0.18 0.03 150",
      "--sidebar-primary": "0.42 0.14 155",
      "--sidebar-primary-foreground": "0.99 0 0",
      "--sidebar-accent": "0.91 0.01 120",
      "--sidebar-accent-foreground": "0.18 0.03 150",
      "--sidebar-border": "0 0 0 / 10%",
      "--sidebar-ring": "0.42 0.14 155",
    },
  },
  {
    id: "midnight",
    label: "Midnight",
    swatch: "oklch(0.78 0.165 79)",
    tokens: {
      "--background": "0.18 0.02 250",
      "--foreground": "0.95 0.01 80",
      "--card": "0.22 0.02 250",
      "--card-foreground": "0.95 0.01 80",
      "--popover": "0.22 0.02 250",
      "--popover-foreground": "0.95 0.01 80",
      "--primary": "0.78 0.165 79",
      "--primary-foreground": "0.15 0.02 250",
      "--secondary": "0.28 0.02 250",
      "--secondary-foreground": "0.95 0.01 80",
      "--muted": "0.28 0.02 250",
      "--muted-foreground": "0.65 0.01 80",
      "--accent": "0.78 0.165 79",
      "--accent-foreground": "0.15 0.02 250",
      "--border": "1 1 1 / 10%",
      "--input": "1 1 1 / 8%",
      "--ring": "0.78 0.165 79",
      "--electric": "0.78 0.165 79",
      "--sidebar": "0.18 0.02 250",
      "--sidebar-foreground": "0.95 0.01 80",
      "--sidebar-primary": "0.78 0.165 79",
      "--sidebar-primary-foreground": "0.15 0.02 250",
      "--sidebar-accent": "0.28 0.02 250",
      "--sidebar-accent-foreground": "0.95 0.01 80",
      "--sidebar-border": "1 1 1 / 10%",
      "--sidebar-ring": "0.78 0.165 79",
    },
  },
  {
    id: "sunset",
    label: "Sunset",
    swatch: "oklch(0.62 0.21 35)",
    tokens: {
      "--background": "0.97 0.01 60",
      "--foreground": "0.18 0.02 30",
      "--card": "0.99 0 0",
      "--card-foreground": "0.18 0.02 30",
      "--popover": "0.99 0 0",
      "--popover-foreground": "0.18 0.02 30",
      "--primary": "0.62 0.21 35",
      "--primary-foreground": "0.99 0 0",
      "--secondary": "0.94 0.02 55",
      "--secondary-foreground": "0.18 0.02 30",
      "--muted": "0.91 0.02 55",
      "--muted-foreground": "0.5 0.02 40",
      "--accent": "0.62 0.21 35",
      "--accent-foreground": "0.99 0 0",
      "--border": "0 0 0 / 10%",
      "--input": "0 0 0 / 8%",
      "--ring": "0.62 0.21 35",
      "--electric": "0.62 0.21 35",
      "--sidebar": "0.97 0.01 60",
      "--sidebar-foreground": "0.18 0.02 30",
      "--sidebar-primary": "0.62 0.21 35",
      "--sidebar-primary-foreground": "0.99 0 0",
      "--sidebar-accent": "0.91 0.02 55",
      "--sidebar-accent-foreground": "0.18 0.02 30",
      "--sidebar-border": "0 0 0 / 10%",
      "--sidebar-ring": "0.62 0.21 35",
    },
  },
  {
    id: "violet",
    label: "Violet",
    swatch: "oklch(0.52 0.24 290)",
    tokens: {
      "--background": "0.97 0.01 280",
      "--foreground": "0.18 0.02 270",
      "--card": "0.99 0 0",
      "--card-foreground": "0.18 0.02 270",
      "--popover": "0.99 0 0",
      "--popover-foreground": "0.18 0.02 270",
      "--primary": "0.52 0.24 290",
      "--primary-foreground": "0.99 0 0",
      "--secondary": "0.94 0.02 280",
      "--secondary-foreground": "0.18 0.02 270",
      "--muted": "0.91 0.02 280",
      "--muted-foreground": "0.5 0.02 275",
      "--accent": "0.52 0.24 290",
      "--accent-foreground": "0.99 0 0",
      "--border": "0 0 0 / 10%",
      "--input": "0 0 0 / 8%",
      "--ring": "0.52 0.24 290",
      "--electric": "0.52 0.24 290",
      "--sidebar": "0.97 0.01 280",
      "--sidebar-foreground": "0.18 0.02 270",
      "--sidebar-primary": "0.52 0.24 290",
      "--sidebar-primary-foreground": "0.99 0 0",
      "--sidebar-accent": "0.91 0.02 280",
      "--sidebar-accent-foreground": "0.18 0.02 270",
      "--sidebar-border": "0 0 0 / 10%",
      "--sidebar-ring": "0.52 0.24 290",
    },
  },
  {
    id: "teal",
    label: "Teal",
    swatch: "oklch(0.54 0.17 195)",
    tokens: {
      "--background": "0.97 0.01 185",
      "--foreground": "0.18 0.02 190",
      "--card": "0.99 0 0",
      "--card-foreground": "0.18 0.02 190",
      "--popover": "0.99 0 0",
      "--popover-foreground": "0.18 0.02 190",
      "--primary": "0.54 0.17 195",
      "--primary-foreground": "0.99 0 0",
      "--secondary": "0.94 0.02 185",
      "--secondary-foreground": "0.18 0.02 190",
      "--muted": "0.91 0.02 185",
      "--muted-foreground": "0.5 0.02 188",
      "--accent": "0.54 0.17 195",
      "--accent-foreground": "0.99 0 0",
      "--border": "0 0 0 / 10%",
      "--input": "0 0 0 / 8%",
      "--ring": "0.54 0.17 195",
      "--electric": "0.54 0.17 195",
      "--sidebar": "0.97 0.01 185",
      "--sidebar-foreground": "0.18 0.02 190",
      "--sidebar-primary": "0.54 0.17 195",
      "--sidebar-primary-foreground": "0.99 0 0",
      "--sidebar-accent": "0.91 0.02 185",
      "--sidebar-accent-foreground": "0.18 0.02 190",
      "--sidebar-border": "0 0 0 / 10%",
      "--sidebar-ring": "0.54 0.17 195",
    },
  },
  {
    id: "rose",
    label: "Rose",
    swatch: "oklch(0.58 0.19 5)",
    tokens: {
      "--background": "0.97 0.01 15",
      "--foreground": "0.18 0.02 10",
      "--card": "0.99 0 0",
      "--card-foreground": "0.18 0.02 10",
      "--popover": "0.99 0 0",
      "--popover-foreground": "0.18 0.02 10",
      "--primary": "0.58 0.19 5",
      "--primary-foreground": "0.99 0 0",
      "--secondary": "0.94 0.02 12",
      "--secondary-foreground": "0.18 0.02 10",
      "--muted": "0.91 0.02 12",
      "--muted-foreground": "0.5 0.02 8",
      "--accent": "0.58 0.19 5",
      "--accent-foreground": "0.99 0 0",
      "--border": "0 0 0 / 10%",
      "--input": "0 0 0 / 8%",
      "--ring": "0.58 0.19 5",
      "--electric": "0.58 0.19 5",
      "--sidebar": "0.97 0.01 15",
      "--sidebar-foreground": "0.18 0.02 10",
      "--sidebar-primary": "0.58 0.19 5",
      "--sidebar-primary-foreground": "0.99 0 0",
      "--sidebar-accent": "0.91 0.02 12",
      "--sidebar-accent-foreground": "0.18 0.02 10",
      "--sidebar-border": "0 0 0 / 10%",
      "--sidebar-ring": "0.58 0.19 5",
    },
  },
];

function applyTheme(themeId: ThemeId) {
  const theme = themes.find((t) => t.id === themeId);
  if (!theme) return;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.tokens)) {
    root.style.setProperty(key, value);
  }
}

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "blue",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    return (localStorage.getItem("foot-rush-theme") as ThemeId) ?? "blue";
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
    localStorage.setItem("foot-rush-theme", id);
    applyTheme(id);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
