import React from 'react';
import { Wifi, RefreshCw, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface StatusBarProps {
  isLoading: boolean;
  hasError: boolean;
  lastUpdated: Date;
  onRefresh: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  isLoading,
  hasError,
  lastUpdated,
  onRefresh
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {hasError ? (
                <>
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-600">Connection Error</span>
                </>
              ) : isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
                  <span className="text-blue-600">Updating feeds...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">Live Feed Active</span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="h-3 w-3" />
              <span>
                Last updated: {formatDistanceToNow(lastUpdated, { addSuffix: true })}
              </span>
            </div>
          </div>
          
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};