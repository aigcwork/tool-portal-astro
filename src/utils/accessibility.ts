/**
 * 无障碍访问管理器
 * 提供键盘导航、屏幕阅读器支持等功能
 */
export class AccessibilityManager {
  private focusableElements: string[] = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ];
  
  private skipLinkId = 'skip-to-content';
  private announcementsId = 'a11y-announcements';
  
  constructor() {
    this.init();
  }
  
  /**
   * 初始化无障碍功能
   */
  private init(): void {
    this.createSkipLink();
    this.createAnnouncer();
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupReducedMotion();
  }
  
  /**
   * 创建跳转链接
   */
  private createSkipLink(): void {
    const skipLink = document.createElement('a');
    skipLink.id = this.skipLinkId;
    skipLink.href = '#main-content';
    skipLink.textContent = '跳转到主要内容';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--color-primary);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
  
  /**
   * 创建屏幕阅读器公告区域
   */
  private createAnnouncer(): void {
    const announcer = document.createElement('div');
    announcer.id = this.announcementsId;
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    
    document.body.appendChild(announcer);
  }
  
  /**
   * 设置键盘导航
   */
  private setupKeyboardNavigation(): void {
    document.addEventListener('keydown', (e) => {
      // Escape键处理
      if (e.key === 'Escape') {
        this.handleEscapeKey();
      }
      
      // 方向键处理
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        this.handleArrowKeys(e);
      }
      
      // Tab键增强
      if (e.key === 'Tab') {
        this.handleTabKey();
      }
    });
  }
  
  /**
   * 处理Escape键
   */
  private handleEscapeKey(): void {
    // 关闭模态框、下拉菜单等
    const activeElement = document.activeElement as HTMLElement;
    
    // 如果聚焦在搜索框，清空搜索
    if (activeElement?.tagName === 'INPUT' && activeElement.getAttribute('type') === 'search') {
      (activeElement as HTMLInputElement).value = '';
      this.announce('搜索已清空');
    }
  }
  
  /**
   * 处理方向键
   */
  private handleArrowKeys(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    
    // 工具卡片网格导航
    if (target.closest('.tool-card')) {
      this.navigateToolGrid(e);
    }
  }
  
  /**
   * 处理Tab键
   */
  private handleTabKey(): void {
    // 添加焦点指示器类
    document.body.classList.add('keyboard-navigation');
    
    // 移除鼠标导航时的焦点指示器
    const removeKeyboardClass = () => {
      document.body.classList.remove('keyboard-navigation');
      document.removeEventListener('mousedown', removeKeyboardClass);
    };
    
    document.addEventListener('mousedown', removeKeyboardClass);
  }
  
  /**
   * 工具卡片网格导航
   */
  private navigateToolGrid(e: KeyboardEvent): void {
    const currentCard = e.target as HTMLElement;
    const grid = currentCard.closest('.tool-grid');
    if (!grid) return;
    
    const cards = Array.from(grid.querySelectorAll('.tool-card')) as HTMLElement[];
    const currentIndex = cards.indexOf(currentCard);
    
    if (currentIndex === -1) return;
    
    let nextIndex = currentIndex;
    const columns = this.getGridColumns(grid);
    
    switch (e.key) {
      case 'ArrowRight':
        nextIndex = currentIndex + 1;
        break;
      case 'ArrowLeft':
        nextIndex = currentIndex - 1;
        break;
      case 'ArrowDown':
        nextIndex = currentIndex + columns;
        break;
      case 'ArrowUp':
        nextIndex = currentIndex - columns;
        break;
    }
    
    if (nextIndex >= 0 && nextIndex < cards.length) {
      e.preventDefault();
      cards[nextIndex].focus();
    }
  }
  
  /**
   * 获取网格列数
   */
  private getGridColumns(grid: Element): number {
    const style = window.getComputedStyle(grid);
    const columns = style.gridTemplateColumns.split(' ').length;
    return columns;
  }
  
  /**
   * 设置焦点管理
   */
  private setupFocusManagement(): void {
    // 焦点陷阱处理
    this.setupFocusTrap();
    
    // 焦点可见性增强
    this.enhanceFocusVisibility();
  }
  
  /**
   * 设置焦点陷阱（用于模态框等）
   */
  private setupFocusTrap(): void {
    // 监听模态框打开事件
    document.addEventListener('modal-open', (e: Event) => {
      const modal = (e as CustomEvent).detail.element;
      this.trapFocus(modal);
    });
    
    document.addEventListener('modal-close', () => {
      this.releaseFocus();
    });
  }
  
  /**
   * 焦点陷阱实现
   */
  private trapFocus(element: HTMLElement): void {
    const focusableElements = element.querySelectorAll(this.focusableElements.join(','));
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const trapFocusHandler = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    element.addEventListener('keydown', trapFocusHandler);
  }
  
  /**
   * 释放焦点
   */
  private releaseFocus(): void {
    // 焦点返回到触发元素
    const lastFocusedElement = document.querySelector('[data-last-focused]') as HTMLElement;
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement.removeAttribute('data-last-focused');
    }
  }
  
  /**
   * 增强焦点可见性
   */
  private enhanceFocusVisibility(): void {
    // 添加自定义焦点样式
    const style = document.createElement('style');
    style.textContent = `
      .keyboard-navigation *:focus-visible {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2) !important;
      }
      
      .tool-card:focus-visible {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
        transform: translateY(-2px) !important;
        box-shadow: var(--shadow-lg) !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * 设置减少动画偏好
   */
  private setupReducedMotion(): void {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-normal', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
      } else {
        document.documentElement.style.removeProperty('--transition-fast');
        document.documentElement.style.removeProperty('--transition-normal');
        document.documentElement.style.removeProperty('--transition-slow');
      }
    };
    
    // 初始检查
    if (mediaQuery.matches) {
      handleReducedMotion({ matches: true } as MediaQueryListEvent);
    }
    
    // 监听变化
    if ('addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', handleReducedMotion);
    }
  }
  
  /**
   * 屏幕阅读器公告
   */
  public announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcer = document.getElementById(this.announcementsId);
    if (announcer) {
      announcer.setAttribute('aria-live', priority);
      announcer.textContent = message;
      
      // 清空消息，避免重复播报
      setTimeout(() => {
        announcer.textContent = '';
        announcer.setAttribute('aria-live', 'polite');
      }, 1000);
    }
  }
  
  /**
   * 获取当前页面的无障碍标题
   */
  public getPageTitle(): string {
    const h1 = document.querySelector('h1');
    const title = document.title;
    
    return h1?.textContent || title || '页面';
  }
  
  /**
   * 聚焦到主要内容区域
   */
  public focusMainContent(): void {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      
      // 移除tabindex，避免影响正常tab顺序
      setTimeout(() => {
        mainContent.removeAttribute('tabindex');
      }, 1000);
    }
  }
}

// 初始化无障碍管理器
let accessibilityManager: AccessibilityManager;

/**
 * 初始化无障碍功能
 */
export function initializeAccessibility(): void {
  if (typeof window === 'undefined') return;
  
  accessibilityManager = new AccessibilityManager();
  
  // 页面加载完成后聚焦到主要内容
  window.addEventListener('load', () => {
    setTimeout(() => {
      accessibilityManager.focusMainContent();
    }, 100);
  });
  
  // 路由变化时更新页面标题
  document.addEventListener('route-change', () => {
    const pageTitle = accessibilityManager.getPageTitle();
    accessibilityManager.announce(`已导航到：${pageTitle}`);
  });
}

/**
 * 获取无障碍管理器实例
 */
export function getAccessibilityManager(): AccessibilityManager | undefined {
  return accessibilityManager;
}