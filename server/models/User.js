const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create User Schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'users'
})

const User = mongoose.model('User', userSchema);
module.exports = User;
