const express = require('express');
const queries = require('./lib/db/queries/index');
const Dataset = require('./model/Dataset');
require('dotenv').config();
const routes = require('./routes/api');
const PORT = process.env.PORT || 5001;
const app = express();
app.use('/api', routes);

(async function seedData() {
  const movies = await queries.getMovies();
  if (movies.length === 0) {
    new Dataset().extractData({rowsToProcess: 200});
  }
})();

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server running on Port ', PORT);
});
