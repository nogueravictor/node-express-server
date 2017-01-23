// node modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// init express
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log+'\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs',{
//     pageTitle: 'Under Maintenance',
//     comingSoon: `We'll be back soon`
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
// http handlers
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome',
    welcomeMessage: 'This is my brand new NodeJS Site!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'There\'s been an error with your request'
  });
});

// start listening
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});