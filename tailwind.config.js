/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      backgroundImage: {
        'banner': "url('/public/images/pizza.jpeg')",
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(45deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 10s ease-in-out infinite alternate',
      },
      colors: {
        'main': '#eaa53b',
      },

      fontFamily:{
        'deluis': ["Delius Unicase", 'cursive']
      }
      
    },
   
  },
  plugins: [],
}