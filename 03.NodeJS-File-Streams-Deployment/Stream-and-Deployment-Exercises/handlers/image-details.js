var fs = require('fs')
var url = require('url')
var regexPattern = new RegExp(/\/content\/images\/details\/(\d+)\/\1/)
var imageExtension = '.jpg'

module.exports = function (req, res, images) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  var match = req.pathName.match(regexPattern)

  if (match !== null) {
    var dir = '.' + match[0] + imageExtension
    fs.readFile(dir, function (err, data){
      if (err) console.log(err.message)

      res.writeHead(200)
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}