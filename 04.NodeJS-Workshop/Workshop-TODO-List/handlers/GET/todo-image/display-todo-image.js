/* this module displays a specific TODO's image, although it does not end the response.
This is used when we display the image along with other information about the TODO in the dynamically-generated HTML of our details page */
var fs = require('fs')

function showImage (response, imagePath) {
  // this function shows the image by writing it in the response
  fs.readFile('.' + unescape(imagePath), function(err, data) {
    if (err) {
      console.log(err)
    }

    response.write(data)
  })
}

module.exports = showImage
