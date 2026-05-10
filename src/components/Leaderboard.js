import React, { useState } from 'react';
import './Leaderboard.css';

const medalColors = {
  1: { podium: 'linear-gradient(180deg,#f7c948,#f0a500)', border: '#d38a00', rank: '#1' },
  2: { podium: 'linear-gradient(180deg,#d9d9d9,#b5b5b5)', border: '#9f9f9f', rank: '#2' },
  3: { podium: 'linear-gradient(180deg,#b7b7b7,#8f8f8f)', border: '#7f7f7f', rank: '#3' },
};

// STRICT: only these 3 categories are allowed
const categoryIconMap = {
  'Public Speaking': {
    tooltip: 'Public Speaking',
    icon: (
      // Projector screen icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <rect x="2" y="3" width="20" height="13" rx="2"/>
        <path d="M8 20h8" strokeLinecap="round"/>
        <path d="M12 16v4" strokeLinecap="round"/>
        <circle cx="12" cy="9.5" r="2.5"/>
      </svg>
    ),
  },
  'Education': {
    tooltip: 'Education',
    icon: (
      // Graduation hat icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <path d="M12 3L2 9l10 6 10-6-10-6z" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M6 12.5v4.5c0 1.657 2.686 3 6 3s6-1.343 6-3v-4.5" strokeLinecap="round"/>
        <path d="M22 9v5" strokeLinecap="round"/>
      </svg>
    ),
  },
  'University Partnership': {
    tooltip: 'University Partnership',
    icon: (
      // Smiling face icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="10" r="0.5" fill="currentColor" stroke="none"/>
        <circle cx="15" cy="10" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
};

function getCategoryIcon(cat) {
  return categoryIconMap[cat] ?? categoryIconMap['Education'];
}

function buildCategoryCounts(activities) {
  const map = {};
  activities.forEach(a => { map[a.category] = (map[a.category] || 0) + 1; });
  return Object.entries(map);
}

function IconTooltip({ cat, count }) {
  const [show, setShow] = useState(false);
  const { tooltip, icon } = getCategoryIcon(cat);
  return (
    <div className="cat-icon-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div className="cat-icon cat-icon--colored">{icon}</div>
      <span className="cat-count cat-count--colored">{count}</span>
      {show && <div className="cat-tooltip">{tooltip}</div>}
    </div>
  );
}

function formatDate(dateStr) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const [y, m, d] = dateStr.split('-');
  return `${d}-${months[parseInt(m, 10) - 1]}-${y}`;
}

function Score({ value, large }) {
  return (
    <span className={`score-display${large ? ' score-display--large' : ''}`}>
      <span className="score-star">★</span>
      <span className="score-value">{value.toLocaleString()}</span>
    </span>
  );
}

const palette = ['#0078d4','#107c10','#d13438','#8764b8','#e8a838','#038387'];

function Avatar({ initials, size = 48, rank }) {
  const idx = initials.charCodeAt(0) % palette.length;
  return (
    <div className="avatar" style={{
      width: size, height: size,
      background: palette[idx],
      fontSize: size * 0.32,
      boxShadow: rank ? `0 0 0 3px ${medalColors[rank]?.border}` : undefined,
    }}>
      {initials}
    </div>
  );
}

function PodiumPlace({ user, rank }) {
  const m = medalColors[rank];
  const isFirst = rank === 1;
  return (
    <div className={`podium-place podium-place--${rank}`}>
      <Avatar initials={user.avatar} size={isFirst ? 72 : 62} rank={rank} />
      <div className="podium-user-name">{user.name}</div>
      <div className="podium-user-score"><Score value={user.score} large={isFirst} /></div>
      <div className="podium-stand" style={{ '--podium-bg': m.podium, '--podium-border': m.border }}>
        <span className="podium-rank">{m.rank}</span>
      </div>
    </div>
  );
}

function ActivityExpandRow({ activity }) {
  return (
    <div className="activity-row">
      <span className="act-name">{activity.name}</span>
      <span className="act-cat">{activity.category}</span>
      <span className="act-date">{formatDate(activity.date)}</span>
      <span className="act-pts"><span className="score-star">★</span>+{activity.points}</span>
    </div>
  );
}

function UserRow({ user, rank, expanded, onToggle }) {
  const displayCats = buildCategoryCounts(user.activities).slice(0, 2);

  return (
    <>
      <div className={`user-row${expanded ? ' user-row--expanded' : ''}`} onClick={onToggle}>
        <div className="user-left">
          <span className="user-rank">#{rank}</span>
          <Avatar initials={user.avatar} size={38} />
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role} · {user.department}</span>
          </div>
        </div>

        <div className="user-cats">
          {displayCats.map(([cat, count]) => (
            <IconTooltip key={cat} cat={cat} count={count} />
          ))}
        </div>

        <div className="user-divider" />

        <div className="user-right">
          <Score value={user.score} />
          <span className={`expand-arrow${expanded ? ' rotated' : ''}`}>▾</span>
        </div>
      </div>

      {expanded && (
        <div className="activity-panel">
          <div className="recent-activity-title">RECENT ACTIVITY</div>
          <div className="activity-header">
            <span>Activity</span>
            <span>Category</span>
            <span>Date</span>
            <span>Points</span>
          </div>
          {user.activities.map((a, i) => <ActivityExpandRow key={i} activity={a} />)}
        </div>
      )}
    </>
  );
}

export default function Leaderboard({ users }) {
  const [expandedId, setExpandedId] = useState(null);
  const sorted = [...users].sort((a, b) => b.score - a.score);
  const top3 = sorted.slice(0, 3);
  const toggle = (id) => setExpandedId(prev => prev === id ? null : id);

  if (users.length === 0) {
    return (
      <div className="leaderboard-empty">
        <div className="empty-icon">🔍</div>
        <p>No results found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      {top3.length > 0 && (
        <div className="podium">
          {top3.length > 1 && <div className="podium-side podium-left"><PodiumPlace user={top3[1]} rank={2} /></div>}
          <div className="podium-center"><PodiumPlace user={top3[0]} rank={1} /></div>
          {top3.length > 2 && <div className="podium-side podium-right"><PodiumPlace user={top3[2]} rank={3} /></div>}
        </div>
      )}

      <div className="users-list">
        {sorted.map((user, idx) => (
          <UserRow
            key={user.id}
            user={user}
            rank={idx + 1}
            expanded={expandedId === user.id}
            onToggle={() => toggle(user.id)}
          />
        ))}
      </div>
    </div>
  );
}
