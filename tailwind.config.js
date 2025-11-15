/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fami: {
          red: "#a20000",
          gold: "#d7b05b",
          ivory: "#f8f1dc",
          ink: "#111111",
        },
      },
    },
  },
  plugins: [],
};
