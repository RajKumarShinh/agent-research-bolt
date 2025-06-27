import React from 'react';
import { X, Search, Filter, Calendar, Tag, Globe, BarChart } from 'lucide-react';
import { TechRadarFilter, TechCategory, TechStatus, MaturityLevel } from '../../types';
import { TECH_CATEGORIES, TECH_STATUSES, MATURITY_LEVELS } from '../../data/techRadarData';

interface TechRadarFilterPanelProps {
  filter: TechRadarFilter;
  onFilterChange: (filter: Partial<TechRadarFilter>) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const TechRadarFilterPanel: React.FC<TechRadarFilterPanelProps> = ({
  filter,
  onFilterChange,
  onClose,
  isOpen
}) => {
  if (!isOpen) return null;

  const clearFilters = () => {
    onFilterChange({
      search: '',
      category: 'all',
      status: 'all',
      maturityLevel: 'all',
      dateRange: 'all',
      sortBy: 'status'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Tech Radar Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Search */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Search className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Search</h3>
              </div>
              <input
                type="text"
                placeholder="Search tools and technologies..."
                value={filter.search}
                onChange={(e) => onFilterChange({ search: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Category</h3>
              </div>
              <select
                value={filter.category}
                onChange={(e) => onFilterChange({ category: e.target.value as TechCategory | 'all' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {TECH_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <BarChart className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Status</h3>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="all"
                    checked={filter.status === 'all'}
                    onChange={(e) => onFilterChange({ status: e.target.value as TechStatus | 'all' })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">All Statuses</span>
                </label>
                {TECH_STATUSES.map(status => (
                  <label key={status} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={filter.status === status}
                      onChange={(e) => onFilterChange({ status: e.target.value as TechStatus | 'all' })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      status === 'Adopt' ? 'bg-green-100 text-green-800 border-green-200' :
                      status === 'Trial' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      status === 'Assess' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      'bg-red-100 text-red-800 border-red-200'
                    }`}>
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Maturity Level */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Maturity Level</h3>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="maturityLevel"
                    value="all"
                    checked={filter.maturityLevel === 'all'}
                    onChange={(e) => onFilterChange({ maturityLevel: e.target.value as MaturityLevel | 'all' })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">All Levels</span>
                </label>
                {MATURITY_LEVELS.map(level => (
                  <label key={level} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="maturityLevel"
                      value={level}
                      checked={filter.maturityLevel === level}
                      onChange={(e) => onFilterChange({ maturityLevel: e.target.value as MaturityLevel | 'all' })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      level === 'Emerging' ? 'bg-purple-100 text-purple-800' :
                      level === 'Stable' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Last Updated</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'today', label: 'Today' },
                  { value: 'week', label: 'This Week' },
                  { value: 'month', label: 'This Month' },
                  { value: 'all', label: 'All Time' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => onFilterChange({ dateRange: value as any })}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      filter.dateRange === value
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Filter className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Sort By</h3>
              </div>
              <select
                value={filter.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="status">Status</option>
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="adoption">Adoption Level</option>
                <option value="lastUpdated">Last Updated</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};