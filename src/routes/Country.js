require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

const baseUrl = process.env.BASE_URL || 'https://api.v2.emissions-api.org/api/v2';

router.get('/', async (req, res) => {
  const url = `${baseUrl}/countries.json`
  
  try {
      const response = await axios.request(url)
      const result = response.data

      const resultString = JSON.stringify(result)

      res.set('Cache-Control', 'max-age=3600');
      res.send(resultString)

  } catch (err) {
      res.status(500).send(`Internal Server Error: ${err.message}`)
  }
})

module.exports = router;
