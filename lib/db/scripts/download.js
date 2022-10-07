const fs = require("fs");
const AdmZip = require("adm-zip");
const request = require('superagent');

const dataUrl = 'https://s3-us-west-2.amazonaws.com/com.guild.us-west-2.public-data/project-data/the-movies-dataset.zip';
const zipFileName = 'the-movies-dataset.zip';
const outputDir = '../../../data/';

(async function downloadData() {
    console.log(`downloading data from ${dataUrl}`);
    try {
        request
            .get(dataUrl)
            .on('error', function(error) {
                console.log(error);
            })
            .pipe(fs.createWriteStream(zipFileName))
            .on('finish', function() {
                console.log('finished downloading');
                var zip = new AdmZip(zipFileName);
                console.log(`start unzip and extract to ${outputDir}`);
                zip.extractAllTo(outputDir);
                console.log('finished unzip');
            });
    } catch (err) {
        console.log('Error: ', err);
    }

})();
