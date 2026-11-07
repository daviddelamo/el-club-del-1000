/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        abn: {
          blue: '#2563eb', // Centenas
          red: '#dc2626',  // Decenas
          green: '#16a34a', // Unidades
          amber: '#f59e0b',
          purple: '#9333ea',
        }
      },
      fontFamily: {
        kids: ['"Nunito"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        bounceSmall: {
          '0%, 100%': { transform: 'translateY(-4%)' },
          '50%': { transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        }
      },
      animation: {
        'bounce-gentle': 'bounceSmall 2s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
