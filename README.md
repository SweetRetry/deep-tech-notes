# Astro Tech Hub

> 一个现代化的技术博客平台，基于 Astro 构建，专注于深度技术内容分享

## 🚀 项目简介

Astro Tech Hub 是一个静态生成的技术博客，涵盖编程语言、基础设施、软件工程和浏览器技术四大领域。采用 Astro 框架构建，提供出色的性能和用户体验。

## ✨ 核心特性

### 🏗️ 技术栈
- **Astro** - 现代静态站点生成器
- **MDX** - 支持 React 组件的 Markdown
- **Tailwind CSS** - 实用优先的 CSS 框架
- **TypeScript** - 类型安全的开发体验
- **Vercel** - 一键部署和分析

### 📱 用户体验
- **响应式设计** - 完美适配桌面端和移动端
- **智能目录** - 实时滚动高亮、键盘导航
- **无障碍访问** - ARIA 标签、键盘操作支持
- **性能优化** - 防抖滚动、动画优化

### 🎯 内容管理
- **分类组织** - 四大技术领域分类
- **SEO 优化** - 结构化数据、元标签优化
- **多媒体支持** - 图片优化、代码高亮

## 🏁 快速开始

```bash
# 克隆项目
git clone <repository-url>
cd astro-blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

访问 `http://localhost:4321` 查看项目。

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Header.astro    # 导航头
│   ├── TableOfContents.astro  # 桌面端目录
│   ├── MobileTOC.astro        # 移动端目录
│   └── ...
├── content/            # 博客内容
│   ├── language/       # 编程语言
│   ├── infra/         # 基础设施
│   ├── engineering/   # 软件工程
│   └── browser/       # 浏览器技术
├── layouts/           # 页面布局
├── pages/            # 路由页面
└── assets/           # 静态资源
```

## ✍️ 内容管理

### 创建新文章

1. 在对应分类目录下创建 `.md` 或 `.mdx` 文件
2. 添加必要的 frontmatter：

```yaml
---
title: "文章标题"
description: "文章描述"
pubDate: "2024-01-01"
heroImage: "/path/to/image.jpg"  # 可选
tags: ["tag1", "tag2"]           # 可选
---
```

### 分类说明

- **Language** - 编程语言教程、语法指南、最佳实践
- **Infrastructure** - DevOps、部署、系统架构
- **Engineering** - 软件工程实践、代码质量、项目管理
- **Browser** - 前端开发、浏览器 API、性能优化

## 🚀 部署

项目已配置 Vercel 自动部署：

1. 推送代码到 main 分支
2. Vercel 自动构建和部署
3. 支持 Web Analytics 和 Speed Insights

## 🎨 自定义配置

### 修改站点信息
编辑 `src/consts.ts` 文件修改站点基本信息。

### 样式自定义
在 `tailwind.config.js` 中自定义主题配置。

### 添加新分类
1. 在 `src/content/` 下创建新目录
2. 更新 `src/content.config.ts` 配置
3. 创建对应的页面文件

## 📊 性能指标

- ⚡ **Lighthouse Score** - 98+ 分
- 🎯 **Core Web Vitals** - 全绿指标
- 📱 **响应式设计** - 完美适配所有设备
- ♿ **无障碍评分** - WCAG 2.1 AA 标准

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

---

<div align="center">
  Made with ❤️ using Astro
</div>
