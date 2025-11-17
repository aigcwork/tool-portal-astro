import type { Tool, ToolCategoryData } from '@/types/tool';
import { tools } from '@/data/tools';
import { toolCategories } from '@/data/categories';

/**
 * 获取所有工具
 */
export function getAllTools(): Tool[] {
  return tools.filter(tool => tool.status === 'active');
}

/**
 * 获取推荐工具
 */
export function getFeaturedTools(): Tool[] {
  return tools
    .filter(tool => tool.featured && tool.status === 'active')
    .sort((a, b) => b.weight - a.weight);
}

/**
 * 获取工具分类
 */
export function getToolCategories(): ToolCategoryData[] {
  return toolCategories.sort((a, b) => b.weight - a.weight);
}

/**
 * 根据分类获取工具
 */
export function getToolsByCategory(categoryId: string): Tool[] {
  return tools
    .filter(tool => tool.category === categoryId && tool.status === 'active')
    .sort((a, b) => b.weight - a.weight);
}

/**
 * 根据ID获取工具
 */
export function getToolById(id: string): Tool | undefined {
  return tools.find(tool => tool.id === id);
}

/**
 * 搜索工具
 */
export function searchTools(query: string): Tool[] {
  const searchTerm = query.toLowerCase();
  
  return tools.filter(tool => {
    const matchesName = tool.name.toLowerCase().includes(searchTerm);
    const matchesDescription = tool.description?.toLowerCase().includes(searchTerm);
    const matchesTags = tool.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    
    return (matchesName || matchesDescription || matchesTags) && tool.status === 'active';
  });
}

/**
 * 获取相关工具
 */
export function getRelatedTools(toolId: string, limit: number = 4): Tool[] {
  const currentTool = getToolById(toolId);
  if (!currentTool) return [];
  
  return tools
    .filter(tool => 
      tool.id !== toolId && 
      tool.status === 'active' &&
      (tool.category === currentTool.category || 
       tool.tags.some(tag => currentTool.tags.includes(tag)))
    )
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limit);
}

/**
 * 获取工具统计信息
 */
export function getToolStats() {
  const activeTools = tools.filter(tool => tool.status === 'active');
  const featuredTools = activeTools.filter(tool => tool.featured);
  
  const categoryStats = toolCategories.map(category => ({
    category,
    count: activeTools.filter(tool => tool.category === category.id).length
  }));
  
  return {
    total: activeTools.length,
    featured: featuredTools.length,
    categories: categoryStats
  };
}