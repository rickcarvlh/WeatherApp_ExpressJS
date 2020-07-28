const path = require('path');
const express = require('express');

console.log(__dirname);
// to serve the public directory
console.log(path.join(__dirname, '../public'));

const app = express();
const publicDirectory = path.join(__dirname, '../public');

// set template engine used by us
app.set('view engine', 'hbs');
app.use(express.static(publicDirectory));

/* domain example -> one expre server , diferent routes 
    app.com
    app.com/help
    app.com/about
*/

// * Routes
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
