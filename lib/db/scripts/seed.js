const fs = require("fs");
const { parse } = require("csv-parse");
const queries = require("../queries/index");
const { strToArr } = require("../../../utils/helpers");

const csvFileName = "../../../data/movies_metadata.csv";

(async function seedData() {
    console.log(`extracting data from ${csvFileName}`);
    fs.createReadStream(csvFileName)
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
        } catch (err) {
            console.log('Error: ', err);
        }
        })
})();
