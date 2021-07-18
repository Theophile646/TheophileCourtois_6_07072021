const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require("helmet");
const cookieSession = require('cookie-session');



const Sauce = require('./models/sauce'); // needed ?
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauces');


// Connection to the database
mongoose.connect('mongodb+srv://<username>:<password>@sopeck.uhqni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  // creation of the express application
const app = express();

// Access to the API from any origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Setting up cookies in http only
app.use(cookieSession ({
  secret: "s3Cur3",
  cookie: {
    secure: true,
    httpOnly: true, 
    domain: 'http://localhost:3000'
  }
})
);

// Parsing of request sent by the client
app.use(bodyParser.json());

// Add extra response header for more security 
app.use(helmet());

// Load files inside images directory
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;