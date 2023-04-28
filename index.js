const express = require('express');
const app = express();
const cors = require('cors')

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
