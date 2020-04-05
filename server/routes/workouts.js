
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Workout = require('../models/Workout');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
app.use(cors());

// Connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://sg:2utryeDeBZ9UMqUm@csci3230u-project-npzhs.mongodb.net/csci3230u-project?retryWrites=true&w=majority', 
                    {   useUnifiedTopology: true , 
                        useNewUrlParser: true });

// Post request to store workout data                        
app.post('/addworkout', (req, res, next) => {
    const newWorkout = new Workout({
        username: req.body.username,
        exercises: req.body.exercises,
        date: req.body.date
    })
    newWorkout.save(err => {
        if (err) {
            return res.status(400).json({
                title: 'error',
                error: 'Error adding new workout'
            })
        } else {
            return res.status(200).json({
                title: 'Successfully added workout'
            })
        }
    })
});

// Delte workout
app.post('/deleteworkout', (req, res) => {

    const id = new ObjectId(req.body.id);

    Workout.deleteOne({_id: id}, function(error) {
        if (error) {
            return res.status(400).json({
                title: 'error',
                error: 'Error deleting new workout'
            })
        } else {
            return res.status(200).json({
                title: 'Successfully deleted workout'
            })
        }
    });
})

// Get workout data - query by username
app.get('/', (req, res) => {  
    search = req.query.username;
    Workout.find({ username: search }).sort({date:-1})
        .then(workouts => res.json(workouts))
        .catch(err => res.status(404).send(err));
});

// Get workout data (Depreciated: retrieves all workouts - might be of use later)
// app.get('/', async (req, res) => {  
//     try {
//         var result = await Workout.find().exec();
//         res.send(result);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

module.exports = app;
