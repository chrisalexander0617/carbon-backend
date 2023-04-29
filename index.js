const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cors())

app.get('/', (req, res) => {
    res.send("Home")
})

app.get('/countries', async (req, res) => {
    const url = 'https://api.v2.emissions-api.org/api/v2/countries.json'
    try {
        const response = await axios.request(url)
        const result = response.data

        const resultString = JSON.stringify(result)

        res.set('Cache-Control', 'max-age=3600');
        res.send(resultString)

    } catch (err) {
        res.status(500).send("Internal Server Error")
    }
})

app.get('/methane', async (req, res) => {
    console.log('Hitting the endpoint')
    const query = req.query
    console.log(query.query)
    
    const url = `https://api.v2.emissions-api.org/api/v2/methane/statistics.json?country=${query.query}&begin=2019-02-01&end=2019-03-01`
    
    try {
        const response = await axios.request(url)
        const result = response.data

        const resultString = JSON.stringify(result)

        res.set('Cache-Control', 'max-age=3600');
        res.send(resultString)

    } catch (err) {
        res.status(500).send("Internal Server Error")
    }
});

app.get('/ozone', async (req, res) => {
    const url  = 'https://api.v2.emissions-api.org/api/v2/ozone/statistics.json?country=US&begin=2019-02-01&end=2019-03-01'
    try {
        const response = await axios.request(url)
        const result = response.data

        const resultString = JSON.stringify(result)
       
        res.send(resultString)

    } catch (err) {
        res.status(500).send("Internal Server Error")
    }
});

app.get('/carbonmonoxide', async (req, res) => {
    const url = 'https://api.v2.emissions-api.org/api/v2/carbonmonoxide/statistics.json?country=US&begin=2019-02-01&end=2019-03-01'
    try {
        const response = await axios.request(url)
        const result = response.data

        const resultString = JSON.stringify(result)
       
        res.send(resultString)

    } catch (err) {
        res.status(500).send(err)
    }
});

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

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
