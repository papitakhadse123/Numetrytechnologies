// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
    { id: 1, title: 'Sample Task 1', description: 'Description 1', status: 'Pending' },
    { id: 2, title: 'Sample Task 2', description: 'Description 2', status: 'Completed' }
];

// GET endpoint to fetch all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST endpoint to create a new task
app.post('/tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, ...req.body }; // Assign a new ID
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// DELETE endpoint to delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(204).send(); // No content to send back
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});