const express = require('express');
const router = express.Router();
const Todo = require('../model/Todo');

router.use(express.json())
router.use(express.urlencoded({extended:true}))


router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/todos', async (req, res) => {
  const { description, completed } = req.body;
  const newTodo =new Todo({
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

router.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    await Todo.findByIdAndUpdate(id, { completed });
    res.json('Todo updated');
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json('Todo deleted');
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

module.exports = router;
