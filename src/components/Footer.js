import React from 'react';
import './Footer.css';

const socialLinks = [
  { name: 'LinkedIn',  href: '#!', icon: 'in' },
  { name: 'Instagram', href: '#!', icon: '📷' },
  { name: 'Twitter',   href: '#!', icon: '✕' },
  { name: 'YouTube',   href: '#!', icon: '▶' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-name">V</span>
        </div>
        <div className="footer-socials">
          {socialLinks.map(s => (
            <a key={s.name} href={s.href} className="social-link" title={s.name}>
              <span className="social-icon">{s.icon}</span>
              <span>{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

