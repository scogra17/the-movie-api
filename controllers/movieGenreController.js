const queries = require("../lib/db/queries/index");

const getMovieGenre = async (req, res) => {
  let movies = await queries.getMovies();
  console.log('movies: ', movies);
  res.status(200).send('getMovieGenre');
}

exports.getMovieGenre = getMovieGenre;
