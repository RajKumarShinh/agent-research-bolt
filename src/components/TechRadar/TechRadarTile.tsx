import React from 'react';
import { TechRadarItem } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Tag, Calendar, TrendingUp, Globe } from 'lucide-react';

interface TechRadarTileProps {
  item: TechRadarItem;
  viewMode: 'grid' | 'list';
  onClick: (item: TechRadarItem) => void;
}

export const TechRadarTile: React.FC<TechRadarTileProps> = ({
  item,
  viewMode,
  onClick
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Adopt':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Trial':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Assess':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hold':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case 'Emerging':
        return 'bg-purple-100 text-purple-800';
      case 'Stable':
        return 'bg-green-100 text-green-800';
      case 'Legacy':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Development':
        return '⚡';
      case 'Testing':
        return '🧪';
      case 'DevOps':
        return '🚀';
      case 'Project Management':
        return '📋';
      case 'Design':
        return '🎨';
      case 'Database':
        return '🗄️';
      case 'Infrastructure':
        return '🏗️';
      case 'Security':
        return '🔒';
      case 'Monitoring':
        return '📊';
      case 'Communication':
        return '💬';
      default:
        return '🔧';
    }
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.website) {
      window.open(item.website, '_blank');
    }
  };

  if (viewMode === 'list') {
    return (
      <div
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-300 cursor-pointer group p-6"
        onClick={() => onClick(item)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="text-2xl">{getCategoryIcon(item.category)}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMaturityColor(item.maturityLevel)}`}>
                  {item.maturityLevel}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <Tag className="h-3 w-3" />
                  <span>{item.category}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Updated {formatDistanceToNow(item.lastUpdated, { addSuffix: true })}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{item.adoptionLevel}% adoption</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className={`w-8 h-8 rounded-full ${getStatusColor(item.status)} flex items-center justify-center text-xs font-bold`}>
                {item.status[0]}
              </div>
            </div>
            {item.website && (
              <button
                onClick={handleExternalClick}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 hover:border-blue-200"
      onClick={() => onClick(item)}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getCategoryIcon(item.category)}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {item.name}
              </h3>
              <span className="text-sm text-gray-500">{item.category}</span>
            </div>
          </div>
          {item.website && (
            <button
              onClick={handleExternalClick}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Status Badges */}
        <div className="flex items-center space-x-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
            {item.status}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMaturityColor(item.maturityLevel)}`}>
            {item.maturityLevel}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Adoption Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Adoption Level</span>
            <span>{item.adoptionLevel}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                item.adoptionLevel >= 80 ? 'bg-green-500' :
                item.adoptionLevel >= 60 ? 'bg-blue-500' :
                item.adoptionLevel >= 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${item.adoptionLevel}%` }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
              +{item.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Updated {formatDistanceToNow(item.lastUpdated, { addSuffix: true })}</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3" />
            <span>{item.adoptionLevel}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};