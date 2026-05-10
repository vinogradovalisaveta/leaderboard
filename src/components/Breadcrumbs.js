import React from 'react';
import './Breadcrumbs.css';

export default function Breadcrumbs() {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a href="#!" className="bc-link">Home</a>
      <span className="bc-sep">›</span>
      <a href="#!" className="bc-link">EDU</a>
      <span className="bc-sep">›</span>
      <a href="#!" className="bc-current" aria-current="page">Company Leader Board 2025</a>
    </nav>
  );
}

