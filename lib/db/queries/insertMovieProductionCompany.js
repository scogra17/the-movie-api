const { dbQuery } = require("../conn");

async function insertMovieProductionCompany({movieId, productionCompany}) {
  const query = `
    INSERT INTO movies_production_companies (movie_id, name) 
    VALUES ('${movieId}', '${productionCompany}')
    RETURNING id;
  `
  const result = await dbQuery(query);
  return result.rows[0];
}

module.exports = insertMovieProductionCompany;
