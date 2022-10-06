const { dbQuery } = require("../conn");

async function getMovies() {
  const query = `SELECT * FROM movies;`
  let result = await dbQuery(query);
  
  if (result) {
    return result.rows;
  } 
}

module.exports = getMovies;
