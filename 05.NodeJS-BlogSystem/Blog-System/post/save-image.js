var fs = require('fs')

function copyFile (source, target, cb) {
  // copy the file from the source directory to the target directory
  // in the callback, print out an error
  var cbCalled = false

  var readStream = fs.createReadStream(source)
  readStream.on('error', function(err) {
    done(err)
  })

  var writeStream = fs.createWriteStream(target)
  writeStream.on('error', function(err){
    done(err)
  })

  readStream.pipe(writeStream)  // read the file and send it to our target destination

  function done (err) {
    if (!cbCalled) {
      cb(err)
      cbCalled = true
    }
  }
}

function downloadImage (imagePath, articleIndex, articles) {
  var imageDestinationPath = '/content/images/' + articleIndex + '/' + articleIndex + '.jpg'

  copyFile(imagePath, '.' + imageDestinationPath, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('File saved successfully to ' + '.' + imageDestinationPath)
      articles[articleIndes].imagePath = imageDestinationPath  // save the image's path to it's object in our array
    }
  })
}

function saveImage (imagePath, articleIndex, articles) {
  var imageDestinationFolder = './content/images/' + articleIndex + '/'
  if (!fs.existsSync(imageDestinationFolder)) {
    fs.mkdirSync(imageDestinationFolder)  // create such a folder if it doesn't exist
  }
  downloadImage(imagePath, articleIndex, articles)
}

module.exports = saveImage