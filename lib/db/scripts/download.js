const Dataset = require('../../../model/Dataset');

(async function downloadData() {
    new Dataset().downloadData();
})();
