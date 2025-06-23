/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4565FF',
        'primary-light': '#6985FF', 
        'primary-dark': '#3B55D9',
        secondary: '#9455FF',
        'secondary-light': '#B585FF',
        'secondary-dark': '#7934D9',
        dark: '#121212',
        'dark-light': '#1E1E1E',
        light: '#F5F5F5',
        'light-dark': '#E5E5E5'
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
}