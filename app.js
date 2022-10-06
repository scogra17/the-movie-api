const express = require('express');
require('dotenv').config();
const routes = require('./routes/api');
const PORT = process.env.PORT || 5001;
const app = express();
app.use('/api', routes);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server running on Port ', PORT);
});
