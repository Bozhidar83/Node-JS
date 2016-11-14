var url = require('url')
var fs = require('fs')

function getContentType (url) {
  var contentType = 'text/html'
  if (url.endsWith('.css')) {
    contentType = 'text/css'
  } else if (url.endsWith('.js')) {
    contentType = 'application/javascript'
  }
  return contentType
}

function isFromStaticFolder (url) {
  return url.startsWith('/content/')
}

function isFileStatic (url) {
  if (url.endsWith('.css') ||
    url.endsWith('.js') ||
    url.endsWith('.html') ||
    url.endsWith('.jpg')) {
    return true
  }
  return false
}

module.exports = function (req, res) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if(isFromStaticFolder(req.pathName) && isFileStatic(req.pathName)) {
    fs.readFile('.' + req.pathName, function (err, data) {
      if (err) {
        res.writeHead(404)
        res.write('404 Not Found')
        res.end()
        return true
      }

      var contentType = getContentType(req.pathName)
      res.writeHead(200, {
        'Content-Type': contentType
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
