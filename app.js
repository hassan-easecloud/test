const express = require('express');
const app = express();
const todoRoutes = require('./routes/todos');

// Middleware
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Root
app.get('/', (req, res) => {
    res.send('Welcome to the TODO App');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
