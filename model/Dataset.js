const fs = require('fs');
const unzip = require('unzip');
const { info } = require("../utils/logger");

class Dataset {
  constructor(dataUrl) {
    this.dataUrl = dataUrl;
  }

  extractData() {
    info(`extracting data from: ${this.dataUrl}`)
    fs.createReadStream(this.dataUrl)
      .pipe(unzip.Extract({ path: '../data' }));
  }
}

module.exports = Dataset;
