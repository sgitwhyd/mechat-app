/** @type {import('tailwindcss/types').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            500: "#198EB6",
          },
          gray: {
            400: "rgba(217, 217, 217, 0.30)",
            500: "rgba(133, 133, 133, 0.30)",
          },
        },
      },
      fontSize: {
        "brand-xl": "1.375rem",
        "brand-2xl": "1.625rem",
      },
      lineHeight: {
        "brand-xl": "1.375rem",
        "brand-2xl": "1.625rem",
      },
    },
  },
  plugins: [],
};

module.exports = config;
