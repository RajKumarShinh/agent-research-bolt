import { useState, useEffect, useMemo } from 'react';
import { Article, Filter } from '../types';
import axios from 'axios';

const API_BASE_URL = '/api';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [filter, setFilter] = useState<Filter>({
    search: '',
    sources: [],
    subtopics: [],
    dateRange: 'all',
    sortBy: 'newest'
  });

  // Fetch articles from server
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/articles`);
      const { articles: fetchedArticles, lastUpdated: serverLastUpdated } = response.data;
      
      // Load favorites from localStorage
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const articlesWithFavorites = fetchedArticles.map((article: Article) => ({
        ...article,
        publishedAt: new Date(article.publishedAt),
        isFavorite: favorites.includes(article.id)
      }));
      
      setArticles(articlesWithFavorites);
      setLastUpdated(new Date(serverLastUpdated));
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(axios.isAxiosError(err) && err.response?.status === 404 
        ? 'Server not running. Please start the RSS feed server.' 
        : 'Failed to load articles. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Refresh articles manually
  const refreshArticles = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/refresh`);
      await fetchArticles();
    } catch (err) {
      console.error('Error refreshing articles:', err);
      setError('Failed to refresh articles');
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchArticles();
    
    // Set up automatic refresh every 5 minutes
    const interval = setInterval(fetchArticles, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.author.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Source filter
    if (filter.sources.length > 0) {
      filtered = filtered.filter(article =>
        filter.sources.includes(article.source)
      );
    }

    // Subtopic filter
    if (filter.subtopics.length > 0) {
      filtered = filtered.filter(article =>
        filter.subtopics.includes(article.aiSubtopic)
      );
    }

    // Date range filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (filter.dateRange) {
      case 'today':
        filtered = filtered.filter(article => article.publishedAt >= today);
        break;
      case 'week':
        filtered = filtered.filter(article => article.publishedAt >= weekAgo);
        break;
      case 'month':
        filtered = filtered.filter(article => article.publishedAt >= monthAgo);
        break;
    }

    // Sort articles
    filtered.sort((a, b) => {
      switch (filter.sortBy) {
        case 'newest':
          return b.publishedAt.getTime() - a.publishedAt.getTime();
        case 'oldest':
          return a.publishedAt.getTime() - b.publishedAt.getTime();
        case 'relevance':
          if (filter.search) {
            const aScore = a.title.toLowerCase().includes(filter.search.toLowerCase()) ? 1 : 0;
            const bScore = b.title.toLowerCase().includes(filter.search.toLowerCase()) ? 1 : 0;
            return bScore - aScore;
          }
          return b.publishedAt.getTime() - a.publishedAt.getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [articles, filter]);

  const toggleFavorite = (articleId: string) => {
    setArticles(prevArticles =>
      prevArticles.map(article =>
        article.id === articleId
          ? { ...article, isFavorite: !article.isFavorite }
          : article
      )
    );

    // Update localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const article = articles.find(a => a.id === articleId);
    if (article?.isFavorite) {
      const updatedFavorites = favorites.filter((id: string) => id !== articleId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, articleId]));
    }
  };

  const updateFilter = (newFilter: Partial<Filter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  return {
    articles: filteredArticles,
    loading,
    error,
    filter,
    updateFilter,
    toggleFavorite,
    refreshArticles,
    lastUpdated,
    totalArticles: articles.length,
    filteredCount: filteredArticles.length
  };
};