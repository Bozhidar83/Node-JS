var fs = require('fs')
var url = require('url')

module.exports = function (req, res) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === '/') {
    fs.readFile('./index.html', function (err, data) {
      if (err) console.log(err)

      res.writeHead(200, {
        'Content-Type': 'text/html',
        'statusheader': 'Full'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
