/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#35785F",
        primaryDark: "#35785F",
        primaryLight: "#1B5842",
        TextDark: "#333333",
        TextLight: "#757575",
        TextWhite: "#FFFFFF",
        Gray1: "#FAFAFA",
        Gray2: "#BCBFBF",
        Green: "#379477",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
