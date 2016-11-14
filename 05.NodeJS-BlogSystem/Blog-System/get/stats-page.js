var fs = require('fs')
var url = require('url')
var STATS_PAGE_DIR = './statistics-page.html'
var ARTICLES_COMMENTS_KEY = 'comments'
var ARTICLES_VIEWS_KEY = 'views'
var STATISTICS_PAGE_PATHNAME = '/stats'
var REQUIRED_STATUS_HEADER = 'my-authorization'
var REQUIRED_STATUS_HEADER_VALUE = 'Admin'

function countArticleComments (articles) {
  var articleCommentsCount = 0
  for (var idx in articles) {
    articleCommentsCount += articles[idx][ARTICLES_COMMENTS_KEY].length
  }
  return articleCommentsCount
}

function countArticleViews (articles) {
  var articleViewsCount = 0
  for (var idx in articles) {
    articleViewsCount += articles[idx][ARTICLES_VIEWS_KEY]
  }
  return articleViewsCount
}

function createHTML (articles) {
  var body = ''
  body += '<h1>' + 'Total number of Articles views: ' + countArticleViews(articles) + '</h1>'
  body += '<h1>' + 'Total number of Articles comments added: ' + countArticleComments(articles) + '</h1>'
  return '<!DOCTYPE html><html><header></header><body>' + body + '</body></html>'
}

function saveHTML (articles) {
  var html = createHTML(articles)
  fs.writeFileSync(STATS_PAGE_DIR, html)
}

function showStatsPage (res, articles) {
  saveHTML(articles)  // creates the page

  fs.readFile(STATS_PAGE_DIR, function(err, data) {
    if (err) {
      console.log(err)
    }

    res.writeHead(200)
    res.write(data)
    res.end()
  })
}

module.exports = function(req, res, articles) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === STATISTICS_PAGE_PATHNAME) {
    if (req.headers[REQUIRED_STATUS_HEADER] === REQUIRED_STATUS_HEADER_VALUE) {
      showStatsPage(res, articles)
    } else {
      res.writeHead(404)
      res.write('404 File Not Found')
      res.end()
    }
  } else {
    return true
  }
}