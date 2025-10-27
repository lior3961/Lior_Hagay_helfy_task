import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import SearchBar from './components/SearchBar';
import SortOptions from './components/SortOptions';
import ThemeToggle from './components/ThemeToggle';
import { getAllTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api';
import './styles/App.css';

function App() {
  
  const [tasks, setTasks] = useState([]);  
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [theme, setTheme] = useState('light');

  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  
  useEffect(() => {
    fetchTasks();
  }, []);

  
  useEffect(() => {
    filterSearchAndSortTasks();
  }, [tasks, filter, searchQuery, sortBy]);


  
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please make sure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  const filterSearchAndSortTasks = () => {
    let result = [...tasks];
    
    if (filter === 'completed') {
      result = result.filter(task => task.completed);
    } else if (filter === 'pending') {
      result = result.filter(task => !task.completed);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }
    
    result = sortTasks(result, sortBy);
    
    setFilteredTasks(result);
  };

  
  const sortTasks = (tasksToSort, sortOption) => {
    const sorted = [...tasksToSort];
    
    switch (sortOption) {
      case 'date-desc':
        // Newest first
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      case 'date-asc':
        // Oldest first
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      
      case 'priority-high':
        // High → Medium → Low
        const priorityOrderDesc = { high: 3, medium: 2, low: 1 };
        return sorted.sort((a, b) => priorityOrderDesc[b.priority] - priorityOrderDesc[a.priority]);
      
      case 'priority-low':
        // Low → Medium → High
        const priorityOrderAsc = { high: 3, medium: 2, low: 1 };
        return sorted.sort((a, b) => priorityOrderAsc[a.priority] - priorityOrderAsc[b.priority]);
      
      case 'title-asc':
        // A → Z
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      
      case 'title-desc':
        // Z → A
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      
      default:
        return sorted;
    }
  };


  
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (err) {
      alert('Failed to create task');
      console.error(err);
    }
  };

  
  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      setEditingTask(null); // Clear editing state
    } catch (err) {
      alert('Failed to update task');
      console.error(err);
    }
  };

  
  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (err) {
        alert('Failed to delete task');
        console.error(err);
      }
    }
  };


  
  const handleToggleTask = async (id) => {
    try {
      const updatedTask = await toggleTask(id);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      alert('Failed to toggle task');
      console.error(err);
    }
  };

  
  const handleEditTask = (task) => {
    setEditingTask(task);
  };


  
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>📝 Task Manager</h1>
          </div>
          <ThemeToggle theme={theme} onThemeChange={handleThemeChange} />
        </div>
      </header>

      <div className="app-container">
        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="controls-row">
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={{
              all: tasks.length,
              completed: tasks.filter(t => t.completed).length,
              pending: tasks.filter(t => !t.completed).length
            }}
          />
          
          <SortOptions
            currentSort={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {(searchQuery || filter !== 'all') && (
          <div className="results-info">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading tasks...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>{error}</p>
            <button onClick={fetchTasks}>Retry</button>
          </div>
        )}

        {!loading && !error && (
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;

