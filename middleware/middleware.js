const validateUser = (req, res, next) => {
  if(req.session.userID) {
    next();
  } else {
    req.flash('errorMessages', {message: 'Please login'});
    res.redirect('/login');
  }
}

module.exports = {validateUser};
