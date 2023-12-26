import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        fancy: ["var(--font-fancy)"],
        barbarian: ["var(--font-barbarian)"],
        fantasy: ["var(--font-fantasy)"],
      },
    },
  },
  darkMode: "class",

  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#eef2ff",
              100: "#e0e7ff",
              200: "#c7d2fe",
              300: "#a5b4fc",
              400: "#818cf8",
              500: "#6366f1",
              600: "#4f46e5",
              700: "#4338ca",
              800: "#3730a3",
              900: "#312e81",
              950: "#1e1b4b",
              DEFAULT: "#6366f1",
              foreground: "#FFF",
              focus: "#6366f1",
            },
            secondary: {
              50: "#ecfeff",
              100: "#cffafe",
              200: "#a5f3fc",
              300: "#67e8f9",
              400: "#22d3ee",
              500: "#06b6d4",
              600: "#0891b2",
              700: "#0e7490",
              800: "#155e75",
              900: "#164e63",
              950: "#083344",
              DEFAULT: "#06b6d4",
              foreground: "#06b6d4",
              focus: "#06b6d4",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              50: "#eef2ff",
              100: "#e0e7ff",
              200: "#c7d2fe",
              300: "#a5b4fc",
              400: "#818cf8",
              500: "#6366f1",
              600: "#4f46e5",
              700: "#4338ca",
              800: "#3730a3",
              900: "#312e81",
              950: "#1e1b4b",
              DEFAULT: "#6366f1",
              foreground: "#6366f1",
              focus: "#6366f1",
            },
            secondary: {
              50: "#ecfeff",
              100: "#cffafe",
              200: "#a5f3fc",
              300: "#67e8f9",
              400: "#22d3ee",
              500: "#06b6d4",
              600: "#0891b2",
              700: "#0e7490",
              800: "#155e75",
              900: "#164e63",
              950: "#083344",
              DEFAULT: "#06b6d4",
              foreground: "#06b6d4",
              focus: "#06b6d4",
            },
          },
        },
        // ... custom themes
      },
    }),
  ],
};
export default config;
