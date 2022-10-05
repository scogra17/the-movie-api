const express = require('express');
const router = express.Router();
const productionCompanyController = require('../controllers/productionCompanyController');
const movieGenreController = require('../controllers/movieGenreController');

router.get('/production_companies/financials', productionCompanyController.getProductionCompanyFinancials);
router.get('/genres', movieGenreController.getMovieGenre);

module.exports = router;
