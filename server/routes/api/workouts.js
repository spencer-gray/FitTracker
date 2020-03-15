// Probably won't need this file

const express = require('express');
const fetch = require('node-fetch');
const mongodb = require('mongodb');

const router = express.Router();

// Get Workouts
router.get('/', async (req, res) => {
    const workouts = await loadWorkoutsCollection();
    res.send(await workouts.find({}).toArray());   // return all workouts
});

// Add Workouts
router.post('/', async (req, res) => {
    const workouts = await loadWorkoutsCollection();
    await workouts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete User
router.delete('/:id', async (req, res) => {
    const workouts = await loadWorkoutsCollection();
    await workouts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

// load workouts
async function loadWorkoutsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://sg:2utryeDeBZ9UMqUm@csci3230u-project-npzhs.mongodb.net/test?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        
    });

    return client.db('csci3230u-project').collection('workouts');
}

module.exports = router;