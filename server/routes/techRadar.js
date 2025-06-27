import express from 'express';
import { supabase, isSupabaseAvailable } from '../database/supabase.js';

const router = express.Router();

// Middleware to check if Supabase is available
const requireSupabase = (req, res, next) => {
  if (!isSupabaseAvailable()) {
    return res.status(503).json({ 
      error: 'Database service unavailable',
      message: 'Supabase credentials are not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.'
    });
  }
  next();
};

// Apply middleware to all routes
router.use(requireSupabase);

// Helper function to transform database row to application format
const transformDbItem = (dbItem) => ({
  id: dbItem.id,
  name: dbItem.name,
  category: dbItem.category,
  status: dbItem.status,
  description: dbItem.description,
  maturityLevel: dbItem.maturity_level,
  website: dbItem.website,
  tags: Array.isArray(dbItem.tags) ? dbItem.tags : [],
  adoptionLevel: dbItem.adoption_level,
  lastUpdated: new Date(dbItem.updated_at)
});

// Helper function to transform application item to database format
const transformAppItem = (appItem) => ({
  name: appItem.name,
  category: appItem.category,
  status: appItem.status,
  description: appItem.description,
  maturity_level: appItem.maturityLevel,
  website: appItem.website || null,
  tags: JSON.stringify(appItem.tags || []),
  adoption_level: appItem.adoptionLevel
});

// GET /api/tech-radar - Get all tech radar items
router.get('/', async (req, res) => {
  try {
    console.log('📊 Fetching tech radar items from database...');
    
    const { data: items, error } = await supabase
      .from('tech_radar_items')
      .select('*')
      .eq('is_active', true)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('❌ Database error:', error);
      return res.status(500).json({ error: 'Failed to fetch tech radar items' });
    }

    const transformedItems = items ? items.map(transformDbItem) : [];
    
    console.log(`✅ Successfully fetched ${transformedItems.length} tech radar items`);
    res.json({
      items: transformedItems,
      total: transformedItems.length,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('❌ Error fetching tech radar items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/tech-radar - Create new tech radar item
router.post('/', async (req, res) => {
  try {
    console.log('➕ Creating new tech radar item...');
    
    const itemData = transformAppItem(req.body);
    
    // Validate required fields
    if (!itemData.name || !itemData.category || !itemData.status || !itemData.description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data: newItem, error } = await supabase
      .from('tech_radar_items')
      .insert([itemData])
      .select()
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      return res.status(500).json({ error: 'Failed to create tech radar item' });
    }

    const transformedItem = transformDbItem(newItem);
    
    console.log(`✅ Successfully created tech radar item: ${transformedItem.name}`);
    res.status(201).json(transformedItem);
  } catch (error) {
    console.error('❌ Error creating tech radar item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/tech-radar/:id - Update tech radar item
router.put('/:id', async (req, res) => {
  try {
    console.log(`🔄 Updating tech radar item: ${req.params.id}`);
    
    const itemData = transformAppItem(req.body);
    
    const { data: updatedItem, error } = await supabase
      .from('tech_radar_items')
      .update(itemData)
      .eq('id', req.params.id)
      .eq('is_active', true)
      .select()
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      return res.status(500).json({ error: 'Failed to update tech radar item' });
    }

    if (!updatedItem) {
      return res.status(404).json({ error: 'Tech radar item not found' });
    }

    const transformedItem = transformDbItem(updatedItem);
    
    console.log(`✅ Successfully updated tech radar item: ${transformedItem.name}`);
    res.json(transformedItem);
  } catch (error) {
    console.error('❌ Error updating tech radar item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/tech-radar/:id - Soft delete tech radar item
router.delete('/:id', async (req, res) => {
  try {
    console.log(`🗑️ Deleting tech radar item: ${req.params.id}`);
    
    const { data: deletedItem, error } = await supabase
      .from('tech_radar_items')
      .update({ is_active: false })
      .eq('id', req.params.id)
      .eq('is_active', true)
      .select()
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      return res.status(500).json({ error: 'Failed to delete tech radar item' });
    }

    if (!deletedItem) {
      return res.status(404).json({ error: 'Tech radar item not found' });
    }
    
    console.log(`✅ Successfully deleted tech radar item: ${deletedItem.name}`);
    res.json({ message: 'Tech radar item deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting tech radar item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/tech-radar/:id/history - Get item history
router.get('/:id/history', async (req, res) => {
  try {
    console.log(`📈 Fetching history for tech radar item: ${req.params.id}`);
    
    const { data: history, error } = await supabase
      .from('tech_radar_history')
      .select('*')
      .eq('item_id', req.params.id)
      .order('changed_at', { ascending: false });

    if (error) {
      console.error('❌ Database error:', error);
      return res.status(500).json({ error: 'Failed to fetch item history' });
    }
    
    console.log(`✅ Successfully fetched ${history ? history.length : 0} history entries`);
    res.json(history || []);
  } catch (error) {
    console.error('❌ Error fetching item history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/tech-radar/snapshots - Create radar snapshot
router.post('/snapshots', async (req, res) => {
  try {
    console.log('📸 Creating tech radar snapshot...');
    
    const { name, description } = req.body;
    
    // Get current state of all items
    const { data: items, error: itemsError } = await supabase
      .from('tech_radar_items')
      .select('*')
      .eq('is_active', true);

    if (itemsError) {
      console.error('❌ Database error:', itemsError);
      return res.status(500).json({ error: 'Failed to fetch current radar state' });
    }

    const snapshotData = {
      timestamp: new Date().toISOString(),
      items: items ? items.map(transformDbItem) : [],
      totalItems: items ? items.length : 0
    };

    const { data: snapshot, error } = await supabase
      .from('tech_radar_snapshots')
      .insert([{
        name: name || `Snapshot ${new Date().toLocaleDateString()}`,
        description: description || 'Automated snapshot',
        snapshot_data: JSON.stringify(snapshotData)
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      return res.status(500).json({ error: 'Failed to create snapshot' });
    }
    
    console.log(`✅ Successfully created snapshot: ${snapshot.name}`);
    res.status(201).json(snapshot);
  } catch (error) {
    console.error('❌ Error creating snapshot:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/tech-radar/snapshots - Get all snapshots
router.get('/snapshots', async (req, res) => {
  try {
    console.log('📋 Fetching all tech radar snapshots...');
    
    const { data: snapshots, error } = await supabase
      .from('tech_radar_snapshots')
      .select('id, name, description, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Database error:', error);
      return res.status(500).json({ error: 'Failed to fetch snapshots' });
    }
    
    console.log(`✅ Successfully fetched ${snapshots ? snapshots.length : 0} snapshots`);
    res.json(snapshots || []);
  } catch (error) {
    console.error('❌ Error fetching snapshots:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;