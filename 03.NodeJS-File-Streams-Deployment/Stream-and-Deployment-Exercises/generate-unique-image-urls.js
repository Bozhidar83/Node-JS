var shortId = require('shortid')
var fs = require('fs')
var imageUrlsPath = './image-urls.json'

if (!fs.exists(imageUrlsPath)) {
  fs.writeFile(imageUrlsPath, '{}')
}

function updateJSONFile (imagePath, imageName) {
  var imageUrl = '/' + shortId.generate();
  var parsedJSON = require('./image-urls')
  // update the json
  parsedJSON[imageUrl] = {'path': imagePath, 'name': imageName}
  console.log('The hidden URL of ' + imageName + ' is: ' + imageUrl)
  // save the file
  fs.writeFile('./image-urls.json', JSON.stringify(parsedJSON))
}

module.exports = function (imagePath, imageName) {
  updateJSONFile(imagePath, imageName)
}