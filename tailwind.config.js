import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s infinite', // 1s durasi, diulang terus menerus
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      colors: {
        yellow: "#FFD245",
        main: "#DA2F3E",
        green: "#54FF45",
      },
    },
  },
  plugins: [],
});
