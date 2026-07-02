# Supabase Setup Guide - strategie-vercel

## Overview
This project now uses Supabase for multi-user data synchronization across three new sections:
- **Idées (Ideas)** - Content ideas with images and notes
- **Finances** - Budget tracking and material purchases
- **Vidéos YouTube** - Video production calendar

## Credentials
- URL: `https://yryoizertvsjizptkckf.supabase.co`
- ANON_KEY: Already configured in `.env.local`

## Setup Instructions

### Step 1: Create Tables in Supabase

Go to your Supabase Dashboard:
1. Navigate to SQL Editor
2. Create a new query
3. Copy the entire content from `SQL_TABLES_SETUP.sql`
4. Run the query

This will create:
- `idees` table - Ideas/concepts for videos
- `finances` table - Budget and materials
- `videos_youtube` table - YouTube video planning

### Step 2: Verify Tables

In Supabase Dashboard → Tables, verify you see:
- [ ] `idees`
- [ ] `finances`
- [ ] `videos_youtube`

### Step 3: Test the Application

1. Start the dev server: `npm run dev`
2. Navigate to each tab (Idées, Finance, Vidéo YouTube)
3. Add a new item in any section
4. Check Supabase → Table Editor to verify data is saved

### Step 4: Multi-User Testing

Open the app in two different browser windows/tabs:
1. Add an idea in Window 1
2. Refresh Window 2 - you should see the new idea
3. This confirms real-time multi-user sync capability

## Data Structure

### idees (Ideas Table)
```
- id (auto-generated)
- titre (string) - Idea title
- description (text) - Full description
- type (string) - "Idée générale" or "Vidéo"
- typeContenu (string) - Content type (optional)
- duree (string) - Duration estimate (optional)
- images (array) - Image references
- notes (text) - Additional notes
- created_at (timestamp)
- updated_at (timestamp)
```

### finances (Budget Table)
```
- id (auto-generated)
- article (string) - Product/service name
- quantite (string) - Quantity
- prixUnitaire (string) - Unit price
- statut (string) - Status (À commander, Commandé, Reçu)
- fournisseur (string) - Supplier name
- lien (string) - Link to product
- notes (text) - Additional notes
- created_at (timestamp)
- updated_at (timestamp)
```

### videos_youtube (Videos Table)
```
- id (auto-generated)
- date (string) - Video date (YYYY-MM-DD)
- statut (string) - Status (À faire, En cours, Publié)
- titre (string) - Video title
- miniature (string) - Thumbnail image (base64 or URL)
- description (text) - Video description
- created_at (timestamp)
- updated_at (timestamp)
```

## How Data Sync Works

### On Page Load
1. The app calls Supabase to fetch all data from each table
2. Data is loaded into local React state
3. User can immediately start working (works offline too)

### On Data Change
1. When user modifies an item (edit/add/delete), it updates local state immediately
2. The app then sends the change to Supabase asynchronously
3. No delay - changes are instant in the UI
4. Multi-user sync happens via Supabase - each user fetches fresh data on load

### Multi-User Scenario
- User A adds an idea → Saved to Supabase
- User B's browser has the old data still
- When User B refreshes or reopens the tab → New data loads from Supabase
- Both users always have the latest version

## Troubleshooting

### Data not saving to Supabase?
1. Check browser console for errors
2. Verify `.env.local` has correct credentials
3. Check Supabase Table Editor - ensure tables exist
4. Verify RLS policies are correctly set

### Data not loading on page refresh?
1. Open Supabase Table Editor and verify tables have data
2. Check browser console for fetch errors
3. Test direct Supabase connection in browser console:
   ```javascript
   const { data, error } = await supabase.from('idees').select('*');
   console.log(data, error);
   ```

### Multi-user sync not working?
1. Clear browser cache/localStorage
2. Refresh both browser windows
3. Verify both users are seeing the same Supabase credentials in `.env.local`

## Files Modified

- `app/page.js` - Main component, now with Supabase integration
- `lib/supabase-multi.js` - New file with functions for all 3 tables
- `lib/supabase.js` - Existing plan table (no changes)
- `.env.local` - Already has Supabase credentials

## Next Steps (Optional)

- Add real-time subscriptions with `supabase.realtime()` for instant multi-user updates
- Add user authentication to track who made what changes
- Add timestamps display in the UI
- Add data export to CSV/JSON
