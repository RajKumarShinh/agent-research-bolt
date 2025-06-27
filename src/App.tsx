import React, { useState } from 'react';
import { Header } from './components/Header';
import { FilterPanel } from './components/FilterPanel';
import { ArticleCard } from './components/ArticleCard';
import { ArticleModal } from './components/ArticleModal';
import { LoadingCard } from './components/LoadingCard';
import { EmptyState } from './components/EmptyState';
import { StatusBar } from './components/StatusBar';
import { TechRadarView } from './components/TechRadar/TechRadarView';
import { useArticles } from './hooks/useArticles';
import { Article } from './types';
import { Brain, Zap, Radar } from 'lucide-react';

type Tab = 'news' | 'tech-radar';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('news');
  const {
    articles,
    loading,
    error,
    filter,
    updateFilter,
    toggleFavorite,
    refreshArticles,
    lastUpdated,
    filteredCount
  } = useArticles();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const hasActiveFilters = 
    filter.search || 
    filter.sources.length > 0 || 
    filter.subtopics.length > 0 || 
    filter.dateRange !== 'all';

  const clearAllFilters = () => {
    updateFilter({
      search: '',
      sources: [],
      subtopics: [],
      dateRange: 'all',
      sortBy: 'newest'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="h-8 w-8 text-blue-600" />
                <Zap className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AgentNews</h1>
                <p className="text-xs text-gray-500">AI Agent Intelligence</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('news')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'news'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Brain className="h-4 w-4" />
                <span>AI News</span>
              </button>
              <button
                onClick={() => setActiveTab('tech-radar')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'tech-radar'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Radar className="h-4 w-4" />
                <span>Tech Radar</span>
              </button>
            </div>

            {/* Right Side Controls */}
            <div className="w-48 flex justify-end">
              {activeTab === 'news' && (
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:block text-sm text-gray-500">
                    {filteredCount} articles
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'tech-radar' ? (
        <TechRadarView />
      ) : (
        <>
          {/* Header for News Tab */}
          <Header
            filter={filter}
            onFilterChange={updateFilter}
            onToggleFilters={() => setShowFilters(!showFilters)}
            showFilters={showFilters}
            articleCount={filteredCount}
          />

          {/* Status Bar */}
          <StatusBar
            isLoading={loading}
            hasError={!!error}
            lastUpdated={lastUpdated}
            onRefresh={refreshArticles}
          />

          {/* Filter Panel */}
          <FilterPanel
            filter={filter}
            onFilterChange={updateFilter}
            onClose={() => setShowFilters(false)}
            isOpen={showFilters}
          />

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error loading articles</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                      {error.includes('Server not running') && (
                        <p className="mt-1">
                          Run <code className="bg-red-100 px-1 rounded">npm run dev</code> to start both client and server.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />)
              ) : articles.length === 0 ? (
                <EmptyState
                  hasFilters={hasActiveFilters}
                  onClearFilters={clearAllFilters}
                />
              ) : (
                articles.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onToggleFavorite={toggleFavorite}
                    onClick={setSelectedArticle}
                  />
                ))
              )}
            </div>

            {/* Load More */}
            {!loading && articles.length > 0 && articles.length % 12 === 0 && (
              <div className="mt-12 text-center">
                <button 
                  onClick={refreshArticles}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </main>

          {/* Article Modal */}
          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
            onToggleFavorite={toggleFavorite}
          />
        </>
      )}
    </div>
  );
}

export default App;