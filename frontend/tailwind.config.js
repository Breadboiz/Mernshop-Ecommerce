/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      opacity: {
        '30': '0.3',  // Thêm giá trị opacity 30
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // List themes here
    darkTheme: "dark", // Specify the dark theme
  },
};