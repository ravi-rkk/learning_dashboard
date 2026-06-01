import { T, FONTS } from '../tokens';

const NAV_SECTIONS = [
  {
    label: 'MAIN',
    items: [
      { id: 'home',      icon: '🏠', label: 'Overview' },
      { id: 'domains',   icon: '🗂', label: 'Domains'  },
    ],
  },
  {
    label: 'NOTES',
    items: [
      { id: 'notes-fs', icon: '🌐', label: 'Full Stack', badge: 30 },
      { id: 'notes-fe', icon: '🎨', label: 'Frontend',   badge: 10 },
      { id: 'notes-be', icon: '⚙️',  label: 'Backend',    badge: 9  },
      { id: 'notes-do', icon: '🚀', label: 'DevOps',     badge: 8  },
    ],
  },
  {
    label: 'TOOLS',
    items: [
      { id: 'interview', icon: '💬', label: 'Interview Q&A' },
      { id: 'profile',   icon: '👤', label: 'My Progress'   },
    ],
  },
];

export default function Sidebar({ activeView, onNav, user, onLogout, mobileOpen, onClose }) {
  function handleNav(id) {
    onNav(id);
    onClose?.();
  }

  return (
    <aside
      className={`app-sidebar flex flex-col${mobileOpen ? ' is-open' : ''}`}
      style={{
        background: T.surface,
        borderRight: `1px solid ${T.border}`,
        height: '100vh',
        height: '100dvh',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-5"
        style={{ borderBottom: `1px solid ${T.border}` }}>
        <div className="flex items-center justify-center"
          style={{
            width: 34, height: 34, borderRadius: 8,
            background: `linear-gradient(135deg, ${T.cyan}, ${T.purple})`,
            fontSize: 18, flexShrink: 0,
          }}>
          📚
        </div>
        <div className="flex-1 min-w-0">
          <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: 18, color: T.text, lineHeight: 1.1 }}>
            DevAtlas
          </div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: T.muted, marginTop: 3, lineHeight: 1.3 }}>
            Developer Learning Hub
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV_SECTIONS.map(({ label, items }) => (
          <div key={label} style={{ marginBottom: 20 }}>
            <div style={{
              fontFamily: FONTS.mono, fontSize: 10, color: T.dim,
              letterSpacing: '0.1em', padding: '0 10px', marginBottom: 6,
            }}>
              {label}
            </div>
            {items.map(({ id, icon, label: lbl, badge }) => {
              const isActive = activeView === id;
              return (
                <button
                  key={id}
                  id={`nav-${id}`}
                  type="button"
                  onClick={() => handleNav(id)}
                  className="nav-item w-full flex items-center gap-2 text-left"
                  style={{
                    padding: '9px 10px', borderRadius: 8, marginBottom: 2, border: 'none', cursor: 'pointer',
                    background: isActive ? 'rgba(0,212,255,0.08)' : 'transparent',
                    color: isActive ? T.cyan : T.muted,
                    fontFamily: FONTS.body, fontSize: 13, fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.15s',
                  }}
                >
                  <span>{icon}</span>
                  <span className="flex-1">{lbl}</span>
                  {badge !== undefined && (
                    <span style={{
                      fontFamily: FONTS.mono, fontSize: 10, padding: '1px 7px', borderRadius: 999,
                      background: isActive ? 'rgba(0,212,255,0.12)' : T.surface3,
                      border: `1px solid ${isActive ? T.cyan : T.border}`,
                      color: isActive ? T.cyan : T.muted,
                    }}>
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-3 px-4 py-4"
        style={{ borderTop: `1px solid ${T.border}` }}>
        <div className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 34, height: 34, borderRadius: '50%',
            background: `linear-gradient(135deg, ${T.purple}, ${T.pink})`,
            fontFamily: FONTS.heading, fontWeight: 700, fontSize: 15, color: '#fff',
          }}>
          {user ? user[0].toUpperCase() : 'A'}
        </div>
        <div className="flex-1 min-w-0">
          <div style={{
            fontFamily: FONTS.body, fontWeight: 700, fontSize: 13, color: T.text,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {user}
          </div>
          <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.muted }}>Developer</div>
        </div>
        <button id="logout-btn" type="button" onClick={onLogout}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', color: T.muted,
            fontSize: 16, padding: 4, borderRadius: 6, transition: 'color 0.15s',
          }}
          title="Logout"
          onMouseEnter={e => (e.target.style.color = T.pink)}
          onMouseLeave={e => (e.target.style.color = T.muted)}
        >
          ↪
        </button>
      </div>
    </aside>
  );
}
