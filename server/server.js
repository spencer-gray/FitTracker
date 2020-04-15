const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');


const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let users = [];
let messages = [];

// Middleware
app.use(cors());

const Chat = require('./models/Chat');

// Connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://sg:2utryeDeBZ9UMqUm@csci3230u-project-npzhs.mongodb.net/csci3230u-project?retryWrites=true&w=majority', 
{   useUnifiedTopology: true , 
    useNewUrlParser: true });

Chat.find((err, result) => {
    if (err) {
        throw err;
    } else {
        message = result;
    }
})

// Chatroom handling (Work on cleaning up the routing)
io.on("connection", socket => {
    socket.emit('initialize', {
        users: users.map(s => s.username),
        messages: messages
    });

    socket.on('newuser', username => {
        //console.log(`${username} has arrived at the chatroom.`);
        socket.username = username;
        
        users.push(socket);

        io.emit('userJoined', socket.username);
    });

    socket.on('message', msg => {
        let message = new Chat({
            username: socket.username,
            msg: msg
        });

        message.save((err, result) => {
            if (err) {
                throw err;
            }

            messages.push(result);

            io.emit('message', result);
        });
    });
    
    socket.on("disconnect", () => {
        //console.log(`${socket.username} has left the chatroom.`);
        io.emit("userLeft", socket.username);
        users.splice(users.indexOf(socket), 1);
    });
});

// Routes

// User Data
app.use('/users', require('./routes/users'));

// User Workout Data
app.use('/workouts', require('./routes/workouts'));

// Chatroom Data
app.use('/chat', require('./routes/chatroom'));

// Exercise Data / Images
app.use('/api/exercise_data', require('./routes/api/exercise_data'));

// User Food Diaries
app.use('/food-diaries', require('./routes/food-diaries'));

const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Server started on port ${port}`));
