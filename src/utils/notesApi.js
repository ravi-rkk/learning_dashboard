export const NOTES_UPDATED_EVENT = 'devatlas-notes-updated';

export function isAdmin(user) {
  return user === 'admin';
}

/** Load notebook from project file (dev API) or static copy */
export async function fetchNotes(fallback) {
  try {
    const res = await fetch('/api/notes', { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch {
    /* dev server not running */
  }

  try {
    const res = await fetch('/notes-store.json', { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch {
    /* ignore */
  }

  return fallback;
}

/** Admin: write notebook to src/data/notes-store.json (+ public copy) */
export async function persistNotes(notes) {
  const res = await fetch('/api/notes', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(notes, null, 2),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Save failed (${res.status})`);
  }

  window.dispatchEvent(new CustomEvent(NOTES_UPDATED_EVENT));
  return true;
}
