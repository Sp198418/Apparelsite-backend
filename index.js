const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./queries');
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (request, response) => {
    response.json({info: 'Personal Project API'})
});

app.get('/products', db.getAllProducts);

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
});