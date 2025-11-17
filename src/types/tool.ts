/**
 * 工具分类枚举
 */
export enum ToolCategory {
  DEVELOPMENT = 'development',
  DESIGN = 'design',
  PRODUCTIVITY = 'productivity',
  LEARNING = 'learning',
  UTILITIES = 'utilities',
  COMMUNICATION = 'communication',
  MEDIA = 'media',
  SECURITY = 'security'
}

/**
 * 工具状态枚举
 */
export enum ToolStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BETA = 'beta'
}

/**
 * 工具数据接口
 */
export interface Tool {
  /** 工具唯一标识符 */
  id: string;
  
  /** 工具名称 */
  name: string;
  
  /** 工具描述 */
  description?: string;
  
  /** 工具图标URL */
  icon?: string;
  
  /** 工具网站URL */
  url: string;
  
  /** 工具分类 */
  category: ToolCategory;
  
  /** 工具状态 */
  status: ToolStatus;
  
  /** 标签数组 */
  tags: string[];
  
  /** 是否推荐 */
  featured: boolean;
  
  /** 排序权重（数值越大越靠前） */
  weight: number;
  
  /** 创建时间戳 */
  createdAt: number;
  
  /** 更新时间戳 */
  updatedAt: number;
}

/**
 * 工具分类接口
 */
export interface ToolCategoryData {
  /** 分类标识符 */
  id: ToolCategory;
  
  /** 分类名称 */
  name: string;
  
  /** 分类描述 */
  description: string;
  
  /** 分类图标 */
  icon: string;
  
  /** 排序权重 */
  weight: number;
}

/**
 * 工具响应接口
 */
export interface ToolResponse {
  /** 工具列表 */
  tools: Tool[];
  
  /** 分类列表 */
  categories: ToolCategoryData[];
  
  /** 总数 */
  total: number;
  
  /** 分页信息 */
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
  };
}