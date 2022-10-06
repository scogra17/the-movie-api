const Dataset = require('../../../model/Dataset');

(async function seedData() {
    new Dataset().extractData({rowsToProcess: 200});
})();
