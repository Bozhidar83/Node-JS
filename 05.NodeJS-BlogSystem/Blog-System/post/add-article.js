var ARTICLES_TITLE_KEY = 'article-title'
var ARTICLES_DESCRIPTION_KEY = 'article-description'
var reloadPage = require('../get/create-article')
var saveImage = require('./save-image')
var ARTICLE_DEFAULT_STATE = 'VISIBLE'

function addArticle (req, res, fields, articles, files) {
  var articleTitle = fields[ARTICLES_TITLE_KEY]
  var articleDescription = fields[ARTICLES_DESCRIPTION_KEY]
  var articlesIndex = articles.length

  var imagePath = '/content/images/' + articlesIndex + '/' + articlesIndex + '.jpg'
  var image = files.image[0]
  if (image.originalFilename) {  // if there is an image, save it
    saveImage(image.path, articlesIndex, articles)
  }

  if (articleTitle[0].trim() === '' || articleDescription[0].trim() === '') {
    res.writeHead(404)
    res.write('Article title and description cannot be empty!')
    res.end()
    return
  }

  var article = {
    'title': articleTitle[0],
    'description': articleDescription[0],
    'index': articlesIndex,
    'creationDate': getDateTime(),
    'views': 0,
    'state': ARTICLE_DEFAULT_STATE,
    'comments': [],
    'imagePath': imagePath
  }
  articles[articlesIndex] = article

  res.writeHead(302, {
    'Location': '/create'
  })
  res.end()
  reloadPage(req, res)
}

function getDateTime() {
  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

module.exports = function (req, res, fields, articles, files) {
  if (fields[ARTICLES_TITLE_KEY]) {
    // we've been sent an ARTICLE, meaning we need to add it
    addArticle(req, res, fields, articles, files)  // creates an ARTICLE object and add it to array
  } else {
    return true
  }
};