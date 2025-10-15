/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",
        dark: "#0A0A0A",
        light: "#F2F2F2",
        accent: "#B3122D",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
      },
      transitionTimingFunction: {
        "in-out-smooth": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};



