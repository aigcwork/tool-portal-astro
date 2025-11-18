export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  featured: boolean;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

export interface TechTrend {
  id: number;
  title: string;
  summary: string;
  trend: "up" | "down" | "stable";
  impact: "high" | "medium" | "low";
  category: string;
}

export interface UpcomingFeature {
  id: number;
  title: string;
  description: string;
  status: "开发中" | "测试中" | "规划中" | "调研中";
  expectedDate: string;
  priority: "high" | "medium";
}

let newsArticles: NewsArticle[] = [];
let techTrends: TechTrend[] = [];
let upcomingFeatures: UpcomingFeature[] = [];

export function loadNewsData() {
  try {
    const newsData = require('../data/news.json');
    const trendsData = require('../data/tech-trends.json');
    const featuresData = require('../data/upcoming-features.json');
    
    newsArticles = newsData;
    techTrends = trendsData;
    upcomingFeatures = featuresData;
    
    return { newsArticles, techTrends, upcomingFeatures };
  } catch (error) {
    console.error('加载数据失败:', error);
    return { newsArticles: [], techTrends: [], upcomingFeatures: [] };
  }
}

export function getNewsArticles(): NewsArticle[] {
  if (newsArticles.length === 0) {
    loadNewsData();
  }
  return newsArticles;
}

export function getTechTrends(): TechTrend[] {
  if (techTrends.length === 0) {
    loadNewsData();
  }
  return techTrends;
}

export function getUpcomingFeatures(): UpcomingFeature[] {
  if (upcomingFeatures.length === 0) {
    loadNewsData();
  }
  return upcomingFeatures;
}

export function getNewsArticleById(id: number): NewsArticle | undefined {
  return getNewsArticles().find(article => article.id === id);
}

export function createNewsArticle(article: Omit<NewsArticle, 'id'>): NewsArticle {
  const newArticle: NewsArticle = {
    ...article,
    id: Math.max(...getNewsArticles().map(a => a.id), 0) + 1
  };
  
  newsArticles.push(newArticle);
  return newArticle;
}

export function updateNewsArticle(id: number, updates: Partial<NewsArticle>): NewsArticle | null {
  const index = newsArticles.findIndex(article => article.id === id);
  if (index === -1) return null;
  
  newsArticles[index] = { ...newsArticles[index], ...updates };
  return newsArticles[index];
}

export function deleteNewsArticle(id: number): boolean {
  const index = newsArticles.findIndex(article => article.id === id);
  if (index === -1) return false;
  
  newsArticles.splice(index, 1);
  return true;
}

export function createTechTrend(trend: Omit<TechTrend, 'id'>): TechTrend {
  const newTrend: TechTrend = {
    ...trend,
    id: Math.max(...getTechTrends().map(t => t.id), 0) + 1
  };
  
  techTrends.push(newTrend);
  return newTrend;
}

export function updateTechTrend(id: number, updates: Partial<TechTrend>): TechTrend | null {
  const index = techTrends.findIndex(trend => trend.id === id);
  if (index === -1) return null;
  
  techTrends[index] = { ...techTrends[index], ...updates };
  return techTrends[index];
}

export function deleteTechTrend(id: number): boolean {
  const index = techTrends.findIndex(trend => trend.id === id);
  if (index === -1) return false;
  
  techTrends.splice(index, 1);
  return true;
}

export function createUpcomingFeature(feature: Omit<UpcomingFeature, 'id'>): UpcomingFeature {
  const newFeature: UpcomingFeature = {
    ...feature,
    id: Math.max(...getUpcomingFeatures().map(f => f.id), 0) + 1
  };
  
  upcomingFeatures.push(newFeature);
  return newFeature;
}

export function updateUpcomingFeature(id: number, updates: Partial<UpcomingFeature>): UpcomingFeature | null {
  const index = upcomingFeatures.findIndex(feature => feature.id === id);
  if (index === -1) return null;
  
  upcomingFeatures[index] = { ...upcomingFeatures[index], ...updates };
  return upcomingFeatures[index];
}

export function deleteUpcomingFeature(id: number): boolean {
  const index = upcomingFeatures.findIndex(feature => feature.id === id);
  if (index === -1) return false;
  
  upcomingFeatures.splice(index, 1);
  return true;
}