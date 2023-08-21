/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'success': 'var(--c-success)',
        'warning': 'var(--c-warning)',
        'error': 'var(--c-error)',
        'info': 'var(--c-info)',
        'primary': 'var(--c-primary)',
        'primary-active': 'var(--c-primary-active)',
        'primary-light': 'var(--c-primary-light)',
        'primary-fade': 'var(--c-primary-fade)',
        'border-base': 'var(--c-border)',
        'border-dark': 'var(--c-border-dark)',
        'border-code': 'var(--c-border-code)',
        'danger': 'var(--c-danger))',
        'danger-active': 'var(--c-danger-active)',
        'bg-base': 'var(--c-bg-base)',
        'bg-active': 'var(--c-bg-active)',
        'bg-card': 'var(--c-bg-card)',
        'bg-code': 'var(--c-bg-code)',
        'bg-selection': 'var(--c-bg-selection)',
        'bg-dm': 'var(--c-bg-dm)',
        'text-bs': 'var(--c-text-base)',
        'text-code': 'var(--c-text-code)',
        'text-secondary': 'var(--c-text-secondary)',
        'text-secondary-light': 'var(--c-text-secondary-light)',
        'bg-btn-disabled': 'var(--c-bg-btn-disabled)',
        'text-btn-disabled': 'var(--c-text-btn-disabled)',
        'text-btn-disabled-deeper': 'var(--c-text-btn-disabled-deeper)',
        'text-btn': 'var(--c-text-btn)',

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'skeleton-loading': {
          '0%': {
            'background-color': 'var(--c-border)',
          },
          '100%': {
            'background-color': 'var(--c-border-dark)',
          },
        },
      },
      animation: {
        skeleton: 'skeleton-loading 1s linear infinite alternate',
      },
    },
  },
  plugins: [],

}
