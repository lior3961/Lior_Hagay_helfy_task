const express = require('express');
const router = express.Router();

// This array will be our "database", and the counter will help assign unique IDs
let tasks = [];
let currentTaskId = 1;

//Return all tasks
router.get('/', (req, res) => {
  res.status(200).json(tasks);
});

//Create a new task
router.post('/', (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || !description || !priority) {
    return res.status(400).json({ 
      error: 'Title, priority and description are must fields' 
    });
  }
  const possiblePriorities = ['low', 'medium', 'high'];
  if (priority && !possiblePriorities.includes(priority)) {
    return res.status(400).json({ 
      error: 'Priority must be one of the following: low, medium, or high' 
    });
  }

  const newTask = {
    id: currentTaskId++,
    title: title,
    description: description,
    completed: false,
    createdAt: new Date(),
    priority: priority
  };

  // Add to the db array
  tasks.push(newTask);

  res.status(201).json(newTask);
});


// Edit an existing task
router.put('/:id', (req, res) => {

  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, priority, completed } = req.body;

  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ 
      error: 'Priority must be low, medium, or high' 
    });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title: title !== undefined ? title : tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    priority: priority !== undefined ? priority : tasks[taskIndex].priority,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed
  };

  tasks[taskIndex] = updatedTask;

  res.status(200).json(updatedTask);
});


// Delete a task
router.delete('/:id', (req, res) => {

  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  //removes 1 element at the specified index from the db array
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});


// Toggle completion
router.patch('/:id/toggle', (req, res) => {
  
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  res.status(200).json(tasks[taskIndex]);
});



module.exports = router;

