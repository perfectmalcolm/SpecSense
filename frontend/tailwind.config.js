const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.alexports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        figma: {
          "primary-action": "#2F80ED",
          "primary-text": "#333333",
          "secondary-text": "#828282",
          "primary-bg": "#FFFFFF",
          "secondary-bg": "#F2F2F2",
          "outline": "#E0E0E0",
        },
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
