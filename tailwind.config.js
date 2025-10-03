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
  // 센터별 동적 컬러 클래스들을 safelist에 추가 (PurgeCSS 방지)
  safelist: [
    // 왕십리점 (red-600)
    'bg-red-600', 'bg-red-100', 'bg-red-700',
    'text-red-600', 'text-red-100', 'text-red-700', 
    'border-red-600', 'border-red-100', 'border-red-700',
    'hover:bg-red-600', 'hover:text-red-600',
    
    // 대치점 (green-600)
    'bg-green-600', 'bg-green-100', 'bg-green-700',
    'text-green-600', 'text-green-100', 'text-green-700',
    'border-green-600', 'border-green-100', 'border-green-700',
    'hover:bg-green-600', 'hover:text-green-600',
    
    // 청담점 (blue-600)
    'bg-blue-600', 'bg-blue-100', 'bg-blue-700',
    'text-blue-600', 'text-blue-100', 'text-blue-700',
    'border-blue-600', 'border-blue-100', 'border-blue-700',
    'hover:bg-blue-600', 'hover:text-blue-600',
  ],
  plugins: [], // Tailwind CSS v3.3+에서는 line-clamp가 기본 내장
}
