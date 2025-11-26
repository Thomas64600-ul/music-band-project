export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primary: "#FF2B6A",
        primaryGlow: "#FF5C8D",
        primaryDark: "#A01438",
        dark: "#0A0A0A",
        light: "#F2F2F2",
        accent: "#FF2B6A",

        reveren: {
          dark: {
            bg: "#0A0A0A",
            surface: "#111111",
            text: "#F2F2F2",
            subtext: "#B3B3B3",
            accent: "#B3122D",
            gold: "#FFD700",
            cyan: "#00E0FF",
            border: "#2A2A2A",
          },
          light: {
            bg: "#F9F9F9",
            surface: "#FFFFFF",
            text: "#1A1A1A",
            subtext: "#5A5A5A",
            accent: "#C2183C",
            gold: "#B8860B",
            cyan: "#0088A9",
            border: "#E0E0E0",
          },
        },

        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        subtext: "var(--subtext)",
        accent: "var(--accent)",
        gold: "var(--gold)",
        cyan: "var(--cyan)",
        border: "var(--border)",
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
        "glow-line": {
          "0%, 100%": { opacity: "0.4", transform: "scaleX(0.8)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        "glow-line": "glow-line 2s ease-in-out infinite",
      },

      transitionTimingFunction: {
        "in-out-smooth": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "reveren-glow": "0 0 25px rgba(179, 18, 45, 0.5)",
        "gold-glow": "0 0 20px rgba(255, 215, 0, 0.4)",
      },
    },
  },
  plugins: [],
};



