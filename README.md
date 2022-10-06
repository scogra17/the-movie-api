# About
This repository contains code for accessing the [2017 MovieLens dataset ](https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset). It provides an API with endpoints for the following (see section "API" below for more detail): 
- retrieve annual production company budget and revenue 
- retrieve the annual most popular movie genre

More recent MovieLens datasets are available [here](https://grouplens.org/datasets/movielens/).

# API

## GET /api/production_companies/financials[?year=<YEAR>&production-company-id=<PRODUCTION-COMPANY-ID>]
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

## GET /api/genres[?year=<YEAR>]
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
## Installing dependencies
* navigate to the project root: `$ cd /the-movies-api`
* install dependencies via: `$ npm install`

## Run locally in development mode
* navigate to the project root: `$ cd /the-movies-api`
* [OPTIONAL] specify a custom PORT (default PORT is 5001):
  * create an `.env` file at the product root, i.e. `/the-movies-api`
  * specify a `PORT=<CUSTOM_PORT>` environment variable
* run the app via: `$ npm run dev`

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

