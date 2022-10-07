const fs = require("fs");
const { parse } = require("csv-parse");
const queries = require("../lib/db/queries/index");
const { strToArr } = require("../utils/helpers");
const AdmZip = require("adm-zip");
const path = require("path");
const request = require('superagent');

class Dataset {
  constructor(dataUrl = 'https://s3-us-west-2.amazonaws.com/com.guild.us-west-2.public-data/project-data/the-movies-dataset.zip') {
    this.dataUrl = dataUrl;
    this.extractFileName();
    this.outputDir = 'data/'
  }

  extractFileName() {
    this.zipFileName = this.dataUrl.split('/').slice(-1)[0];
  }

  downloadData() {
    const that = this;
    request
      .get(this.dataUrl)
      .on('error', function(error) {
        console.log(error);
      })
      .pipe(fs.createWriteStream(this.zipFileName))
      .on('finish', function() {
        console.log('finished downloading');
        var zip = new AdmZip(that.zipFileName);
        console.log(`start unzip and extract to ${that.outputDir}`);
        zip.extractAllTo(that.outputDir);
        console.log('finished unzip');
    });
  }

  extractDataToDb() {
    console.log('extracting data!');
    fs.createReadStream("./data/movies_metadata.csv")
      .pipe(parse({ delimiter: ",", from_line: 2, relax_column_count: true }))
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
          if (title && budget && revenue && voteAverage && voteCount && productionCompanies && genres && releaseDate && Array.isArray(genres) && Array.isArray(productionCompanies)) {
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
              queries.insertMovieProductionCompany({movieId, productionCompany: company.name, productionCompanyId: company.id })
            });
          }
        } catch (err) {
          console.log('Error: ', err);
        }
      })
  }
}

module.exports = Dataset;
