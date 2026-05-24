import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        ink: '#0A0A0A',
        orange: {
          DEFAULT: '#FB6221',
          hover: '#E5531A',
        },
        soft: '#D1D3D5',
        surface: '#F2F2F2',
        neutralGray: '#929090',
        warmDark: '#4C433F',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          '"Segoe UI"',
          'Roboto',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          '"SF Mono"',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      fontSize: {
        'display-hero': ['clamp(2.75rem, 7vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-section': ['clamp(2.25rem, 4.5vw, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'lead': ['clamp(1.125rem, 1.4vw, 1.375rem)', { lineHeight: '1.45' }],
        'micro': ['0.75rem', { lineHeight: '1', letterSpacing: '0.12em' }],
      },
      borderRadius: {
        card: '1.5rem',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 20px 40px -20px rgba(10,10,10,0.08)',
        liftSoft: '0 30px 60px -30px rgba(10,10,10,0.18)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
