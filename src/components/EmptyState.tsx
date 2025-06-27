import React from 'react';
import { Search, Filter } from 'lucide-react';

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onClearFilters }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 bg-gray-100 rounded-full mb-4">
          {hasFilters ? (
            <Filter className="h-8 w-8 text-gray-400" />
          ) : (
            <Search className="h-8 w-8 text-gray-400" />
          )}
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {hasFilters ? 'No articles match your filters' : 'No articles found'}
        </h3>
        
        <p className="text-gray-500 mb-6 max-w-md">
          {hasFilters
            ? 'Try adjusting your search terms or filters to find more articles.'
            : 'We couldn\'t find any articles at the moment. Please try again later.'}
        </p>
        
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};