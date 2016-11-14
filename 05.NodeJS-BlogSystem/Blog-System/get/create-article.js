var fs = require('fs')
var url = require('url')
var createPageFile = './create-article.html'
var createPagePath = '/create'

module.exports = function (req, res) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if(req.pathName === createPagePath){
    fs.readFile(createPageFile, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        res.writeHead(200, {
          'Content-Type': 'text-html'
        })
        res.write(data)
        res.end()
      }
    })
  } else {
    return true
  }
}

