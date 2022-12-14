const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true },
    token: { type: String, required: false },
    password: { type: String, required: false },
    
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;