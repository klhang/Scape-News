const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  //	connect	the	remote	or	local	mongodb
  mongoose.connect(uri);

  mongoose.connection.on('error', (err) => {
    //	when	user	and	password	error
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  require('./user');
};
