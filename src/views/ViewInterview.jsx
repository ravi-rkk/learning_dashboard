import { useState, useMemo } from 'react';
import { T, FONTS } from '../tokens';
import { IQ, IQ_TOPIC_FILTERS } from '../data';

const DIFF_STYLE = {
  Easy:   { bg:'rgba(0,255,179,0.08)',  color:'#00ffb3' },
  Medium: { bg:'rgba(255,204,0,0.08)',  color:'#ffcc00' },
  Hard:   { bg:'rgba(255,77,158,0.08)', color:'#ff4d9e' },
};

const DOMAIN_TABS = ['All', 'Full Stack', 'Frontend', 'Backend', 'DevOps'];

const TOPIC_BY_ID = Object.fromEntries(IQ_TOPIC_FILTERS.map(t => [t.id, t]));

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function countByTopic(questions, topicId) {
  if (topicId === 'all') return questions.length;
  return questions.filter(q => q.topic === topicId).length;
}

const labelStyle = {
  fontFamily: FONTS.mono,
  fontSize: 10,
  color: T.muted,
  letterSpacing: '0.1em',
  display: 'block',
  marginBottom: 6,
};

const fieldStyle = {
  width: '100%',
  background: T.surface,
  border: `1px solid ${T.border2}`,
  borderRadius: 10,
  color: T.text,
  padding: '12px 14px',
  fontFamily: FONTS.body,
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

const selectStyle = {
  ...fieldStyle,
  cursor: 'pointer',
  appearance: 'none',
  paddingRight: 32,
  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%238a99ad'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%3E%3Cpolyline%20points='6%209%2012%2015%2018%209'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  backgroundSize: '14px',
};

function actionBtn(color, bg, border) {
  return {
    fontFamily: FONTS.mono,
    fontSize: 12,
    padding: '8px 18px',
    borderRadius: 8,
    border: `1px solid ${border}`,
    background: bg,
    color,
    cursor: 'pointer',
    transition: 'all 0.15s',
  };
}

export default function ViewInterview({ notes, setNotes, canEdit = false }) {
  const [activeDomain, setActiveDomain] = useState('All');
  const [activeTopic, setActiveTopic]   = useState('all');
  const [mixMode, setMixMode]           = useState(false);
  const [mixTopics, setMixTopics]       = useState(() => new Set());
  const [shuffleMix, setShuffleMix]     = useState(false);
  const [openIdx, setOpenIdx]           = useState(null);

  const [isAdding, setIsAdding]         = useState(false);
  const [editingKey, setEditingKey]     = useState(null);

  const [draftQ, setDraftQ]             = useState('');
  const [draftA, setDraftA]             = useState('');
  const [draftTopic, setDraftTopic]     = useState('');
  const [draftDiff, setDraftDiff]       = useState('Easy');
  const [draftDomain, setDraftDomain]   = useState('Full Stack');

  const questionsData = notes?._iq || IQ;

  const domainQuestions = useMemo(() => {
    const groups = activeDomain === 'All'
      ? questionsData
      : questionsData.filter(g => g.domain === activeDomain);
    return groups.flatMap((g) => {
      const originalGroupIdx = questionsData.findIndex(orig => orig.domain === g.domain);
      return g.questions.map((q, qi) => ({
        ...q,
        domain: g.domain,
        key: `${g.domain}-${originalGroupIdx}-${qi}`,
        domainIdx: originalGroupIdx,
        questionIdx: qi
      }));
    });
  }, [activeDomain, questionsData]);

  const availableTopics = useMemo(() => {
    const set = new Set(domainQuestions.map(q => q.topic).filter(Boolean));
    return IQ_TOPIC_FILTERS.filter(t => t.id === 'all' || set.has(t.id));
  }, [domainQuestions]);

  const filteredQs = useMemo(() => {
    let list = domainQuestions;

    if (mixMode && mixTopics.size > 0) {
      list = list.filter(q => mixTopics.has(q.topic));
      if (shuffleMix) list = shuffleArray(list);
      return list;
    }

    if (activeTopic !== 'all') {
      list = list.filter(q => q.topic === activeTopic);
    }

    return list;
  }, [domainQuestions, activeTopic, mixMode, mixTopics, shuffleMix]);

  function handleTopicClick(topicId) {
    setOpenIdx(null);

    if (topicId === 'mix-toggle') {
      setMixMode(v => !v);
      if (mixMode) setMixTopics(new Set());
      return;
    }

    if (mixMode) {
      if (topicId === 'all') {
        const allIds = availableTopics.filter(t => t.id !== 'all').map(t => t.id);
        setMixTopics(prev => (prev.size === allIds.length ? new Set() : new Set(allIds)));
        return;
      }
      setMixTopics(prev => {
        const next = new Set(prev);
        if (next.has(topicId)) next.delete(topicId);
        else next.add(topicId);
        return next;
      });
      return;
    }

    setActiveTopic(topicId);
    setMixTopics(new Set());
  }

  function handleDomainChange(tab) {
    setActiveDomain(tab);
    setActiveTopic('all');
    setMixTopics(new Set());
    setOpenIdx(null);
  }

  function startEditing(item) {
    setEditingKey(item.key);
    setDraftQ(item.q);
    setDraftA(item.a);
    setDraftTopic(item.topic);
    setDraftDiff(item.diff);
    setDraftDomain(item.domain);
    setIsAdding(false);
  }

  function handleUpdateQuestion(oldDomain, questionIdx, updated) {
    setNotes(prev => {
      const currentIQ = prev._iq || IQ;
      const newQ = {
        topic: updated.topic,
        q:     updated.q,
        diff:  updated.diff,
        a:     updated.a
      };

      let nextIQ = currentIQ.map(g => {
        if (g.domain === oldDomain) {
          if (oldDomain === updated.domain) {
            return {
              ...g,
              questions: g.questions.map((q, idx) => idx === questionIdx ? newQ : q)
            };
          } else {
            return {
              ...g,
              questions: g.questions.filter((_, idx) => idx !== questionIdx)
            };
          }
        }
        if (g.domain === updated.domain) {
          return {
            ...g,
            questions: [newQ, ...g.questions]
          };
        }
        return g;
      });

      if (oldDomain !== updated.domain) {
        const targetExists = nextIQ.some(g => g.domain === updated.domain);
        if (!targetExists) {
          nextIQ = [...nextIQ, { domain: updated.domain, questions: [newQ] }];
        }
      }

      return {
        ...prev,
        _iq: nextIQ
      };
    });
  }

  function handleAddQuestion(domainName, newQuestion) {
    setNotes(prev => {
      const currentIQ = prev._iq || IQ;
      let foundDomain = false;
      let nextIQ = currentIQ.map(g => {
        if (g.domain !== domainName) return g;
        foundDomain = true;
        return {
          ...g,
          questions: [newQuestion, ...g.questions]
        };
      });
      if (!foundDomain) {
        nextIQ = [...nextIQ, { domain: domainName, questions: [newQuestion] }];
      }
      return {
        ...prev,
        _iq: nextIQ
      };
    });
  }

  function handleDeleteQuestion(domainName, questionIdx) {
    if (!window.confirm('Delete this interview question? This cannot be undone.')) return;
    setNotes(prev => {
      const currentIQ = prev._iq || IQ;
      const nextIQ = currentIQ.map(g => {
        if (g.domain !== domainName) return g;
        return {
          ...g,
          questions: g.questions.filter((_, idx) => idx !== questionIdx)
        };
      });
      return {
        ...prev,
        _iq: nextIQ
      };
    });
  }

  const mixLabel = mixMode
    ? (mixTopics.size === 0
      ? 'Pick 2+ topics below'
      : `${mixTopics.size} topics mixed${shuffleMix ? ' · shuffled' : ''}`)
    : null;

  const topicsList = IQ_TOPIC_FILTERS.filter(t => t.id !== 'all');
  const domainsList = ['Full Stack', 'Frontend', 'Backend', 'DevOps'];
  const diffsList = ['Easy', 'Medium', 'Hard'];

  return (
    <div>
      {/* Domain filter */}
      <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.dim, marginBottom: 8 }}>
        Domain
      </div>
      <div className="iq-tabs flex flex-wrap gap-2 mb-5">
        {DOMAIN_TABS.map(tab => {
          const isActive = activeDomain === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleDomainChange(tab)}
              style={{
                fontFamily: FONTS.mono, fontSize: 12, padding: '7px 16px', borderRadius: 8,
                border: `1px solid ${isActive ? T.cyan + '55' : T.border}`,
                background: isActive ? 'rgba(0,212,255,0.1)' : 'transparent',
                color: isActive ? T.cyan : T.muted,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Topic filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: T.dim }}>
          Topic / technology
        </div>
        <div className="flex flex-wrap gap-2">
          {canEdit && (
            <button
              type="button"
              onClick={() => {
                setIsAdding(prev => !prev);
                setEditingKey(null);
                setDraftQ('');
                setDraftA('');
                setDraftTopic(topicsList[0]?.id || 'JavaScript');
                setDraftDiff('Easy');
                setDraftDomain(activeDomain === 'All' ? 'Full Stack' : activeDomain);
              }}
              style={{
                fontFamily: FONTS.mono, fontSize: 11, padding: '5px 12px', borderRadius: 999,
                border: `1px solid rgba(0,255,179,0.4)`,
                background: isAdding ? 'rgba(0,255,179,0.18)' : 'rgba(0,255,179,0.08)',
                color: T.green,
                cursor: 'pointer',
                marginRight: 6,
              }}
            >
              {isAdding ? '✕ Cancel' : '＋ Add Question'}
            </button>
          )}
          <button
            type="button"
            onClick={() => handleTopicClick('mix-toggle')}
            style={{
              fontFamily: FONTS.mono, fontSize: 11, padding: '5px 12px', borderRadius: 999,
              border: `1px solid ${mixMode ? 'rgba(155,114,255,0.5)' : T.border}`,
              background: mixMode ? 'rgba(155,114,255,0.12)' : T.surface2,
              color: mixMode ? T.purple : T.muted,
              cursor: 'pointer',
            }}
          >
            🎲 Mix topics
          </button>
          {mixMode && mixTopics.size > 0 && (
            <button
              type="button"
              onClick={() => { setShuffleMix(v => !v); setOpenIdx(null); }}
              style={{
                fontFamily: FONTS.mono, fontSize: 11, padding: '5px 12px', borderRadius: 999,
                border: `1px solid ${T.border}`,
                background: shuffleMix ? T.surface3 : 'transparent',
                color: T.text, cursor: 'pointer',
              }}
            >
              🔀 Shuffle
            </button>
          )}
        </div>
      </div>

      {mixMode && (
        <p style={{
          fontSize: 13, color: T.muted, margin: '0 0 12px', lineHeight: 1.5,
        }}>
          {mixLabel}. Click <strong style={{ color: T.purple }}>JavaScript</strong>,{' '}
          <strong style={{ color: T.cyan }}>React</strong>, etc. to combine — questions from all selected topics appear together.
        </p>
      )}

      <div className="iq-tabs flex flex-wrap gap-2 mb-6">
        {availableTopics.map(({ id, label, emoji, color }) => {
          const isActive = !mixMode && activeTopic === id;
          const isInMix = mixMode && mixTopics.has(id);
          const count = countByTopic(domainQuestions, id);
          if (id !== 'all' && count === 0) return null;

          return (
            <button
              key={id}
              type="button"
              onClick={() => handleTopicClick(id)}
              style={{
                fontFamily: FONTS.mono, fontSize: 12, padding: '6px 14px', borderRadius: 999,
                border: `1px solid ${isActive || isInMix ? color + '66' : T.border}`,
                background: isActive || isInMix ? `${color}18` : T.surface2,
                color: isActive || isInMix ? color : T.muted,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {emoji} {label} ({count})
            </button>
          );
        })}
      </div>

      {/* Results summary */}
      <div style={{
        fontFamily: FONTS.mono, fontSize: 12, color: T.muted, marginBottom: 16,
        padding: '10px 14px', background: T.surface2, borderRadius: 8,
        border: `1px solid ${T.border}`,
      }}>
        Showing <strong style={{ color: T.text }}>{filteredQs.length}</strong> question{filteredQs.length !== 1 ? 's' : ''}
        {activeDomain !== 'All' && <> in <strong style={{ color: T.cyan }}>{activeDomain}</strong></>}
        {!mixMode && activeTopic !== 'all' && TOPIC_BY_ID[activeTopic] && (
          <> · <strong style={{ color: TOPIC_BY_ID[activeTopic].color }}>{activeTopic}</strong></>
        )}
        {mixMode && mixTopics.size > 0 && (
          <> · mix: {[...mixTopics].join(', ')}</>
        )}
      </div>

      {/* Inline Creation Form */}
      {isAdding && (
        <div
          style={{
            background: T.surface,
            border: `1px solid ${T.green}44`,
            borderRadius: 12,
            marginBottom: 16,
            padding: '20px 22px',
          }}
        >
          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: T.green, letterSpacing: '0.12em', marginBottom: 16 }}>
            CREATE NEW INTERVIEW QUESTION
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>QUESTION TEXT</label>
            <input
              value={draftQ}
              onChange={e => setDraftQ(e.target.value)}
              placeholder="e.g. What is closure in JavaScript?"
              style={fieldStyle}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>ANSWER (HTML SUPPORTED)</label>
            <textarea
              value={draftA}
              onChange={e => setDraftA(e.target.value)}
              placeholder="Explain the answer in detail. Use <strong>bold</strong> or <code>code</code> tags..."
              rows={4}
              style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.55 }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <label style={labelStyle}>DOMAIN</label>
              <select value={draftDomain} onChange={e => setDraftDomain(e.target.value)} style={selectStyle}>
                {domainsList.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>TOPIC</label>
              <select value={draftTopic} onChange={e => setDraftTopic(e.target.value)} style={selectStyle}>
                {topicsList.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>DIFFICULTY</label>
              <select value={draftDiff} onChange={e => setDraftDiff(e.target.value)} style={selectStyle}>
                {diffsList.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => {
                if (!draftQ.trim() || !draftA.trim()) {
                  window.alert('Please fill out both the question and answer.');
                  return;
                }
                handleAddQuestion(draftDomain, {
                  topic: draftTopic,
                  q: draftQ.trim(),
                  diff: draftDiff,
                  a: draftA.trim(),
                });
                setIsAdding(false);
              }}
              style={actionBtn(T.green, 'rgba(0,255,179,0.07)', 'rgba(0,255,179,0.4)')}
            >
              Add Question
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              style={actionBtn(T.muted, T.surface3, T.border)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {filteredQs.length === 0 && !isAdding && (
        <div style={{
          textAlign: 'center', color: T.muted, padding: 48,
          background: T.surface, borderRadius: 12, border: `1px solid ${T.border}`,
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <div style={{ fontFamily: FONTS.heading, fontSize: 18, color: T.text, marginBottom: 8 }}>
            No questions match
          </div>
          <p style={{ fontSize: 13, margin: 0 }}>
            {mixMode
              ? 'Turn on Mix and select at least one topic (e.g. React + JavaScript).'
              : 'Try another topic or set Domain to All.'}
          </p>
        </div>
      )}

      {filteredQs.map((item, idx) => {
        const isOpen = openIdx === idx;
        const isEditing = editingKey === item.key;
        const d = DIFF_STYLE[item.diff] || DIFF_STYLE.Easy;
        const topicMeta = TOPIC_BY_ID[item.topic] || { color: T.muted, emoji: '📌' };

        if (isEditing && canEdit) {
          return (
            <div
              key={item.key}
              style={{
                background: T.surface,
                border: `1px solid ${T.cyan}44`,
                borderRadius: 12,
                marginBottom: 10,
                padding: '20px 22px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: T.cyan, letterSpacing: '0.12em', marginBottom: 16 }}>
                EDIT INTERVIEW QUESTION
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>QUESTION TEXT</label>
                <input
                  value={draftQ}
                  onChange={e => setDraftQ(e.target.value)}
                  placeholder="e.g. What is closure in JavaScript?"
                  style={fieldStyle}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>ANSWER (HTML SUPPORTED)</label>
                <textarea
                  value={draftA}
                  onChange={e => setDraftA(e.target.value)}
                  placeholder="Explain the answer in detail. Use <strong>bold</strong> or <code>code</code> tags..."
                  rows={4}
                  style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.55 }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <div>
                  <label style={labelStyle}>DOMAIN</label>
                  <select value={draftDomain} onChange={e => setDraftDomain(e.target.value)} style={selectStyle}>
                    {domainsList.map(domName => <option key={domName} value={domName}>{domName}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>TOPIC</label>
                  <select value={draftTopic} onChange={e => setDraftTopic(e.target.value)} style={selectStyle}>
                    {topicsList.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>DIFFICULTY</label>
                  <select value={draftDiff} onChange={e => setDraftDiff(e.target.value)} style={selectStyle}>
                    {diffsList.map(diffName => <option key={diffName} value={diffName}>{diffName}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!draftQ.trim() || !draftA.trim()) {
                      window.alert('Please fill out both the question and answer.');
                      return;
                    }
                    handleUpdateQuestion(item.domain, item.questionIdx, {
                      q: draftQ.trim(),
                      a: draftA.trim(),
                      topic: draftTopic,
                      diff: draftDiff,
                      domain: draftDomain,
                    });
                    setEditingKey(null);
                  }}
                  style={actionBtn(T.green, 'rgba(0,255,179,0.07)', 'rgba(0,255,179,0.4)')}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingKey(null)}
                  style={actionBtn(T.muted, T.surface3, T.border)}
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        }

        return (
          <div
            key={item.key}
            style={{
              background: T.surface,
              border: `1px solid ${isOpen ? T.border2 : T.border}`,
              borderRadius: 12, marginBottom: 10, cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
            onClick={() => setOpenIdx(isOpen ? null : idx)}
          >
            <div className="flex items-center gap-3" style={{ padding: '16px 20px' }}>
              <span style={{
                fontFamily: FONTS.mono, fontSize: 11, padding: '2px 8px',
                background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 5,
                color: T.muted, flexShrink: 0,
              }}>
                Q{idx + 1}
              </span>
              <span style={{
                fontFamily: FONTS.mono, fontSize: 10, padding: '2px 8px', borderRadius: 999,
                background: `${topicMeta.color}14`, border: `1px solid ${topicMeta.color}44`,
                color: topicMeta.color, flexShrink: 0,
              }}>
                {topicMeta.emoji} {item.topic}
              </span>
              <span className="flex-1" style={{ fontSize: 14, color: T.text, fontWeight: 500 }}>
                {item.q}
              </span>
              <span style={{
                fontFamily: FONTS.mono, fontSize: 11, padding: '2px 10px',
                borderRadius: 6, background: d.bg, color: d.color, flexShrink: 0,
              }}>
                {item.diff}
              </span>
              {canEdit && (
                <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                  <button
                    type="button"
                    title="Edit Question"
                    onClick={() => startEditing(item)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 14, color: T.muted, padding: '2px 6px', borderRadius: 4,
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.cyan)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    title="Delete Question"
                    onClick={() => handleDeleteQuestion(item.domain, item.questionIdx)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 14, color: T.muted, padding: '2px 6px', borderRadius: 4,
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.pink)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
                  >
                    🗑️
                  </button>
                </div>
              )}
              <span style={{
                color: T.muted, fontSize: 14, flexShrink: 0, marginLeft: 4,
                transition: 'transform 0.2s', display: 'inline-block',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}>
                ▾
              </span>
            </div>
            {isOpen && (
              <div
                style={{
                  padding: '0 20px 18px', fontSize: 13.5, color: T.muted,
                  lineHeight: 1.75, borderTop: `1px solid ${T.border}`, paddingTop: 14,
                }}
                dangerouslySetInnerHTML={{ __html: item.a }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
