import React from 'react';
import './Filters.css';
import { years, quarters, categories } from '../data/mockData';

export default function Filters({ filters, setFilters }) {
  const handleChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  return (
    <div className="filters-bar">
      <select
        className="filter-select"
        value={filters.year}
        onChange={e => handleChange('year', e.target.value)}
      >
        {years.map(y => <option key={y}>{y}</option>)}
      </select>

      <select
        className="filter-select"
        value={filters.quarter}
        onChange={e => handleChange('quarter', e.target.value)}
      >
        {quarters.map(q => <option key={q}>{q}</option>)}
      </select>

      <select
        className="filter-select"
        value={filters.category}
        onChange={e => handleChange('category', e.target.value)}
      >
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>

      <div className="filter-search-wrap">
        <svg className="filter-search-icon" viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
        </svg>
        <input
          type="text"
          className="filter-search"
          placeholder="Search employee..."
          value={filters.search}
          onChange={e => handleChange('search', e.target.value)}
        />
      </div>
    </div>
  );
}

