const express = require('express');
const router = express.Router();

// Mock data
let todos = [
  { id: 1, task: 'Learn Node.js', done: false },
  { id: 2, task: 'Write project', done: true },
];

// Get all todos
router.get('/', (req, res) => {
  res.status(200).json(todos);
});

// Get single todo (intentional bug: no check if todo exists)
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
  return res.status(404).json({ error: 'Not Found' });
}
res.json(todo);

});

// Add new todo (code smell: no validation)
router.post('/', (req, res) => {
  const { task, done } = req.body;
  const id = todos.length + 1;
  todos.push({ id, task, done });
  res.status(201).json({ message: 'Todo added' });
});

// Update a todo (duplication of ID check logic)
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todo.task = req.body.task;
  todo.done = req.body.done;
  res.json({ message: 'Todo updated' });
});

// Delete a todo (vulnerability: doesn't check existence before deletion)
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
