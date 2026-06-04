/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'purple-dark': '#1a0a2e',
        'purple-mid': '#2d1054',
        'purple-bright': '#8b1fd4',
        magenta: '#c026d3',
        'pink-vivid': '#e040fb',
        'pink-light': '#f3a0ff',
        'off-white': '#f0e8ff',
        grey: '#9980b3',
        'grey-light': '#d0b8e8',
        accent: '#ff6ef7',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        'dm-mono': ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
