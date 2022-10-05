CREATE TABLE movies (
  id serial PRIMARY KEY,
  title text NOT NULL UNIQUE
);

CREATE TABLE movies_genres (
  id serial PRIMARY KEY,
  movie_id INT
    NOT NULL
    REFERENCES movies (id)
    ON DELETE CASCADE,
  genre TEXT NOT NULL
);

CREATE TABLE movies_production_companies (
  id serial PRIMARY KEY,
  movie_id INT
    NOT NULL
    REFERENCES movies (id)
    ON DELETE CASCADE,
  production_company TEXT NOT NULL
);
