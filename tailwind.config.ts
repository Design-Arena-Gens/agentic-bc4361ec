import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        surface: "#111c3d",
        accent: "#38bdf8"
      },
      boxShadow: {
        glow: "0 0 25px rgba(56, 189, 248, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
