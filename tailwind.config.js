/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
      background: '#171717',
      },
      screens: {
        xs: "480px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1440px",
      },
    },
  },
  plugins: [],
}

