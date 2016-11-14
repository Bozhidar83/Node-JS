var url = require('url')
var fs = require('fs')

module.exports = function (req, res) {
  req.pathName = req.pathName || url.parse(req.url).pathname
  
  if (req.pathName === '/favicon.ico') {
    fs.readFile('./favicon.ico', function (err, data) {
      if (err) console.log(err)

      res.writeHead(200)
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
