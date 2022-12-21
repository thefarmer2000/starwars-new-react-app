/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/components/**/*.{html,js}',
    'src/pages/**/*.{html,js}',
    'src/config/**/*.{html,js}',
    'src/context/**/*.{html,js}',
    'src/hooks/**/*.{html,js}',
    'src/utils/**/*.{html,js}',
    'public/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: ["react-hooks"],
  rules: {
    "react-hooks/exhaustive-deps": "error"
  }
}
