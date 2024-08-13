/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f0f2f5',
        tertiary: '#222222',
      },
      fontFamily: {
        lora: ['Lora', 'sans-serif']
      }
    },
  },
  plugins: [],
}