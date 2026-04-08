import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class", // Chỉ để chữ "class" trong nháy kép, không dùng ngoặc vuông []
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config