const todoSchema = new mongoose.Schema({
    description: String,
    completed: Boolean
  });
  const Todo = mongoose.model('Todo', todoSchema);