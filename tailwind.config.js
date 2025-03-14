/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-black": "#393939",
        "light-gray": "#9ca3af",
        accent: "#14919b",
      },

      spacing: {
        horizontal: "var(--spacing-horizontal)",
      },
    },
  },
  plugins: [],
};
