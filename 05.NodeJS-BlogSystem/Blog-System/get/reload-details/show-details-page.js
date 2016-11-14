var fs = require('fs')
var DETAILS_PAGE_DIR = '../../article-details.html'
var createHTMLPage = require('./create-details-page')

function showDetailsPage (res, article, reload) {
  // create the HTML
  createHTMLPage(article, reload)

  fs.readFile(DETAILS_PAGE_DIR, function(err, data) {
    if (err) {
      console.log(err.message)
    }

    res.writeHead(200)
    res.write(data)
    res.end()
  })
}

module.exports = showDetailsPage