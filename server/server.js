const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
app.use(cors());

// User Data
app.use('/users', require('./routes/users'));

// Workout Data
app.use('/workouts', require('./routes/workouts'));

// Exercise Data / Images
app.use('/api/exercise_data', require('./routes/api/exercise_data'));

// User Workouts (not needed atm)
app.use('/api/workouts', require('./routes/api/workouts'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
