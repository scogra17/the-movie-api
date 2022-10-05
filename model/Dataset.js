const fs = require("fs");
const { parse } = require("csv-parse");
const queries = require("../lib/db/queries/index");
const { strToArr } = require("../utils/helpers");

class Dataset {
  constructor(dataUrl = 'https://s3-us-west-2.amazonaws.com/com.guild.us-west-2.public-data/project-data/the-movies-dataset.zip') {
    this.dataUrl = dataUrl;
  }

  extractData({ rowsToProcess }) {
    console.log('extracting data!');
    fs.createReadStream("./data/the-movies-dataset/movies_metadata.csv")
      .pipe(parse({ delimiter: ",", from_line: 2, to_line: rowsToProcess }))
      .on("data", async function (row) {
        try {
          let title = row[20];
          let budget = row[2];
          let revenue = row[15];
          let voteAverage = row[22];
          let voteCount = row[23];
          let productionCompanies = strToArr(row[12]);
          let genres = strToArr(row[3]);
          let releaseDate = row[14];
          let { id: movieId } = await queries.insertMovie({
            title,
            releaseDate,
            budget,
            revenue,
            voteAverage,
            voteCount
          });
          genres.forEach(genre => {
            queries.insertMovieGenre({movieId, genre: genre.name})
          });
          productionCompanies.forEach(company => {
            queries.insertMovieProductionCompany({movieId, productionCompany: company.name})
          });
        } catch (err) {
          console.log('Error: ', err);
        }
      })
  }
}

module.exports = Dataset;