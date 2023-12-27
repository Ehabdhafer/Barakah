/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},
    colors: {
      blue: "#26577C",
      white: "#F5F5F5",
      background: "#D3D3D2",
      orange: "#F45050",
      input: "#FCFCFB",
      div: "#EBE4D1",
      gray: "#B4B4B3",
    },
    screens: {
      fold: "280px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },

    fontFamily: {
      heading2: ["League Gothic", "sans-serif"],
      mont: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
});
