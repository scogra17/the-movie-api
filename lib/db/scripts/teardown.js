const { dbQuery } = require("../conn");

(async function tearDownDB() {
  console.log('Scaffolding database')
  const query = `
    DROP TABLE IF EXISTS movies_production_companies;
    DROP TABLE IF EXISTS movies_genres;
    DROP TABLE IF EXISTS movies;
  `
  await dbQuery(query);
})();
