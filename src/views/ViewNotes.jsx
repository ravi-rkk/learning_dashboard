import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DOMAINS, FULL_STACK_STACKS } from '../data';
import NotesView from '../components/NotesView';
import NoteReader from '../components/NoteReader';
import FullStackStacks from '../components/FullStackStacks';

const INDEX_STATUS_ORDER = ['Complete', 'In Progress', 'Pending'];

function buildIndexOrder(notes) {
  const ordered = [];
  INDEX_STATUS_ORDER.forEach(status => {
    notes.filter(n => n.status === status).forEach(n => ordered.push(n));
  });
  const indexed = new Set(ordered.map(n => n.id));
  notes.filter(n => !indexed.has(n.id)).forEach(n => ordered.push(n));
  return ordered;
}

export default function ViewNotes({ view, notes, setNotes, canEdit = false, pendingDrawerNote, clearPendingDrawer, domains = [] }) {
  const dom = domains.find(d => d.key === view) || domains[0] || DOMAINS[0];
  const slug = dom?.slug || 'full-stack';
  const id = dom?.id || 'fs';
  const isFullStack = view === 'notes-fs';
  const allDomNotes = (notes && notes[slug]) || [];

  const [editMode,       setEditMode]       = useState(false);
  const [readingNote,    setReadingNote]    = useState(() => {
    try {
      const saved = sessionStorage.getItem('devatlas-active-note');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed._slug === slug) {
          return allDomNotes.find(n => n.id === parsed.id) || parsed;
        }
      }
    } catch {}
    return null;
  });
  const [readerEditMode, setReaderEditMode] = useState(() => {
    return sessionStorage.getItem('devatlas-active-note-edit') === 'true';
  });
  const [selectedStack,  setSelectedStack]  = useState(null);

  useEffect(() => {
    if (readingNote) {
      sessionStorage.setItem('devatlas-active-note', JSON.stringify({ id: readingNote.id, _slug: slug }));
      sessionStorage.setItem('devatlas-active-note-edit', String(readerEditMode));
    } else {
      sessionStorage.removeItem('devatlas-active-note');
      sessionStorage.removeItem('devatlas-active-note-edit');
    }
  }, [readingNote, readerEditMode, slug]);

  const prevViewRef = import.meta.env ? useState(() => view)[0] : view; // A simple way to keep initial view
  const activeViewRef = { current: prevViewRef };

  const stackMeta = isFullStack && selectedStack
    ? FULL_STACK_STACKS.find(s => s.id === selectedStack)
    : null;

  const domNotes = isFullStack && selectedStack
    ? allDomNotes.filter(n => (n.stack || 'react') === selectedStack)
    : allDomNotes;

  const indexOrder = buildIndexOrder(domNotes);

  useEffect(() => {
    // Only reset if view changes to a different tab after initial mount
    if (sessionStorage.getItem('devatlas-prev-view') !== view) {
      setReadingNote(null);
      setReaderEditMode(false);
      setEditMode(false);
      if (view !== 'notes-fs') setSelectedStack(null);
    }
    sessionStorage.setItem('devatlas-prev-view', view);
  }, [view]);

  useEffect(() => {
    if (!canEdit) {
      setEditMode(false);
      setReaderEditMode(false);
    }
  }, [canEdit]);

  /* Keep open reader in sync with saved notes (after save / refresh in parent state) */
  useEffect(() => {
    if (!readingNote || readerEditMode) return;
    const fresh = allDomNotes.find(n => n.id === readingNote.id);
    if (fresh && fresh.updatedAt !== readingNote.updatedAt) {
      setReadingNote(fresh);
    }
  }, [allDomNotes, readingNote?.id, readingNote?.updatedAt, readerEditMode]);

  useEffect(() => {
    if (pendingDrawerNote) {
      if (pendingDrawerNote.stack) setSelectedStack(pendingDrawerNote.stack);
      setReadingNote(pendingDrawerNote);
      setReaderEditMode(false);
      clearPendingDrawer?.();
    }
  }, [pendingDrawerNote]); // eslint-disable-line

  const selectedIndex = readingNote
    ? indexOrder.findIndex(n => n.id === readingNote.id)
    : -1;

  const indexMeta = selectedIndex >= 0 ? {
    num:   String(selectedIndex + 1).padStart(2, '0'),
    total: indexOrder.length,
    hasPrev: selectedIndex > 0,
    hasNext: selectedIndex < indexOrder.length - 1,
  } : null;

  function openNote(note, startInEdit = false) {
    setReadingNote(note);
    setReaderEditMode(canEdit && startInEdit);
  }

  function closeReader() {
    setReadingNote(null);
    setReaderEditMode(false);
  }

  function saveNoteFields(noteId, fields) {
    if (!canEdit) return;

    const normalized = {
      ...fields,
      updatedAt: 'just now',
    };
    if ('images' in normalized) {
      normalized.images = Array.isArray(normalized.images) ? normalized.images : [];
    }

    let savedNote = null;

    setNotes(prev => {
      const next = {
        ...prev,
        [slug]: prev[slug].map(n => {
          if (n.id !== noteId) return n;
          savedNote = { ...n, ...normalized };
          return savedNote;
        }),
      };
      return next;
    });

    if (savedNote) {
      setReadingNote(savedNote);
    }
  }

  function patchNote(noteId, field, val) {
    if (!canEdit) return;
    setNotes(prev => {
      const next = {
        ...prev,
        [slug]: prev[slug].map(n => {
          if (n.id !== noteId) return n;
          const updated = { ...n, [field]: val, updatedAt: 'just now' };
          if (readingNote?.id === noteId) setReadingNote(updated);
          return updated;
        }),
      };
      return next;
    });
  }

  function deleteNote(noteId) {
    if (!canEdit) return;
    setNotes(prev => ({
      ...prev,
      [slug]: (prev[slug] || []).filter(n => n.id !== noteId),
    }));
    if (readingNote?.id === noteId) closeReader();
  }

  function addNote() {
    if (!canEdit) return;
    const newId = Date.now().toString();
    const blank = {
      id:        newId,
      stack:     isFullStack ? (selectedStack || 'react') : undefined,
      topic:     'New Topic',
      tags:      [],
      status:    'Pending',
      preview:   '',
      content:   '',
      images:    [],
      updatedAt: 'just now',
    };
    setNotes(prev => ({ ...prev, [slug]: [...(prev[slug] || []), blank] }));
    setReadingNote(blank);
    setReaderEditMode(true);
  }

  function toggleEdit() {
    if (!canEdit) return;
    setEditMode(v => !v);
  }

  function goToAdjacent(delta) {
    if (selectedIndex < 0) return;
    const next = indexOrder[selectedIndex + delta];
    if (next) openNote(next, false);
  }

  const readerDomain = stackMeta
    ? { ...dom, label: stackMeta.label, icon: stackMeta.icon, color: stackMeta.color }
    : dom;

  const reader = readingNote ? (
    <NoteReader
      key={`${readingNote.id}-${readingNote.updatedAt}`}
      note={readingNote}
      domain={readerDomain}
      indexMeta={indexMeta}
      onBack={closeReader}
      onPrev={() => goToAdjacent(-1)}
      onNext={() => goToAdjacent(1)}
      onSaveNote={saveNoteFields}
      onDeleteNote={canEdit ? () => deleteNote(readingNote.id) : undefined}
      canEdit={canEdit}
      initialEditMode={readerEditMode}
    />
  ) : null;

  if (isFullStack && !selectedStack && !readingNote) {
    return (
      <>
        {reader && createPortal(reader, document.body)}
        <FullStackStacks
          stacks={FULL_STACK_STACKS}
          notes={allDomNotes}
          domain={dom}
          onSelectStack={setSelectedStack}
        />
      </>
    );
  }

  return (
    <>
      {reader && createPortal(reader, document.body)}
      <NotesView
        domain={dom}
        stackMeta={stackMeta}
        onBackToStacks={isFullStack && selectedStack ? () => setSelectedStack(null) : undefined}
        notes={domNotes}
        canEdit={canEdit}
        editMode={editMode}
        onToggleEdit={toggleEdit}
        onAddNote={addNote}
        onViewNote={note => openNote(note, false)}
        onEditNote={canEdit ? note => openNote(note, true) : undefined}
        onPatchNote={patchNote}
        onDeleteNote={deleteNote}
      />
    </>
  );
}
