import React from 'react';
import '../styles/ThemeToggle.css';

function ThemeToggle({ theme, onThemeChange }) {
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    onThemeChange(newTheme);
  };

  return (
    <div className="theme-toggle-container">
      <button
        className="theme-toggle-button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span className="theme-icon">
          {theme === 'light' ? '🌙' : '☀️'}
        </span>
        <span className="theme-text">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>
    </div>
  );
}

export default ThemeToggle;

