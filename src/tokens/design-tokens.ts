/**
 * MEDkey Design Tokens
 * 
 * 设计系统的所有 token 定义
 * 用于在 TypeScript 代码中类型安全地使用设计系统
 */

// ============================================================================
// Color Tokens
// ============================================================================

export const colors = {
  // Brand Colors - MEDkey Teal
  brand: {
    tealDark: 'hsl(188 50% 36%)',    // #2D7A8A
    tealLight: 'hsl(188 50% 60%)',   // #5EC4D6
  },

  // Primary
  primary: {
    DEFAULT: 'hsl(188 50% 36%)',
    foreground: 'hsl(0 0% 100%)',
  },

  // Secondary
  secondary: {
    DEFAULT: 'hsl(188 50% 95%)',
    foreground: 'hsl(188 50% 36%)',
  },

  // Accent
  accent: {
    DEFAULT: 'hsl(188 50% 60%)',
    foreground: 'hsl(188 50% 20%)',
  },

  // Status Colors
  success: {
    DEFAULT: 'hsl(152 60% 42%)',
    light: 'hsl(150 50% 95%)',
    foreground: 'hsl(152 60% 20%)',
  },
  warning: {
    DEFAULT: 'hsl(25 95% 53%)',
    light: 'hsl(30 100% 96%)',
    foreground: 'hsl(20 80% 30%)',
  },
  destructive: {
    DEFAULT: 'hsl(0 84% 60%)',
    foreground: 'hsl(0 0% 98%)',
  },
  info: {
    DEFAULT: 'hsl(188 50% 60%)',
    light: 'hsl(188 50% 95%)',
    foreground: 'hsl(188 50% 20%)',
  },

  // Neutral Colors
  background: 'hsl(40 20% 97%)',
  foreground: 'hsl(192 50% 10%)',
  card: 'hsl(0 0% 100%)',
  'card-foreground': 'hsl(192 50% 10%)',
  popover: 'hsl(0 0% 100%)',
  'popover-foreground': 'hsl(192 50% 10%)',
  muted: 'hsl(40 15% 93%)',
  'muted-foreground': 'hsl(220 10% 46%)',
  border: 'hsl(220 13% 91%)',
  input: 'hsl(220 13% 91%)',
  ring: 'hsl(188 50% 36%)',
} as const;

// ============================================================================
// Spacing Tokens - 4px Grid System
// ============================================================================

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const;

// ============================================================================
// Border Radius Tokens
// ============================================================================

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
} as const;

// ============================================================================
// Shadow Tokens
// ============================================================================

export const shadows = {
  sm: '0 1px 2px rgba(45, 122, 138, 0.05)',
  md: '0 2px 8px rgba(45, 122, 138, 0.08)',
  lg: '0 4px 16px rgba(45, 122, 138, 0.12)',
  xl: '0 8px 32px rgba(45, 122, 138, 0.16)',
  glow: '0 0 24px rgba(94, 196, 214, 0.3)',
} as const;

// ============================================================================
// Typography Tokens
// ============================================================================

export const typography = {
  // Font Family
  fontFamily: {
    sans: '"DM Sans", system-ui, sans-serif',
  },

  // Font Sizes
  fontSize: {
    h1: '32px',
    h2: '24px',
    h3: '20px',
    h4: '18px',
    'body-lg': '16px',
    body: '14px',
    caption: '12px',
    tiny: '10px',
  },

  // Font Weights
  fontWeight: {
    bold: '700',
    semibold: '600',
    medium: '500',
    regular: '400',
  },

  // Line Heights
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
  },
} as const;

// ============================================================================
// Animation Tokens
// ============================================================================

export const animation = {
  // Transition Durations
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },

  // Easing Functions
  easing: {
    'ease-out': 'cubic-bezier(0.33, 1, 0.68, 1)',
    'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
  },
} as const;

// ============================================================================
// Z-Index Tokens
// ============================================================================

export const zIndex = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  auto: 'auto',
} as const;

// ============================================================================
// Breakpoints
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// Type Exports
// ============================================================================

export type ColorKey = keyof typeof colors;
export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ShadowKey = keyof typeof shadows;
export type FontSizeKey = keyof typeof typography.fontSize;
export type FontWeightKey = keyof typeof typography.fontWeight;
export type DurationKey = keyof typeof animation.duration;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Convert HSL string to RGB object
 */
export function hslToRgb(hsl: string): { r: number; g: number; b: number } {
  const match = hsl.match(/hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);
  if (!match) return { r: 0, g: 0, b: 0 };

  const [, h, s, l] = match;
  const H = parseInt(h);
  const S = parseInt(s) / 100;
  const L = parseInt(l) / 100;

  const C = (1 - Math.abs(2 * L - 1)) * S;
  const X = C * (1 - Math.abs(((H / 60) % 2) - 1));
  const m = L - C / 2;

  let r = 0, g = 0, b = 0;

  if (H >= 0 && H < 60) { r = C; g = X; b = 0; }
  else if (H >= 60 && H < 120) { r = X; g = C; b = 0; }
  else if (H >= 120 && H < 180) { r = 0; g = C; b = X; }
  else if (H >= 180 && H < 240) { r = 0; g = X; b = C; }
  else if (H >= 240 && H < 300) { r = X; g = 0; b = C; }
  else if (H >= 300 && H < 360) { r = C; g = 0; b = X; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/**
 * Get hex color from HSL string
 */
export function hslToHex(hsl: string): string {
  const { r, g, b } = hslToRgb(hsl);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Get CSS variable name for a color
 */
export function getCssVar(category: string, subcategory?: string): string {
  if (subcategory) {
    return `--${category}-${subcategory}`;
  }
  return `--${category}`;
}

/**
 * Get HSL value from CSS variable
 */
export function getHslFromVar(varName: string): string {
  return `hsl(var(${varName}))`;
}
