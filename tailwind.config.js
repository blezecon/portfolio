/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark/light mode toggle
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5', // Indigo
          light: '#818cf8',
          dark: '#3730a3',
        },
        secondary: {
          DEFAULT: '#06b6d4', // Cyan
          light: '#67e8f9',
          dark: '#0891b2',
        },
        dark: {
          DEFAULT: '#111827', // Gray-900
          light: '#374151', // Gray-800 - Adding this fixes the error
          '50': 'rgba(17, 24, 39, 0.5)',
          '30': 'rgba(17, 24, 39, 0.3)',
          '10': 'rgba(17, 24, 39, 0.1)',
        },
        light: {
          DEFAULT: '#f9fafb', // Gray-50
          dark: '#f3f4f6', // Gray-100
          '50': 'rgba(249, 250, 251, 0.5)',
          '30': 'rgba(249, 250, 251, 0.3)',
          '10': 'rgba(249, 250, 251, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-very-slow': 'spin 15s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'light': '0 0 15px rgba(255, 255, 255, 0.3)',
        'color': '0 0 15px rgba(79, 70, 229, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      zIndex: {
        '-10': '-10',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: '#4f46e5',
              '&:hover': {
                color: '#818cf8',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}