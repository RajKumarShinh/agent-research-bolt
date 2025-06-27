import React from 'react';
import { X, ExternalLink, Calendar, Tag, TrendingUp, Globe, Users } from 'lucide-react';
import { TechRadarItem } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface TechRadarModalProps {
  item: TechRadarItem | null;
  onClose: () => void;
}

export const TechRadarModal: React.FC<TechRadarModalProps> = ({ item, onClose }) => {
  if (!item) return null;

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

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'Adopt':
        return 'We strongly recommend using this technology. It\'s proven and ready for production use.';
      case 'Trial':
        return 'This technology shows promise. Consider trying it in non-critical projects to gain experience.';
      case 'Assess':
        return 'Worth exploring and understanding. May be suitable for future projects with proper evaluation.';
      case 'Hold':
        return 'We recommend avoiding or moving away from this technology due to various concerns.';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl relative">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{getCategoryIcon(item.category)}</div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{item.name}</h1>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {item.website && (
                  <button
                    onClick={() => window.open(item.website, '_blank')}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Status Badges */}
            <div className="flex items-center space-x-3 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getMaturityColor(item.maturityLevel)}`}>
                {item.maturityLevel}
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {item.description}
              </p>
            </div>

            {/* Status Recommendation */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-900 mb-2">Our Recommendation</h3>
              <p className="text-gray-700">{getStatusDescription(item.status)}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium text-gray-900">Adoption Level</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        item.adoptionLevel >= 80 ? 'bg-green-500' :
                        item.adoptionLevel >= 60 ? 'bg-blue-500' :
                        item.adoptionLevel >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${item.adoptionLevel}%` }}
                    />
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{item.adoptionLevel}%</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium text-gray-900">Last Updated</h3>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDistanceToNow(item.lastUpdated, { addSuffix: true })}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium text-gray-900">Maturity</h3>
                </div>
                <p className="text-lg font-semibold text-gray-900">{item.maturityLevel}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* External Link CTA */}
            {item.website && (
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Learn More</h3>
                    <p className="text-sm text-gray-600">Visit the official website for documentation and resources</p>
                  </div>
                  <button
                    onClick={() => window.open(item.website, '_blank')}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};