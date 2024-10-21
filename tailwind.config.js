/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#73A8BA',
        'skyblue' : '#D7E8EE',
        'grey': '#A3A3AC',
        'red' : '#FF8A80',
        'pink': '#FFAFA3',
        'yellow': '#FFD966',
        'orange': '#FFB74D',
        'green': '#85E0A3',
        'blue': '#80CAFF',
        'purple': '#C4A8FF',
        'brown': '#C09999',
        'lightgrey': '#F7F7F7',
        'whitegrey':'#F4F4F4',
        'white': '#FFFFFF',
        'black': '#000000',
      },
    },
  },
  plugins: [],
}
