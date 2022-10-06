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
* seed the db tables: `$ npm run dbSeed`

## cURL examples

# Testing 

# Data model

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

# Design decisions
## Using a Postgres vs. keeping the data in memory

## Handling data filtering/munging in SQL

# Next steps / improvements
## Use COPY rather than INSERT

## Further normalize data 
* Create a `genres` table 
* Create a `production_companies` table
* Handle edge cases in .csv reads (we're currently discarding rows that aren't processed correctly)

