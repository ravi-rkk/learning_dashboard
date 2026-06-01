import { T, FONTS } from '../tokens';

const HEADING = "'Clash Display', 'Outfit', sans-serif";

function stackNotes(notes, stackId) {
  return notes.filter(n => (n.stack || 'react') === stackId);
}

export default function FullStackStacks({ stacks, notes, domain, onSelectStack }) {
  return (
    <div>
      <div className="mb-6">
        <div style={{
          fontFamily: FONTS.mono, fontSize: 10, color: T.cyan,
          letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4,
        }}>
          {domain.icon} FULL STACK
        </div>
        <h1 style={{
          fontFamily: HEADING, fontSize: 24, fontWeight: 700,
          color: T.text, margin: '0 0 8px', lineHeight: 1.2,
        }}>
          Choose a technology
        </h1>
        <p style={{ fontSize: 14, color: T.muted, margin: 0, lineHeight: 1.5 }}>
          Pick a stack below to open its notebook index — topics, notes, and progress live inside each card.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stacks.map(stack => {
          const list = stackNotes(notes, stack.id);
          const done = list.filter(n => n.status === 'Complete').length;
          const pct = list.length ? Math.round((done / list.length) * 100) : 0;

          return (
            <button
              key={stack.id}
              type="button"
              onClick={() => onSelectStack(stack.id)}
              className="text-left w-full"
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 14,
                padding: '22px 20px',
                cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = stack.color;
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = `0 12px 32px ${stack.color}22`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: stack.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26,
                }}>
                  {stack.icon}
                </div>
                <span style={{
                  fontFamily: FONTS.mono, fontSize: 11, color: stack.color,
                }}>
                  Open →
                </span>
              </div>

              <div style={{
                fontFamily: HEADING, fontSize: 18, fontWeight: 700,
                color: T.text, marginBottom: 6,
              }}>
                {stack.label}
              </div>

              <p style={{
                fontSize: 13, color: T.muted, lineHeight: 1.5,
                margin: '0 0 14px',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {stack.description}
              </p>

              <div className="flex items-center justify-between gap-2">
                <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.dim }}>
                  {list.length} topics · {done} done
                </span>
                <span style={{
                  fontFamily: FONTS.mono, fontSize: 12, fontWeight: 600,
                  color: stack.color,
                }}>
                  {pct}%
                </span>
              </div>

              <div style={{
                marginTop: 10, height: 4, background: T.border,
                borderRadius: 99, overflow: 'hidden',
              }}>
                <div style={{
                  width: `${pct}%`, height: '100%',
                  background: stack.color, borderRadius: 99,
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
