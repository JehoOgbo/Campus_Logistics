/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // React, Vue, or other JS/TS projects
    "./*.html", // A simple HTML file in the root
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e07900", // Our main orange color
        secondary: "#092238", // Our dark blue color
      },
    },
  },
  plugins: [],
};
