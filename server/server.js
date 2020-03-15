const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());

// Main pages
app.use('/', require('./routes/index'));

// Login / Logout pages
app.use('/users', require('./routes/users'));

// Exercise Data / Images
app.use('/api/exercise_data', require('./routes/api/exercise_data'));

// User Workouts (not needed atm)
app.use('/api/workouts', require('./routes/api/workouts'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
