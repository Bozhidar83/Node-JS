var fs = require('fs')
var url = require('url')
var statusFileDir = './status.html'

function buildStatusHtml (imagesCount) {
  return '<!DOCTYPE html><html><head><title>Images count</title></head><body><h1>' +
    'The total number of saved images: ' + imagesCount +
    '</h1></body></html>'
}

module.exports = function (req, res, images) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.headers['statusheader'] === 'Full') {
    fs.writeFile(statusFileDir, buildStatusHtml(Object.keys(images).length))

    fs.readFile(statusFileDir, function (err, data) {
      if (err) console.log(err)

      res.writeHead(200, {
        'Context-Type': 'text-html'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}