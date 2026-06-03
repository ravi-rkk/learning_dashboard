import { useEffect, useState } from 'react';
import { T, FONTS } from '../tokens';

const SKILL_ROWS = [
  { icon:'🌐', label:'Full Stack', pct:65, color:'#00d4ff' },
  { icon:'🎨', label:'Frontend',   pct:80, color:'#00ffb3' },
  { icon:'⚙️',  label:'Backend',   pct:45, color:'#ffcc00' },
  { icon:'🚀', label:'DevOps',     pct:30, color:'#ff4d9e' },
];

const SUMMARY_ROWS = [
  { icon:'🌐', label:'Full Stack', total:12, done:8, pending:4, iq:30, pct:65, color:'#00d4ff' },
  { icon:'🎨', label:'Frontend',   total:10, done:8, pending:2, iq:35, pct:80, color:'#00ffb3' },
  { icon:'⚙️',  label:'Backend',   total:9,  done:4, pending:5, iq:30, pct:45, color:'#ffcc00' },
  { icon:'🚀', label:'DevOps',     total:8,  done:2, pending:6, iq:25, pct:30, color:'#ff4d9e' },
];

export default function ViewProfile({ user }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div>
      {/* Top two-col */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr] gap-6 mb-8">
        {/* Profile card */}
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14,
          padding:'40px 36px', textAlign:'center', minWidth:240 }}>
          <div style={{ width:80, height:80, borderRadius:'50%', margin:'0 auto 18px',
            background:`linear-gradient(135deg, ${T.purple}, ${T.pink})`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:FONTS.heading, fontWeight:700, fontSize:32, color:'#fff' }}>
            {user ? user[0].toUpperCase() : 'A'}
          </div>
          <div style={{ fontFamily:FONTS.heading, fontWeight:700, fontSize:24, color:T.text, marginBottom:6 }}>
            {user ? user.charAt(0).toUpperCase() + user.slice(1) : 'Admin'}
          </div>
          <div style={{ fontSize:14, color:T.muted, marginBottom:12 }}>{user}@devatlas.io</div>
          <span style={{ fontFamily:FONTS.mono, fontSize:12, padding:'5px 16px', borderRadius:999,
            background:T.surface2, border:`1px solid ${T.border}`, color:T.muted,
            marginBottom:10, display:'inline-block' }}>
            DevAtlas member
          </span>
        </div>

        {/* Skill bars */}
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, padding:28 }}>
          <h3 style={{ fontFamily:FONTS.heading, fontWeight:700, fontSize:19, color:T.text, marginBottom:24 }}>
            Domain Progress
          </h3>
          {SKILL_ROWS.map(({ icon, label, pct, color }) => (
            <div key={label} style={{ marginBottom:20 }}>
              <div className="flex justify-between" style={{ marginBottom:8 }}>
                <span style={{ fontSize:14, color:T.text }}>{icon} {label}</span>
                <span style={{ fontFamily:FONTS.mono, fontSize:13, color }}>{pct}%</span>
              </div>
              <div style={{ height:6, background:T.border, borderRadius:99, overflow:'hidden' }}>
                <div className="skill-fill" style={{
                  height:'100%', borderRadius:99, background:color,
                  width: animated ? `${pct}%` : '0%',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary table */}
      <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, overflow:'hidden' }}>
        <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.border}` }}>
          <span style={{ fontFamily:FONTS.heading, fontWeight:700, fontSize:15, color:T.text }}>
            Study Summary
          </span>
        </div>
        <div className="table-scroll">
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:T.surface2, borderBottom:`1px solid ${T.border}` }}>
              {['DOMAIN','TOTAL NOTES','COMPLETED','PENDING','INTERVIEW Q\'S','PROGRESS'].map(h => (
                <th key={h} style={{ fontFamily:FONTS.mono, fontSize:10, color:T.dim,
                  letterSpacing:'0.08em', padding:'11px 18px', textAlign:'left', fontWeight:500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SUMMARY_ROWS.map((r, i) => (
              <tr key={r.label} style={{ borderBottom: i < SUMMARY_ROWS.length-1 ? `1px solid ${T.border}` : 'none' }}>
                <td style={{ padding:'13px 18px', fontSize:13.5, color:T.text }}>{r.icon} {r.label}</td>
                <td style={{ padding:'13px 18px', fontFamily:FONTS.mono, fontSize:13, color:T.muted }}>{r.total}</td>
                <td style={{ padding:'13px 18px', fontFamily:FONTS.mono, fontSize:13, color:'#00ffb3' }}>{r.done}</td>
                <td style={{ padding:'13px 18px', fontFamily:FONTS.mono, fontSize:13, color:'#ffcc00' }}>{r.pending}</td>
                <td style={{ padding:'13px 18px', fontFamily:FONTS.mono, fontSize:13, color:T.muted }}>{r.iq}</td>
                <td style={{ padding:'13px 18px' }}>
                  <span style={{ fontFamily:FONTS.mono, fontSize:12, padding:'3px 12px',
                    borderRadius:6, background:`${r.color}18`, color:r.color, fontWeight:600 }}>{r.pct}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
