var fs = require('fs')
var url = require('url')
var ALL_ARTICLES_PAGE_PATH = '/all'
var ALL_ARTICLES_PAGE_DIR = './all-page.html'
var ARTICLE_TITLE_KEY = 'title'
var ARTICLE_DESCRIPTION_KEY = 'description'
var ARTICLE_INDEX_KEY = 'index'
var ARTICLE_DATEOFCREATION_KEY = 'creationDate'

function compareArticlesByIndex (a, b) {
  if (a[ARTICLE_INDEX_KEY] < b[ARTICLE_INDEX_KEY]) {
    return -1
  } else {
    return 1
  }
}

function createHTML (articles) {
  var body = ''
  if (articles.length === 0) {
    body += '<h2>No articles available so far</h2>'
    body += '<br/><a href="/">Back</a>'
    return '<!DOCTYPE html><html><head><title>All Articles</title></head><body style="background: red">' + body + '</body></html>'
  }
  articles.sort(compareArticlesByIndex)

  for (var articleIndex in articles) {
    var article = articles[articleIndex]
    var articleTitle = article[ARTICLE_TITLE_KEY]
    var articleDescription = article[ARTICLE_DESCRIPTION_KEY]
    var articleId = article[ARTICLE_INDEX_KEY]

    body += '<h2><a href="' + 'details/' + articleId + '">' + articleTitle + '</a></h2>'
    body += '<div>' + articleDescription + '</div>'
    body += '<hr />'
  }

  body += '<br/><a href="/">Back</a>'

  return '<!DOCTYPE html><html><head><title>All Articles</title></head><body style="background: red">' + body + '</body></html>'
}

function saveHTML (articles) {
  var html = createHTML(articles)

  fs.writeFileSync(ALL_ARTICLES_PAGE_DIR, html)
}

function showPage (res, articles) {
  saveHTML(articles)

  fs.readFile(ALL_ARTICLES_PAGE_DIR, function (err, data) {
    if (err) {
      console.log(err)
    }

    res.writeHead(200, {
      'Content-Type': 'text-html'
    })
    res.write(data)
    res.end()
  })
}

module.exports = function (req, res, articles) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === ALL_ARTICLES_PAGE_PATH) {
    showPage(res, articles)
  } else {
    return true
  }
}