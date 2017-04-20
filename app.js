const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to Database: '+config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database ERROR: '+err);
});

const app = express();
const users = require('./routes/users');

// Set Port
const port = 3000;

// CORS middleware
app.use(cors())

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users)

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Start server
app.listen(port, () => {
    console.log('Server started on port '+port);
});

