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
      'almost-black': '#141414',
      'red-invalid': '#CD2C2C',
      'input-border': '#CFCFCF'
    },
    fontFamily: {
      'manrope': 'Manrope'
    },

  },
  plugins: [],
}

