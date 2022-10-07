const queries = require("../lib/db/queries/index");

const getMovieGenre = async (req, res) => {
  try {
    const data = await queries.getMostPopularGenre(req.query.year);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).message('Error: ', err);
  }
}

exports.getMovieGenre = getMovieGenre;
