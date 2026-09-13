/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07080d',
          900: '#0b0d14',
          850: '#10131c',
          800: '#161a26',
          700: '#222838',
          600: '#323b52'
        },
        astral: {
          violet: '#8b5cf6',
          purple: '#a855f7',
          fuchsia: '#d946ef',
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'cosmic-glow': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'lucky-glow': '0 0 35px 2px rgba(16, 185, 129, 0.45)',
        'neutral-glow': '0 0 35px 2px rgba(245, 158, 11, 0.45)',
        'doomed-glow': '0 0 45px 5px rgba(244, 63, 94, 0.55)',
        'glass-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)'
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'celestial-drift': 'spin 90s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'aurora': 'aurora 8s ease infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      }
    },
  },
  plugins: [],
};
