import { T, FONTS } from '../tokens';
import { DOMAINS } from '../data';

function DomainCard({ domain, onClick }) {
  const { icon, label, subtitle, color, bg, tag, topics, done, total, pct } = domain;
  return (
    <div className="domain-card cursor-pointer"
      onClick={onClick}
      style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14,
        overflow:'hidden', transition:'all 0.22s' }}>
      <div className="flex items-start gap-4" style={{ padding:'20px 22px 14px' }}>
        <div className="flex items-center justify-center flex-shrink-0"
          style={{ width:44, height:44, borderRadius:10, background:bg, fontSize:22 }}>{icon}</div>
        <div className="flex-1 min-w-0">
          <div style={{ fontFamily:FONTS.heading, fontWeight:700, fontSize:17, color:T.text, marginBottom:3 }}>{label}</div>
          <div style={{ fontSize:12, color:T.muted }}>{subtitle}</div>
        </div>
        <span style={{ fontFamily:FONTS.mono, fontSize:10, padding:'3px 10px', borderRadius:999,
          border:`1px solid ${color}`, color, background:`${color}18`, flexShrink:0, marginTop:2 }}>{tag}</span>
      </div>
      <div style={{ padding:'0 22px 18px' }}>
        <div className="flex flex-wrap gap-[6px]">
          {topics.map(t => (
            <span key={t} style={{ fontFamily:FONTS.mono, fontSize:11, padding:'4px 10px',
              background:T.surface2, border:`1px solid ${T.border}`, borderRadius:5, color:T.muted }}>{t}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center" style={{ padding:'10px 22px 12px', borderTop:`1px solid ${T.border}` }}>
        <span style={{ fontSize:12, color:T.muted, whiteSpace:'nowrap' }}>{done}/{total} done</span>
        <div style={{ flex:1, height:4, background:T.border, borderRadius:99, margin:'0 14px' }}>
          <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:99 }} />
        </div>
        <span style={{ fontFamily:FONTS.mono, fontSize:12, color, whiteSpace:'nowrap' }}>{pct}%</span>
      </div>
    </div>
  );
}

export default function ViewDomains({ onNav }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DOMAINS.map(d => (
          <DomainCard key={d.id} domain={d} onClick={() => onNav(d.key)} />
        ))}
      </div>
    </div>
  );
}
