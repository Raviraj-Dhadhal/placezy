/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: {
            DEFAULT: '#006765', // Button bg & primary brand
            hover: '#005553',
            light: 'rgba(207, 231, 230, 0.3)', // #CFE7E6 with 30% transparency
            surface: '#F0F3FF', // Sidebar selecting and hovering
          },
          text: {
            heading: '#151C27', // Headings, titles, bold text
            secondary: '#555E74', // Secondary text, subtitles, helpers
            muted: '#8E98B0',
            white: '#FFFFFF',
          },
          bg: {
            main: '#F8FAFC',
            card: '#FFFFFF',
            subtle: '#F1F5F9',
          },
          border: {
            DEFAULT: '#E2E8F0',
            light: '#F1F5F9',
          },
          status: {
            green: '#10B981',
            amber: '#F59E0B',
            red: '#EF4444',
            blue: '#3B82F6',
          }
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Merriweather', 'serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '14px',
        'badge': '9999px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0 2px 12px 0 rgba(15, 23, 42, 0.04)',
        'float': '0 8px 30px 0 rgba(15, 23, 42, 0.08)',
        'dropdown': '0 4px 20px 0 rgba(15, 23, 42, 0.1)',
      }
    },
  },
  plugins: [],
}
