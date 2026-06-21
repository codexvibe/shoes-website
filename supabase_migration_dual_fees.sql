-- ==========================================
-- Migration: Add dual pricing (domicile & bureau) to wilaya_fees
-- Run this in your Supabase Dashboard -> SQL Editor
-- ==========================================

-- 1. Add the new columns (safe: IF NOT EXISTS)
ALTER TABLE wilaya_fees ADD COLUMN IF NOT EXISTS fee_domicile INTEGER NOT NULL DEFAULT 0;
ALTER TABLE wilaya_fees ADD COLUMN IF NOT EXISTS fee_bureau INTEGER NOT NULL DEFAULT 0;

-- 2. Backfill existing rows: fee_domicile = fee, fee_bureau = fee - 200 (min 200)
UPDATE wilaya_fees SET 
  fee_domicile = fee,
  fee_bureau = GREATEST(fee - 200, 200)
WHERE fee_domicile = 0;

-- 3. Force Supabase to reload its schema cache
NOTIFY pgrst, 'reload schema';
