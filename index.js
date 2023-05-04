const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const methaneRoute = require('./src/routes/Methane')
const countryRoute = require('./src/routes/Country.js')
const carbonmonoxideRoute  = require('./src/routes/CarbonMonoxide')

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors())

/* To use with server at https://carbon-backend-production.up.railway.app/ */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 
  next();
});

app.use('/methane', methaneRoute)
app.use('/countries', countryRoute)
app.use('/carbonmonoxide', carbonmonoxideRoute)

const port =  process.env.PORT || 3000

/* 0.0.0.0 required to use with external web server */
app.listen(port, '0.0.0.0', () => console.log('server started'))