// 目录项接口
interface TOCItem {
  id: string;
  text: string;
  level: number;
}

// 目录数据接口
interface TOCData {
  depth: number;
  title: string;
  href: string;
}

// TOC 工具类
export class TOCHelper {
  private headings: Element[] = [];
  private observer: IntersectionObserver | null = null;
  private isScrolling = false;
  private activeId = "";
  private scrollTimer: NodeJS.Timeout | null = null;
  private tocData: TOCData[] = [];
  private onActiveChange?: (id: string) => void;

  constructor(onActiveChange?: (id: string) => void) {
    this.onActiveChange = onActiveChange;
  }

  // 初始化目录
  public init(container?: HTMLElement): void {
    this.findHeadings(container);
    this.setupScrollSpy();
    this.addStructuredData();
  }

  // 获取目录 HTML
  public getTOCHTML(): string {
    if (!this.headings.length) {
      return '';
    }

    const items = this.headings.map((h) => ({
      id: h.id,
      text: this.cleanHeadingText(h.textContent || ""),
      level: parseInt(h.tagName[1]),
    }));

    // 保存TOC数据用于结构化数据
    this.tocData = items.map((item) => ({
      depth: item.level,
      title: item.text,
      href: `#${item.id}`,
    }));

    return this.createAccessibleHTML(items);
  }

  // 设置点击处理
  public setupClickHandler(container: HTMLElement): void {
    container.addEventListener("click", (e) => {
      const link = (e.target as Element).closest("a");
      if (!link) return;

      e.preventDefault();
      const id = link.getAttribute("data-id");
      if (id) {
        this.scrollTo(id);
      }
    });
  }

  // 设置键盘导航
  public setupKeyboardNavigation(container: HTMLElement): void {
    container.addEventListener("keydown", (e) => {
      const target = e.target as HTMLElement;
      if (!target.matches("a")) return;

      const links = Array.from(container.querySelectorAll("a"));
      const currentIndex = links.indexOf(target as HTMLAnchorElement);

      let nextIndex = -1;

      switch (e.key) {
        case "ArrowDown":
          nextIndex = Math.min(currentIndex + 1, links.length - 1);
          break;
        case "ArrowUp":
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = links.length - 1;
          break;
        default:
          return;
      }

      if (nextIndex !== -1) {
        e.preventDefault();
        (links[nextIndex] as HTMLAnchorElement).focus();
      }
    });
  }

  // 滚动到指定位置
  public scrollTo(id: string): void {
    const target = document.getElementById(id);
    if (!target) return;

    this.isScrolling = true;
    this.setActive(id);

    const headerHeight = this.getHeaderHeight();
    const top =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      20;

    // 使用更平滑的滚动
    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });

    // 设置焦点到目标标题
    target.focus();

    // 防抖计时器
    if (this.scrollTimer) clearTimeout(this.scrollTimer);

    this.scrollTimer = setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }

  // 销毁实例
  public destroy(): void {
    this.observer?.disconnect();
    if (this.scrollTimer) clearTimeout(this.scrollTimer);
  }

  // 查找标题
  private findHeadings(container?: HTMLElement): void {
    const content =
      container ||
      document.querySelector(".prose") ||
      document.querySelector("main") ||
      document.querySelector("article");
    
    if (!content) return;

    this.headings = Array.from(
      content.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );

    // 确保每个标题都有ID和适当的无障碍属性
    this.headings.forEach((heading, index) => {
      if (!heading.id) {
        const text = this.cleanHeadingText(heading.textContent || "");
        heading.id = `heading-${index}-${text
          .toLowerCase()
          .replace(/[^\w\u4e00-\u9fff\s-]/g, "")
          .replace(/\s+/g, "-")}`;
      }

      // 添加 tabindex 以支持键盘导航
      heading.setAttribute("tabindex", "-1");
    });
  }

  // 清理标题文本
  private cleanHeadingText(text: string): string {
    // 移除锚点符号和多余的空白字符
    return text.replace(/#$/, "").trim();
  }

  // 创建无障碍 HTML
  private createAccessibleHTML(
    items: TOCItem[]
  ): string {
    let html = '<ol role="list">';
    let currentLevel = 0;

    for (const item of items) {
      const diff = item.level - currentLevel;

      if (diff > 0) {
        html += '<ol role="list">'.repeat(diff);
      } else if (diff < 0) {
        html += "</li></ol>".repeat(-diff);
      } else if (currentLevel > 0) {
        html += "</li>";
      }

      html += `<li role="listitem"><a 
        href="#${item.id}" 
        data-id="${item.id}" 
        data-level="${item.level}"
        aria-describedby="toc-heading"
        title="跳转到: ${item.text}"
      >${item.text}</a>`;
      currentLevel = item.level;
    }

    html += "</li></ol>".repeat(currentLevel);
    return html;
  }

  // 设置滚动监听
  private setupScrollSpy(): void {
    if (!this.headings.length) return;

    // 性能优化：使用防抖和 requestAnimationFrame
    let ticking = false;
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (this.isScrolling || ticking) return;

      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort(
          (a, b) =>
            Math.abs(a.boundingClientRect.top) -
            Math.abs(b.boundingClientRect.top)
        );

      if (visible.length) {
        ticking = true;
        requestAnimationFrame(() => {
          this.setActive(visible[0].target.id);
          ticking = false;
        });
      }
    };

    this.observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-10% 0px -40% 0px",
      threshold: [0, 0.1, 0.5],
    });

    this.headings.forEach((h) => this.observer?.observe(h));
  }

  // 设置活动状态
  private setActive(id: string): void {
    if (this.activeId === id) return;

    this.activeId = id;
    
    // 调用回调函数通知活动状态变化
    if (this.onActiveChange) {
      this.onActiveChange(id);
    }
  }

  // 获取头部高度
  private getHeaderHeight(): number {
    const header = document.querySelector("header");
    return header?.getBoundingClientRect().height || 80;
  }

  // 添加结构化数据
  private addStructuredData(): void {
    if (!this.tocData.length) return;

    // 添加结构化数据用于SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      articleSection: this.tocData.map((item) => ({
        "@type": "ArticleSection",
        name: item.title,
        url: `${window.location.origin}${window.location.pathname}${item.href}`,
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }
}

// 更新活动状态的工具函数
export function updateTOCActiveState(tocContainer: HTMLElement, activeId: string): void {
  // 移除旧的活动状态
  tocContainer.querySelectorAll("a.active").forEach((a) => {
    a.classList.remove("active");
    a.removeAttribute("aria-current");
  });

  // 设置新的活动状态
  const activeLink = tocContainer.querySelector(`[data-id="${activeId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
    activeLink.setAttribute("aria-current", "location");
  }
} 