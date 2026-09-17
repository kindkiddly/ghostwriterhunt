/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        text: "var(--color-text)",
        "accent-gold": "var(--color-accent-gold)",
        "accent-olive": "var(--color-accent-olive)",
        card: "var(--color-card)",
        border: "var(--color-border)",
        "footer-bg": "var(--color-footer-bg)",
        "footer-text": "var(--color-footer-text)",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
