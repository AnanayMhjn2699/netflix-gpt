/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md-only': {'min': '447px', 'max': '767px'}, // Custom breakpoint for min-width 447px and max-width 767px
        'md-laptop':{'max':'1262px'},
      },
    },
  },
  plugins: [],
}