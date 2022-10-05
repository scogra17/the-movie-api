const getProductionCompanyFinancials = async (req, res) => {
  res.status(200).send(`production company: ${req.query['production-company']}, year: ${req.query.year}`);
}

exports.getProductionCompanyFinancials = getProductionCompanyFinancials;
