import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,tsx}'],
  theme: {
    colors: {
      light: '#F4F7F6',
      dark: '#0E0F0F',
      'dark-purple': '#9F13AF',
      'dark-yellow': '#FED431',
      'dark-blue': '#07BCD5',
      'dark-orange': '#F2682F',
      'dark-green': '#35B888',
      'dark-pink': '#DD1D5E',
      'light-purple': '#B61BCB',
      'light-yellow': '#FCE544',
      'light-blue': '#0AD2E4',
      'light-orange': '#F58643',
      'light-green': '#4FD1A8',
      'light-pink': '#EA2879',
      'light-beige': '#FFF7D8',
      'pastel-green': '#C1F0DB',
      'pastel-pink': '#FDE0C7',
      'pastel-yellow': '#F5E4A2',
      'pastel-brown': '#D3BA95',
      'pastel-beige': '#FFFDD7',
      'card-pink': '#F5A2A2',
      'card-green': '#85DABF',
      'card-pink-dark': '#F5A975',
    },
    fontFamily: {
      sans: ['Mochiy Pop One', 'sans-serif', ...fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
};
