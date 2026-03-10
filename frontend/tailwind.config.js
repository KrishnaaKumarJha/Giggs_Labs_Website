/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0B1F3B',    // Deep Tech Blue
          secondary: '#1E7BFF',  // Electric Blue
          accent: '#7A5CFF',     // AI Violet
          highlight: '#2ED6FF',  // Neon Cyan
          bg: '#F7F9FC',         // Soft White
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
  ],
}
