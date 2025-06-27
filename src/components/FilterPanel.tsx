import React from 'react';
import { X, Calendar, Tag, Globe } from 'lucide-react';
import { Filter, AISubtopic } from '../types';

interface FilterPanelProps {
  filter: Filter;
  onFilterChange: (filter: Partial<Filter>) => void;
  onClose: () => void;
  isOpen: boolean;
}

const AI_SUBTOPICS: AISubtopic[] = [
  'AI Agents',
  'Autonomous Systems',
  'LLMs',
  'Robotics',
  'Ethics',
  'Machine Learning',
  'Computer Vision',
  'NLP',
  'General AI'
];

const SOURCES = [
  'MIT Technology Review',
  'Wired AI',
  'TechCrunch AI',
  'VentureBeat AI',
  'Microsoft Research',
  'Microsoft AI Blog',
  'Google AI Blog',
  'Google Research',
  'Anthropic',
  'OpenAI Blog'
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filter,
  onFilterChange,
  onClose,
  isOpen
}) => {
  if (!isOpen) return null;

  const handleSubtopicToggle = (subtopic: AISubtopic) => {
    const newSubtopics = filter.subtopics.includes(subtopic)
      ? filter.subtopics.filter(s => s !== subtopic)
      : [...filter.subtopics, subtopic];
    onFilterChange({ subtopics: newSubtopics });
  };

  const handleSourceToggle = (source: string) => {
    const newSources = filter.sources.includes(source)
      ? filter.sources.filter(s => s !== source)
      : [...filter.sources, source];
    onFilterChange({ sources: newSources });
  };

  const clearFilters = () => {
    onFilterChange({
      sources: [],
      subtopics: [],
      dateRange: 'all',
      sortBy: 'newest'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Date Range */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Date Range</h3>
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

            {/* AI Subtopics */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">AI Subtopics</h3>
              </div>
              <div className="space-y-2">
                {AI_SUBTOPICS.map(subtopic => (
                  <label
                    key={subtopic}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filter.subtopics.includes(subtopic)}
                      onChange={() => handleSubtopicToggle(subtopic)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{subtopic}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sources */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Sources</h3>
              </div>
              <div className="space-y-2">
                {SOURCES.map(source => (
                  <label
                    key={source}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filter.sources.includes(source)}
                      onChange={() => handleSourceToggle(source)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{source}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
              <div className="space-y-2">
                {[
                  { value: 'newest', label: 'Newest First' },
                  { value: 'oldest', label: 'Oldest First' },
                  { value: 'relevance', label: 'Most Relevant' }
                ].map(({ value, label }) => (
                  <label
                    key={value}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sortBy"
                      value={value}
                      checked={filter.sortBy === value}
                      onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t">
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