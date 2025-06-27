import React from 'react';
import { Clock, Heart, ExternalLink, User, Tag } from 'lucide-react';
import { Article } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  onToggleFavorite: (id: string) => void;
  onClick: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onToggleFavorite,
  onClick
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(article.id);
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(article.url, '_blank');
  };

  return (
    <article
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 hover:border-blue-200"
      onClick={() => onClick(article)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              article.isFavorite
                ? 'bg-red-500/90 text-white'
                : 'bg-white/90 text-gray-700 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${article.isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleExternalClick}
            className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-blue-50 hover:text-blue-600 backdrop-blur-sm transition-all duration-200"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {article.aiSubtopic}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Source & Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="font-medium text-blue-600">{article.source}</span>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{formatDistanceToNow(article.publishedAt, { addSuffix: true })}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <User className="h-3 w-3" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{article.readTime} min read</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {article.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
            >
              <Tag className="h-2 w-2 mr-1" />
              {tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
              +{article.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </article>
  );
};