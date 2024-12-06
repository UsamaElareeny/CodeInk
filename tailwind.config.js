/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px", // Small screen size
        md: "768px", // Medium screen size
        lg: "1024px", // Large screen size
        xl: "1280px", // Extra large screen size
      },
      container: {
        center: true, // Centers the container horizontally by default
        padding: "1rem", // Padding for all container sides
        screens: {
          sm: "100%", // 100% width for small screens
          md: "768px", // 768px max-width for medium screens
          lg: "1024px", // 1024px max-width for large screens
          xl: "1280px", // 1280px max-width for extra-large screens
        },
      },
      colors: {
        mainColor: "#ED9C4B",
        buttonBgColor: "#EEEDEA",
        buttonBgColorHover: "#D0C9C0",
      },
      fontFamily: {
        mainFont: ["Urbanist", "Arial", "Helvetica", "sans-serif"], // Set Urbanist as default sans
        secondaryFont: ["Lato", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
