/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0f0f0f",
        secondary:
          "linear-gradient(90deg, rgba(71,0,147,1) 0%, rgba(8,0,56,1) 100%)",
        grey: "#161616",
        lightgrey: "#212121",
        offwhite: "#dfdfdd",
        translucent: "rgb(0, 0, 0, 0.9)",
        purple: "#5b53f1",
      },
    },
    screens: {
      xs: "300px",
      ss: "620px",
      sm: "971px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
