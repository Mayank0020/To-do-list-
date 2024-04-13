const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import the path module

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/todo-list', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Task schema
const taskSchema = new mongoose.Schema({
    description: String
});
const Task = mongoose.model('Task', taskSchema);

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// API Routes
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const { description } = req.body;
    const newTask = new Task({ description });
    await newTask.save();
    res.status(201).send();
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

