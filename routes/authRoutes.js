const express = require('express');
const authRoutes = express.Router();

const {body, validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');
const bcrypt = require('bcryptjs');
const {validateUser} = require('../middleware/middlware.js');

const User = require('../models/user.js');

authRoutes.get('/home', validateUser, (req, res) => {
  res.render('home');
})

authRoutes.get('/login', (req, res) => {
  res.render('login')
})

authRoutes.get('/register', (req, res) => {
  res.render('register');
})

authRoutes.post('/register', [
  body('email')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .isLength({min:6})
    .withMessage('password must be at least 6 characters')
    .matches(/\d/)
    .withMessage('password must contain at least one digit'),
  body('username')
    .isLength({min:4})
    .withMessage('Username must be at least 4 characters')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const errorMessages = errors.array().map(obj => {
        return {message: obj.msg};
      });
      req.flash('errorMessages', errorMessages);
      return res.redirect('/register');
    }
    const userData = matchedData(req);
    const user = new User(userData);
    user.save()
      .then(user => {
        req.flash('successMessage', {message: "Sign Up Successful"})
        res.redirect('/login')
      }).catch(e => {
        if(e.code === 11000) {
          req.flash('errorMessages', {message: "Duplicate email or username"});
        }
        res.redirect('/register');
      })
  }
)

authRoutes.post('/login', (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(!user) {
        req.flash('errorMessages', {message: 'This email is not registered.'});
        res.redirect('/login');
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(matches => {
            if(matches) {
              req.session.userID = user._id;
              res.redirect('/home');
            } else {
              req.flash('errorMessages', {message: 'The password you entered does not match the email inputted.'});
              res.redirect('/login');
            }
          }).catch(e => {
            console.log(e);
          })
      }
    })
    .catch(e => {
      req.flash('errorMessages', {message: 'This email does not exist'});
      res.redirect('/login');
    })
})

authRoutes.post('/logout') {
  res.session.userID = undefined;
  res.redirect('/login');
}

module.exports = {authRoutes};