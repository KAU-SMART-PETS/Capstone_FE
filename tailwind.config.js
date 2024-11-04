/** @type {import('tailwindcss').Config} */

// tailwind.config.js
const colors = {
  // 주요 색상 
  primary: '#73A8BA',
  safe: '#73C38E',
  danger: '#EF5F5F',
  warning: '#EFAE5F',
  // 회색
  secondary: '#A3A3AC',
  lightgrey: '#F4F4F4',
  silver : '#D9D9D9',
  // 단색
  white: '#FFFFFF',
  black: '#000000',
  // 일반 컬러 
  red: '#FF8A80',
  pink: '#FFAFA3',
  yellow: '#FFD966',
  orange: '#FFB74D',
  green: '#85E0A3',
  darkgreen : '#A3C488',
  skyblue: '#D7E8EE',
  blue: '#80CAFF',
  purple: '#C4A8FF',
  brown: '#C09999',
};

const colorKeys = Object.keys(colors);  // colors 객체에서 키만 가져옴

// Tailwind CSS 설정을 정의합니다.
const tailwindConfig = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/*.{js,ts,jsx,tsx}", "./src/**/**/*.{js,ts,jsx,tsx}", "./stories/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: new RegExp(`(bg|text|border)-(${colorKeys.join('|')})`),
    },
  ],
  theme: {
    extend: {
      colors: colors,
    },
  },
};

module.exports = tailwindConfig;
module.exports.colors = colors; // colors 객체를 별도로 내보내기