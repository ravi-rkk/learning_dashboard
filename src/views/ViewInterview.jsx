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

export default function ViewInterview() {
  const [activeDomain, setActiveDomain] = useState('All');
  const [activeTopic, setActiveTopic]   = useState('all');
  const [mixMode, setMixMode]           = useState(false);
  const [mixTopics, setMixTopics]       = useState(() => new Set());
  const [shuffleMix, setShuffleMix]     = useState(false);
  const [openIdx, setOpenIdx]           = useState(null);

  const domainQuestions = useMemo(() => {
    const groups = activeDomain === 'All'
      ? IQ
      : IQ.filter(g => g.domain === activeDomain);
    return groups.flatMap((g, gi) =>
      g.questions.map((q, qi) => ({ ...q, domain: g.domain, key: `${g.domain}-${gi}-${qi}` }))
    );
  }, [activeDomain]);

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

  const mixLabel = mixMode
    ? (mixTopics.size === 0
      ? 'Pick 2+ topics below'
      : `${mixTopics.size} topics mixed${shuffleMix ? ' · shuffled' : ''}`)
    : null;

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

      {filteredQs.length === 0 && (
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
        const d = DIFF_STYLE[item.diff] || DIFF_STYLE.Easy;
        const topicMeta = TOPIC_BY_ID[item.topic] || { color: T.muted, emoji: '📌' };

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
