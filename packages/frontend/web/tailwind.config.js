import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,tsx}'],
  safelist: [
    'md:ps-2.5',
    'md:pe-2.5',
    'order-1',
    'order-2',
    'order-3',
    'order-4',
    'order-5',
    'order-6',
    'md:order-1',
    'md:order-2',
    'md:order-3',
    'md:order-4',
    'md:order-5',
    'md:order-6',
    'lg:order-1',
    'lg:order-2',
    'lg:order-3',
    'lg:order-4',
    'lg:order-5',
    'lg:order-6',
    'right-[8%]',
    'lg:right-[15%]',
    'lg:right-[8%]',
    'lg:right-[4%]',
    'lg:right-[0%]',
    'md:right-[16%]',
    'md:right-[10%]',
    'md:right-[5%]',
    'md:right-[0%]',
    'lg:w-[130%]',
    'lg:w-[110%]',
    'lg:w-[108%]',
    'lg:w-[104%]',
    'lg:w-[103%]',
    'md:w-[116%]',
    'md:w-[110%]',
    'md:w-[105%]',
    'w-[5%]',
    'w-[10%]',
    'w-[15%]',
    'w-[20%]',
    'w-[25%]',
    'w-[30%]',
    'w-[35%]',
    'w-[40%]',
    'w-[45%]',
    'w-[50%]',
    'w-[55%]',
    'w-[60%]',
    'w-[65%]',
    'w-[70%]',
    'w-[75%]',
    'w-[80%]',
    'w-[85%]',
    'w-[90%]',
    'w-[95%]',
    'w-[100%]',
    'w-[105%]',
    'w-[108%]',
    'w-[110%]',
    'w-[113%]',
    'lg:clip-path-polygon-purple-lg',
    'lg:clip-path-polygon-yellow-lg',
    'lg:clip-path-polygon-green-lg',
    'lg:clip-path-polygon-blue-lg',
    'lg:clip-path-polygon-orange-lg',
    'lg:clip-path-polygon-pink-lg',
    'md:clip-path-polygon-purple-md',
    'md:clip-path-polygon-yellow-md',
    'md:clip-path-polygon-green-md',
    'md:clip-path-polygon-blue-md',
    'md:clip-path-polygon-orange-md',
    'md:clip-path-polygon-pink-md',
    'clip-path-polygon-purple',
    'clip-path-polygon-yellow',
    'clip-path-polygon-green',
    'clip-path-polygon-blue',
    'clip-path-polygon-orange',
    'clip-path-polygon-pink',
    'bg-dark-purple',
    'bg-dark-blue',
    'bg-dark-green',
    'bg-dark-yellow',
    'bg-dark-orange',
    'bg-dark-pink',
    'filter-black-to-purple',
    'filter-black-to-blue',
    'filter-black-to-green',
    'filter-black-to-pink',
    'filter-black-to-yellow',
    'filter-black-to-orange',
    "bg-[url('form-cocktail/bubble/bubble-1.png')]",
    "bg-[url('form-cocktail/bubble/bubble-2.png')]",
    "bg-[url('form-cocktail/bubble/bubble-3.png')]",
    "bg-[url('form-cocktail/bubble/bubble-4.png')]",
    "bg-[url('form-cocktail/bubble/bubble-5.png')]",
    "bg-[url('form-cocktail/bubble/bubble-6.png')]",
    "bg-[url('home/home-1.png')]",
    "bg-[url('home/home-2.png')]",
    "bg-[url('home/home-3.png')]",
    "bg-[url('home/home-4.png')]",
    "bg-[url('home/home-5.png')]",
    "bg-[url('home/home-6.png')]",
    'bg-card-blue',
    'bg-card-light-green',
    'bg-card-dark-green',
    'bg-card-virgin-pink',
    'bg-card-virgin-dark-pink',
    'bg-card-virgin-salmon',
    'bg-card-virgin-light-blue',
    'bg-card-virgin-strong-pink',
    'bg-card-virgin-strong-purple',
    'bg-profile-picture-blue',
    'bg-profile-picture-green',
    'bg-profile-picture-orange',
    'bg-profile-picture-yellow',
    'bg-profile-picture-red',
    'bg-profile-picture-pink',
    'bg-profile-picture-purple',
    'text-[#03454E]',
    'text-[#000000]',
    'text-[#A4440A]',
    'text-[#036749]',
    'text-[#800A91]',
    'text-[#FEADB3]',
    'text-[#8A741F]',
    'hover:text-[#55460C]',
    'hover:text-[#000000]',
    'hover:text-[#663416]',
    'hover:text-[#101D1F]',
    'hover:text-[#7D244E]',
    'hover:text-[#02432F]',
    'hover:text-[#4E0758]',
    'sm:duration-[100ms]',
    'sm:duration-[100ms]',
    'sm:duration-[200ms]',
    'sm:duration-[300ms]',
    'sm:duration-[400ms]',
    'sm:duration-[500ms]',
    'sm:duration-[600ms]',
    'sm:right-[40px]',
    'sm:right-[80px]',
    'sm:right-[120px]',
    'sm:right-[160px]',
    'sm:right-[200px]',
    'sm:right-[240px]',
  ],
  theme: {
    fontFamily: {
      sans: ['Mochiy Pop One', 'sans-serif', ...fontFamily.sans],
    },
    extend: {
      screens: {
        xs: '360px',
        xxs: '260px',
      },
      colors: {
        white: '#FFFFFF',
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
        'wow-orange': '#F89B1D',
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
        'pastel-blue': '#A7D9EF',
        'pastel-pink': '#FF017B',
        'card-blue': '#85ACDA',
        'card-light-green': '#85DA89',
        'card-dark-green': '#85DABF',
        'card-virgin-pink': '#F575D1',
        'card-virgin-dark-pink': '#F57575',
        'card-virgin-salmon': '#F5A975',
        'card-virgin-light-blue': '#A2C3F5',
        'card-virgin-strong-pink': '#FB86DA',
        'card-virgin-strong-purple': '#E08AEC',
        'card-virgin-orange': '#FF9900',
        'profile-picture-blue': '#07BCD5',
        'profile-picture-green': '#35B888',
        'profile-picture-orange': '#F2682F',
        'profile-picture-yellow': '#F2DF2F',
        'profile-picture-red': '#ED1E1E',
        'profile-picture-pink': '#DD1D5E',
        'profile-picture-purple': '#9F13AF',
      },
      rotate: {
        17: '17deg',
      },
      textStroke: (theme) => ({
        dark: '4px #000000',
      }),
      animation: {
        'fade-out': 'fade-out 2000ms ease-in forwards',
        'color-pulse': 'color-pulse 2s linear infinite',
      },
      keyframes: {
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'color-pulse': {
          '0%, 100%': { color: 'white' },
          '25%': { color: 'yellow' },
          '50%': { color: 'orange' },
          '75%': { color: 'red' },
        },
      },
    },
    keyframes: {
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
    animation: {
      'spin-infinite': 'spin 5s linear infinite',
    },
  },
  variants: {},
  plugins: [],
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-stroke': {
          '-webkit-text-stroke': theme('textStroke.dark'),
          'text-stroke': theme('textStroke.dark'),
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
