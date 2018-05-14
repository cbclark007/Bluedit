const mongoose = require('mongoose');

const database = process.env.MONGODB_URI ||
                 'mongodb://localhost:27017/loginExample';
mongoose.connect(database)
  .then(() => {
    console.log(`Database up on ${database}`);
  })
  .catch((e) => {
    console.log('Unable to connect to database');
  })

module.exports = mongoose;
