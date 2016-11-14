var fs = require('fs')
var url = require('url')
var homePageFile = './index.html'
var homePagePath = '/'

module.exports = function (req, res) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === homePagePath) {
    fs.readFile(homePageFile, function (err, data) {
      if (err) console.log(err)

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
