// this module displays our homepage to the user
var fs = require('fs')
var HOMEPAGE_PATH = './handlers/GET/home-page/index.html'

function showHomePage (res) {
  fs.readFile(HOMEPAGE_PATH, function(err, data) {
    if (err) console.log(err.message)

    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(data)
    res.end()
  })
}

module.exports = showHomePage
