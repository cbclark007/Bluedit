const validateUser = (req, res, next) => {
  if(req.session.userID) {
    console.log("user validated");
    next();
  } else {
    req.flash('errorMessages', {message: 'Please login'});
    res.redirect('/login');
  }
}

module.exports = {validateUser};
