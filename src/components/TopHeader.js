import React, { useState, useRef, useEffect } from 'react';
import './TopHeader.css';

const apps = ['OneDrive', 'Teams', 'Outlook', 'Word', 'Excel', 'PowerPoint', 'OneNote'];

export default function TopHeader() {
  const [appsOpen, setAppsOpen] = useState(false);
  const [siteQuery, setSiteQuery] = useState('');
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setAppsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="top-header">
      <div className="th-left">
        <div className="app-launcher" ref={ref}>
          <button className="icon-btn" onClick={() => setAppsOpen(p => !p)} title="Apps">
            <span className="dots-grid">
              {[...Array(9)].map((_, i) => <span key={i} className="dot" />)}
            </span>
          </button>
          {appsOpen && (
            <div className="apps-dropdown">
              {apps.map(app => (
                <a key={app} href="#!" className="app-item">
                  <span className="app-icon">{app[0]}</span>
                  <span>{app}</span>
                </a>
              ))}
            </div>
          )}
        </div>
        <a href="#!" className="logo-link">
          <div className="company-logo">V</div>
        </a>
        <a href="#!" className="sharepoint-link">SharePoint</a>
      </div>

      <div className="th-center">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 16 16" fill="currentColor" width="14" height="14" aria-hidden="true">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
          </svg>
          <input
            type="text"
            placeholder="Search in this site"
            value={siteQuery}
            onChange={(e) => setSiteQuery(e.target.value)}
            aria-label="Search in this site"
          />
        </div>
      </div>

      <div className="th-right">
        <button className="icon-btn" title="Settings">
          <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
          </svg>
        </button>
        <button className="icon-btn" title="Help">
          <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/>
          </svg>
        </button>
        <button className="avatar-btn user-avatar" title="John Doe">JD</button>
      </div>
    </header>
  );
}

