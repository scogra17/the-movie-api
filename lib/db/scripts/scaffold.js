const { dbQuery } = require("../conn");

(async function scaffoldDb() {
  console.log('Scaffolding database')
  const query = `
    DROP TABLE IF EXISTS movies_production_companies;
    DROP TABLE IF EXISTS movies_genres;
    DROP TABLE IF EXISTS movies;

    CREATE TABLE movies (
      id serial PRIMARY KEY,
      title text NOT NULL,
      release_date TIMESTAMP,
      budget INT,
      revenue INT,
      vote_average NUMERIC,
      vote_count INT 
    );
    
    CREATE TABLE movies_genres (
      id serial PRIMARY KEY,
      movie_id INT
        NOT NULL
        REFERENCES movies (id)
        ON DELETE CASCADE,
      name TEXT NOT NULL
    );
    
    CREATE TABLE movies_production_companies (
      id serial PRIMARY KEY,
      movie_id INT
        NOT NULL
        REFERENCES movies (id)
        ON DELETE CASCADE,
      name TEXT NOT NULL,
      production_company_id INT
    );
  `
  await dbQuery(query);
})();
