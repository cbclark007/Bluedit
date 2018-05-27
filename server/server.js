const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const hbs = require('hbs');
require('dotenv').config();

const authRoute = require('../routes/authRoutes.js');
const mongoose = require('../db/mongoose.js');

const port = process.env.PORT || 3000;

const app = express();

// View Engine
app.set('views', path.join(__dirname, '../views'));
app.engine('hbs', exphbs({defaultLayout : 'main',
                          extname       : '.hbs'}));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, "../views/partials"));

// Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));
// app.use(bodyParser.json());
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));
app.use((req, res, next) => {
  res.locals.errorMessages = req.flash('errorMessages');
  res.locals.successMessage = req.flash('successMessage');
  next();
})

app.get('/', (req, res) => {
  res.redirect('home');
})

// Mount Routes
app.use('/', authRoute);

app.listen(port, () => {
  console.log(`Web server up on port ${port}`);
} )
