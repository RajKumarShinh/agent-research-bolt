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