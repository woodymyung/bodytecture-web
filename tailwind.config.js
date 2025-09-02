/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 기존 커스텀 색상들을 Tailwind v3 방식으로 정의
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'primary-red': {
          600: 'var(--primary-red-600)',
          700: 'var(--primary-red-700)',
        },
        'secondary-red': {
          100: 'var(--secondary-red-100)',
          200: 'var(--secondary-red-200)',
        },
      },
      fontFamily: {
        'geist-sans': ['var(--font-geist-sans)', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
