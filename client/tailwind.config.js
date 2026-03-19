/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        primary: '#1a1a1a',
        secondary: '#f5f5f5',
        accent: '#c9a16e', // Gold/Luxury accent
      }
    },
  },
  plugins: [],
}
