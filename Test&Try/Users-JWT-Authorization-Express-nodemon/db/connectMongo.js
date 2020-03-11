var mongoose =  require('mongoose');
var MONGO_URI = 'mongodb://localhost:27017/test_user_jwt';

mongoose.connect(MONGO_URI, { useNewUrlParser: true })