
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');


const User = require('../models/User');

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

app.post('/register', (req, res, next) => {
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    console.log(newUser);
    newUser.save(err => {
        if (err) {
            return res.status(400).json({
                title: 'error',
                error: 'email or username already in use'
            })
        } else {
            return res.status(200).json({
                title: 'signup successful'
            })
        }
    })
});

app.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) return res.status(500).json({
            title: 'server error',
            error: err
        })
        if (!user) {
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            })
        }
        // incorrect password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid credentials'
            })
        }
        // password correct, create token
        else {
            let token = jwt.sign({ userId: user._id }, 'secretkey');
            return res.status(200).json({
                title: 'login success',
                token: token
            })
        }
    })
})

// Get user data
app.get('/', (req, res, next) => {
    let token = req.headers.token;
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                title: 'Unauthorized'
            });
        } else {
            // token is valid
            User.findOne({ _id: decoded.userId }, (err, user) => {
                if (err) {
                    return console.log(err);
                } else {
                    return res.status(200).json({
                        title: 'User retrieved',

                        // limit the data provided to client (safety measure)
                        user: {
                            email: user.email,
                            username: user.username
                        }
                    })
                }
            })
        }
    })
});



module.exports = app;
