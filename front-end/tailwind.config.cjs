module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e07900",
        secondary: "#092238",
      },
      animation: {
        glow: "glow 1.5s infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 10px #ff00ff" },
          "50%": { boxShadow: "0 0 20px #ff00ff" },
        },
      },
    },
    plugins: [],
  },
};
