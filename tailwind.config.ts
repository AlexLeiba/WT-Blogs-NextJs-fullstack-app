import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      scaleIn: 'scaleIn 200ms ease',
      scaleOut: 'scaleOut 200ms ease',
      fadeIn: 'fadeIn 200ms ease',
      fadeOut: 'fadeOut 200ms ease',
      enterFromLeft: 'enterFromLeft 250ms ease',
      enterFromRight: 'enterFromRight 250ms ease',
      exitToLeft: 'exitToLeft 250ms ease',
      exitToRight: 'exitToRight 250ms ease',
      rotate: 'rotate 1s linear infinite',
      prixClipFix: 'prixClipFix 2s linear infinite',
    },
    screens: {
      lg: '1280px',
      md: {
        max: '1279px',
        min: '768px',
      },
      sm: {
        max: '767px',
      },
    },
    colors: {
      black: 'var(--black)',
      white: 'var(--white)',
      baseline: {
        '50': 'var(--baseline-50)',
        '100': 'var(--baseline-100)',
        '200': 'var(--baseline-200)',
        '300': 'var(--baseline-300)',
        '400': 'var(--baseline-400)',
        '500': 'var(--baseline-500)',
        '600': 'var(--baseline-600)',
        '700': 'var(--baseline-600)',
        '800': 'var(--baseline-800)',
        '900': 'var(--baseline-900)',
        '950': 'var(--baseline-950)',
      },
      primary: {
        '50': 'var(--primary-50)',
        '100': 'var(--primary-100)',
        '200': 'var(--primary-200)',
        '300': 'var(--primary-300)',
        '400': 'var(--primary-400)',
        '500': 'var(--primary-500)',
        '600': 'var(--primary-600)',
        '700': 'var(--primary-600)',
        '800': 'var(--primary-800)',
        '900': 'var(--primary-900)',
        '950': 'var(--primary-950)',
      },
      secondary: {
        '50': 'var(--secondary-50)',
        '100': 'var(--secondary-100)',
        '200': 'var(--secondary-200)',
        '300': 'var(--secondary-300)',
        '400': 'var(--secondary-400)',
        '500': 'var(--secondary-500)',
        '600': 'var(--secondary-600)',
        '700': 'var(--secondary-600)',
        '800': 'var(--secondary-800)',
        '900': 'var(--secondary-900)',
        '950': 'var(--secondary-950)',
      },
      tertiary: {
        '50': 'var(--tertiary-50)',
        '100': 'var(--tertiary-100)',
        '200': 'var(--tertiary-200)',
        '300': 'var(--tertiary-300)',
        '400': 'var(--tertiary-400)',
        '500': 'var(--tertiary-500)',
        '600': 'var(--tertiary-600)',
        '700': 'var(--tertiary-600)',
        '800': 'var(--tertiary-800)',
        '900': 'var(--tertiary-900)',
        '950': 'var(--tertiary-950)',
      },
      error: {
        '50': 'var(--error-50)',
        '100': 'var(--error-100)',
        '200': 'var(--error-200)',
        '300': 'var(--error-300)',
        '400': 'var(--error-400)',
        '500': 'var(--error-500)',
        '600': 'var(--error-600)',
        '700': 'var(--error-600)',
        '800': 'var(--error-800)',
        '900': 'var(--error-900)',
        '950': 'var(--error-950)',
      },
      success: {
        '50': 'var(--success-50)',
        '100': 'var(--success-100)',
        '200': 'var(--success-200)',
        '300': 'var(--success-300)',
        '400': 'var(--success-400)',
        '500': 'var(--success-500)',
        '600': 'var(--success-600)',
        '700': 'var(--success-600)',
        '800': 'var(--success-800)',
        '900': 'var(--success-900)',
        '950': 'var(--success-950)',
      },

      // text colors
      'text-base': 'var(--text-base)',
      'text-light': 'var(--text-light)',
      'text-disabled': 'var(--text-disabled)',
      'text-accent': 'var(--text-accent)',
      'text-accent-disabled': 'var(--text-accent-disabled)',
      'text-link': 'var(--text-link)',
      'text-link-hover': 'var(--text-link-hover)',
      'text-error': 'var(--text-error)',
      'text-error-disabled': 'var(--text-error-disabled)',
      'text-success': 'var(--text-success)',
      'text-inverted': 'var(--text-inverted)',

      // icon colors
      'icon-base': 'var(--icon-base)',
      'icon-light': 'var(--icon-light)',
      'icon-lighter': 'var(--icon-lighter)',
      'icon-disabled': 'var(--icon-disabled)',
      'icon-accent': 'var(--icon-accent)',
      'icon-accent-hover': 'var(--icon-accent-hover)',
      'icon-accent-disabled': 'var(--icon-accent-disabled)',
      'icon-error': 'var(--icon-error)',
      'icon-error-disabled': 'var(--icon-error-disabled)',
      'icon-success': 'var(--icon-success)',
      'icon-inverted': 'var(--icon-inverted)',

      // border colors
      'border-base': 'var(--border-base)',
      'border-light': 'var(--border-light)',
      'border-lighter': 'var(--border-lighter)',
      'border-disabled': 'var(--border-disabled)',
      'border-accent': 'var(--border-accent)',
      'border-highlight': 'var(--border-highlight)',
      'border-highlight-disabled': 'var(--border-highlight-disabled)',
      'border-error': 'var(--border-error)',
      'border-success': 'var(--border-success)',
      'border-inverted': 'var(--border-inverted)',

      // surface colors (e.g. background of a div)
      'surface-base': 'var(--surface-base)',
      'surface-lightest': 'var(--surface-lightest)',
      'surface-lighter': 'var(--surface-lighter)',
      'surface-light': 'var(--surface-light)',
      'surface-disabled': 'var(--surface-disabled)',
      'surface-accent': 'var(--surface-accent)',
      'surface-accent-hover': 'var(--surface-accent-hover)',
      'surface-tonal': 'var(--surface-tonal)',
      'surface-tonal-hover': 'var(--surface-tonal-hover)',
      'surface-highlight': 'var(--surface-highlight)',
      'surface-highlight-hover': 'var(--surface-highlight-hover)',
      'surface-highlight-disabled': 'var(--surface-highlight-disabled)',
      'surface-error': 'var(--surface-error)',
      'surface-error-hover': 'var(--surface-error-hover)',
      'surface-error-lightest': 'var(--surface-error-lightest)',
      'surface-success': 'var(--surface-success)',
      'surface-success-lightest': 'var(--surface-success-lightest)',
      'surface-inverted': 'var(--surface-inverted)',
    },
    fontSize: {
      // Headings
      // h1 desktop
      '9xl': ['5.2rem', { lineHeight: '6.4rem', letterSpacing: '-1.28px' }],

      // h2 desktop
      '8xl': ['4.4rem', { lineHeight: '5.4rem', letterSpacing: '-0.48px' }],

      // h1 mobile
      '7xl': ['3.6rem', { lineHeight: '4.8rem', letterSpacing: '-0.4px' }],

      // h2 mobile
      '6xl': ['3.2rem', { lineHeight: '4.2rem', letterSpacing: '-0.36px' }],

      // h3 desktop
      '5xl': ['3.6rem', { lineHeight: '4.8rem', letterSpacing: '-0.32px' }],

      // h3 mobile
      '4xl': ['2.8rem', { lineHeight: '3.8rem', letterSpacing: '-0.3px' }],

      // h4 desktop
      '3xl': ['2.8rem', { lineHeight: '3.8rem' }],

      // h4 mobile
      '2xl': ['2.4rem', { lineHeight: '3.2rem' }],

      xl: ['1.25rem', { lineHeight: '1.875rem' }],
      l: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.18px' }],
      base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.16px' }],
      s: ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0.28px' }],
      xs: ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0.24px' }],
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config;
