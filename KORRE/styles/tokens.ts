import { Platform } from 'react-native';

export const palette = {
  black: '#000000',
  surface950: '#0A0A0A',
  surface900: '#111111',
  surface850: '#121212',
  surface800: '#161616',
  surface750: '#1A1A1A',
  surface700: '#202020',
  surface650: '#222222',
  surface600: '#333333',
  surface500: '#444444',
  surface400: '#666666',
  surface300: '#888888',
  surface200: '#E0E0E0',
  surface100: '#F5F5F5',
  white: '#FFFFFF',
  brand: '#00C853',
  brandLight: '#00E676',
  brandDark: '#007A33',
  danger: '#EF4444',
  dangerStrong: '#F44336',
  warning: '#FBBF24',
  warningStrong: '#FFC107',
  info: '#0A7EA4',
  blue: '#3B82F6',
  orange: '#F97316',
} as const;

export const alpha = {
  overlay: 'rgba(0,0,0,0.6)',
  overlayStrong: 'rgba(0,0,0,0.85)',
  overlayMax: 'rgba(0,0,0,0.95)',
  brand05: 'rgba(0, 200, 83, 0.05)',
  brand10: 'rgba(0, 200, 83, 0.1)',
  danger05: 'rgba(239, 68, 68, 0.05)',
  danger10: 'rgba(244, 67, 54, 0.1)',
  white05: 'rgba(255,255,255,0.05)',
  white20: 'rgba(255,255,255,0.2)',
} as const;

export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  round: 999,
} as const;

export const typography = {
  size: {
    xxs: 9,
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    display: 36,
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  family: Platform.select({
    ios: {
      sans: 'System',
      serif: 'Georgia',
      rounded: 'System',
      mono: 'Courier',
    },
    android: {
      sans: 'sans-serif',
      serif: 'serif',
      rounded: 'sans-serif',
      mono: 'monospace',
    },
    web: {
      sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      serif: "Georgia, 'Times New Roman', serif",
      rounded: "'SF Pro Rounded', sans-serif",
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    default: {
      sans: 'normal',
      serif: 'serif',
      rounded: 'normal',
      mono: 'monospace',
    },
  }),
} as const;

export const shadows = {
  sm: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
} as const;

export const colorScheme = {
  light: {
    primary: palette.brand,
    text: '#11181C',
    textSecondary: '#687076',
    background: palette.white,
    backgroundSecondary: palette.surface100,
    tint: palette.brand,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: palette.brand,
    border: palette.surface200,
    card: palette.white,
    success: palette.brand,
    warning: palette.warning,
    danger: palette.danger,
    info: palette.info,
    initial: palette.orange,
  },
  dark: {
    primary: palette.brand,
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    background: palette.surface950,
    backgroundSecondary: palette.surface800,
    tint: palette.white,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: palette.white,
    border: palette.surface650,
    card: palette.surface800,
    success: palette.brandLight,
    warning: palette.warning,
    danger: palette.danger,
    info: palette.info,
    initial: palette.orange,
  },
} as const;

export const tokens = {
  palette,
  alpha,
  spacing,
  radius,
  typography,
  shadows,
  colors: colorScheme,
} as const;

