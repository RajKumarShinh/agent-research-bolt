import React, { useState, useMemo } from 'react';
import { TechRadarTile } from './TechRadarTile';
import { TechRadarFilterPanel } from './TechRadarFilterPanel';
import { TechRadarModal } from './TechRadarModal';
import { TechRadarFormModal } from './TechRadarFormModal';
import { useTechRadar } from '../../hooks/useTechRadar';
import { TechRadarItem, TechRadarFilter } from '../../types';
import { Grid, List, Filter, Search, BarChart, TrendingUp, Plus, RefreshCw, AlertCircle } from 'lucide-react';

export const TechRadarView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TechRadarItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<TechRadarItem | null>(null);
  const [filter, setFilter] = useState<TechRadarFilter>({
    search: '',
    category: 'all',
    status: 'all',
    maturityLevel: 'all',
    dateRange: 'all',
    sortBy: 'status'
  });

  const {
    items,
    loading,
    error,
    lastUpdated,
    addItem,
    updateItem,
    refreshItems
  } = useTechRadar();

  const updateFilter = (newFilter: Partial<TechRadarFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  const handleAddTool = async (toolData: Omit<TechRadarItem, 'id' | 'lastUpdated'>) => {
    try {
      await addItem(toolData);
    } catch (error) {
      console.error('Failed to add tool:', error);
    }
  };

  const handleEditTool = async (toolData: Omit<TechRadarItem, 'id' | 'lastUpdated'>) => {
    if (!editingItem) return;
    
    try {
      const updatedItem = await updateItem(editingItem.id, toolData);
      
      // Update the selected item if it's currently being viewed
      if (selectedItem?.id === editingItem.id) {
        setSelectedItem(updatedItem);
      }
    } catch (error) {
      console.error('Failed to update tool:', error);
    }
  };

  const handleEditClick = (item: TechRadarItem) => {
    setEditingItem(item);
    setSelectedItem(null); // Close the detail modal
  };

  const closeEditModal = () => {
    setEditingItem(null);
  };

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (filter.category !== 'all') {
      filtered = filtered.filter(item => item.category === filter.category);
    }

    // Status filter
    if (filter.status !== 'all') {
      filtered = filtered.filter(item => item.status === filter.status);
    }

    // Maturity level filter
    if (filter.maturityLevel !== 'all') {
      filtered = filtered.filter(item => item.maturityLevel === filter.maturityLevel);
    }

    // Date range filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (filter.dateRange) {
      case 'today':
        filtered = filtered.filter(item => item.lastUpdated >= today);
        break;
      case 'week':
        filtered = filtered.filter(item => item.lastUpdated >= weekAgo);
        break;
      case 'month':
        filtered = filtered.filter(item => item.lastUpdated >= monthAgo);
        break;
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (filter.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'status':
          const statusOrder = { 'Adopt': 0, 'Trial': 1, 'Assess': 2, 'Hold': 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        case 'adoption':
          return b.adoptionLevel - a.adoptionLevel;
        case 'lastUpdated':
          return b.lastUpdated.getTime() - a.lastUpdated.getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [items, filter]);

  const hasActiveFilters = 
    filter.search || 
    filter.category !== 'all' || 
    filter.status !== 'all' || 
    filter.maturityLevel !== 'all' || 
    filter.dateRange !== 'all';

  const clearAllFilters = () => {
    updateFilter({
      search: '',
      category: 'all',
      status: 'all',
      maturityLevel: 'all',
      dateRange: 'all',
      sortBy: 'status'
    });
  };

  // Calculate stats
  const stats = useMemo(() => {
    const total = items.length;
    const adopt = items.filter(item => item.status === 'Adopt').length;
    const trial = items.filter(item => item.status === 'Trial').length;
    const assess = items.filter(item => item.status === 'Assess').length;
    const hold = items.filter(item => item.status === 'Hold').length;
    const avgAdoption = total > 0 ? Math.round(items.reduce((sum, item) => sum + item.adoptionLevel, 0) / total) : 0;

    return { total, adopt, trial, assess, hold, avgAdoption };
  }, [items]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tech Radar</h1>
                <p className="mt-2 text-gray-600">
                  Comprehensive overview of software development tools and technologies
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {/* Refresh Button */}
                <button
                  onClick={refreshItems}
                  disabled={loading}
                  className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>

                {/* Add Tool Button */}
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tool
                </button>
                
                <div className="text-sm text-gray-500">
                  {filteredItems.length} of {stats.total} items
                </div>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    showFilters || hasActiveFilters
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {hasActiveFilters && (
                    <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      !
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <BarChart className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Total</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-green-700">Adopt</span>
                </div>
                <p className="text-2xl font-bold text-green-900 mt-1">{stats.adopt}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm font-medium text-blue-700">Trial</span>
                </div>
                <p className="text-2xl font-bold text-blue-900 mt-1">{stats.trial}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-sm font-medium text-yellow-700">Assess</span>
                </div>
                <p className="text-2xl font-bold text-yellow-900 mt-1">{stats.assess}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-sm font-medium text-red-700">Hold</span>
                </div>
                <p className="text-2xl font-bold text-red-900 mt-1">{stats.hold}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">Avg Adoption</span>
                </div>
                <p className="text-2xl font-bold text-purple-900 mt-1">{stats.avgAdoption}%</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-6">
              <div className="relative max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search technologies, tools, or descriptions..."
                  value={filter.search}
                  onChange={(e) => updateFilter({ search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <TechRadarFilterPanel
        filter={filter}
        onFilterChange={updateFilter}
        onClose={() => setShowFilters(false)}
        isOpen={showFilters}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {hasActiveFilters && (
          <div className="mb-6 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Active filters applied • {filteredItems.length} items shown
              </span>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Items Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-6 w-6 text-blue-600 animate-spin" />
              <span className="text-lg text-gray-600">Loading tech radar...</span>
            </div>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredItems.map(item => (
              <TechRadarTile
                key={item.id}
                item={item}
                viewMode={viewMode}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500 mb-4">
              {hasActiveFilters 
                ? 'Try adjusting your search terms or filters to find more technologies.'
                : 'Get started by adding your first technology to the radar.'
              }
            </p>
            {hasActiveFilters ? (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            ) : (
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Tool
              </button>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      <TechRadarModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onEdit={handleEditClick}
      />

      <TechRadarFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddTool}
        editingTool={null}
      />

      <TechRadarFormModal
        isOpen={!!editingItem}
        onClose={closeEditModal}
        onSave={handleEditTool}
        editingTool={editingItem}
      />
    </div>
  );
};