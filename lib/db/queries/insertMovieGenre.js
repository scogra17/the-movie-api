const { dbQuery } = require("../conn");

async function insertMovieGenre({movieId, genre}) {
  const query = `
    INSERT INTO movies_genres (movie_id, name) 
    VALUES ('${movieId}', '${genre}')
    RETURNING id;
  `
  const result = await dbQuery(query);
  return result.rows[0];
}

module.exports = insertMovieGenre;
