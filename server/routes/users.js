
const express = require('express');
const jwt = require('jsonwebtoken');
//const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const users = express.Router();

// Might need to use the cors lib here
//users.user(cors());

process.env.SECRET_KEY = 'secret'

// Get users
// users.get('/', async (req, res) => {
//     const users = await loadUsersCollection();
//     res.send(await users.find({}).toArray());   // return all users
// });

// Add users / Register handling
// users.post('/register', async (req, res) => {
//     const today = new Date();
//     const userData = {
//         username: req.body.username,
//         password: req.body.password,
//         created: today
//     }

//     User.findOne({
//         username: req.body.username
//     }).then(user => {
//         if (!user) {
//             bcrypt.hash(req.body.password, 10, (err, hash) => {
//                 userData.password = hash;
//                 User.create(userData)
//                     .then(user => {
//                         res.json({ status: user.username + 'Successfully Registered!' })
//                     })
//                     .catch(err => {
//                         res.send('error: ' + err);
//                     });
//             })
//         } else {
//             res.json({ error: 'User already exists' });
//         }
//     })
//     .catch(error => {
//         res.send('error: ' + err);
//     });
// });

// Check for existing user / Login component
users.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                // Passwords match
                const payload = {
                    _id: user._id,
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token);
            } else {
                // Passwords do not match
                res.json({ error: 'User does not exist' });
            }
        } else {
            res.json({ error: 'User does not exist' });
        }
    }).catch(error => {
        res.send('error: ' + error);
    })
})



// load users
// async function loadUsersCollection() {
//     const client = await mongodb.MongoClient.connect('mongodb+srv://sg:2utryeDeBZ9UMqUm@csci3230u-project-npzhs.mongodb.net/test?retryWrites=true&w=majority', {
//         useUnifiedTopology: true,
        
//     });

//     return client.db('csci3230u-project').collection('users');
// }

module.exports = users;
