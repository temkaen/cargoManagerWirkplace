const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const DEFAULT_PORT = 3000;
const companiesRoute = require('./routes/companiesRoute.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(
  companiesRoute
);

app.listen(DEFAULT_PORT, () => console.log(`Server has been started (port ${DEFAULT_PORT})...`));
