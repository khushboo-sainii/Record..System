/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        dark: "#207bff",   
        light: "#4ea5ff", 
        white: "#f5f7fa" 
      }
    },
  },
  plugins: [],
}
