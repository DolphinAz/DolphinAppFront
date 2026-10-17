import plugin from "tailwindcss/plugin.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  // Preserve native form controls and the storefront's existing base styles.
  corePlugins: {
    preflight: false,
    container: false
  },
  theme: {
    screens: {
      wide: {
        min: "1500px"
      },
      compact: {
        max: "1180px"
      },
      tablet: {
        max: "960px"
      },
      mobile: {
        max: "720px"
      }
    },
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "sans-serif"],
        heading: ['"Manrope"', "sans-serif"],
        editorial: ["Georgia", "serif"]
      },
      keyframes: {
        "catalog-spin": {
          to: {
            transform: "rotate(360deg)"
          }
        }
      },
      animation: {
        "catalog-spin": "catalog-spin 0.8s linear infinite"
      }
    }
  },
  plugins: [plugin(({
    addBase
  }) => {
    addBase({
      ":root": {
        "font-family": "\"DM Sans\", sans-serif",
        "color": "#203845",
        "background": "#fff",
        "font-synthesis": "none",
        "text-rendering": "optimizeLegibility",
        "-webkit-font-smoothing": "antialiased",
        "--blue": "#087fb8",
        "--blue-dark": "#07638f",
        "--ink": "#203845",
        "--muted": "#78838a",
        "--line": "#e8edef",
        "--cream": "#f6f4ed",
        "--radius": "12px"
      },
      "*": {
        "box-sizing": "border-box"
      },
      "body": {
        "margin": "0",
        "min-width": "320px"
      },
      "button": {
        "font": "inherit",
        "-webkit-tap-highlight-color": "transparent",
        "cursor": "pointer",
        "color": "inherit",
        "border": "0",
        "background": "none",
        "outline-offset": "5px"
      },
      "input": {
        "font": "inherit",
        "-webkit-tap-highlight-color": "transparent",
        "outline-offset": "5px"
      },
      "select": {
        "font": "inherit",
        "-webkit-tap-highlight-color": "transparent",
        "outline-offset": "5px"
      },
      "textarea": {
        "font": "inherit",
        "-webkit-tap-highlight-color": "transparent",
        "outline-offset": "5px"
      },
      "a": {
        "-webkit-tap-highlight-color": "transparent",
        "color": "inherit",
        "text-decoration": "none",
        "outline-offset": "5px"
      },
      "button:disabled": {
        "cursor": "default",
        "opacity": "0.5"
      },
      "img": {
        "max-width": "100%",
        "display": "block"
      },
      "h1": {
        "margin": "0",
        "font-family": "\"Manrope\", \"DM Sans\", sans-serif",
        "font-size": "44px",
        "line-height": "1.2",
        "font-weight": "750",
        "letter-spacing": "-1.7px"
      },
      "h2": {
        "margin": "0",
        "font-family": "\"Manrope\", \"DM Sans\", sans-serif",
        "font-size": "29px",
        "line-height": "1.3",
        "letter-spacing": "-1px",
        "font-weight": "750"
      },
      "h3": {
        "margin": "0",
        "font-family": "\"Manrope\", \"DM Sans\", sans-serif",
        "font-weight": "700"
      },
      "p": {
        "margin": "0",
        "line-height": "1.7"
      },
      "svg": {
        "flex-shrink": "0"
      },
      ":focus-visible": {
        "outline": "3px solid #55b7df"
      },
      "::selection": {
        "background": "#cbeaf5"
      },
      "main": {
        "min-height": "50vh"
      },
      "@media (prefers-reduced-motion: reduce)": {
        "*": {
          "animation": "none !important",
          "transition": "none !important",
          "scroll-behavior": "auto !important"
        },
        "*:before": {
          "animation": "none !important",
          "transition": "none !important",
          "scroll-behavior": "auto !important"
        },
        "*:after": {
          "animation": "none !important",
          "transition": "none !important",
          "scroll-behavior": "auto !important"
        }
      }
    });
  })]
};
