import { T, FONTS } from '../tokens';
import { DOMAINS, RECENT_ACTIVITY } from '../data';

const STATUS_STYLE = {
  'Complete':    { bg:'rgba(0,255,179,0.08)',  color:'#00ffb3', label:'✅ Complete'    },
  'In Progress': { bg:'rgba(0,212,255,0.08)',  color:'#00d4ff', label:'🔄 In Progress' },
  'Pending':     { bg:'rgba(255,204,0,0.08)',  color:'#ffcc00', label:'⏳ Pending'     },
};

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 style={{ fontFamily:FONTS.heading, fontSize:19, fontWeight:700, color:'#e8edf8',
        whiteSpace:'nowrap', margin:0 }}>{children}</h2>
      <div style={{ flex:1, height:1, background:'#1f2538' }} />
    </div>
  );
}

function DomainCard({ domain, onClick }) {
  const { icon, label, subtitle, color, bg, tag, topics, done, total, pct } = domain;
  return (
    <div className="domain-card cursor-pointer"
      onClick={onClick}
      style={{ background:'#0e1018', border:`1px solid #1f2538`, borderRadius:14,
        overflow:'hidden', transition:'all 0.22s' }}>
      {/* Header */}
      <div className="flex items-start gap-4" style={{ padding:'20px 22px 14px' }}>
        <div className="flex items-center justify-center flex-shrink-0"
          style={{ width:44, height:44, borderRadius:10, background:bg, fontSize:22 }}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div style={{ fontFamily:FONTS.heading, fontWeight:700, fontSize:17, color:'#e8edf8', marginBottom:3 }}>
            {label}
          </div>
          <div style={{ fontSize:12, color:'#6b7699' }}>{subtitle}</div>
        </div>
        <span style={{ fontFamily:FONTS.mono, fontSize:10, padding:'3px 10px', borderRadius:999,
          border:`1px solid ${color}`, color, background:`${color}18`, flexShrink:0, marginTop:2 }}>
          {tag}
        </span>
      </div>

      {/* Topics */}
      <div style={{ padding:'0 22px 18px' }}>
        <div className="flex flex-wrap gap-[6px]">
          {topics.map(t => (
            <span key={t} style={{ fontFamily:FONTS.mono, fontSize:11, padding:'4px 10px',
              background:'#141720', border:`1px solid #1f2538`, borderRadius:5, color:'#6b7699' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center" style={{ padding:'10px 22px 12px',
        borderTop:`1px solid #1f2538` }}>
        <span style={{ fontSize:12, color:'#6b7699', whiteSpace:'nowrap' }}>{done}/{total} done</span>
        <div style={{ flex:1, height:4, background:'#1f2538', borderRadius:99, margin:'0 14px' }}>
          <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:99 }} />
        </div>
        <span style={{ fontFamily:FONTS.mono, fontSize:12, color, whiteSpace:'nowrap' }}>{pct}%</span>
      </div>
    </div>
  );
}

export default function ViewHome({ onNav }) {
  return (
    <div>
      <SectionTitle>Learning Domains</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {DOMAINS.map(d => (
          <DomainCard key={d.id} domain={d} onClick={() => onNav(d.key)} />
        ))}
      </div>

      {/* Recent activity */}
      <SectionTitle>Recent Activity</SectionTitle>
      <div style={{ background:'#0e1018', border:`1px solid #1f2538`, borderRadius:14,
        overflow:'hidden', marginBottom:32 }}>
        <div className="flex items-center justify-between" style={{ padding:'16px 20px',
          borderBottom:`1px solid #1f2538` }}>
          <span style={{ fontFamily:FONTS.heading, fontWeight:700, fontSize:15, color:'#e8edf8' }}>
            Recent Notes
          </span>
          <button style={{ fontFamily:FONTS.mono, fontSize:12, padding:'5px 12px', borderRadius:6,
            background:'rgba(0,212,255,0.08)', border:`1px solid #00d4ff`, color:'#00d4ff',
            cursor:'pointer' }}>+ Add Note</button>
        </div>
        <div className="table-scroll">
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'#141720', borderBottom:`1px solid #1f2538` }}>
              {['TOPIC','DOMAIN','STATUS','LAST UPDATED'].map(h => (
                <th key={h} style={{ fontFamily:FONTS.mono, fontSize:10, color:'#3a4060',
                  letterSpacing:'0.08em', padding:'11px 18px', textAlign:'left', fontWeight:500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_ACTIVITY.map((r, i) => {
              const s = STATUS_STYLE[r.status] || STATUS_STYLE['Pending'];
              return (
                <tr key={i} style={{ borderBottom: i < RECENT_ACTIVITY.length-1 ? `1px solid #1f2538` : 'none' }}>
                  <td style={{ padding:'13px 18px', fontSize:13.5, color:'#e8edf8', fontWeight:500 }}>{r.topic}</td>
                  <td style={{ padding:'13px 18px', fontSize:13.5, color:'#6b7699' }}>{r.domain}</td>
                  <td style={{ padding:'13px 18px' }}>
                    <span style={{ fontFamily:FONTS.mono, fontSize:11, padding:'3px 10px', borderRadius:6,
                      background:s.bg, color:s.color }}>{s.label}</span>
                  </td>
                  <td style={{ padding:'13px 18px', fontSize:13.5, color:'#6b7699',
                    fontFamily:FONTS.mono, fontSize:12 }}>{r.updated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
