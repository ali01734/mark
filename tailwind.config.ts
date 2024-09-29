import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        // padding: "1rem",
        screens: {
          sm: "100%",
          md: "540px",
          lg: "720px",
          xl: "1340px",
        },
      },
      color: {
        primary: "#3db573",
      },
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.56)",
      },
    },
  },
  variants: {
    boxShadow: ["hover"], // Ensure hover variant is enabled
  },
  plugins: [],
};
export default config;
