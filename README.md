# About
This repository contains code for accessing the [2017 MovieLens dataset ](https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset). It provides an API with endpoints for the following (see section "API" below for more detail): 
- retrieve annual production company budget and revenue 
- retrieve the annual most popular movie genre

More recent MovieLens datasets are available [here](https://grouplens.org/datasets/movielens/).

# API

## GET /api/production_companies/financials[?year=YEAR&production-company-id=PRODUCTION-COMPANY-ID]
Get production company budget and revenue by year. 

The query parameters `year` and `production-company-id` are optional.

### Successful response 
200 status code and results JSON

### Example response
```json
[
    {
        "name": "Walt Disney Pictures",
        "production_company_id": 2,
        "release_year": "1995",
        "budget": "55000000",
        "revenue": "346079773"
    },
    {
        "name": "Pixar Animation Studios",
        "production_company_id": 3,
        "release_year": "1995",
        "budget": "30000000",
        "revenue": "373554033"
    },
    {
        "name": "Paramount Pictures",
        "production_company_id": 4,
        "release_year": "1995",
        "budget": "237169363",
        "revenue": "207368226"
    }
]
```

## GET /api/genres[?year=YEAR]
Get the most popular genre by year. 

The query parameter `year` is optional.

### Successful response 
200 status code and results JSON

### Example response 
```json
[
    {
        "release_year": "1995",
        "genre": "Drama"
    }
]
```

# Running the app

## Via Docker (recommended)
* install docker (see 'Installing Docker' below)
* navigate to the project root: `$ cd /the-movies-api`
* create an .env file at the project root: `$ touch .env` and add the necessary environment variables (see 'Environment variables' below)
* build the images (server and db) and start the containers: `$ docker-compose up`
* create the db tables: `$ docker exec the-movies-api-server-1 npm run dbMigrate`
* download the movies data: `$ docker exec the-movies-api-server-1 npm run dbDataDownload`
* seed the db tables: `$ docker exec the-movies-api-server-1 npm run dbSeed`

## Installing Docker
* run `$ docker -v` to determine if you already have Docker installed
* if you do not have docker installed, install following instructions [here](https://www.docker.com/products/docker-desktop/)

### Useful Docker commands
* `$ docker-compose down`: stop containers
* `$ docker-compose up --build -d`: restart containers and rebuild images where there's been edits made

## Envrionment variables
These are the environment variables needed in the root level `.env` file: 
```txt
PORT=3001
DB_PW=password
DB_HOST=db
DB_USER=postgres
DB_NAME=postgres
DB_PORT=5432
```

You may change the `DB_USER` or `DB_PW` variables but you will need to make a corresponding change to `docker-compose.yml`

## Run locally (not recommended)
* navigate to the project root: `$ cd /the-movies-api`
* install dependencies: `$ npm install`
* create an .env file at the project root: `$ touch .env` and add the necessary 
environment variables (see 'Environment variables' above)
* create a local database (see 'Create local database' below) 
* run the app via: `$ npm run dev`

### Create local database
* run `$ psql --version` to determine if you already have Postgres installed
* if you do not have Postgres installed, install following instructions [here](https://www.postgresql.org/download/)
* start postgres: `$ psql postgres`
* navigate to the project root: `$ cd /the-movies-api`
* update values in the `.env` file as necessary (e.g. update `DB_HOST` from 'db' to 'localhost')
* create the db tables: `$ npm run dbMigrate`
* download the movies data: `$ npm run dbDataDownload`
* seed the db tables: `$ npm run dbSeed`

## cURL examples
* Get the most popular genre by year: `curl localhost:3001/api/genres`
* Get the most popular genre in 1997: `curl localhost:3001/api/genres?year=1997`
* Get the financials for production companies by year: `curl localhost:3001/api/production-companies/financials`
* Get the financials for production companies in 1992: `curl localhost:3001/api/production-companies/financials?year=1992`
* Get the financials for Disney by year: `curl localhost:3001/api/production-companies/financials?production-company-id=2`
* Get the financials for Disney in 1992: `curl 'localhost:3001/api/production-companies/financials?production-company-id=2&year=1992'`

# Testing 

# Data model
All of the data needed to meet the requirements was contained within a single file, `movies_metadata.csv`. 

From this data I created modeled three tables, `movies`, `movies_genres` and `movies_production_companies`. See the ERD [here](https://drive.google.com/file/d/1PY8HON2b_8PdxanT0VQSvutrsu7KTNWV/view?usp=sharing). 

A next step, as discussed below, would be to further normalize this data by extracting the genre and production company names to separate lookup tables. An ERD for that future model is also presented [here](https://drive.google.com/file/d/1PY8HON2b_8PdxanT0VQSvutrsu7KTNWV/view?usp=sharing). 

# Notes and assumptions
## Most popular genre by year
There are a number of interpretations of the most "popular" genre by year. It could mean the genre with: 
* The highest cumulative revenue
* The highest weighted average audience score
* The highest quantities of movies

And perhaps other interpretations. For the sake of the `GET /genre` endpoint, I decided to use the first interpretations above: the highest cumulative revenue. 

## Requirement: query parmeters 
The requirements specify query params that need to be supported for each endpoint. They don't, however, specify whether these params are required or optional. I decided to make the API more flexible and make the query params optional.

## Response structure
The grouping of the response for the production company endpoint can be done by year or by production company. I chose to group by company. This means for instance, if no `year` query parameter is included, all of the annual groupings for a single production company will be listed before the first result for the next production company. 

## Inconsistent data
While ingesting the `movies_metadata.csv` into Postgres I encountered an issue where at least one of the rows (movie: 'Midnight Man') had fewer columns (10) than the majority of the dataset (24 columns). This caused a parser error, which was only tolerated after specifying a true `relax_column_count` parameter. More info [here](https://csv.js.org/parse/options/relax_column_count/).


# Next steps / improvements
## Use COPY rather than INSERT
The data is currently moved from a .csv to Postgres using `INSERT` for it's flexibility. To ingest data more efficiently, in the future this could be migrated to `COPY`. More info [here](https://www.postgresql.org/docs/current/populate.html#:~:text=Use%20COPY%20to%20load%20all,overhead%20for%20large%20data%20loads.). 

## Further normalize data 
* Create a `genres` table 
* Create a `production_companies` table
* Handle edge cases in .csv reads (we're currently discarding rows that aren't processed correctly)

## Clean data / handle errors
Currently, for the sake of expediency, the data ingestions from .csv to Postgres is discarding rows that can't be parsed as expected. An improvement to the API would be to better undestand these data inconsistencies and attempt to fix them. 
