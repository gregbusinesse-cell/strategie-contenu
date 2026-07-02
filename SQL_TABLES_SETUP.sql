-- SQL Setup for strategie-vercel Supabase tables
-- Run these in your Supabase SQL editor to create the required tables

-- Table: idees (Ideas)
CREATE TABLE IF NOT EXISTS idees (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  titre TEXT,
  description TEXT,
  type TEXT DEFAULT 'Idée générale',
  typeContenu TEXT,
  duree TEXT,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: finances (Budget & Materials)
CREATE TABLE IF NOT EXISTS finances (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  article TEXT,
  quantite TEXT,
  prixUnitaire TEXT,
  statut TEXT DEFAULT 'À commander',
  fournisseur TEXT,
  lien TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: videos_youtube (YouTube Videos)
CREATE TABLE IF NOT EXISTS videos_youtube (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  date TEXT,
  statut TEXT DEFAULT 'À faire',
  titre TEXT,
  miniature TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security) for public access
ALTER TABLE idees ENABLE ROW LEVEL SECURITY;
ALTER TABLE finances ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos_youtube ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (anon key)
CREATE POLICY "Allow anon to read idees" ON idees FOR SELECT USING (true);
CREATE POLICY "Allow anon to insert idees" ON idees FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon to update idees" ON idees FOR UPDATE USING (true);
CREATE POLICY "Allow anon to delete idees" ON idees FOR DELETE USING (true);

CREATE POLICY "Allow anon to read finances" ON finances FOR SELECT USING (true);
CREATE POLICY "Allow anon to insert finances" ON finances FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon to update finances" ON finances FOR UPDATE USING (true);
CREATE POLICY "Allow anon to delete finances" ON finances FOR DELETE USING (true);

CREATE POLICY "Allow anon to read videos_youtube" ON videos_youtube FOR SELECT USING (true);
CREATE POLICY "Allow anon to insert videos_youtube" ON videos_youtube FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon to update videos_youtube" ON videos_youtube FOR UPDATE USING (true);
CREATE POLICY "Allow anon to delete videos_youtube" ON videos_youtube FOR DELETE USING (true);
