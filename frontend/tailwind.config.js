/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',  // <--- obligatoire !
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

