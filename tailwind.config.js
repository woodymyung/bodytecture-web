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
      // 🎯 자동 슬라이드 애니메이션 추가
      keyframes: {
        'slide-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }, // 100% 이동 (전체 3세트 길이) - 최대 속도
        },
        'slide-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }, // 50%만큼 위로 이동 (2세트 중 첫 번째 세트 길이)
        },
      },
      animation: {
        'slide-left': 'slide-left 30s linear infinite', // 40초 동안 전체 이동 - 빠른 속도, 충분한 지속시간
        'slide-up': 'slide-up 120s linear infinite', // 120초 동안 천천히 위로 이동
      },
    },
  },
  plugins: [], // Tailwind CSS v3.3+에서는 line-clamp가 기본 내장
}
