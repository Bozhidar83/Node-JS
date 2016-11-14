/* this module shows the dynamically-created statistics page */
var fs = require('fs')

var STATS_PAGE_DIR = './handlers/GET/statistics-page/statistics-page.html'
var createHTMLPage = require('./create-stats-page')

function showStatsPage (res, todos) {
  createHTMLPage(todos)  // creates the page

  fs.readFile(STATS_PAGE_DIR, function(err, data) {
    if (err) {
      console.log(err)
    }

    res.writeHead(200)
    res.write(data)
    res.end()
  })
}

module.exports = showStatsPage
