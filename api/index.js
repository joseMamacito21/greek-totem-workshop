const express = require('express');
const mongoose = require('mongoose');
const { mongoURI } = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/Item');

mongoose.connect(mongoURI, { useNewUrlParser: true }, () => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

const app = express();

app.use(bodyParser.json());

require('./routes/itemRoutes')(app);

app.listen(3001, () => console.log('Listening on port 3001'));