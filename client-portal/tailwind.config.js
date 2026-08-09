/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'hsl(40, 90%, 50%)', // orange
        secondary: 'hsl(120, 70%, 30%)', // green
        accent: 'hsl(60, 80%, 40%)', // yellow
        black: 'hsl(0, 0%, 8%)',
        brown: 'hsl(30, 70%, 20%)', // brown
        white: '#ffffff',
        surface: 'hsla(0, 0%, 100%, 0.08)', // glass overlay
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
      },
    },
  },
  plugins: [],
};
