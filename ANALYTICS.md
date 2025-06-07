# Vercel Web Analytics 集成

本项目已使用官方推荐的方式集成 Vercel Web Analytics，用于收集网站的访问统计数据。

## 功能特性

- 🚀 **官方支持**: 使用 Vercel 官方 Astro 组件
- 🔒 **隐私友好**: 不使用 cookies，符合 GDPR 要求
- 📊 **实时数据**: 提供实时的访问统计数据
- 🎯 **轻量级**: 最小化对网站性能的影响
- ⚡ **自动优化**: 官方组件自动处理环境检测

## 配置方式

### 1. Astro 配置 (astro.config.mjs)
```javascript
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  // ... 其他配置
});
```

### 2. 组件集成 (BaseHead.astro)
```astro
---
import Analytics from '@vercel/analytics/astro';
---

<head>
  <!-- 其他 head 内容 -->
  <Analytics />
</head>
```

## 工作原理

- **自动检测**: 官方组件自动检测运行环境
- **生产环境**: 只在 Vercel 部署的生产环境中收集数据
- **开发环境**: 本地开发时不会加载分析脚本

## 查看数据

1. 在 Vercel 仪表板中打开你的项目
2. 转到 "Analytics" 标签页
3. 查看访问者数据、页面浏览量、热门页面等统计信息

## 技术实现

### 依赖项
- `@vercel/analytics`: Vercel Analytics SDK
- `@astrojs/vercel`: Vercel Astro Adapter

### 组件结构
```
src/components/
└── BaseHead.astro      # 直接使用官方 Analytics 组件
```

### 关键代码
```astro
<!-- 直接使用官方组件 -->
import Analytics from '@vercel/analytics/astro';

<Analytics />
```

## 优势

相比手动集成的方式，使用官方组件有以下优势：

- ✅ **简化配置**: 无需手动环境检测
- ✅ **自动更新**: 跟随官方最佳实践
- ✅ **更好兼容**: 与 Astro 生态系统完美集成
- ✅ **维护性**: 减少自定义代码，降低维护成本

## 注意事项

- Analytics 只在 Vercel 部署环境中工作
- 数据收集完全符合隐私法规要求
- 不会影响网站的加载速度
- 支持静态站点生成 (SSG) 和服务端渲染 (SSR) 