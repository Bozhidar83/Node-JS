var http = require('http')
var handlers = require('./handlers/index')
var downloadImage = require('./download-image')

var port = process.env.PORT || 1111
var environment = process.env.NODE_ENV

var images = {}
var HOMEPAGE_HANDLER_INDEX = 3

http.createServer(function (req, res) {
  if (req.method === 'POST') {
    downloadImage(req, images)
    req.on('end', function () {
      req.pathName = '/'
      handlers[HOMEPAGE_HANDLER_INDEX](req, res)
    })
  } else if (req.method === 'GET') {
    for (var handler of handlers) {
      var next = handler(req, res, images)
      if (!next) {
        break
      }
    }
  }
}).listen(port)

console.log('Server is listenint on port: ' + port)