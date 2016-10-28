/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint key-spacing: ["error", { align: "value" }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

require('dotenv').config();
const express         = require('express');
const logger          = require('morgan');
const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');
const path            = require('path');

// Set up routes
const homeRoute       = require('./routes/home');
const exploreRoute    = require('./routes/explore');
const searchRoute     = require('./routes/search');
const mapRoute        = require('./routes/maps');

const app             = express();
const PORT            = process.argv[2] || process.env.PORT || 3000;

// set up logger so that we can see what is happening
app.use(logger('dev'));

// set static assets path
app.use(express.static(path.join(__dirname, 'public')));

// set default templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware to receive form inputs
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for method override, allowing our deletes and puts to work
app.use(methodOverride('_method'));

// tell our server to listen to port
app.listen(PORT, () => console.log('Server is up and running on port ', PORT));

app.use('/', homeRoute);
app.use('/explore', exploreRoute);
app.use('/search', searchRoute);
app.use('/maps', mapRoute);

