/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkBackGround: '#1A1A1A',
        darkBackGroundTwo: '#2A2A2A',
        darkBackGroundThree: '#141122',
        primaryOne: '#F27721',
        primaryTwo: '#FF7A21',
        primaryThree: '#9E501E',
      },
      fontFamily: {
        oswald: "'Oswald', sans-serif",
        sourceSansPro: "'Source Sans Pro', sans-serif",
      },
      keyframes: {
        marqueeRightToLeft: {
          '0%': { transform: 'translateX(100%)' },
          100: { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marqueeRightToLeft: 'marqueeRightToLeft 15s linear infinite',
      },
    },
  },
  plugins: [],
};
