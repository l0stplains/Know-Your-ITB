import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "blue": {
          25: "#E0E8ED",
          50: "#6C8DA3",
          100: "#457082",
          200: "#365E76",
          400: "#1E3E53",
        },
        "green": {
          25: "#D1E6D8",
          50: "#649C75",
          100: "#306E43",
          200: "#144924",
          400: "#02280F",
        },
        "gray": {
          25: "#F2F2F7",
          50: "#E5E5EA",
          100: "#D1D1D6",
          200: "#C7C7CC",
          400: "#AEAEB2",
        }
      },
    },
  },
  plugins: [],
};
export default config;
