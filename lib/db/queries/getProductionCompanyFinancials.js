const { dbQuery } = require("../conn");

async function getProductionCompanyFinancials({releaseYear, productionCompanyId }) {
  const query = `
    WITH production_company_annual_revenue AS (
    SELECT 
      mpc.name,
      mpc.production_company_id,
      EXTRACT(year from m.release_date) AS release_year,
      m.budget,
      m.revenue
    FROM movies m 
      JOIN movies_production_companies mpc ON mpc.movie_id = m.id
    ${ productionCompanyId ? 'WHERE production_company_id = ' + productionCompanyId : '' }
    )
    SELECT
      name,
      production_company_id,
      release_year,
      SUM(budget) AS budget,
      SUM(revenue) AS revenue
    FROM production_company_annual_revenue
    ${ releaseYear ? 'WHERE release_year = ' + releaseYear : '' }
    GROUP BY 1,2,3
    ORDER BY 2, 3 DESC
    ;
  `
  let result = await dbQuery(query);
  return result.rows
}

module.exports = getProductionCompanyFinancials;
