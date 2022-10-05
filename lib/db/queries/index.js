const getMovies = require("./getMovies");
const insertMovie = require("./insertMovie");
const insertMovieGenre = require("./insertMovieGenre");
const insertMovieProductionCompany = require("./insertMovieProductionCompany");
const getMostPopularGenre = require("./getMostPopularGenre")

module.exports = {
  getMovies,
  insertMovie,
  insertMovieGenre,
  insertMovieProductionCompany,
  getMostPopularGenre
}
