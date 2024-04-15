import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: 
    {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        green: "#008081",
        "light-gray": "#F2F2F2",
        "deep-green": "#008081",
        "light-green": "rgba(0, 128, 129, 0.10)",
        yellow: "#FFBE06",
        "caution-pink": "#EDB7B7",
        layer: "rgba(0, 0, 0, 0.4)",
        darklayer: "rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
export default config
