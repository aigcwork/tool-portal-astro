/**
 * 图片懒加载管理器
 * 提供高性能的图片懒加载功能
 */
export class ImageLazyLoader {
  private observer: IntersectionObserver | null = null;
  private imageSelector = 'img[loading="lazy"]';
  
  constructor() {
    this.init();
  }
  
  /**
   * 初始化懒加载器
   */
  private init(): void {
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
      this.observeImages();
    } else {
      // 降级处理：直接加载所有图片
      this.loadAllImages();
    }
  }
  
  /**
   * 设置Intersection Observer
   */
  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target as HTMLImageElement);
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    );
  }
  
  /**
   * 观察图片元素
   */
  private observeImages(): void {
    const images = document.querySelectorAll(this.imageSelector);
    images.forEach((img) => {
      this.observer?.observe(img);
    });
  }
  
  /**
   * 加载单张图片
   */
  private loadImage(img: HTMLImageElement): void {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;
    }
    
    // 添加加载动画
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in-out';
    
    img.onload = () => {
      img.style.opacity = '1';
    };
    
    img.onerror = () => {
      // 处理加载失败的情况
      this.handleImageError(img);
    };
  }
  
  /**
   * 处理图片加载错误
   */
  private handleImageError(img: HTMLImageElement): void {
    // 设置备用图片或样式
    img.style.opacity = '0.5';
    img.style.filter = 'grayscale(100%)';
    
    // 添加错误提示
    img.alt = '图片加载失败';
  }
  
  /**
   * 加载所有图片（降级方案）
   */
  private loadAllImages(): void {
    const images = document.querySelectorAll(this.imageSelector);
    images.forEach((img) => {
      this.loadImage(img as HTMLImageElement);
    });
  }
  
  /**
   * 动态添加新的懒加载图片
   */
  public observeNewImages(): void {
    if (this.observer) {
      this.observeImages();
    }
  }
  
  /**
   * 销毁懒加载器
   */
  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

/**
 * 资源预加载管理器
 */
export class ResourcePreloader {
  private preloadedResources = new Set<string>();
  
  /**
   * 预加载图片
   */
  public preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedResources.has(src)) {
        resolve();
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }
  
  /**
   * 批量预加载图片
   */
  public preloadImages(srcs: string[]): Promise<void[]> {
    return Promise.all(srcs.map(src => this.preloadImage(src)));
  }
  
  /**
   * 预加载关键资源
   */
  public async preloadCriticalResources(): Promise<void> {
    // 获取所有工具图标
    const toolIcons = Array.from(document.querySelectorAll('img[data-preload]'))
      .map(img => img.getAttribute('src'))
      .filter(Boolean) as string[];
    
    if (toolIcons.length > 0) {
      await this.preloadImages(toolIcons.slice(0, 10)); // 限制预加载数量
    }
  }
}

/**
 * 性能监控器
 */
export class PerformanceMonitor {
  private metrics: Map<string, number> = new Map();
  
  /**
   * 记录性能指标
   */
  public mark(name: string): void {
    performance.mark(name);
  }
  
  /**
   * 测量性能指标
   */
  public measure(name: string, startMark: string, endMark: string): number {
    try {
      const measure = performance.measure(name, startMark, endMark);
      const duration = measure.duration;
      this.metrics.set(name, duration);
      return duration;
    } catch (error) {
      console.warn(`Performance measure failed: ${name}`, error);
      return 0;
    }
  }
  
  /**
   * 获取性能指标
   */
  public getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }
  
  /**
   * 报告核心Web指标
   */
  public reportWebVitals(): void {
    if ('web-vitals' in window) {
      // 这里可以集成 web-vitals 库
      // import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      //   getCLS(console.log);
      //   getFID(console.log);
      //   getFCP(console.log);
      //   getLCP(console.log);
      //   getTTFB(console.log);
      // });
    }
  }
}

// 全局性能优化管理器
let lazyLoader: ImageLazyLoader | null = null;
let resourcePreloader: ResourcePreloader | null = null;
let performanceMonitor: PerformanceMonitor | null = null;

/**
 * 初始化性能优化
 */
export function initializePerformanceOptimization(): void {
  if (typeof window === 'undefined') return;
  
  // 性能监控
  performanceMonitor = new PerformanceMonitor();
  performanceMonitor.mark('app-start');
  
  // 图片懒加载
  lazyLoader = new ImageLazyLoader();
  
  // 资源预加载
  resourcePreloader = new ResourcePreloader();
  
  // 页面加载完成后预加载关键资源
  window.addEventListener('load', () => {
    performanceMonitor?.mark('page-load-complete');
    performanceMonitor?.measure('page-load', 'app-start', 'page-load-complete');
    
    // 延迟预加载关键资源
    setTimeout(() => {
      resourcePreloader?.preloadCriticalResources();
    }, 1000);
  });
  
  // 监听页面可见性变化
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      // 页面变为可见时，重新开始懒加载观察
      lazyLoader?.observeNewImages();
    }
  });
}

/**
 * 获取性能监控器
 */
export function getPerformanceMonitor(): PerformanceMonitor | null {
  return performanceMonitor;
}

/**
 * 获取图片懒加载器
 */
export function getImageLazyLoader(): ImageLazyLoader | null {
  return lazyLoader;
}

/**
 * 获取资源预加载器
 */
export function getResourcePreloader(): ResourcePreloader | null {
  return resourcePreloader;
}