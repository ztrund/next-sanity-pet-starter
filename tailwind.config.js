/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-shades': '#F0F3E7',
        'light-accent': '#B1B38A',
        'main-brand-color': '#E1A126',
        'dark-accent': '#B67640',
        'dark-shades': '#3D3231',
      },
    },
  },
  plugins: [],
}
