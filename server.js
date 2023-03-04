// external
const express    = require('express'),
      path       = require('path')
      bodyParser = require('body-parser');

// Internal
const InitiateMongoServer = require('./config/db'),
      user                = require('./routes/user');

InitiateMongoServer();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '/public')));
// Handle GET requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});
app.get('/sign-up', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use('/user', user);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});