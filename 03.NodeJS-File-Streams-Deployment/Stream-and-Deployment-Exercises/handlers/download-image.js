var fs = require('fs')
var url = require('url')
var zlib = require('zlib')
var gzip = zlib.createGzip()

function pathNameInJSON (json, key) {
  /*
   This function takes the end of an url's pathname' /r3j3F for example and loops through our
   JSON object image-urls.json to see if there is a saved image linked to the given
   pathname.
   image-urls.json's content is as follows:
   key : path of the image
   '/r3j3F': "./content/images/details/1/1.jpg"
   */
  var keys = Object.keys(json)

  for (var idx in keys) {
    if (keys[idx] === key) return true
  }

  return false
}

function gzipFile (fileDir) {
  var gzipFileDir = fileDir + '.gz'
  var readStream = fs.createReadStream(fileDir)
  var writeStream = fs.createWriteStream(gzipFileDir)

  readStream.pipe(gzip).pipe(writeStream)

  // read the gzipped file
  var gzippedFile = fs.readFileSync(gzipFileDir, 'binary')

  // delete the gzipped file, because it's no longer needed on the filesystem
  fs.unlink(gzipFileDir, function()
  {
    console.log('deleted file at ' + gzipFileDir)
  })

  return gzippedFile
}

module.exports = function(req, res, images) {
  req.pathName = req.pathName || url.parse(req.url).pathname
  // load the json holding information about private image URLs
  var parsedJSON = require('../image-urls.json')

  if (pathNameInJSON(parsedJSON, req.pathName)) {
    // read the file
    var imageDir = parsedJSON[req.pathName].path
    // convert it to gzip
    var gzippedImage = gzipFile(imageDir)

    res.setHeader('Content-disposition', 'attachment; filename=' + parsedJSON[req.pathName].name)
    res.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Encoding': 'gzip'})
    res.write(gzippedImage, 'binary')
    res.end()
  } else {
    return true
  }
}

