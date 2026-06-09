import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './index.css';
import { T, FONTS } from './tokens';
import { VIEW_META, DEFAULT_NOTES_V2, USERS, DOMAINS, IQ } from './data';
import {
  fetchNotes,
  persistNotes,
  isAdmin,
  NOTES_UPDATED_EVENT,
} from './utils/notesApi';

const AUTH_STORAGE_KEY = 'devatlas_user';

function getSavedUser() {
  try {
    const username = localStorage.getItem(AUTH_STORAGE_KEY);
    if (username && USERS[username]) return username;
    if (username) localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

function saveUser(username) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, username);
  } catch {
    /* ignore */
  }
}

function clearSavedUser() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
import LoginPage    from './components/LoginPage';
import Sidebar      from './components/Sidebar';
import ViewHome     from './views/ViewHome';
import ViewDomains  from './views/ViewDomains';
import ViewNotes    from './views/ViewNotes';
import ViewInterview from './views/ViewInterview';
import ViewProfile  from './views/ViewProfile';

/* ─── Stats Strip ─── */
function StatsStrip({ notes = {} }) {
  const allNotes = Object.entries(notes).flatMap(([slug, arr]) => {
    if (slug.startsWith('_')) return [];
    return arr;
  });
  const total = allNotes.length;
  const completed = allNotes.filter(n => n.status === 'Complete').length;
  const pending = allNotes.filter(n => n.status === 'In Progress' || n.status === 'Pending').length;
  
  const iqCount = IQ.reduce((acc, curr) => acc + (curr.questions?.length || 0), 0);

  const stats = [
    { icon:'📚', value: total, label:'Total Notes',   color:'#00d4ff' },
    { icon:'✅', value: completed, label:'Completed',     color:'#00ffb3' },
    { icon:'⏳', value: pending, label:'Pending',        color:'#ffcc00' },
    { icon:'💬', value: iqCount, label:"Interview Q's", color:'#9b72ff' },
  ];

  return (
    <div className="stats-grid grid grid-cols-4 gap-4 mb-8">
      {stats.map(({ icon, value, label, color }) => (
        <div key={label} className="stat-card relative overflow-hidden"
          style={{ background:T.surface, border:`1px solid ${T.border}`,
            borderRadius:12, padding:'18px 20px', transition:'border-color 0.2s' }}>
          <div style={{ position:'absolute', top:-12, right:-12, width:60, height:60,
            borderRadius:'50%', background:color, opacity:0.08 }} />
          <div style={{ fontSize:20, marginBottom:12 }}>{icon}</div>
          <div className="stat-value" style={{ fontFamily:FONTS.heading, fontWeight:700, fontSize:28, color:T.text,
            lineHeight:1, marginBottom:6 }}>{value}</div>
          <div style={{ fontFamily:FONTS.mono, fontSize:12, color:T.muted }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Text highlighter ─── */
function HighlightText({ text, query }) {
  if (!query || query.length < 2) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} style={{
            background:  'rgba(0,212,255,0.2)',
            color:       T.cyan,
            borderRadius: 3,
            padding:     '0 2px',
            fontStyle:   'normal',
          }}>{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}



const STATUS_STYLE = {
  'Complete':    { bg:'rgba(0,255,179,0.08)',  color:'#00ffb3' },
  'In Progress': { bg:'rgba(0,212,255,0.08)',  color:'#00d4ff' },
  'Pending':     { bg:'rgba(255,204,0,0.08)',  color:'#ffcc00' },
};

/* ─── Search Results View ─── */
function SearchResults({ query, notes, onOpenDrawer, domains = [] }) {
  // Flatten all notes across domains, tagging each with its slug
  const allNotes = Object.entries(notes).flatMap(([slug, arr]) => {
    if (slug.startsWith('_')) return [];
    return arr.map(n => ({ ...n, _slug: slug }));
  });

  const q = query.toLowerCase();
  const results = allNotes.filter(n =>
    n.topic.toLowerCase().includes(q) ||
    n.tags.some(t => t.toLowerCase().includes(q)) ||
    n.preview.toLowerCase().includes(q) ||
    (n.content || '').toLowerCase().includes(q)
  );

  if (results.length === 0) {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', padding:'80px 20px', gap:16 }}>
        <div style={{ fontSize:48 }}>🔍</div>
        <div style={{ fontFamily:"'Clash Display','Outfit',sans-serif", fontSize:20,
          fontWeight:700, color:T.text }}>No results found</div>
        <div style={{ fontFamily:FONTS.body, fontSize:14, color:T.muted }}>
          Try searching for a topic, tag, or keyword
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:20 }}>
        <div style={{ fontFamily:"'Clash Display','Outfit',sans-serif", fontSize:19,
          fontWeight:700, color:T.text, marginBottom:4 }}>
          Results for &ldquo;{query}&rdquo;
        </div>
        <div style={{ fontSize:13, color:T.muted, fontFamily:FONTS.body }}>
          {results.length} result{results.length !== 1 ? 's' : ''} across all domains
        </div>
      </div>

      {/* Cards */}
      {results.map(n => {
        const domObj = domains.find(d => d.slug === n._slug);
        const badge = domObj ? {
          label: domObj.label,
          color: domObj.color,
          bg: `${domObj.color}18`
        } : { label: 'Unknown', color: T.muted, bg: T.surface2 };
        const s     = STATUS_STYLE[n.status] || STATUS_STYLE['Pending'];
        return (
          <div
            key={n.id}
            onClick={() => onOpenDrawer(n)}
            style={{
              background:   T.surface,
              border:       `1px solid ${T.border}`,
              borderRadius: 12,
              padding:      '18px 20px',
              marginBottom: 12,
              cursor:       'pointer',
              transition:   'border-color 0.18s, background 0.18s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = badge.color + '55';
              e.currentTarget.style.background  = T.surface2;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.background  = T.surface;
            }}
          >
            {/* Top row: topic + domain badge */}
            <div style={{ display:'flex', alignItems:'flex-start',
              justifyContent:'space-between', gap:12, marginBottom:10 }}>
              <div style={{
                fontFamily: "'Clash Display','Outfit',sans-serif",
                fontSize:   16,
                fontWeight: 700,
                color:      T.text,
              }}>
                <HighlightText text={n.topic} query={query} />
              </div>
              <span style={{
                fontFamily:   FONTS.mono,
                fontSize:     10,
                padding:      '3px 10px',
                borderRadius: 999,
                background:   badge.bg,
                color:        badge.color,
                whiteSpace:   'nowrap',
                flexShrink:   0,
              }}>
                {badge.label}
              </span>
            </div>

            {/* Tags */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:10 }}>
              {n.tags.map(t => (
                <span key={t} style={{
                  fontFamily:   FONTS.mono,
                  fontSize:     10,
                  padding:      '2px 9px',
                  background:   T.surface3 || T.surface2,
                  border:       `1px solid ${T.border}`,
                  borderRadius: 4,
                  color:        T.muted,
                }}>{t}</span>
              ))}
            </div>

            {/* Preview + status */}
            <div style={{ display:'flex', alignItems:'center',
              justifyContent:'space-between', gap:12 }}>
              <div style={{
                fontSize:       13,
                color:          T.muted,
                display:        '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient:'vertical',
                overflow:       'hidden',
                flex:           1,
              }}>
                <HighlightText text={n.preview} query={query} />
              </div>
              <span style={{
                fontFamily:   FONTS.mono,
                fontSize:     11,
                padding:      '3px 10px',
                borderRadius: 6,
                background:   s.bg,
                color:        s.color,
                whiteSpace:   'nowrap',
                flexShrink:   0,
              }}>
                {n.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Topbar ─── */
function Topbar({ view, searchQuery, setSearchQuery, onMenuOpen }) {
  const isSearching = searchQuery.length >= 2;
  const meta = isSearching
    ? { title:'Search', sub:'Searching across all domains…' }
    : (VIEW_META[view] || VIEW_META.home);

  return (
    <div className="topbar-row">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onMenuOpen}
          aria-label="Open menu"
        >
          ☰
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="topbar-title" style={{ fontFamily:FONTS.heading, fontWeight:700, fontSize:26, color:T.text,
            margin:0, lineHeight:1.1 }}>{meta.title}</h1>
          <p style={{ color:T.muted, fontSize:14, marginTop:6, marginBottom:0 }}>{meta.sub}</p>
        </div>
      </div>

      <div className="topbar-search" style={{
        background:   T.surface,
        border:       `1px solid ${isSearching ? T.cyan + '55' : T.border}`,
        borderRadius: 8,
        padding:      '0 12px',
        transition:   'border-color 0.2s',
      }}>
        <span style={{ fontSize:13, color:T.dim, flexShrink:0 }}>🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search notes..."
          style={{
            background:  'transparent',
            border:      'none',
            outline:     'none',
            fontFamily:  FONTS.mono,
            fontSize:    13,
            color:       T.text,
            padding:     '9px 0',
            width:       '100%',
            caretColor:  T.cyan,
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            title="Clear search"
            style={{
              background:   'none',
              border:       'none',
              cursor:       'pointer',
              color:        T.muted,
              fontSize:     14,
              lineHeight:   1,
              padding:      '2px',
              borderRadius: 3,
              flexShrink:   0,
              transition:   'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = T.pink)}
            onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── View Switcher ─── */
function ViewContent({ view, onNav, user, notes, setNotes, canEditNotes, pendingDrawerNote, clearPendingDrawer, domains, onAddTopic }) {
  const style = {
    minHeight: 200,
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    opacity: 1,
    transform: 'translateY(0)',
  };

  if (view === 'home')           return <div style={style}><ViewHome onNav={onNav} /></div>;
  if (view === 'domains')        return <div style={style}><ViewDomains onNav={onNav} domains={domains} canEdit={canEditNotes} onAddTopic={onAddTopic} /></div>;
  if (view.startsWith('notes-')) return (
    <div style={style}>
      <ViewNotes
        key={view}
        view={view}
        notes={notes}
        setNotes={setNotes}
        canEdit={canEditNotes}
        pendingDrawerNote={pendingDrawerNote}
        clearPendingDrawer={clearPendingDrawer}
        domains={domains}
      />
    </div>
  );
  if (view === 'interview')      return <div style={style}><ViewInterview notes={notes} setNotes={setNotes} canEdit={canEditNotes} /></div>;
  if (view === 'profile')        return <div style={style}><ViewProfile user={user} domains={domains} notes={notes} /></div>;
  return null;
}

/* ─── Dashboard ─── */
function Dashboard({ user, onLogout, notes, setNotes }) {
  const [view,        setView]        = useState(() => {
    return sessionStorage.getItem('devatlas-active-view') || 'home';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileNav,   setMobileNav]   = useState(false);
  const canEditNotes = isAdmin(user);

  // Track the view that was active before search started so we can restore it
  const prevViewRef = useRef('home');

  const isSearching = searchQuery.length >= 2;

  // Sync view state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('devatlas-active-view', view);
    if (!isSearching) prevViewRef.current = view;
  }, [view, isSearching]);

  // When search is cleared, restore the previous view
  const handleSetSearch = useCallback((q) => {
    setSearchQuery(q);
  }, []);

  /* Drawer from search results — we need a shared drawer state here so
     SearchResults can trigger the ViewNotes drawer.
     Simplest approach: open the relevant notes view and let ViewNotes handle it.
     We store a "pending open note" and pass it down to ViewNotes. */
  const [pendingDrawerNote, setPendingDrawerNote] = useState(null);

  const dynamicDomains = useMemo(() => {
    const rawDomains = notes?._domains || DOMAINS || [];
    return rawDomains.map(d => {
      const domNotes = notes?.[d.slug] || [];
      const total = domNotes.length;
      const done = domNotes.filter(n => n.status === 'Complete').length;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      return {
        ...d,
        done,
        total,
        pct
      };
    });
  }, [notes]);

  const SLUG_TO_VIEW = useMemo(() => {
    const mapping = {};
    dynamicDomains.forEach(d => {
      mapping[d.slug] = d.key;
    });
    return mapping;
  }, [dynamicDomains]);

  const handleAddTopic = useCallback((domainId, newTopic) => {
    setNotes(prev => {
      const currentDomains = prev._domains || DOMAINS;
      const updatedDomains = currentDomains.map(d => {
        if (d.id !== domainId) return d;
        if (d.topics.includes(newTopic)) return d;
        return {
          ...d,
          topics: [...d.topics, newTopic],
        };
      });
      return {
        ...prev,
        _domains: updatedDomains
      };
    });
  }, [setNotes]);

  function handleSearchResultClick(note) {
    // Navigate to that domain's notes view, then signal ViewNotes to open drawer
    const targetView = SLUG_TO_VIEW[note._slug] || 'notes-fs';
    setSearchQuery('');         // exit search mode
    setView(targetView);        // switch to that notes view
    setPendingDrawerNote(note); // ViewNotes will consume this
  }

  useEffect(() => {
    setMobileNav(false);
  }, [view]);

  useEffect(() => {
    document.body.style.overflow = mobileNav ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileNav]);

  return (
    <div className="app-shell" style={{ background:T.bg, fontFamily:FONTS.body }}>
      <div
        className={`sidebar-overlay${mobileNav ? ' is-open' : ''}`}
        onClick={() => setMobileNav(false)}
        aria-hidden={!mobileNav}
      />
      <Sidebar
        activeView={view}
        mobileOpen={mobileNav}
        onClose={() => setMobileNav(false)}
        onNav={(v) => { setView(v); setSearchQuery(''); }}
        user={user}
        onLogout={onLogout}
        domains={dynamicDomains}
        notes={notes}
      />
      <main className="app-main">
        <Topbar
          view={view}
          searchQuery={searchQuery}
          setSearchQuery={handleSetSearch}
          onMenuOpen={() => setMobileNav(true)}
          domains={dynamicDomains}
        />
        {view === 'home' && !isSearching && <StatsStrip notes={notes} />}
 
        {isSearching ? (
          <SearchResults
            query={searchQuery}
            notes={notes}
            onOpenDrawer={handleSearchResultClick}
            domains={dynamicDomains}
          />
        ) : (
          <ViewContent
            view={view}
            onNav={setView}
            user={user}
            notes={notes}
            setNotes={setNotes}
            canEditNotes={canEditNotes}
            pendingDrawerNote={pendingDrawerNote}
            clearPendingDrawer={() => setPendingDrawerNote(null)}
            domains={dynamicDomains}
            onAddTopic={handleAddTopic}
          />
        )}
      </main>
    </div>
  );
}

/* ─── App ─── */
export default function App() {
  const savedUser = getSavedUser();

  const [isLoggedIn,  setIsLoggedIn]  = useState(!!savedUser);
  const [currentUser, setCurrentUser] = useState(savedUser || '');
  const [showDash,    setShowDash]    = useState(!!savedUser);
  const [loginVis,    setLoginVis]    = useState(!savedUser);
  /* Shared notebook — stored in src/data/notes-store.json (not localStorage) */
  const [notes, setNotes] = useState(null);
  const [notesLoading, setNotesLoading] = useState(true);

  const reloadSharedNotes = useCallback(async () => {
    setNotes(prev => {
      if (!prev) setNotesLoading(true);
      return prev;
    });
    const data = await fetchNotes(DEFAULT_NOTES_V2);
    setNotes(data);
    setNotesLoading(false);
  }, []);

  useEffect(() => {
    reloadSharedNotes();
  }, [reloadSharedNotes]);

  useEffect(() => {
    const onNotesUpdated = () => reloadSharedNotes();
    window.addEventListener(NOTES_UPDATED_EVENT, onNotesUpdated);
    return () => window.removeEventListener(NOTES_UPDATED_EVENT, onNotesUpdated);
  }, [reloadSharedNotes]);

  useEffect(() => {
    if (isLoggedIn) reloadSharedNotes();
  }, [currentUser, isLoggedIn, reloadSharedNotes]);

  useEffect(() => {
    if (isLoggedIn && notes && notes._users) {
      if (!notes._users[currentUser]) {
        clearSavedUser();
        setIsLoggedIn(false);
        setCurrentUser('');
        setLoginVis(true);
        setShowDash(false);
      }
    }
  }, [notes, isLoggedIn, currentUser]);

  const setNotesShared = useCallback((updater) => {
    setNotes(prev => {
      const base = prev || DEFAULT_NOTES_V2;
      const next = typeof updater === 'function' ? updater(base) : updater;
      if (isAdmin(currentUser)) {
        persistNotes(next).catch(err => {
          window.alert(
            `Could not save notes to project file:\n${err.message}\n\n` +
            'Use npm run dev (not preview) so admin saves write to src/data/notes-store.json.'
          );
        });
      }
      return next;
    });
  }, [currentUser]);

  const handleLogin = (username) => {
    saveUser(username);
    reloadSharedNotes();
    setLoginVis(false);
    setTimeout(() => {
      setIsLoggedIn(true);
      setCurrentUser(username);
      setShowDash(true);
    }, 350);
  };

  const handleLogout = () => {
    clearSavedUser();
    setShowDash(false);
    setTimeout(() => {
      setIsLoggedIn(false);
      setCurrentUser('');
      setLoginVis(true);
    }, 350);
  };

  return (
    <div style={{ position:'relative', minHeight:'100vh' }}>
      {!isLoggedIn && (
        <div style={{
          opacity: loginVis ? 1 : 0,
          transition: 'opacity 0.35s ease',
          position:'absolute', inset:0, zIndex:10,
        }}>
          <LoginPage onLogin={handleLogin} users={notes?._users || USERS} />
        </div>
      )}
      {isLoggedIn && (
        <div style={{ opacity: showDash ? 1 : 0, transition: 'opacity 0.35s ease' }}>
          {notesLoading || !notes ? (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: '60vh', fontFamily: FONTS.mono, color: T.muted, fontSize: 14,
            }}>
              Loading notebook…
            </div>
          ) : (
            <Dashboard
              user={currentUser}
              onLogout={handleLogout}
              notes={notes}
              setNotes={setNotesShared}
            />
          )}
        </div>
      )}
    </div>
  );
}
