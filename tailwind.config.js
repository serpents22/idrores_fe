const colors = require ('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      boxShadow: {
        'card': 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
      },
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