const NOTES_STORAGE_KEY = 'devatlas_notes_v1';

const NOTE_SLUGS = ['full-stack', 'frontend', 'backend', 'devops'];

export function isAdmin(user) {
  return user === 'admin';
}

export function loadNotes(defaultNotes) {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) return defaultNotes;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return defaultNotes;
    for (const slug of NOTE_SLUGS) {
      if (!Array.isArray(parsed[slug])) return defaultNotes;
    }
    return parsed;
  } catch {
    return defaultNotes;
  }
}

export function saveNotes(notes) {
  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch {
    /* private mode / quota */
  }
}

export function clearSavedNotes() {
  try {
    localStorage.removeItem(NOTES_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
