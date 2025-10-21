const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Backend works' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Backend Error',
    message: err.message 
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

