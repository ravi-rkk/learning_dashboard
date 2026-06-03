import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DOMAINS, FULL_STACK_STACKS } from '../data';
import NotesView from '../components/NotesView';
import NoteReader from '../components/NoteReader';
import FullStackStacks from '../components/FullStackStacks';

const VIEW_TO_DOMAIN = {
  'notes-fs': { slug:'full-stack', id:'fs' },
  'notes-fe': { slug:'frontend',   id:'fe' },
  'notes-be': { slug:'backend',    id:'be' },
  'notes-do': { slug:'devops',     id:'do' },
};

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

export default function ViewNotes({ view, notes, setNotes, canEdit = false, pendingDrawerNote, clearPendingDrawer }) {
  const [editMode,       setEditMode]       = useState(false);
  const [readingNote,    setReadingNote]    = useState(null);
  const [readerEditMode, setReaderEditMode] = useState(false);
  const [selectedStack,  setSelectedStack]  = useState(null);

  const mapping  = VIEW_TO_DOMAIN[view] || VIEW_TO_DOMAIN['notes-fs'];
  const { slug, id } = mapping;
  const isFullStack = view === 'notes-fs';
  const allDomNotes = (notes && notes[slug]) || [];
  const dom      = DOMAINS.find(d => d.id === id) || DOMAINS[0];

  const stackMeta = isFullStack && selectedStack
    ? FULL_STACK_STACKS.find(s => s.id === selectedStack)
    : null;

  const domNotes = isFullStack && selectedStack
    ? allDomNotes.filter(n => (n.stack || 'react') === selectedStack)
    : allDomNotes;

  const indexOrder = buildIndexOrder(domNotes);

  useEffect(() => {
    setReadingNote(null);
    setReaderEditMode(false);
    setEditMode(false);
    if (view !== 'notes-fs') setSelectedStack(null);
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
      [slug]: prev[slug].filter(n => n.id !== noteId),
    }));
    if (readingNote?.id === noteId) closeReader();
  }

  function addNote() {
    if (!canEdit) return;
    const blank = {
      id:        Date.now().toString(),
      stack:     isFullStack ? (selectedStack || 'react') : undefined,
      topic:     '',
      tags:      [],
      status:    'Pending',
      preview:   '',
      content:   '',
      images:    [],
      updatedAt: 'just now',
    };
    setNotes(prev => ({ ...prev, [slug]: [...prev[slug], blank] }));
    if (!editMode) setEditMode(true);
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
