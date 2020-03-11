var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {_id: mongoose.Schema.Types.ObjectId,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        dob: Date,
        email: String,
        address: {
            street: String,
            city: String,
            postCode: Number
        }
    },
    {versionKey: false});

module.exports = mongoose.model('Users', userSchema);