/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#FFD245",
        main: "#DA2F3E",
        green: "#54FF45",
        red: "Hapus"
      },
    },
  },
  plugins: [],
}

