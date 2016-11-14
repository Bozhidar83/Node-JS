var fs = require('fs')
var url = require('url')
var addImagePathPage = './add-image.html'

module.exports = function (req, res) {
  url.pathName = url.pathName || url.parse(req.url).pathname

  if (req.pathName === '/add-image') {
    fs.readFile(addImagePathPage, function(err, data){
      if (err) {
        console.log(err)
      }

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