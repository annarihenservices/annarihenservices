/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    colors:{
      'red':'#CD212A',
      'green':'#008C45',
      'CustomWhite':'#FFF5EE',
      'black':"#000000",
      'white':"#ffffff",
      'overlay-gray': 'rgba(0, 0, 0, 0.6)',
    },
    fontFamily: {
      'montserrat': ['Montserrat'],
      'lato': ['Lato'],
      'garamond': ['Garamond'],
      'inter': ['Inter'],
  },
  },
  plugins: [],
}
