import { ToolCategory } from '@/types/tool';

/**
 * 工具分类数据
 */
export const toolCategories = [
  {
    id: ToolCategory.DEVELOPMENT,
    name: '开发工具',
    description: '提升开发效率的工具集合',
    icon: '💻',
    weight: 100
  },
  {
    id: ToolCategory.DESIGN,
    name: '设计工具',
    description: '设计和创意相关工具',
    icon: '🎨',
    weight: 90
  },
  {
    id: ToolCategory.PRODUCTIVITY,
    name: '生产力工具',
    description: '提升工作效率的应用',
    icon: '⚡',
    weight: 80
  },
  {
    id: ToolCategory.LEARNING,
    name: '学习工具',
    description: '学习和教育相关工具',
    icon: '📚',
    weight: 70
  },
  {
    id: ToolCategory.UTILITIES,
    name: '实用工具',
    description: '各种实用小工具',
    icon: '🔧',
    weight: 60
  },
  {
    id: ToolCategory.COMMUNICATION,
    name: '沟通工具',
    description: '团队协作和沟通工具',
    icon: '💬',
    weight: 50
  },
  {
    id: ToolCategory.MEDIA,
    name: '媒体工具',
    description: '音视频和图像处理工具',
    icon: '🎬',
    weight: 40
  },
  {
    id: ToolCategory.SECURITY,
    name: '安全工具',
    description: '网络安全和隐私保护工具',
    icon: '🔒',
    weight: 30
  }
];