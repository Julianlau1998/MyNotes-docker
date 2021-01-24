const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000

var cors = require('cors');

// use it before all route definitions
//app.use(cors({origin: 'http://localhost:8080'}));
app.use(cors({origin: 'http://192.168.178.46:8080'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
const fs = require('fs')
const routes = require('./routes/routes.js')(app, fs);