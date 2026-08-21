/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gelwo: {
          /* 1. Warm Ivory — Primary Background */
          ivory: '#FCF9F5',
          /* 2. Deep Midnight — Primary Dark */
          midnight: '#131322',
          /* 3. Deep Purple — Primary Accent */
          purple: '#4A346A',
          /* 4. Royal Purple — Dark Accent */
          royal: '#261E3D',
          /* 5. Sage Green — Secondary Accent */
          sage: '#566944',
          /* 6. Warm Gray — Borders / Dividers */
          gray: '#D9D6D3',
          /* 7. Soft Blush — Soft Background */
          blush: '#EDE6E5',
        }
      },
      backgroundImage: {
        /* Gradient 01 — Signature GELWO */
        'gelwo-1': 'linear-gradient(135deg, #4A346A 0%, #261E3D 100%)',
        /* Gradient 02 — Purple → Sage */
        'gelwo-2': 'linear-gradient(135deg, #4A346A 0%, #566944 100%)',
        /* Gradient 03 — Light Premium */
        'gelwo-3': 'linear-gradient(135deg, #FCF9F5 0%, #EDE6E5 100%)',
        /* Gradient 04 — Futuristic Dark */
        'gelwo-4': 'linear-gradient(135deg, #131322 0%, #261E3D 55%, #4A346A 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gelwo-purple': '0 0 40px rgba(74, 52, 106, 0.25)',
        'gelwo-sage': '0 0 35px rgba(86, 105, 68, 0.20)',
        'gelwo-card': '0 12px 40px 0 rgba(19, 19, 34, 0.12)',
        'gelwo-card-hover': '0 16px 48px 0 rgba(74, 52, 106, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gelwo-gradient': 'gelwoGradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(74, 52, 106, 0.6))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 35px rgba(74, 52, 106, 0.9))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gelwoGradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
