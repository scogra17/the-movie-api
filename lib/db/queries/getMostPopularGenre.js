const { dbQuery } = require("../conn");

async function getMostPopularGenre(releaseYear) {
  const query = `
    WITH genre_revenue_by_year AS (
      SELECT
        mg.name AS genre,
        extract(year from release_date) AS release_year,
        SUM(m.revenue) AS revenue
      FROM movies m
        JOIN movies_genres mg ON mg.movie_id = m.id
      GROUP BY 1, 2
    ), top_revenue_genre_by_year AS (
      SELECT 
        genre,
        release_year,
        ROW_NUMBER() OVER (PARTITION BY release_year ORDER BY revenue DESC) AS rank
      FROM genre_revenue_by_year
      ${ releaseYear ? 'WHERE release_year = ' + releaseYear : ''}
    )
    SELECT 
      release_year,
      genre
    FROM top_revenue_genre_by_year
    WHERE rank = 1
    ORDER BY 1 DESC;
  `
  let result = await dbQuery(query);
  return result.rows
}

module.exports = getMostPopularGenre;
