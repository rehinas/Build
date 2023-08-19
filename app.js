const express = require('express');
const cors = require('cors');
const path = require('path'); 
const app = express();
require('dotenv').config()
const PORT=process.env.PORT

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,'/build'))); 
const todoRoutes = require('./router/Todo');
app.use('/api/todos', todoRoutes);


require('./db/connection')
app.get('/*', function(req, res) {res.sendFile(path.join(__dirname ,'/build/index.html')); });

app.listen(PORT,()=>{
    console.log(`listen port${PORT}`)
})