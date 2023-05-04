require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');

const baseUrl = process.env.BASE_URL || 'https://api.v2.emissions-api.org/api/v2';

router.get('/:country', async (req, res) => {
  const country = req.params.country;

  const url = `${baseUrl}/carbonmonoxide/statistics.json?country=${country}&begin=2019-02-01&end=2019-03-01`
  
  try {
      const response = await axios.request(url)
      const result = response.data

      const resultString = JSON.stringify(result)

      res.set('Cache-Control', 'max-age=3600');
      res.send(resultString)

  } catch (err) {
    res.status(500).send(`Internal Server Error: ${err.message} (check country code)`)
  }
});

module.exports = router;
