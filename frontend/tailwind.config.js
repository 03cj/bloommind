/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        pink: {
          DEFAULT: '#F7CFD8',
          dark: '#E8A0B0',
        },
        cream: {
          DEFAULT: '#FFF6F0',
          dark: '#F0E4D8',
        },
        sage: {
          DEFAULT: '#A8C3A0',
          dark: '#7A9E72',
        },
        // Secondary Colors
        lavender: '#C8C6E5',
        yellow: '#F4D06F',
        blue: '#AFCBFF',
        // Text Colors
        brown: '#4A3F35',
        gray: '#7A7A7A',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Poppins', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(74, 63, 53, 0.08)',
        'medium': '0 8px 40px rgba(74, 63, 53, 0.12)',
        'glow': '0 0 32px rgba(247, 207, 216, 0.4)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'fade-in-up': 'fadeInUp 0.7s ease forwards',
        'bloom-in': 'bloomIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'petal-drift': 'petalDrift 6s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--rot, 0deg))' },
          '50%': { transform: 'translateY(-8px) rotate(var(--rot, 0deg))' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        bloomIn: {
          '0%': { opacity: '0', transform: 'scale(0.5) rotate(var(--rot, 0deg))' },
          '70%': { transform: 'scale(1.08) rotate(var(--rot, 0deg))' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(var(--rot, 0deg))' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        petalDrift: {
          '0%': { transform: 'translateY(-10px) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '100%': { transform: 'translateY(100vh) translateX(60px) rotate(360deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 4px 24px rgba(74, 63, 53, 0.08)' },
          '50%': { boxShadow: '0 0 32px rgba(247, 207, 216, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}