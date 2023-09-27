const colors = require ('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#202225',
        secondary: '#5865f2'
        
      }
    },
    fontFamily: {
      'poppins': ['Poppins', 'Sans-serif']
    },
  },

  plugins: [],
}