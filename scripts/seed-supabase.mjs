import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabase = createClient(
  'https://ixvwdefjcygvrdblslvb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4dndkZWZqY3lndnJkYmxzbHZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDUwMzQ3NCwiZXhwIjoyMDk2MDc5NDc0fQ.W685GlzP0PX_W34in0Wbbv9jXNCgJ8MXyYoZIqMl2D8'
);

const notes = JSON.parse(readFileSync('./src/data/notes-store.json', 'utf-8'));
const rows = Object.entries(notes).map(([id, data]) => ({ id, data }));
const { error } = await supabase.from('notes').upsert(rows);
if (error) console.error(error);
else console.log('Seeded', rows.length, 'notes');