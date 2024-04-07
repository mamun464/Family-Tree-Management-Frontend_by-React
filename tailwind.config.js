/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        'min-xl': '500px',
        'desktop': '1024px', // Define your custom breakpoint for sm
        // Add more custom breakpoints if needed
      },
      gridTemplateColumns: {
        // Define the grid columns for different breakpoints
        '3': 'repeat(3, minmax(0, 1fr))', // For screens between 768px and 1024px
        '4': 'repeat(4, minmax(0, 1fr))', // For screens larger than 1024px
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
}
