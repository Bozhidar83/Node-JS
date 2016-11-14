/* this module routes the GET request to a specific TODO's comments
because the URL is a bit more complex, we use regex to parse and validate it */
var url = require('url')
var regexPattern = new RegExp(/\/details\/(\d+)\/comments/)
var showCommentsPage = require('./show-todo-comments')
module.exports = function(req, res, todos) {
  req.pathName = req.pathName || url.parse(req.url).pathname
  var match = req.pathName.match(regexPattern)

  if (match !== null) {
    var todoIndex = parseInt(match[1]) // parse the index from our URL
    showCommentsPage(res, todos[todoIndex], todoIndex)
  } else {
    return true
  }
}
