import React, { useState } from 'react';
import './Comments.css';
import { mockComments } from '../data/mockData';

const tabs = ['Newest', 'Oldest', 'Popular'];

function sortComments(comments, tab) {
  if (tab === 'Oldest') return [...comments].sort((a, b) => a.date.localeCompare(b.date));
  if (tab === 'Newest') return [...comments].sort((a, b) => b.date.localeCompare(a.date));
  return [...comments].sort((a, b) => (b.likes || 0) - (a.likes || 0));
}

const palette = ['#0078d4','#107c10','#d13438','#8764b8','#e8a838'];

export default function Comments() {
  const [activeTab, setActiveTab] = useState('Newest');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(mockComments.map(c => ({ ...c, replies: [] })));
  const [replyOpenId, setReplyOpenId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const sorted = sortComments(comments, activeTab);

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments(prev => [...prev, {
      id: prev.length + 1,
      name: 'John Doe',
      avatar: 'JD',
      text: newComment.trim(),
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: [],
    }]);
    setNewComment('');
  };

  const toggleLike = (id) => {
    setComments(prev => prev.map(comment => (
      comment.id === id
        ? { ...comment, likes: Math.max(0, (comment.likes || 0) + (comment.likedByMe ? -1 : 1)), likedByMe: !comment.likedByMe }
        : comment
    )));
  };

  const openReply = (id) => {
    setReplyOpenId(prev => (prev === id ? null : id));
    setReplyText('');
  };

  const sendReply = (id) => {
    const text = replyText.trim();
    if (!text) return;
    setComments(prev => prev.map(comment => (
      comment.id === id
        ? {
            ...comment,
            replies: [...comment.replies, { id: Date.now(), name: 'John Doe', avatar: 'JD', text, date: new Date().toISOString().split('T')[0] }],
          }
        : comment
    )));
    setReplyText('');
    setReplyOpenId(null);
  };

  return (
    <div className="comments-section">
      <h3 className="comments-title">Comments</h3>

      <div className="comment-input-row">
        <div className="comment-avatar" style={{ background: '#0078d4' }}>JD</div>
        <div className="comment-input-wrap">
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addComment()}
          />
          {newComment && (
            <button className="comment-submit" onClick={addComment}>Post</button>
          )}
        </div>
      </div>

      <div className="comments-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`comments-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="comments-list">
        {sorted.map((c, i) => (
          <div key={c.id} className="comment-item">
            <div className="comment-avatar" style={{ background: palette[i % palette.length] }}>{c.avatar}</div>
            <div className="comment-body">
              <div className="comment-head">
                <span className="comment-name">{c.name}</span>
                <span className="comment-date">{c.date}</span>
              </div>
              <p className="comment-text">{c.text}</p>
              <div className="comment-actions">
                <button type="button" className="comment-action-link" onClick={() => openReply(c.id)}>Reply</button>
                <button type="button" className={`comment-like-btn ${c.likedByMe ? 'active' : ''}`} onClick={() => toggleLike(c.id)}>
                  <span className="like-count">{c.likes || 0}</span>
                  <span className="like-icon" aria-hidden="true">👍</span>
                </button>
              </div>

              {replyOpenId === c.id && (
                <div className="reply-composer">
                  <div className="comment-avatar reply-avatar" style={{ background: '#0078d4' }}>JD</div>
                  <div className="reply-bubble">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      onKeyDown={(e) => e.key === 'Enter' && sendReply(c.id)}
                    />
                    <button type="button" onClick={() => sendReply(c.id)}>Send</button>
                  </div>
                </div>
              )}

              {c.replies.length > 0 && (
                <div className="reply-thread">
                  {c.replies.map(reply => (
                    <div key={reply.id} className="reply-item">
                      <div className="comment-avatar reply-avatar" style={{ background: '#0078d4' }}>{reply.avatar}</div>
                      <div className="reply-content">
                        <div className="reply-meta">
                          <span>{reply.name}</span>
                          <span>{reply.date}</span>
                        </div>
                        <p>{reply.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

