module.exports = {
  content: ["./index.html", "./src/**/*.{svelte,css,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
