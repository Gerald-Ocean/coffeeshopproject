import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ini palet warna kopi kustom kita
        coffee: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2b48c", // Tan
          500: "#b08d55",
          600: "#9c7c44",
          700: "#8a6b38",
          800: "#4b3621", // Dark Roast (Warna utama)
          900: "#3b2a1a",
        },
        beige: "#F5F5DC",
        cream: "#FFFDD0",
      },
    },
  },
  plugins: [],
};
export default config;