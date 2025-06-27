import React from 'react';
import { X, ExternalLink, Heart, Clock, User, Tag, Share2 } from 'lucide-react';
import { Article } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onToggleFavorite
}) => {
  if (!article) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: article.url
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(article.url);
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
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {article.aiSubtopic}
                </span>
                <span className="text-sm font-medium text-blue-600">{article.source}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onToggleFavorite(article.id)}
                  className={`p-2 rounded-lg transition-all ${
                    article.isFavorite
                      ? 'text-red-500 bg-red-50'
                      : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${article.isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => window.open(article.url, '_blank')}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <ExternalLink className="h-5 w-5" />
                </button>
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
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatDistanceToNow(article.publishedAt, { addSuffix: true })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </div>
            </div>

            {/* Image */}
            <div className="mb-8">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
            </div>

            {/* Excerpt */}
            <div className="text-lg text-gray-700 mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
              {article.excerpt}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {article.content || 'This is a preview of the article. Click "Read Full Article" to view the complete content on the original source.'}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Read Full Article</h3>
                  <p className="text-sm text-gray-600">Continue reading on {article.source}</p>
                </div>
                <button
                  onClick={() => window.open(article.url, '_blank')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};