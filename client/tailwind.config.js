/** @type {import('tailwindcss').Config} */
module.exports = {
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
    fontFamily: {
      heading2: ["League Gothic", "sans-serif"],
      mont: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
