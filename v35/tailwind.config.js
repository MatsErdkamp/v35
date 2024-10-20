import v35Colors from "./src/themes/colors";
import v35Typography from "./src/themes/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: v35Typography,
      colors: v35Colors,
    },
  },
  plugins: [],
};
