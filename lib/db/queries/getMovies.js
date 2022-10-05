const { dbQuery } = require("../conn");

async function getMovies() {
  const query = `SELECT * FROM movies;`
  let result = await dbQuery(query);
  return result
}

module.exports = getMovies;
