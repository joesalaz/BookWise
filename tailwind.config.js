/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.hbs", "./public/**/*.js"],
  theme: {
    extend: {
      colors: {
        "title-blue": "#1c398e",
        "icon-blue": "#2563eb",
        "welcome-blue": "#1c398e",
        "feature-blue": "#1c398e",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        sourcesans: ["Source Sans 3", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
        marhey: ["Marhey", "cursive"],
        baloo2: ["Baloo 2", "cursive"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h2: {},
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
  
  


