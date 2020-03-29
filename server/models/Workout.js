const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create User Schema
const workoutSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    exercises: {
        type: Array,
        required: false
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    collection: 'workouts'
})

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
