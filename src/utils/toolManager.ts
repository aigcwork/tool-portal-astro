import type { Tool, ToolCategory } from '@/types/tool';
import { tools as existingTools } from '@/data/tools';
import { ToolCategory as ToolCategoryEnum, ToolStatus as ToolStatusEnum } from '@/types/tool';

/**
 * 工具管理类
 * 提供工具卡片的增删改查功能
 */
export class ToolManager {
  private tools: Tool[] = [...existingTools];
  private listeners: ((tools: Tool[]) => void)[] = [];

  /**
   * 获取所有工具
   */
  getAllTools(): Tool[] {
    return [...this.tools];
  }

  /**
   * 根据ID获取工具
   */
  getToolById(id: string): Tool | undefined {
    return this.tools.find(tool => tool.id === id);
  }

  /**
   * 添加新工具
   */
  addTool(toolData: Omit<Tool, 'id' | 'createdAt' | 'updatedAt'>): Tool {
    const newTool: Tool = {
      ...toolData,
      id: this.generateId(toolData.name),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    this.tools.push(newTool);
    this.notifyListeners();
    return newTool;
  }

  /**
   * 更新工具
   */
  updateTool(id: string, updates: Partial<Omit<Tool, 'id' | 'createdAt'>>): Tool | null {
    const index = this.tools.findIndex(tool => tool.id === id);
    if (index === -1) return null;

    this.tools[index] = {
      ...this.tools[index],
      ...updates,
      updatedAt: Date.now()
    };
    
    this.notifyListeners();
    return this.tools[index];
  }

  /**
   * 删除工具
   */
  deleteTool(id: string): boolean {
    const initialLength = this.tools.length;
    this.tools = this.tools.filter(tool => tool.id !== id);
    const deleted = this.tools.length !== initialLength;
    
    if (deleted) {
      this.notifyListeners();
    }
    
    return deleted;
  }

  /**
   * 切换工具推荐状态
   */
  toggleFeatured(id: string): boolean {
    const tool = this.getToolById(id);
    if (!tool) return false;

    return this.updateTool(id, { featured: !tool.featured }) !== null;
  }

  /**
   * 切换工具状态
   */
  toggleStatus(id: string): boolean {
    const tool = this.getToolById(id);
    if (!tool) return false;

    const newStatus = tool.status === ToolStatusEnum.ACTIVE ? ToolStatusEnum.INACTIVE : ToolStatusEnum.ACTIVE;
    return this.updateTool(id, { status: newStatus }) !== null;
  }

  /**
   * 批量更新工具权重
   */
  updateWeights(updates: { id: string; weight: number }[]): void {
    updates.forEach(({ id, weight }) => {
      this.updateTool(id, { weight });
    });
  }

  /**
   * 导出工具数据（用于生成代码）
   */
  exportToolsCode(): string {
    const toolsCode = this.tools.map(tool => {
      const toolStr = `  {
    id: '${tool.id}',
    name: '${tool.name}',
    description: '${tool.description || ''}',
    icon: '${tool.icon || ''}',
    url: '${tool.url}',
    category: ToolCategory.${tool.category.toUpperCase()},
    status: ToolStatus.${tool.status.toUpperCase()},
    tags: [${tool.tags.map(tag => `'${tag}'`).join(', ')}],
    featured: ${tool.featured},
    weight: ${tool.weight},
    createdAt: ${tool.createdAt},
    updatedAt: ${tool.updatedAt}
  }`;
      return toolStr;
    }).join(',\n\n');

    return `import { ToolCategory, ToolStatus } from '@/types/tool';

/**
 * 工具数据集合
 * 包含各种精选的在线工具
 */
export const tools = [\n${toolsCode}\n];`;
  }

  /**
   * 生成工具ID
   */
  private generateId(name: string): string {
    return name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  }

  /**
   * 添加监听器
   */
  addListener(listener: (tools: Tool[]) => void): void {
    this.listeners.push(listener);
  }

  /**
   * 移除监听器
   */
  removeListener(listener: (tools: Tool[]) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * 通知所有监听器
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.tools]));
  }
}

/**
 * 工具表单验证器
 */
export class ToolValidator {
  static validateTool(tool: Partial<Tool>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!tool.name || tool.name.trim().length === 0) {
      errors.push('工具名称不能为空');
    } else if (tool.name.length > 100) {
      errors.push('工具名称不能超过100个字符');
    }

    if (!tool.url || tool.url.trim().length === 0) {
      errors.push('工具URL不能为空');
    } else if (!this.isValidUrl(tool.url)) {
      errors.push('请输入有效的URL地址');
    }

    if (!tool.category) {
      errors.push('请选择工具分类');
    }

    if (!tool.status) {
      errors.push('请选择工具状态');
    }

    if (!tool.tags || tool.tags.length === 0) {
      errors.push('请至少添加一个标签');
    } else if (tool.tags.some(tag => tag.length > 20)) {
      errors.push('单个标签不能超过20个字符');
    }

    if (tool.description && tool.description.length > 500) {
      errors.push('工具描述不能超过500个字符');
    }

    if (tool.weight !== undefined && (tool.weight < 0 || tool.weight > 1000)) {
      errors.push('权重值必须在0-1000之间');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }
}

/**
 * 工具分类管理器
 */
export class CategoryManager {
  static getAllCategories(): Array<{ value: ToolCategory; label: string; description: string }> {
    return [
      { value: ToolCategoryEnum.DEVELOPMENT, label: '开发工具', description: '编程和开发相关工具' },
      { value: ToolCategoryEnum.DESIGN, label: '设计工具', description: 'UI/UX设计和图形设计工具' },
      { value: ToolCategoryEnum.PRODUCTIVITY, label: '生产力工具', description: '提升工作效率的工具' },
      { value: ToolCategoryEnum.LEARNING, label: '学习工具', description: '在线学习和教育工具' },
      { value: ToolCategoryEnum.UTILITIES, label: '实用工具', description: '各种实用小工具' },
      { value: ToolCategoryEnum.COMMUNICATION, label: '沟通工具', description: '团队沟通和协作工具' },
      { value: ToolCategoryEnum.MEDIA, label: '媒体工具', description: '音视频和多媒体工具' },
      { value: ToolCategoryEnum.SECURITY, label: '安全工具', description: '网络安全和隐私保护工具' }
    ];
  }

  static getCategoryLabel(category: ToolCategory): string {
    const categories = this.getAllCategories();
    return categories.find(c => c.value === category)?.label || category;
  }
}

/**
 * 默认工具模板
 */
export const defaultToolTemplate: Omit<Tool, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  description: '',
  icon: '',
  url: '',
  category: ToolCategoryEnum.DEVELOPMENT,
  status: ToolStatusEnum.ACTIVE,
  tags: [],
  featured: false,
  weight: 50
};