const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (change URI if using MongoDB Atlas)
mongoose.connect('mongodb://localhost:27017/todo-list-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

// GET all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// ADD new task
app.post('/tasks', async (req, res) => {
  const { text } = req.body;
  const task = new Task({ text, done: false });
  await task.save();
  res.json(task);
});

// UPDATE task status
app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// DELETE one task
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// DELETE all tasks
app.delete('/tasks', async (req, res) => {
  await Task.deleteMany({});
  res.json({ message: 'All tasks deleted' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
