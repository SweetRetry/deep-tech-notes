/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // 扩展颜色系统 - 使用CSS变量
      colors: {
        // 主色调系统
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        // 灰度系统
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        // 语义化功能颜色
        success: {
          500: 'var(--color-success-500)',
          600: 'var(--color-success-600)',
        },
        warning: {
          500: 'var(--color-warning-500)',
          600: 'var(--color-warning-600)',
        },
        error: {
          500: 'var(--color-error-500)',
          600: 'var(--color-error-600)',
        },
        info: {
          500: 'var(--color-info-500)',
          600: 'var(--color-info-600)',
        },
        // 主题颜色
        purple: {
          200: 'var(--color-purple-200)',
          300: 'var(--color-purple-300)',
          400: 'var(--color-purple-400)',
          500: 'var(--color-purple-500)',
          600: 'var(--color-purple-600)',
          700: 'var(--color-purple-700)',
        },
        indigo: {
          400: 'var(--color-indigo-400)',
          500: 'var(--color-indigo-500)',
          600: 'var(--color-indigo-600)',
        },
        orange: {
          500: 'var(--color-orange-500)',
          600: 'var(--color-orange-600)',
          700: 'var(--color-orange-700)',
        },
        green: {
          500: 'var(--color-green-500)',
          600: 'var(--color-green-600)',
          700: 'var(--color-green-700)',
        },
        // 语义化颜色 - 简洁命名
        accent: 'var(--color-primary-500)',
      },
      // 扩展文本颜色
      textColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        muted: 'var(--color-text-muted)',
      },
      // 扩展背景颜色
      backgroundColor: {
        primary: 'var(--color-background-primary)',
        secondary: 'var(--color-background-secondary)',
        elevated: 'var(--color-background-elevated)',
      },
      // 扩展边框颜色
      borderColor: {
        primary: 'var(--color-border)',
        hover: 'var(--color-border-hover)',
      },
      // 扩展字体家族
      fontFamily: {
        sans: ['Atkinson', 'system-ui', 'sans-serif'],
      },
      // 扩展动画
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      // 扩展容器尺寸
      maxWidth: {
        'content': '1200px',
        'reading': '720px',
      },
      // 扩展间距
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // 扩展阴影 - 使用CSS变量
      boxShadow: {
        'soft': 'var(--shadow-sm)',
        'medium': 'var(--shadow-md)',
        'strong': '0 8px 25px rgba(0, 0, 0, 0.15)',
        'focus': 'var(--shadow-focus)',
        'glow': 'var(--shadow-glow)',
        'glow-active': 'var(--shadow-glow-active)',
      },
      // 扩展背景图像 - 渐变
      backgroundImage: {
        'gradient-browser': 'var(--gradient-browser)',
        'gradient-engineering': 'var(--gradient-engineering)',
        'gradient-infra': 'var(--gradient-infra)',
        'gradient-language': 'var(--gradient-language)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 