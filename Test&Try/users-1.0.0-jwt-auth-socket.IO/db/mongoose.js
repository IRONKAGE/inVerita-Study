// mongoose connection
// return Pending request
const mongoose = require('mongoose');
const config = require('../config');

module.exports = mongoose.connect(config.connectionUri, {useNewUrlParser: true, useUnifiedTopology: true});
