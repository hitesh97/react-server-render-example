const path = require('path');

const outFolder = path.join(__dirname, '../dist/public');
const srcFolder = path.join(__dirname, '../src');
const mainOutfolder = path.join(__dirname, '../dist');

module.exports = {
    outputDir: outFolder,
    srcDir: srcFolder,
    mainOutDir: mainOutfolder
};
