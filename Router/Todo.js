const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Create a new todo
router.post('/todos', async (req, res) => {
  try {
    const todo = new Todo({
      description: req.body.description,
      completed: false,
    });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a todo
router.put('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      todo.completed = req.body.completed;
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    }
  } catch (error) {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete a todo
router.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
    res.json(deletedTodo);
  } catch (error) {
    res.status(404).json({ message: 'Todo not found' });
  }
});

module.exports = router;
