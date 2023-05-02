const express = require('express');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');

router.use(cors());
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow the specified HTTP methods
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Allow the specified headers
  next();
});

router.get('/:country', async (req, res) => {
  const country = req.params.country;

  const url = `https://api.v2.emissions-api.org/api/v2/carbonmonoxide/statistics.json?country=${country}&begin=2019-02-01&end=2019-03-01`
  
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

module.exports = router;
