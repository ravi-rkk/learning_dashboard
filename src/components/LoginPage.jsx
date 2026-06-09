import { useState } from 'react';
import { T, FONTS } from '../tokens';
import { USERS } from '../data';

export default function LoginPage({ onLogin, users = USERS }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [inputErr, setInputErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users[username] && users[username] === password) {
      setError('');
      onLogin(username);
    } else {
      setError('Invalid username or password. Try the demo credentials below.');
      setInputErr(true);
      setTimeout(() => setInputErr(false), 1500);
    }
  };

  const inputStyle = (err) => ({
    background: T.surface,
    border: `1px solid ${err ? T.pink : T.border}`,
    borderRadius: 10,
    color: T.text,
    padding: '11px 14px',
    width: '100%',
    fontFamily: FONTS.body,
    fontSize: 14,
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: err ? `0 0 0 3px rgba(255,77,158,0.15)` : 'none',
  });

  return (
    <div className="login-shell" style={{ background: T.bg, fontFamily: FONTS.body }}>
      <div className="login-panel-left login-hide-mobile relative flex flex-col justify-between overflow-hidden"
        style={{ background: T.surface, borderRight: `1px solid ${T.border}` }}>
        {/* Glows */}
        <div style={{ position:'absolute', top:-80, left:-80, width:360, height:360,
          background:'radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, right:-80, width:360, height:360,
          background:'radial-gradient(circle, rgba(155,114,255,0.18) 0%, transparent 70%)', pointerEvents:'none' }} />

        {/* Content */}
        <div className="flex flex-col justify-center flex-1 px-16 py-12 relative z-10">
          <p style={{ fontFamily:FONTS.mono, fontSize:12, color:T.cyan, letterSpacing:'0.08em', marginBottom:24 }}>
            // DEVELOPER LEARNING HUB
          </p>
          <h1 style={{
            fontFamily: FONTS.heading, fontSize: 64, fontWeight: 800, lineHeight: 1,
            background: `linear-gradient(135deg, ${T.text} 0%, ${T.cyan} 100%)`,
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:20,
          }}>DevAtlas</h1>
          <p style={{ color: T.muted, fontSize: 15, lineHeight: 1.7, maxWidth: 380, marginBottom: 36 }}>
            Your developer learning hub for full-stack, frontend, backend, and DevOps. Notes, interview prep, and progress — mapped in one place.
          </p>

          {/* Domain pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {['🌐 Full Stack','🎨 Frontend','⚙️ Backend','🚀 DevOps'].map(p => (
              <span key={p} className="domain-pill cursor-default transition-all-fast"
                style={{ fontFamily:FONTS.mono, fontSize:12, padding:'6px 14px', borderRadius:999,
                  border:`1px solid ${T.border2}`, background:T.surface2, color:T.muted,
                  transition:'all 0.2s' }}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="absolute bottom-0 left-0 right-0 flex gap-10 px-16 py-8"
          style={{ borderTop: `1px solid ${T.border}` }}>
          {[['120+','Notes'],['4','Domains'],['120','Interview Q\'s']].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:FONTS.heading, fontSize:28, fontWeight:700, color:T.text }}>{n}</div>
              <div style={{ fontFamily:FONTS.mono, fontSize:11, color:T.muted, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-panel-right flex flex-col justify-center px-12 py-12"
        style={{ background:T.bg, minHeight:'100vh' }}>
        <div style={{ maxWidth:360, width:'100%', margin:'0 auto' }}>
          <h2 style={{ fontFamily:FONTS.heading, fontSize:30, fontWeight:700, color:T.text, marginBottom:6 }}>
            Welcome back
          </h2>
          <p style={{ color:T.muted, fontSize:14, marginBottom:36 }}>
            Sign in to access your learning hub.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom:20 }}>
              <label style={{ fontFamily:FONTS.mono, fontSize:11, color:T.muted, letterSpacing:'0.1em', display:'block', marginBottom:8 }}>
                USERNAME
              </label>
              <input
                id="login-username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={inputStyle(inputErr)}
                onFocus={e => { e.target.style.borderColor = T.cyan; e.target.style.boxShadow = `0 0 0 3px rgba(0,212,255,0.12)`; }}
                onBlur={e => { e.target.style.borderColor = inputErr ? T.pink : T.border; e.target.style.boxShadow = 'none'; }}
              />
              <p style={{ fontFamily:FONTS.mono, fontSize:11, color:T.dim, marginTop:5 }}>Your account username</p>
            </div>

            {/* Password */}
            <div style={{ marginBottom:28 }}>
              <label style={{ fontFamily:FONTS.mono, fontSize:11, color:T.muted, letterSpacing:'0.1em', display:'block', marginBottom:8 }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    ...inputStyle(inputErr),
                    paddingRight: 44,
                  }}
                  onFocus={e => { e.target.style.borderColor = T.cyan; e.target.style.boxShadow = `0 0 0 3px rgba(0,212,255,0.12)`; }}
                  onBlur={e => { e.target.style.borderColor = inputErr ? T.pink : T.border; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: T.muted,
                    fontSize: 18,
                    lineHeight: 1,
                    padding: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.cyan)}
                  onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              <p style={{ fontFamily:FONTS.mono, fontSize:11, color:T.dim, marginTop:5 }}>Minimum 6 characters</p>
            </div>

            {/* Error */}
            {error && (
              <div style={{ background:'rgba(255,77,158,0.08)', border:`1px solid ${T.pink}`,
                borderRadius:8, padding:'10px 14px', marginBottom:16, color:T.pink,
                fontSize:13, fontFamily:FONTS.body }}>
                ⚠ {error}
              </div>
            )}

            <button id="login-btn" type="submit" className="login-btn w-full"
              style={{ background:T.cyan, color:T.bg, fontFamily:FONTS.heading,
                fontWeight:700, fontSize:16, border:'none', borderRadius:10,
                padding:'13px 0', cursor:'pointer', transition:'all 0.2s', marginBottom:28 }}>
              Sign In →
            </button>
          </form>

          {/* Demo credentials */}
          <div style={{ border:`1px dashed ${T.border2}`, background:T.surface,
            borderRadius:10, padding:'16px 18px' }}>
            <p style={{ fontFamily:FONTS.mono, fontSize:11, color:T.yellow,
              letterSpacing:'0.08em', marginBottom:10 }}>DEMO CREDENTIALS</p>
            {Object.entries(users).map(([u,p]) => (
              <div key={u} className="flex justify-between" style={{ marginBottom:6, fontSize:13 }}>
                <span style={{ fontFamily:FONTS.mono, color:T.muted }}>{u}</span>
                <span style={{ fontFamily:FONTS.mono, color:T.dim }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
