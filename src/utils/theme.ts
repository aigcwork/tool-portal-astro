/**
 * 主题管理器
 * 处理深色/浅色模式切换
 */
export class ThemeManager {
  private static readonly STORAGE_KEY = 'theme-preference';
  private static readonly THEME_ATTRIBUTE = 'data-theme';
  
  private currentTheme: 'light' | 'dark';
  private systemPreference: 'light' | 'dark';
  
  constructor() {
    this.systemPreference = this.getSystemPreference();
    this.currentTheme = this.getStoredPreference() || this.systemPreference;
    this.init();
  }
  
  /**
   * 初始化主题管理器
   */
  private init(): void {
    this.applyTheme();
    this.setupSystemThemeListener();
  }
  
  /**
   * 获取系统主题偏好
   */
  private getSystemPreference(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  /**
   * 获取存储的主题偏好
   */
  private getStoredPreference(): 'light' | 'dark' | null {
    try {
      return localStorage.getItem(ThemeManager.STORAGE_KEY) as 'light' | 'dark' | null;
    } catch {
      return null;
    }
  }
  
  /**
   * 存储主题偏好
   */
  private storePreference(theme: 'light' | 'dark'): void {
    try {
      localStorage.setItem(ThemeManager.STORAGE_KEY, theme);
    } catch {
      // 忽略存储错误
    }
  }
  
  /**
   * 应用主题
   */
  private applyTheme(): void {
    document.documentElement.setAttribute(ThemeManager.THEME_ATTRIBUTE, this.currentTheme);
    this.updateMetaThemeColor();
  }
  
  /**
   * 更新meta主题颜色
   */
  private updateMetaThemeColor(): void {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const color = this.currentTheme === 'dark' ? '#0f172a' : '#ffffff';
      metaThemeColor.setAttribute('content', color);
    }
  }
  
  /**
   * 设置系统主题变化监听器
   */
  private setupSystemThemeListener(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 使用现代API
    if ('addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', (e) => {
        this.systemPreference = e.matches ? 'dark' : 'light';
        
        // 如果用户没有手动设置偏好，跟随系统
        if (!this.getStoredPreference()) {
          this.currentTheme = this.systemPreference;
          this.applyTheme();
        }
      });
    }
  }
  
  /**
   * 切换主题
   */
  public toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.storePreference(this.currentTheme);
    this.applyTheme();
    
    // 触发自定义事件
    this.dispatchThemeChangeEvent();
  }
  
  /**
   * 设置主题
   */
  public setTheme(theme: 'light' | 'dark'): void {
    if (this.currentTheme !== theme) {
      this.currentTheme = theme;
      this.storePreference(theme);
      this.applyTheme();
      this.dispatchThemeChangeEvent();
    }
  }
  
  /**
   * 获取当前主题
   */
  public getCurrentTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }
  
  /**
   * 获取系统主题
   */
  public getSystemTheme(): 'light' | 'dark' {
    return this.systemPreference;
  }
  
  /**
   * 是否是手动设置的主题
   */
  public isUserPreference(): boolean {
    return this.getStoredPreference() !== null;
  }
  
  /**
   * 派发主题变化事件
   */
  private dispatchThemeChangeEvent(): void {
    const event = new CustomEvent('themechange', {
      detail: {
        theme: this.currentTheme,
        isUserPreference: this.isUserPreference()
      }
    });
    document.dispatchEvent(event);
  }
}

/**
 * 主题切换按钮组件
 */
export class ThemeToggleButton {
  private button: HTMLElement;
  private themeManager: ThemeManager;
  
  constructor(button: HTMLElement, themeManager: ThemeManager) {
    this.button = button;
    this.themeManager = themeManager;
    this.init();
  }
  
  private init(): void {
    this.updateButtonState();
    this.setupEventListeners();
  }
  
  private setupEventListeners(): void {
    this.button.addEventListener('click', () => {
      this.themeManager.toggleTheme();
    });
    
    document.addEventListener('themechange', () => {
      this.updateButtonState();
    });
  }
  
  private updateButtonState(): void {
    const isDark = this.themeManager.getCurrentTheme() === 'dark';
    this.button.setAttribute('aria-pressed', isDark.toString());
    this.button.setAttribute('title', isDark ? '切换到浅色模式' : '切换到深色模式');
    
    // 更新图标
    const icon = this.button.querySelector('.theme-toggle__icon');
    if (icon) {
      icon.textContent = isDark ? '☀️' : '🌙';
    }
  }
}

// 初始化主题管理器
let themeManager: ThemeManager;

/**
 * 初始化主题系统
 */
export function initializeTheme(): void {
  if (typeof window === 'undefined') return;
  
  themeManager = new ThemeManager();
  
  // 设置主题切换按钮
  const themeToggleButton = document.querySelector('[data-theme-toggle]') as HTMLElement;
  if (themeToggleButton) {
    new ThemeToggleButton(themeToggleButton, themeManager);
  }
  
  // 设置meta主题颜色
  const metaThemeColor = document.createElement('meta');
  metaThemeColor.name = 'theme-color';
  document.head.appendChild(metaThemeColor);
  
  // 应用初始主题颜色
  const initialTheme = themeManager.getCurrentTheme();
  metaThemeColor.content = initialTheme === 'dark' ? '#0f172a' : '#ffffff';
}

/**
 * 获取主题管理器实例
 */
export function getThemeManager(): ThemeManager | undefined {
  return themeManager;
}