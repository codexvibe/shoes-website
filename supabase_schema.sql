-- Supabase Database Schema for Sneakers Store
-- Automatically generated based on mockData.ts interfaces

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. Categories Table
-- ==========================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_fr TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  desc_fr TEXT,
  desc_ar TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. Sneakers Table
-- ==========================================
CREATE TABLE sneakers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_fr TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  price INTEGER NOT NULL,
  category_slug TEXT REFERENCES categories(slug) ON DELETE SET NULL,
  image TEXT,
  sizes INTEGER[] DEFAULT '{}',
  sizes_stock JSONB DEFAULT '{}'::jsonb,
  colorways TEXT[] DEFAULT '{}',
  desc_fr TEXT,
  desc_ar TEXT,
  featured BOOLEAN DEFAULT false,
  is_hot_drop BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. Wilaya Fees Table
-- ==========================================
CREATE TABLE wilaya_fees (
  id TEXT PRIMARY KEY,
  name_fr TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  fee INTEGER NOT NULL
);

-- ==========================================
-- 4. Leads (Orders) Table
-- ==========================================
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  wilaya_id TEXT REFERENCES wilaya_fees(id) ON DELETE SET NULL,
  status TEXT CHECK (status IN ('todo', 'progress', 'delivered')) DEFAULT 'todo',
  notes TEXT,
  tracking_number TEXT,
  shipping_provider TEXT,
  shipped_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 5. Settings / Contact Config Table
-- ==========================================
CREATE TABLE contact_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  hero_banner TEXT
);

-- Insert initial contact config
INSERT INTO contact_config (id, whatsapp, email) 
VALUES (1, '+213000000000', 'contact@sneakersobsidian.com')
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- 6. Row Level Security (RLS) Policies
-- ==========================================
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sneakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE wilaya_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_config ENABLE ROW LEVEL SECURITY;

-- Categories: Public can read, authenticated (Admin) can write
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Categories are insertable by admins" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Categories are updatable by admins" ON categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Categories are deletable by admins" ON categories FOR DELETE USING (auth.role() = 'authenticated');

-- Sneakers: Public can read, authenticated (Admin) can write
CREATE POLICY "Sneakers are viewable by everyone" ON sneakers FOR SELECT USING (true);
CREATE POLICY "Sneakers are insertable by admins" ON sneakers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Sneakers are updatable by admins" ON sneakers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Sneakers are deletable by admins" ON sneakers FOR DELETE USING (auth.role() = 'authenticated');

-- Wilaya Fees: Public can read, authenticated (Admin) can write
CREATE POLICY "Wilaya fees are viewable by everyone" ON wilaya_fees FOR SELECT USING (true);
CREATE POLICY "Wilaya fees are insertable by admins" ON wilaya_fees FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Wilaya fees are updatable by admins" ON wilaya_fees FOR UPDATE USING (auth.role() = 'authenticated');

-- Leads: Public can INSERT, only authenticated (Admin) can view/update/delete
CREATE POLICY "Leads can be created by anyone" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Leads are viewable by admins only" ON leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Leads are updatable by admins only" ON leads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Leads are deletable by admins only" ON leads FOR DELETE USING (auth.role() = 'authenticated');

-- Contact Config: Public can read, authenticated can update
CREATE POLICY "Contact config viewable by everyone" ON contact_config FOR SELECT USING (true);
CREATE POLICY "Contact config updatable by admins" ON contact_config FOR UPDATE USING (auth.role() = 'authenticated');

-- ==========================================
-- 7. Triggers
-- ==========================================
-- Trigger to automatically update "updated_at" on sneakers table
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sneakers_modtime
BEFORE UPDATE ON sneakers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
