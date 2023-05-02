const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const methaneRoute = require('./src/routes/Methane')
const countryRoute = require('./src/routes/Country.js')
const carbonmonoxideRoute  = require('./src/routes/CarbonMonoxide')

app.use('/methane', methaneRoute)
app.use('/countries', countryRoute)
app.use('/carbonmonoxide', carbonmonoxideRoute)

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors())

app.get('/nitrogendioxide', async (req, res) => {
    const url = 'https://api.v2.emissions-api.org/api/v2/nitrogendioxide/statistics.json?country=US&begin=2019-02-01&end=2019-03-01'

    try {
        const response = await axios.request(url)
        const result = response.data

        const resultString = JSON.stringify(result)
       
        res.send(resultString)

    } catch (err) {
        res.status(500).send(err)
    }
});

app.listen(3000, () => console.log('listening on port 3000'))
