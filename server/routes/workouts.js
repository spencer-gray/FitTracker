
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const Workout = require('../models/Workout');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://sg:2utryeDeBZ9UMqUm@csci3230u-project-npzhs.mongodb.net/csci3230u-project?retryWrites=true&w=majority', 
                    {   useUnifiedTopology: true , 
                        useNewUrlParser: true });

app.post('/addworkout', (req, res, next) => {
    const newWorkout = new Workout({
        username: req.body.username,
        exercises: req.body.exercises,
        date: req.body.date
    })
    console.log(newWorkout);
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

// Get workout data
app.get('/', async (req, res) => {  
    try {
        var result = await Workout.find().exec();
        res.send(result);
    } catch (err) {
        res.statuz(500).send(err);
    }
});

module.exports = app;
