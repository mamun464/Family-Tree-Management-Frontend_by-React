/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      screens: {
        'min-xl': '500px', // Define your custom breakpoint for sm
        // Add more custom breakpoints if needed
      },
    },
  },
  plugins: [require("daisyui")],
}

