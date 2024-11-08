/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      height: {
        "screen-327": "calc(100vh - 327px)",
      },
      colors: {
        skyBlue: {
          100: "#EBF8FE",
          400: "#9ddefc",
          500: "#0B84BC",
        },
        surface: {
          100: "#FFFAE6",
        },
        border: {
          100: "#F2F4F7",
        },
        green: {
          100: "#027A48",
          200: "#ECFDF3",
        },
        black: {
          100: "#101828",
          200: "#353535",
          300: "#475467",
          400: "#2B2B2B",
        },
        gray: {
          100: "#F5F5F5",
          150: "#667085",
          200: "#F0F0F0",
          250: "#C5C5C5",
          300: "rgba(0, 0, 0, 0.70)",
          350: "#EDEDED",
          400: "#EBEBEB29",
          450: "#666C89",
          500: "#8181810D",
          550: "#000000BD",
          600: "#B8B8B8",
          650: "#6E6D7A",
          700: "#676767",
          750: "#1F23290F",
          800: "#F2F4F7",
          850: "#696969",
          900: "#E4E7EC",
          950: "#bdbdbd",
          1000: "#F9F9F9",
          1050: "#F1F1F1",
        },
        yellow: {
          100: "#FFECBA",
          200: "#FFAB00",
        },
        red: {
          100: "#F04438",
          200: "#AA205E40",
        },
        modal: "#000000ac",
      },
      screens: {
        sm: "640px",
        md: "768px",
        desktop: "1024px",
      },
    },
  },
  plugins: [],
};
