
export default {
  darkMode: 'class',  
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulseGlow: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.3)", opacity: "0.9" },
        },
      },
      animation: {
        glow: "pulseGlow 2s infinite ease-in-out",
        pulseGlow: "pulseGlow 2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
