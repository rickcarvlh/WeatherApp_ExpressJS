const path = require('path');
const express = require('express');

console.log(__dirname);
// to serve the public directory
console.log(path.join(__dirname, '../public'));

const app = express();

// * Define path for express configuration
const publicDirectory = path.join(__dirname, '../public');
// changing from views to templates
const viewsPath = path.join(__dirname, '../templates');

// * Setup handlebars and views location
app.set('view engine', 'hbs');
// needed if i want to change default folder name
app.set('views', viewsPath);

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
  });
});

app.get('/weather', (req, res) => {
  res.send([
    {
      forcast: 'It is snowing',
    },
    {
      location: 'Seixal',
    },
  ]);
});

// for secure conections it's diferent
// start the express server - dev port 30000
app.listen(3000, () => {
  console.log('Server is up on port 30000');
});
