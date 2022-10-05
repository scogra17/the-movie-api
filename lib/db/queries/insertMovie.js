const { dbQuery } = require("../conn");

async function insertMovie({title, releaseDate, budget, revenue, voteAverage, voteCount}) {
  const query = `
    INSERT INTO movies (title, release_date, budget, revenue, vote_average, vote_count) 
    VALUES ('${title}', '${releaseDate}', ${budget}, ${revenue}, ${voteAverage}, ${voteCount})
    RETURNING id;
  `
  const result = await dbQuery(query);
  return result.rows[0];
}

module.exports = insertMovie;
