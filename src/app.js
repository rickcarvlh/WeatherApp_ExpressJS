const express = require('express');

const app = express();

/* domain example -> one expre server , diferent routes 
    app.com
    app.com/help
    app.com/about
*/

// * Routes
//  req -> resquest res -> response
app.get('', (req, res) => {
  // send data to the requester
  res.send('<h1>Hello express!</h1>');
});

app.get('/help', (req, res) => {
  res.send([
    {
      name: 'Ricardo',
    },
    {
      name: 'Jorge',
    },
  ]);
});

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>');
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
