// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var foodController = require('./controllers/foods');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var clientController = require('./controllers/client');
var port = process.env.PORT || 3000;


// Connect to the MongoDB
mongoose.connect('mongodb://localhost:27017/health')

// Create our Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// User the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'You are running on yopachara!' });
});


router.route('/api/foods')
    .post(authController.isAuthenticated, foodController.postFoods)
    .get(authController.isAuthenticated, foodController.getFoods);

router.route('/api/foods/:food_id')
    .get(authController.isAuthenticated, foodController.getFood)
    .put(authController.isAuthenticated, foodController.putFood)
    .delete(authController.isAuthenticated, foodController.deleteFood);

// Create endpoint handlers for /users
router.route('/api/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /clients
router.route('/api/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/api/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/api/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);

// Register all our routes
app.use(router);

// Start the server
app.listen(port);
console.log('server start on port 3000');

