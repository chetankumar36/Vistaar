/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "vistaar-black": "#000000",
        "vistaar-gold": "#d4af37",
        "vistaar-gold-light": "#f5e6a8",  // you can change this shade

      },
    },
  },
  plugins: [],
};

