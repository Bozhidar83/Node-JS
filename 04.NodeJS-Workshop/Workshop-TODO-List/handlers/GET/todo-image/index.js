/* this module routes the GET request to a specific TODO's image
and displays it, although it does not end the response. This is used when we display the image along with
other information about the TODO in the dynamically-generated HTML of our details page */
var url = require('url')
var regexPattern = new RegExp(/\/details\/(\d+)\/\d+.jpg/)

var showImage = require('./display-todo-image')

module.exports = function(req, res) {
  req.pathName = req.pathName || url.parse(req.url).pathname
  var match = req.pathName.match(regexPattern)

  if (match !== null) {
    showImage(res, req.pathName)
  } else {
    return true
  }
}
