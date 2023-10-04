/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      'dark-orange': '#D87D4A',
      'light-orange': '#fbaf85',
      'white': '#FFFFFF',
      'black': '#000000',
      'dark-grey': '#F1F1F1',
      'grey': '#4C4C4C',
      'light-grey': '#FAFAFA',
      'almost-black': '#101010'
    },
    fontFamily: {
      'manrope': 'Manrope'
    }
  },
  plugins: [],
}

