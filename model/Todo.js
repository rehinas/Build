const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  description: String,
  completed: Boolean,
});

const Todo = mongoose.model('Tod', todoSchema);

module.exports = Todo;
