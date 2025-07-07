/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        primary: '#2563EB', // blue-600
        'primary-50': '#EFF6FF',
        'primary-100': '#DBEAFE',
        'primary-500': '#3B82F6',
        'primary-600': '#2563EB',
        'primary-700': '#1D4ED8',
        'primary-foreground': '#FFFFFF',

        // Secondary
        secondary: '#64748B', // slate-500
        'secondary-50': '#F8FAFC',
        'secondary-100': '#F1F5F9',
        'secondary-200': '#E2E8F0',
        'secondary-500': '#64748B',
        'secondary-600': '#475569',
        'secondary-foreground': '#FFFFFF',

        // Accent
        accent: '#F59E0B', // amber-500
        'accent-50': '#FFFBEB',
        'accent-100': '#FEF3C7',
        'accent-500': '#F59E0B',
        'accent-600': '#D97706',
        'accent-foreground': '#FFFFFF',

        // Backgrounds & Surfaces
        background: '#FAFBFC',
        surface: '#FFFFFF',
        card: '#FFFFFF',
        popover: '#FFFFFF',

        // Text
        'text-primary': '#1E293B',
        'text-secondary': '#64748B',
        'text-muted': '#94A3B8',
        'text-foreground': '#1E293B',

        // Status
        success: '#10B981',
        'success-50': '#ECFDF5',
        'success-100': '#D1FAE5',
        'success-500': '#10B981',
        'success-600': '#059669',
        'success-foreground': '#FFFFFF',

        warning: '#F59E0B',
        'warning-50': '#FFFBEB',
        'warning-100': '#FEF3C7',
        'warning-500': '#F59E0B',
        'warning-600': '#D97706',
        'warning-foreground': '#FFFFFF',

        error: '#EF4444',
        'error-50': '#FEF2F2',
        'error-100': '#FEE2E2',
        'error-500': '#EF4444',
        'error-600': '#DC2626',
        'error-foreground': '#FFFFFF',

        // Border & Ring
        border: '#E2E8F0',
        'border-muted': '#F1F5F9',
        ring: '#2563EB',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        caption: ['Inter', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'ai-pulse': 'ai-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ai-thinking': 'ai-thinking 1.5s ease-in-out infinite',
        'smooth-scale': 'smooth-scale 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-opacity': 'smooth-opacity 150ms ease-in-out',
      },
      keyframes: {
        'ai-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'ai-thinking': {
          '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0.5' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
        'smooth-scale': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        'smooth-opacity': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}
