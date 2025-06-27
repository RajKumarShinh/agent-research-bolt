export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  source: string;
  publishedAt: Date;
  url: string;
  imageUrl: string;
  tags: string[];
  aiSubtopic: AISubtopic;
  readTime: number;
  isFavorite?: boolean;
}

export type AISubtopic = 
  | 'LLMs'
  | 'Robotics'
  | 'Ethics'
  | 'Autonomous Systems'
  | 'AI Agents'
  | 'Machine Learning'
  | 'Computer Vision'
  | 'NLP'
  | 'General AI';

export interface Filter {
  search: string;
  sources: string[];
  subtopics: AISubtopic[];
  dateRange: 'today' | 'week' | 'month' | 'all';
  sortBy: 'newest' | 'oldest' | 'relevance';
}

export interface RSSFeed {
  name: string;
  url: string;
  category: string;
  lastUpdated: Date;
  articleCount: number;
}

// Tech Radar Types
export interface TechRadarItem {
  id: string;
  name: string;
  category: TechCategory;
  status: TechStatus;
  description: string;
  lastUpdated: Date;
  maturityLevel: MaturityLevel;
  website?: string;
  tags: string[];
  adoptionLevel: number; // 1-100 scale
}

export type TechCategory = 
  | 'Development'
  | 'Testing'
  | 'DevOps'
  | 'Project Management'
  | 'Design'
  | 'Database'
  | 'Infrastructure'
  | 'Security'
  | 'Monitoring'
  | 'Communication';

export type TechStatus = 
  | 'Adopt'
  | 'Trial'
  | 'Assess'
  | 'Hold';

export type MaturityLevel = 
  | 'Emerging'
  | 'Stable'
  | 'Legacy';

export interface TechRadarFilter {
  search: string;
  category: TechCategory | 'all';
  status: TechStatus | 'all';
  maturityLevel: MaturityLevel | 'all';
  dateRange: 'today' | 'week' | 'month' | 'all';
  sortBy: 'name' | 'status' | 'category' | 'lastUpdated' | 'adoption';
}