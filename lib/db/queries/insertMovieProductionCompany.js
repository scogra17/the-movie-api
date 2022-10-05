const { dbQuery } = require("../conn");

async function insertMovieProductionCompany({movieId, productionCompany, productionCompanyId }) {
  const query = `
    INSERT INTO movies_production_companies (movie_id, name, production_company_id) 
    VALUES ('${movieId}', '${productionCompany}', ${productionCompanyId})
    RETURNING id;
  `
  const result = await dbQuery(query);
  return result.rows[0];
}

module.exports = insertMovieProductionCompany;
