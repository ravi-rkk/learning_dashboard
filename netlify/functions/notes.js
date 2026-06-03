import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function handler(event) {
  // GET — fetch all notes
  if (event.httpMethod === 'GET') {
    const { data, error } = await supabase
      .from('notes')
      .select('id, data');
    if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    // Return in your existing notes-store.json shape
    const notes = Object.fromEntries(data.map(row => [row.id, row.data]));
    return { statusCode: 200, body: JSON.stringify(notes) };
  }

  // PUT — save notes (admin only, protected by your existing auth)
  if (event.httpMethod === 'PUT') {
    const notes = JSON.parse(event.body);
    // Upsert each note
    const rows = Object.entries(notes).map(([id, data]) => ({ id, data }));
    const { error } = await supabase.from('notes').upsert(rows);
    if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  return { statusCode: 405, body: 'Method not allowed' };
}