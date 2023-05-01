const express = require('express');
const router = express.Router();
const axios = require('axios');
const cors = require('cors');

router.use(cors());

router.get('/', async (req, res) => {
  const url = 'https://api.v2.emissions-api.org/api/v2/countries.json'
  try {
      const response = await axios.request(url)
      const result = response.data

      const resultString = JSON.stringify(result)

      // res.set('Cache-Control', 'max-age=3600');
      res.send(resultString)

  } catch (err) {
      res.status(500).send("Internal Server Error")
  }
})

module.exports = router;
