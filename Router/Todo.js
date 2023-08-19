const express = require('express');
const router = express.Router();
const Todo = require('../model/Todo');

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  const { description, completed } = req.body;
  const newTodo = new Todo({
    description,
    completed,
  });
  try {
    await newTodo.save();
    res.status(201).json('Todo added');
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});


router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json('Todo updated');
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json('Todo deleted');
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});
// Similar routes for update and delete

module.exports = router;
