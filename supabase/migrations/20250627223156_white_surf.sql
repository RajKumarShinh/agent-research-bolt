/*
  # Tech Radar Database Schema

  1. New Tables
    - `tech_radar_items` - Core technology radar items
    - `tech_radar_history` - Movement history tracking
    - `tech_radar_snapshots` - Point-in-time radar states

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users

  3. Features
    - Complete CRUD operations
    - Historical tracking
    - Snapshot management
    - Data integrity constraints
*/

-- Tech Radar Items table
CREATE TABLE IF NOT EXISTS tech_radar_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN (
    'Development', 'Testing', 'DevOps', 'Project Management', 
    'Design', 'Database', 'Infrastructure', 'Security', 
    'Monitoring', 'Communication'
  )),
  status text NOT NULL CHECK (status IN ('Adopt', 'Trial', 'Assess', 'Hold')),
  description text NOT NULL,
  maturity_level text NOT NULL CHECK (maturity_level IN ('Emerging', 'Stable', 'Legacy')),
  website text,
  tags jsonb DEFAULT '[]'::jsonb,
  adoption_level integer NOT NULL DEFAULT 50 CHECK (adoption_level >= 0 AND adoption_level <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid,
  is_active boolean DEFAULT true
);

-- Tech Radar History table for tracking movements
CREATE TABLE IF NOT EXISTS tech_radar_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid NOT NULL REFERENCES tech_radar_items(id) ON DELETE CASCADE,
  previous_status text,
  new_status text NOT NULL,
  previous_adoption_level integer,
  new_adoption_level integer NOT NULL,
  change_reason text,
  changed_at timestamptz DEFAULT now(),
  changed_by uuid
);

-- Tech Radar Snapshots for point-in-time states
CREATE TABLE IF NOT EXISTS tech_radar_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  snapshot_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid
);

-- Enable Row Level Security
ALTER TABLE tech_radar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_radar_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_radar_snapshots ENABLE ROW LEVEL SECURITY;

-- Policies for tech_radar_items
CREATE POLICY "Anyone can read tech radar items"
  ON tech_radar_items
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert tech radar items"
  ON tech_radar_items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update tech radar items"
  ON tech_radar_items
  FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete tech radar items"
  ON tech_radar_items
  FOR DELETE
  USING (true);

-- Policies for tech_radar_history
CREATE POLICY "Anyone can read tech radar history"
  ON tech_radar_history
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert tech radar history"
  ON tech_radar_history
  FOR INSERT
  WITH CHECK (true);

-- Policies for tech_radar_snapshots
CREATE POLICY "Anyone can read tech radar snapshots"
  ON tech_radar_snapshots
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert tech radar snapshots"
  ON tech_radar_snapshots
  FOR INSERT
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tech_radar_items_category ON tech_radar_items(category);
CREATE INDEX IF NOT EXISTS idx_tech_radar_items_status ON tech_radar_items(status);
CREATE INDEX IF NOT EXISTS idx_tech_radar_items_maturity ON tech_radar_items(maturity_level);
CREATE INDEX IF NOT EXISTS idx_tech_radar_items_active ON tech_radar_items(is_active);
CREATE INDEX IF NOT EXISTS idx_tech_radar_items_updated ON tech_radar_items(updated_at);
CREATE INDEX IF NOT EXISTS idx_tech_radar_history_item ON tech_radar_history(item_id);
CREATE INDEX IF NOT EXISTS idx_tech_radar_history_date ON tech_radar_history(changed_at);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_tech_radar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_tech_radar_items_updated_at ON tech_radar_items;
CREATE TRIGGER update_tech_radar_items_updated_at
  BEFORE UPDATE ON tech_radar_items
  FOR EACH ROW
  EXECUTE FUNCTION update_tech_radar_updated_at();

-- Function to track history changes
CREATE OR REPLACE FUNCTION track_tech_radar_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Only track if status or adoption_level changed
  IF OLD.status != NEW.status OR OLD.adoption_level != NEW.adoption_level THEN
    INSERT INTO tech_radar_history (
      item_id,
      previous_status,
      new_status,
      previous_adoption_level,
      new_adoption_level,
      change_reason
    ) VALUES (
      NEW.id,
      OLD.status,
      NEW.status,
      OLD.adoption_level,
      NEW.adoption_level,
      'Updated via application'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to track changes
DROP TRIGGER IF EXISTS track_tech_radar_item_changes ON tech_radar_items;
CREATE TRIGGER track_tech_radar_item_changes
  AFTER UPDATE ON tech_radar_items
  FOR EACH ROW
  EXECUTE FUNCTION track_tech_radar_changes();