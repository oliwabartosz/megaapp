const express = require('express');
const path = require('path');
const {todoRouter} = require('./routes/todo');
const hbs = require('express-handlebars');

app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

// handlebars
app.engine('.hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

// used for learning purpose only
app.use('/todo', todoRouter);

app.get('/', (req, res) => {
  res.redirect('/todo');
});

app.listen(3000, 'localhost');
