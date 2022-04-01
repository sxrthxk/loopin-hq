module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif']
      },
      colors: {
        'blakc': '#191919',
        'navy': '#2D4263',
        'red': '#C84B31',
        'beige': '#ECDBBA'
      }
    },
  },
  plugins: [],
}