import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f7ff",
          100: "#dbeaff",
          200: "#b9d8ff",
          300: "#8cc1ff",
          400: "#5aa9f6",
          500: "#50b0f0",
          600: "#2f8fd4",
          700: "#0060c0",
          800: "#004b98",
          900: "#003b78"
        },
        sparkle: {
          50: "#fff8dd",
          200: "#f5e0a2",
          400: "#f0d040"
        },
        cloud: {
          50: "#f7f8fb",
          100: "#eef1f6",
          200: "#e2e6ee"
        },
        ink: {
          900: "#0a1b2a",
          700: "#2c3f52",
          500: "#4a5d72"
        }
      },
      boxShadow: {
        soft: "0 22px 50px -35px rgba(10, 27, 42, 0.45)",
        card: "0 20px 45px -30px rgba(10, 27, 42, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
