import React, { useState, useEffect } from 'react';
import '../styles/TaskForm.css';

function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    } else {
      resetForm();
    }
  }, [editingTask]);


  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority
    };

    if (editingTask) {
      onSubmit(editingTask.id, taskData);
    } else {
      onSubmit(taskData);
    }

    resetForm();
  };
  

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <div className="task-form-container">
      <h2>{editingTask ? '✏️ Edit Task' : '➕ Create New Task'}</h2>
      
      <form onSubmit={handleSubmit} className="task-form">
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            maxLength="100"
          />
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            rows="3"
            maxLength="500"
          />
        </div>

        {/* Priority Select */}
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {editingTask ? 'Update Task' : 'Create Task'}
          </button>
          
          {editingTask && (
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;

