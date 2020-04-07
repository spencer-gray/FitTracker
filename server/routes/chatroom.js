
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const Chat = require('../models/Chat');

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

                        // Get workout data - query by username
app.get('/', (req, res) => {  
    search = req.query.username;
    Chat.find({}).sort({date:-1}).limit(100)
        .then(chat => res.json(chat))
        .catch(err => res.status(404).send(err));
});

module.exports = app;
