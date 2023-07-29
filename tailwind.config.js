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
        'primary': 'var(--c-primary)',
        'primary-active': 'rgb(var(--c-primary-active))',
        'primary-light': 'rgb(var(--c-primary-light))',
        'primary-fade': 'rgb(var(--c-primary-fade))',
        'border': 'rgb(var(--c-border))',
        'border-dark': 'rgb(var(--c-border-dark))',
        'border-code': 'rgb(var(--c-border-code))',
        'danger': 'rgb(var(--c-danger))',
        'danger-active': 'rgb(var(--c-danger-active))',
        'bg-base': 'var(--c-bg-base)',
        'bg-active': 'rgb(var(--c-bg-active))',
        'bg-card': 'rgb(var(--c-bg-card))',
        'bg-code': 'rgb(var(--c-bg-code))',
        'bg-selection': 'rgb(var(--c-bg-selection))',
        'bg-dm': 'rgb(var(--c-bg-dm))',
        'text-base': 'rgb(var(--c-text-base))',
        'text-code': 'rgb(var(--c-text-code))',
        'text-secondary': 'rgb(var(--c-text-secondary))',
        'text-secondary-light': 'rgb(var(--c-text-secondary-light))',
        'bg-btn-disabled': 'rgb(var(--c-bg-btn-disabled))',
        'text-btn-disabled': 'rgb(var(--c-text-btn-disabled))',
        'text-btn-disabled-deeper': 'rgb(var(--c-text-btn-disabled-deeper))',
        'text-btn': 'rgb(var(--c-text-btn))',

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],

}
