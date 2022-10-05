const queries = require("../lib/db/queries/index");

const getMovieGenre = async (req, res) => {
  const data = await queries.getMostPopularGenre(req.query.year);
  console.log('genre data: ', data);
  res.status(200).json(data);
}

exports.getMovieGenre = getMovieGenre;
