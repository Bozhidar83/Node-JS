var url = require('url')
var fs = require('fs')
var addImagePagePath = './add-image.html'

module.exports = function (req, res) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if(req.pathName === '/add-image') {
    fs.readFile(addImagePagePath, function (err, data) {
      if (err) cosole.log(err)

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
