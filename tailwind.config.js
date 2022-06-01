module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FFFFFF",
          purple: "#A008C8",
          green: "#17C927",
          turquoise: "#67CEE1",
          lavender: "#CD33FC",
          pink: "#FF01DB",
          darkBlue: "#5865F2",
          sky: "#28AAE1",
          blue: "#0070C0",
          grey: "#676767",
          orange: "#E18426",
        },
      },
      fontFamily: {
        arial: ["Arial", "sans-serif"],
        pressstart2p: ["PressStart2P", "Arial", "sans-serif"],
        vcrosd: ["VCROSD", "Arial", "sans-serif"],
        opensans: ["OpenSans", "Arial", "sans-serif"],
        roboto: ["Roboto", "Arial", "sans-serif"],
      },
    },
  },
};
