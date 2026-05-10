import React, { useState, useMemo } from 'react';
import './App.css';
import TopHeader from './components/TopHeader';
import SecondaryNav from './components/SecondaryNav';
import Breadcrumbs from './components/Breadcrumbs';
import TitleSection from './components/TitleSection';
import Filters from './components/Filters';
import Leaderboard from './components/Leaderboard';
import Comments from './components/Comments';
import Footer from './components/Footer';
import { mockUsers } from './data/mockData';

const initialFilters = {
  year: 'All Years',
  quarter: 'All',
  category: 'All Categories',
  search: '',
};

export default function App() {
  const [filters, setFilters] = useState(initialFilters);

  const filteredUsers = useMemo(() => {
    const quarterByMonth = {
      '01': 'Q1', '02': 'Q1', '03': 'Q1',
      '04': 'Q2', '05': 'Q2', '06': 'Q2',
      '07': 'Q3', '08': 'Q3', '09': 'Q3',
      '10': 'Q4', '11': 'Q4', '12': 'Q4',
    };

    return mockUsers
      .map(user => {
        const matchesName = !filters.search || user.name.toLowerCase().includes(filters.search.toLowerCase());
        if (!matchesName) return null;

        const activities = user.activities.filter(activity => {
          const [year, month] = activity.date.split('-');
          if (filters.year !== 'All Years' && year !== filters.year) return false;
          if (filters.quarter !== 'All' && quarterByMonth[month] !== filters.quarter) return false;
          if (filters.category !== 'All Categories' && activity.category !== filters.category) return false;
          return true;
        });

        if (activities.length === 0) return null;

        const score = activities.reduce((sum, activity) => sum + activity.points, 0);
        return { ...user, activities, score };
      })
      .filter(Boolean);
  }, [filters]);

  return (
    <div className="app">
      <TopHeader />
      <SecondaryNav />
      <main className="main-content">
        <Breadcrumbs />
        <TitleSection />
        <div className="content-wrapper">
          <Filters filters={filters} setFilters={setFilters} />
          <Leaderboard users={filteredUsers} />
          <Comments />
        </div>
      </main>
      <Footer />
    </div>
  );
}

