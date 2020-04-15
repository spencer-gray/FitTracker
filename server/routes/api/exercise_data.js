/*
    API router
    exercise data from wger served on route /api/exercise_data
    images on route /api/exercise_data/images/<id>
*/

const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

// Get Exercise Data
router.get('/', async (req, res) => {
    const data = require('../../data/exercises.json');
    res.json(data);
});

//Get Exercise Images
router.get('/images/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(`http://wger.de/api/v2/exerciseimage/?exercise=${id}&format=json`)
        const data = await response.json();
        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;