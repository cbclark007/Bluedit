const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const flash = require('connect-flash');
require('dotenv').config();

// const usersRoute = require('./routes/users.js');
// const mongoose = require('./db/mongoose.js');
// const User = require('./models/user.js');

const port = process.env.PORT || 3000;

const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({defaultLayout : 'main',
                          extname       : '.hbs'}))
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index');
})

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(morgan('dev'));
app.use()

// Mount Routes
app.use('/users', usersRoute);

app.listen(port, () => {
  console.log(`Web server up on port ${port}`);
} )
