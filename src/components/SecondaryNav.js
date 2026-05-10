import React, { useState, useRef, useEffect } from 'react';
import './SecondaryNav.css';

const navItems = [
  { label: 'Knowledge Base', href: '#!' },
  {
    label: 'Company Info',
    children: [
      { label: 'Mission & Values' },
      { label: 'Communication Standards' },
      { label: 'Internal Apps' },
      { label: 'Vention Impact' },
      { label: 'LD Mailing Groups' },
      { label: 'Travel Group' },
      {
        label: 'Brand', children: [
          { label: 'Positioning' },
          { label: 'Design Materials' },
        ]
      },
    ]
  },
  {
    label: 'News & Events',
    children: [
      { label: 'News' },
      { label: 'Events' },
      { label: 'Projects' },
      { label: 'Public & Corporate Holidays' },
    ]
  },
  {
    label: 'Personal Growth',
    children: [
      { label: 'Performance Review' },
      { label: 'Interview Preparation Guide' },
      { label: 'English Training Center' },
      { label: 'Soft Skills' },
      { label: 'Trophy' },
      {
        label: 'EDU', children: [
          { label: 'About' },
          { label: 'Events' },
          { label: 'Company Leader Board' },
        ]
      },
    ]
  },
  { label: 'Benefits', href: '#!' },
  { label: 'Policies', href: '#!' },
  { label: 'Instructions and Guides', href: '#!' },
  {
    label: 'Locations',
    children: [
      {
        label: 'Delivery', children: [
          { label: 'Belarus' }, { label: 'Bulgaria' }, { label: 'Georgia' },
          { label: 'Kyrgyzstan' }, { label: 'Kazakhstan' }, { label: 'Lithuania' },
          { label: 'Poland' }, { label: 'Slovakia' }, { label: 'Uzbekistan' },
        ]
      },
      {
        label: 'Sales', children: [
          { label: 'Cyprus' }, { label: 'DACH' },
          { label: 'United Kingdom' }, { label: 'United States of America' },
        ]
      },
    ]
  },
  {
    label: 'Spaces',
    children: [
      { label: 'AI at Vention' },
      { label: 'Sales Materials' },
      {
        label: 'Divisions', children: [
          { label: 'Service Departments' },
        ]
      },
    ]
  },
  { label: 'Wiki Search', href: '#!' },
  { label: 'Marketing', href: '#!' },
  { label: 'InfoSec', href: '#!' },
];

function SubMenu({ items, level = 1 }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <ul className={`sub-menu sub-menu--level-${level}`} role="menu">
      {items.map((item, i) => (
        <li key={i} className="sub-item" onMouseEnter={() => setOpenIndex(i)}>
          {item.children ? (
            <button
              type="button"
              className="sub-link sub-link-btn"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex(prev => (prev === i ? null : i));
              }}
            >
              {item.label}
              <span className="arrow-right">›</span>
            </button>
          ) : (
            <a href={item.href || '#!'} className="sub-link">{item.label}</a>
          )}
          {item.children && openIndex === i && <SubMenu items={item.children} level={level + 1} />}
        </li>
      ))}
    </ul>
  );
}

function NavItem({ item, isOpen, onOpen, onToggle }) {

  if (!item.children) {
    return <a href={item.href || '#!'} className="nav-link">{item.label}</a>;
  }

  return (
    <div className={`nav-dropdown-wrap ${isOpen ? 'open' : ''}`} onMouseEnter={onOpen}>
      <button
        type="button"
        className="nav-link nav-dropdown-btn"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {item.label}
        <span className="caret">▾</span>
      </button>
      {isOpen && <SubMenu items={item.children} />}
    </div>
  );
}

export default function SecondaryNav() {
  const [openTopIndex, setOpenTopIndex] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenTopIndex(null);
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  return (
    <nav className="secondary-nav" ref={navRef}>
      <div className="nav-inner">
        {navItems.map((item, i) => (
          <NavItem
            key={i}
            item={item}
            isOpen={openTopIndex === i}
            onOpen={() => {
              // While one dropdown is open, hovering another top-level item switches panels.
              if (item.children && openTopIndex !== null) setOpenTopIndex(i);
            }}
            onToggle={() => setOpenTopIndex(prev => (prev === i ? null : i))}
          />
        ))}
      </div>
    </nav>
  );
}

