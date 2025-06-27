import React from 'react';

export const LoadingCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200" />
      
      {/* Content skeleton */}
      <div className="p-6">
        {/* Source & Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>
        
        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-3/4" />
        </div>
        
        {/* Excerpt */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
        
        {/* Tags */}
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-6 bg-gray-200 rounded w-12" />
        </div>
      </div>
    </div>
  );
};