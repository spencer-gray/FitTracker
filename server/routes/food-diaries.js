
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const FoodDiaries = require('../models/FoodDiary');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
app.use(cors());

process.env.SECRET_KEY = 'secret'

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://sg:2utryeDeBZ9UMqUm@csci3230u-project-npzhs.mongodb.net/csci3230u-project?retryWrites=true&w=majority', 
                    {   useUnifiedTopology: true , 
                        useNewUrlParser: true });

// Get food diary data - filter by username
app.get('/', (req, res) => {  
    username = req.query.username;

    // add a date filter too

    FoodDiaries.find({ username: username })
        .then(diary => res.json(diary))
        .catch(err => res.status(404).send(err));
});

app.post('/addOrUpdateDiary', (req, res) => {
    username = req.body.username;
    date = req.body.date;
    meals = req.body.meals;

    diaryData = {
        username: username,
        date: date,
        meals: meals
    }

    FoodDiaries.find({ username: username, date: date })
                .then((results) => {
                    if (results.length > 0) {
                        // update existing diary
                        FoodDiaries.updateOne({ username: username, date: date}, diaryData, function(error) {
                            if (error) {
                                console.log(error)
                                return res.status(400).json({
                                    title: 'error',
                                    error: 'Error updating food diary'
                                })
                            } else {
                                return res.status(200).json({
                                    title: 'Successfully updated food diary'
                                })
                            }
                        })
                    } else {
                        // add the non-existing food-diary
                        newDiary = new FoodDiaries(diaryData);
                        newDiary.save(err => {
                            if (err) {
                                return res.status(400).json({
                                    title: 'error',
                                    error: 'Error adding new food diary'
                                })
                            } else {
                                return res.status(200).json({
                                    title: 'Successfully added food diary'
                                })
                            }
                        })
                    }
                })
})

module.exports = app;
