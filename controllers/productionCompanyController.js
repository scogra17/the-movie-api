const queries = require("../lib/db/queries/index");

const getProductionCompanyFinancials = async (req, res) => {
  const productionCompanyId = req.query['production-company-id'];
  const releaseYear = req.query.year;
  const data = await queries.getProductionCompanyFinancials({ productionCompanyId, releaseYear });
  res.status(200).json(data);
}

exports.getProductionCompanyFinancials = getProductionCompanyFinancials;
