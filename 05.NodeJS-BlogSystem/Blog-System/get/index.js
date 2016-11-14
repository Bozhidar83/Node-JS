var homePage = require('./home-page')
var staticFiles = require('./static-files')
var favicon = require('./favicon')
var createArticle = require('./create-article')
var allArticles = require('./get-all')
var articleDetails = require('./article-details')
var statsPage = require('./stats-page')

module.exports = [
  statsPage,
  favicon,
  homePage,
  createArticle,
  allArticles,
  articleDetails,
  staticFiles
]
