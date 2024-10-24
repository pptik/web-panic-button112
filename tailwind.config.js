import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#FFD245",
        main: "#DA2F3E",
        green: "#54FF45",
      },
    },
  },
  plugins: [],
});
