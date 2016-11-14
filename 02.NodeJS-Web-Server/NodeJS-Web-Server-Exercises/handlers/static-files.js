var fs = require('fs')
var url = require('url')

function getContentType (url) {
  var content = 'text/plain';
  if (url.endsWith('.css')) {
    content = 'text/css';
  } else if (url.endsWith('.js')) {
    content = 'application/javascript'
  }
  return content;
}

function isFromStaticFolder(url) {
  return url.startsWith('/content/')
}

function isFileStatic (url) {
  if (url.endsWith('.css') ||
      url.endsWith('.js') ||
      url.endsWith('.html') ||
      url.endsWith('.jpg')) {
    return true;
  }
}

module.exports = function (req, res) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (isFromStaticFolder(req.pathName) && isFileStatic(req.pathName)) {
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
  }
  // else {
  //   return true
  // }
}
