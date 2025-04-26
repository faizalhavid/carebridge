// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const config = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#ff0000',
        },
      },
    },
    plugins: [],
  }
  
  module.exports = config;
  