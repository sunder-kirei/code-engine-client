/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode by adding a 'dark' class to an element
  theme: {
    extend: {
      colors: {
        mantis: {
          50: "#f6faf3",
          100: "#e9f5e3",
          200: "#d3eac8",
          300: "#afd89d",
          400: "#82bd69",
          500: "#61a146",
          600: "#4c8435",
          700: "#3d692c",
          800: "#345427",
          900: "#2b4522",
          950: "#13250e",
          1000: "#111111",
        },
        editor: "#1F1F1F",
        // Status Colors
        status: {
          success: "#4CAF50", // Green for success messages (Light Mode)
          warning: "#FF9800", // Yellow for warnings (Light Mode)
          error: "#F44336", // Red for error messages (Light Mode)
          darkSuccess: "#66BB6A", // Green for success (Dark Mode)
          darkWarning: "#FFB74D", // Yellow-orange for warnings (Dark Mode)
          darkError: "#F44336", // Red for error messages (Dark Mode)
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
