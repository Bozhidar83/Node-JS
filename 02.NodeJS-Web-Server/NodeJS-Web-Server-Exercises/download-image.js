// this module downloads an image the user has entered
var http = require('http')
var https = require('https')
var fs = require('fs')
var imageDirPath = './content/images/'
var detailsDirPath = './content/images/details/'
var imageFileExtension = '.jpg'

function downloadImage (imageUrl, imagePath, callback) {
  var image = fs.createWriteStream(imagePath)

  // request for the image
  if (imageUrl.startsWith('https')) {
    https.get(imageUrl, function (response) {
      response.pipe(image)
    })
  } else {
    http.get(imageUrl, function (response) {
      response.pipe(image)
    })
  }

  callback()
}

// create the image folder and details if it doesnt exist
fs.stat(imageDirPath, function(err, stats) {
  if (err !== null && err.code === 'ENOENT') {
    // file does not exist
    fs.mkdirSync(imageDirPath)
    fs.mkdirSync(detailsDirPath)
  } else if (err) {
    console.log(err.message)
  }
})

module.exports = function(imageUrl, imageTitle, imageIndex) {
  // downloads the image
  downloadImage(imageUrl, detailsDirPath + imageIndex + imageFileExtension, function () {
    console.log('Done downloading image "' + imageTitle + '"')
  })
}