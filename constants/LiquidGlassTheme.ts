/**
 * iOS 26 Liquid Glass Design System
 *
 * Based on Apple's design principles from WWDC25:
 * - Translucent materials with optical qualities
 * - Dynamic color adaptation
 * - Layered depth with proper shadows
 * - Smooth transitions and micro-interactions
 */

export const LiquidGlassTheme = {
  // Color Palette - iOS 26 Style
  colors: {
    // Backgrounds
    background: {
      primary: '#F5F7FA',      // Soft gradient base
      secondary: '#FFFFFF',    // Pure white for contrast
      tertiary: '#E8EDF3',     // Subtle gray-blue
      gradient: ['#F0F4F8', '#E1E8EF', '#F5F9FC'], // Multi-layer depth
    },

    // Glass Tints
    glass: {
      light: 'rgba(255, 255, 255, 0.85)',
      medium: 'rgba(255, 255, 255, 0.70)',
      heavy: 'rgba(255, 255, 255, 0.95)',
      tinted: 'rgba(240, 248, 255, 0.80)',
      coloredLight: 'rgba(14, 165, 233, 0.08)',
      coloredMedium: 'rgba(14, 165, 233, 0.12)',
    },

    // Brand Colors
    primary: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      gradient: ['#0EA5E9', '#06B6D4'],
    },

    secondary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
    },

    // Semantic Colors
    success: '#10B981',
    successLight: '#34D399',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    error: '#EF4444',
    errorLight: '#F87171',

    // Neutrals - Enhanced contrast
    text: {
      primary: '#0F172A',      // Deep slate
      secondary: '#475569',    // Medium slate
      tertiary: '#64748B',     // Light slate
      quaternary: '#94A3B8',   // Very light slate
    },

    // Borders
    border: {
      light: 'rgba(226, 232, 240, 0.60)',
      medium: 'rgba(203, 213, 225, 0.80)',
      heavy: 'rgba(148, 163, 184, 0.40)',
      glass: 'rgba(255, 255, 255, 0.40)',
    },
  },

  // Typography Scale - iOS 26
  typography: {
    // Display sizes
    display: {
      large: { fontSize: 40, fontWeight: '900' as const, lineHeight: 48, letterSpacing: -0.5 },
      medium: { fontSize: 34, fontWeight: '800' as const, lineHeight: 42, letterSpacing: -0.4 },
      small: { fontSize: 28, fontWeight: '700' as const, lineHeight: 36, letterSpacing: -0.3 },
    },

    // Headline sizes
    headline: {
      large: { fontSize: 24, fontWeight: '800' as const, lineHeight: 32, letterSpacing: -0.2 },
      medium: { fontSize: 20, fontWeight: '700' as const, lineHeight: 28, letterSpacing: -0.1 },
      small: { fontSize: 18, fontWeight: '700' as const, lineHeight: 26 },
    },

    // Body text
    body: {
      large: { fontSize: 17, fontWeight: '400' as const, lineHeight: 26 },
      medium: { fontSize: 15, fontWeight: '400' as const, lineHeight: 22 },
      small: { fontSize: 13, fontWeight: '400' as const, lineHeight: 20 },
    },

    // Labels
    label: {
      large: { fontSize: 16, fontWeight: '600' as const, lineHeight: 24 },
      medium: { fontSize: 14, fontWeight: '600' as const, lineHeight: 20 },
      small: { fontSize: 12, fontWeight: '600' as const, lineHeight: 16 },
    },

    // Caption
    caption: {
      large: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16 },
      small: { fontSize: 11, fontWeight: '500' as const, lineHeight: 14 },
    },
  },

  // Spacing System - 4px base
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
    massive: 48,
  },

  // Border Radius - Rounded corners matching hardware
  borderRadius: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 28,
    full: 9999,
  },

  // Shadows - Layered depth
  shadows: {
    // Card shadows
    card: {
      light: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
      },
      medium: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
      },
      heavy: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        elevation: 8,
      },
    },

    // Glass shadows - softer, more diffused
    glass: {
      light: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
      },
      medium: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.10,
        shadowRadius: 20,
        elevation: 4,
      },
      heavy: {
        shadowColor: '#475569',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 32,
        elevation: 8,
      },
    },

    // Button shadows
    button: {
      default: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
      },
      pressed: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
      },
    },
  },

  // Glass Effects - Multi-layer system
  glass: {
    // Base glass material
    base: {
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.35)',
      backdropFilter: 'blur(20px)', // Note: Limited React Native support
    },

    // Elevated glass (cards, modals)
    elevated: {
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      borderWidth: 1.5,
      borderColor: 'rgba(255, 255, 255, 0.45)',
      backdropFilter: 'blur(30px)',
    },

    // Tinted glass (colored backgrounds)
    tinted: {
      backgroundColor: 'rgba(240, 248, 255, 0.80)',
      borderWidth: 1,
      borderColor: 'rgba(14, 165, 233, 0.20)',
      backdropFilter: 'blur(20px)',
    },

    // Frosted glass (heavy blur)
    frosted: {
      backgroundColor: 'rgba(255, 255, 255, 0.90)',
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.50)',
      backdropFilter: 'blur(40px)',
    },
  },

  // Animation Timings - Smooth and natural
  animations: {
    // Duration
    duration: {
      instant: 100,
      fast: 200,
      normal: 300,
      slow: 400,
      slower: 600,
    },

    // Easing curves - iOS spring physics
    easing: {
      standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
      spring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },

  // Component specific styles
  components: {
    // Button variants
    button: {
      primary: {
        height: 52,
        paddingHorizontal: 24,
        borderRadius: 16,
      },
      secondary: {
        height: 48,
        paddingHorizontal: 20,
        borderRadius: 14,
      },
      small: {
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 12,
      },
    },

    // Card variants
    card: {
      default: {
        borderRadius: 20,
        padding: 20,
      },
      compact: {
        borderRadius: 16,
        padding: 16,
      },
      spacious: {
        borderRadius: 24,
        padding: 28,
      },
    },

    // Input fields
    input: {
      height: 48,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1.5,
    },
  },
};

// Helper function to create gradient background
export const createGradientBackground = (colors: string[]) => ({
  background: `linear-gradient(135deg, ${colors.join(', ')})`,
});

// Helper to merge glass styles with custom styles
export const mergeGlassStyles = (baseGlass: keyof typeof LiquidGlassTheme.glass, customStyles: any = {}) => ({
  ...LiquidGlassTheme.glass[baseGlass],
  ...customStyles,
});

export default LiquidGlassTheme;
