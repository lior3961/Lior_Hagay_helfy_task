import React from 'react';
import '../styles/TaskItem.css';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {/* Priority Badge */}
      <div className={`priority-badge ${getPriorityClass(task.priority)}`}>
        {task.priority}
      </div>

      {/* Task Content */}
      <div className="task-content">
        {/* Title */}
        <h3 className="task-title">{task.title}</h3>
        
        {/* Description */}
        <p className="task-description">{task.description}</p>
        
        {/* Metadata */}
        <div className="task-meta">
          <span className="task-date">
            📅 {formatDate(task.createdAt)}
          </span>
          <span className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
            {task.completed ? '✓ Completed' : '○ Pending'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="task-actions">
        {/* Toggle Completion Button */}
        <button
          className="btn-toggle"
          onClick={() => onToggle(task.id)}
          title={task.completed ? 'Mark as pending' : 'Mark as completed'}
        >
          {task.completed ? '↩️' : '✓'}
        </button>

        {/* Edit Button */}
        <button
          className="btn-edit"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          ✏️
        </button>

        {/* Delete Button */}
        <button
          className="btn-delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;

