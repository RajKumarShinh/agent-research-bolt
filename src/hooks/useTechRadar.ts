import { useState, useEffect } from 'react';
import { TechRadarItem } from '../types';
import axios from 'axios';

const API_BASE_URL = '/api/tech-radar';

export const useTechRadar = () => {
  const [items, setItems] = useState<TechRadarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch items from API
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🎯 Fetching tech radar items from API...');
      const response = await axios.get(API_BASE_URL);
      const { items: fetchedItems, lastUpdated: serverLastUpdated } = response.data;
      
      const itemsWithDates = fetchedItems.map((item: any) => ({
        ...item,
        lastUpdated: new Date(item.lastUpdated)
      }));
      
      setItems(itemsWithDates);
      setLastUpdated(new Date(serverLastUpdated));
      console.log(`✅ Successfully loaded ${itemsWithDates.length} tech radar items`);
    } catch (err) {
      console.error('❌ Error fetching tech radar items:', err);
      setError(axios.isAxiosError(err) && err.response?.status === 404 
        ? 'Tech Radar API not available. Check server connection.' 
        : 'Failed to load tech radar items. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Add new item
  const addItem = async (itemData: Omit<TechRadarItem, 'id' | 'lastUpdated'>) => {
    try {
      console.log('➕ Adding new tech radar item...');
      const response = await axios.post(API_BASE_URL, itemData);
      const newItem = {
        ...response.data,
        lastUpdated: new Date(response.data.lastUpdated)
      };
      
      setItems(prev => [newItem, ...prev]);
      setLastUpdated(new Date());
      console.log(`✅ Successfully added: ${newItem.name}`);
      return newItem;
    } catch (err) {
      console.error('❌ Error adding tech radar item:', err);
      throw new Error('Failed to add tech radar item');
    }
  };

  // Update existing item
  const updateItem = async (id: string, itemData: Omit<TechRadarItem, 'id' | 'lastUpdated'>) => {
    try {
      console.log(`🔄 Updating tech radar item: ${id}`);
      const response = await axios.put(`${API_BASE_URL}/${id}`, itemData);
      const updatedItem = {
        ...response.data,
        lastUpdated: new Date(response.data.lastUpdated)
      };
      
      setItems(prev => prev.map(item => 
        item.id === id ? updatedItem : item
      ));
      setLastUpdated(new Date());
      console.log(`✅ Successfully updated: ${updatedItem.name}`);
      return updatedItem;
    } catch (err) {
      console.error('❌ Error updating tech radar item:', err);
      throw new Error('Failed to update tech radar item');
    }
  };

  // Delete item
  const deleteItem = async (id: string) => {
    try {
      console.log(`🗑️ Deleting tech radar item: ${id}`);
      await axios.delete(`${API_BASE_URL}/${id}`);
      
      setItems(prev => prev.filter(item => item.id !== id));
      setLastUpdated(new Date());
      console.log('✅ Successfully deleted tech radar item');
    } catch (err) {
      console.error('❌ Error deleting tech radar item:', err);
      throw new Error('Failed to delete tech radar item');
    }
  };

  // Get item history
  const getItemHistory = async (id: string) => {
    try {
      console.log(`📈 Fetching history for item: ${id}`);
      const response = await axios.get(`${API_BASE_URL}/${id}/history`);
      console.log(`✅ Successfully fetched ${response.data.length} history entries`);
      return response.data;
    } catch (err) {
      console.error('❌ Error fetching item history:', err);
      throw new Error('Failed to fetch item history');
    }
  };

  // Create snapshot
  const createSnapshot = async (name?: string, description?: string) => {
    try {
      console.log('📸 Creating tech radar snapshot...');
      const response = await axios.post(`${API_BASE_URL}/snapshots`, {
        name,
        description
      });
      console.log(`✅ Successfully created snapshot: ${response.data.name}`);
      return response.data;
    } catch (err) {
      console.error('❌ Error creating snapshot:', err);
      throw new Error('Failed to create snapshot');
    }
  };

  // Get snapshots
  const getSnapshots = async () => {
    try {
      console.log('📋 Fetching tech radar snapshots...');
      const response = await axios.get(`${API_BASE_URL}/snapshots`);
      console.log(`✅ Successfully fetched ${response.data.length} snapshots`);
      return response.data;
    } catch (err) {
      console.error('❌ Error fetching snapshots:', err);
      throw new Error('Failed to fetch snapshots');
    }
  };

  // Refresh data
  const refreshItems = async () => {
    await fetchItems();
  };

  // Initial load
  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    lastUpdated,
    addItem,
    updateItem,
    deleteItem,
    getItemHistory,
    createSnapshot,
    getSnapshots,
    refreshItems
  };
};