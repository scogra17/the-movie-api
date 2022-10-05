const express = require('express');
require('dotenv').config();
const { isS3Bucket } = require('./utils/helpers');
const Dataset = require('./model/Dataset');
const routes = require('./routes/api');
const PORT = process.env.PORT || 5001;
const app = express();

process.argv.forEach((val) => {
  if (isS3Bucket(val)) {
    const dataset = new Dataset(val);
    dataset.extractData();
  }
});

app.use('/api', routes);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server running on Port ', PORT);
});
