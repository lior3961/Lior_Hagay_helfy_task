import React from 'react';
import '../styles/TaskFilter.css';

function TaskFilter({ currentFilter, onFilterChange, taskCounts }) {
  
  const filters = [
    { value: 'all', label: 'All Tasks', icon: '📋' },
    { value: 'pending', label: 'Pending', icon: '○' },
    { value: 'completed', label: 'Completed', icon: '✓' }
  ];
  
  return (
    <div className="task-filter-container">
      <h3>Filter Tasks</h3>
      
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.value}
            className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.value)}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
            <span className="filter-count">
              ({taskCounts[filter.value]})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilter;

