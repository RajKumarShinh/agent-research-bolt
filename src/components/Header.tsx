import React from 'react';
import { Search, Filter, Brain, Zap } from 'lucide-react';
import { Filter as FilterType } from '../types';

interface HeaderProps {
  filter: FilterType;
  onFilterChange: (filter: Partial<FilterType>) => void;
  onToggleFilters: () => void;
  showFilters: boolean;
  articleCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  filter,
  onFilterChange,
  onToggleFilters,
  showFilters,
  articleCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
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

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search AI news, agents, research..."
                value={filter.search}
                onChange={(e) => onFilterChange({ search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-sm text-gray-500">
              {articleCount} articles
            </div>
            <button
              onClick={onToggleFilters}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                showFilters
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};