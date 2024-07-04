/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   
  theme: {
    extend: {
      width : {
        '20/21': '93.3333333%',
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        900: '950px',
      },
      height : {
        700: '615px',
      },
      borderRadius : {
            half :'50%',
      },
    },
  },
  plugins: [require('daisyui'),],
}

