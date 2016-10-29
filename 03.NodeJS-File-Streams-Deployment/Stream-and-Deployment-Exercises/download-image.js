var fs = require('fs')
var multiparty = require('multiparty')
var urlGenerator = require('./generate-unique-image-urls')

var detailsDirPath = './content/images/details/'
var isPrivite = false

function getNextIndexInImagesArray (images) {
  var maxIndex = 0
  var keysArray = Object.keys(images)

  for (var keysArrayIndex in keysArray) {
    var index = parseInt(keysArray[keysArrayIndex])
    if (index > maxIndex) {
      maxIndex = index
    }
  }

  return maxIndex + 1
}

function getNextPrivateImageIndex () {
  var privateIndex = 1
  while (true) {
    if (fs.existsSync(detailsDirPath + 'private' + privateIndex)) {
      privateIndex++
    } else {
      break
    }
  }

  return privateIndex
}

function downloadImage (req, images, callback) {
  var form = new multiparty.Form()
  form.parse(req)
  form.on('part', function (part) {
    if (part.filename) {
      var imagePath = ''
      var privateIndex
      var index
      var file = ''

      part.setEncoding('binary')
      part.on('data', function (data) {
        file += data
      })
      part.on('end', function () {
        if (isPrivite) {
          privateIndex = getNextPrivateImageIndex()
          var privateImageFolderName = 'private' + privateIndex
          imagePath = detailsDirPath + privateImageFolderName + '/'
        } else {
          index = getNextIndexInImagesArray(images)
          var publicImageFolderName = index
          imagePath = detailsDirPath + publicImageFolderName + '/'
        }

        if (!fs.existsSync(imagePath)) {
          fs.mkdir(imagePath)
        }

        imagePath += isPrivite ? privateIndex + '.jpg' : index + '.jpg'

        fs.writeFile(imagePath, file, 'ascii', function (err) {
          if (err) {
            console.log(err)
          } else {
            if(isPrivite) {
              urlGenerator(imagePath, part.filename)
            } else {
              images[index] = part.filename
            }

            isPrivite = false
          }
        })

        callback(part.filename)
      })
    } else if (part.name === 'privateImageCheckBox') {
      var file = ''
      part.on('data', function (data) {
        file += data
      })

      console.log(part)
      isPrivite = true
    }
  })
}

module.exports = function (req, images) {
  downloadImage(req, images, function (name) {
    console.log('Done downloading image "' + name + '"')
  })
}