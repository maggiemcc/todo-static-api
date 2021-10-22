const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos');
const port = 5000
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/todos', todoRoutes);

app.use(express.static('public'));


// main branch
app.get('/todos', (req, res) => {
    res.json({message: 'todo app nodejs api'});
})

// app.post('/', (req, res) => {
//     res.json({message: 'todo app nodejs api'});
// })


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})