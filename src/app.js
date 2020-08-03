const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./shared/geocode');
const forecast = require('./shared/forecast');

console.log(__dirname);
// to serve the public directory
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// * Define path for express configuration
const publicDirectory = path.join(__dirname, '../public');
// changing from views to templates
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// * Setup handlebars, views location, partials location
app.set('view engine', 'hbs');
// needed if i want to change default folder name
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// * Setup static directory to serve static files
app.use(express.static(publicDirectory));

/* domain example -> one expre server , diferent routes 
    app.com
    app.com/help
    app.com/about
*/

// * Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ricardo Carvalho',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Ricardo Carvalho',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    description: 'This is the help page',
    name: 'Ricardo Carvalho',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address',
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// query string
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  // console.log(req.query);
  res.send({
    products: [],
  });
});

// * 404 pages
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ricardo Carvalho',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ricardo Carvalho',
    errorMessage: 'Page not found',
  });
});

// for secure conections it's diferent
// * start the express server - dev port 30000
app.listen(port, () => {
  console.log('Server is up on port 30000' + port);
});
