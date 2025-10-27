import React from 'react';
import '../styles/SortOptions.css';

function SortOptions({ currentSort, onSortChange }) {
  const sortOptions = [
    { value: 'date-desc', label: 'Newest First', icon: '📅↓' },
    { value: 'date-asc', label: 'Oldest First', icon: '📅↑' },
    { value: 'priority-high', label: 'Priority: High → Low', icon: '⚡' },
    { value: 'priority-low', label: 'Priority: Low → High', icon: '🔋' },
    { value: 'title-asc', label: 'Title: A → Z', icon: '🔤' },
    { value: 'title-desc', label: 'Title: Z → A', icon: '🔡' }
  ];

  return (
    <div className="sort-options-container">
      <label htmlFor="sort-select" className="sort-label">
        📊 Sort by:
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.icon} {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortOptions;

