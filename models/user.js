const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not an email'
    }
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  image:{
    type: String,
    required: true
  }
})

userSchema.pre('save', function(next) {
  const user = this;
  if(user.isModified('password')) {
    bcrypt.hash(user.password, 10)
      .then(hashed => {
        user.password = hashed;
        next();
      }).catch(e => {
        console.log(`${user} failed to hash password`);
        next();
      })
  }
})

const User = mongoose.model('User', userSchema);

module.exports = {User};
