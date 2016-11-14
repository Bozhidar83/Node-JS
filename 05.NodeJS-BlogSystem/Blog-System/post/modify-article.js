var FIELDS_STATE_KEY = 'state'
var FIELDS_ARTICLEINDEX_KEY = 'articleIndex'
var reloadPage = require('../get/article-details')
//var reloadPage = require('../get/reload-details/show-details-page')

function changeArticleState (state) {
  if (state === 'VISIBLE') {
    state = 'DELETED'
  } else {
    state = 'VISIBLE'
  }
  return state
}

function modifyArticle (req, res, articles, articleIndex, fields) {
  var state = fields[FIELDS_STATE_KEY][0]

  articles[articleIndex].state = changeArticleState(state);
  // res.writeHead(302, {
  //   'Location': '/details/' + articles[articleIndex]
  // })
  // res.end()

  req.pathName = '/details/' + articleIndex
  var isReload = true
  //req.session.lastPage = '/details'
  reloadPage(req, res, articles, isReload)
}

module.exports = function (req, res, fields, articles) {
  if (fields.articleIndex && fields.state) {
    var articleIndex = fields[FIELDS_ARTICLEINDEX_KEY]
    articleIndex = parseInt(articleIndex[0])
    modifyArticle(req, res, articles, articleIndex, fields)
   } else {
     return true
   }
}