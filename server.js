// external
const express    = require('express'),
      path       = require('path')
      bodyParser = require('body-parser');

// Internal
const InitiateMongoServer = require('./config/db'),
      user                = require('./routes/user'),
      asset               = require('./routes/asset');

InitiateMongoServer();

const app = express();
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '/public')));
// Handle GET requests to the root URL

// Note that we are using render, because we are serving dynamically with ejs
app.get('/', (req, res) => {
  res.render('index.ejs', {activeUsers:'14'});
});
app.get('/dashboard', (req, res) => {
  res.render('index.ejs');
});
app.get('/asset', (req, res) => {
  res.render('asset.ejs');
});
app.get('/login', (req, res) => {
  res.render('login.ejs');
});
app.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use('/user', user);
/**
 * Router Middleware
 * Router - /asset/*
 * Method - *
 */
app.use('/asset', asset);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});