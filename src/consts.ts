// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Deep Tech Notes";
export const SITE_DESCRIPTION = '底层原理 | 实战经验 | 技术洞察';

// 分类配置
export const CATEGORIES = {
	browser: {
		title: "浏览器原理",
		description: "深入理解浏览器工作机制，探索现代Web技术的核心原理",
		icon: "🌐",
		gradient: "linear-gradient(45deg, #646cff, #42d392)",
		homeDescription: "探索渲染引擎、JavaScript执行、多进程架构的底层机制",
		colorClass: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
		hoverShadowClass: "dark:hover:shadow-blue-500/10",
		borderClass: "border-l-blue-500 dark:border-l-blue-400",
		linkColorClass: "text-blue-600 dark:text-blue-300",
		hoverLinkColorClass: "hover:text-blue-700 dark:hover:text-blue-200"
	},
	engineering: {
		title: "工程实践", 
		description: "分享前端工程化实践经验，提升开发效率和代码质量",
		icon: "⚙️",
		gradient: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
		homeDescription: "Monorepo管理、设计模式、重构策略与团队协作最佳实践",
		colorClass: "group-hover:text-green-600 dark:group-hover:text-green-400",
		hoverShadowClass: "dark:hover:shadow-green-500/10",
		borderClass: "border-l-green-500 dark:border-l-green-400",
		linkColorClass: "text-green-600 dark:text-green-300",
		hoverLinkColorClass: "hover:text-green-700 dark:hover:text-green-200"
	},
	infra: {
		title: "基础设施",
		description: "深入了解服务器架构、DevOps实践和云服务技术", 
		icon: "🏗️",
		gradient: "linear-gradient(45deg, #f59e0b, #ef4444)",
		homeDescription: "CDN优化、Nginx配置、认证体系与服务端技术深度解析",
		colorClass: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
		hoverShadowClass: "dark:hover:shadow-orange-500/10",
		borderClass: "border-l-orange-500 dark:border-l-orange-400",
		linkColorClass: "text-orange-600 dark:text-orange-300",
		hoverLinkColorClass: "hover:text-orange-700 dark:hover:text-orange-200"
	},
	language: {
		title: "编程语言",
		description: "探索编程语言特性，分享语言学习和实践心得",
		icon: "💻", 
		gradient: "linear-gradient(45deg, #a855f7, #3b82f6)",
		homeDescription: "深入语言核心特性，分享实战经验与最佳实践",
		colorClass: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
		hoverShadowClass: "dark:hover:shadow-purple-500/10",
		borderClass: "border-l-purple-500 dark:border-l-purple-400",
		linkColorClass: "text-purple-600 dark:text-purple-300",
		hoverLinkColorClass: "hover:text-purple-700 dark:hover:text-purple-200"
	}
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

// 导航配置
export const NAVIGATION = [
	{ href: '/', label: '首页' },
	{ href: '/browser', label: '浏览器原理' },
	{ href: '/engineering', label: '工程实践' },
	{ href: '/language', label: '编程语言' },
	{ href: '/infra', label: '基础设施' }
] as const;
