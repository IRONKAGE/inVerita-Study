// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb://admin:infracom20191@ds121026.mlab.com:21026/redes_auth_tcp";

var mongoose = require('mongoose');
var db = mongoose.connect('localhost/authuser');



// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// var db = mongoclient.db("integration_tests");

var userSchema = db.Schema({
    firstname: String,
    username: String,
    password: { type: String, select: false },
    email: String
});

module.exports = db.model('User',userSchema);
