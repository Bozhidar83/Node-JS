var url = require('url')
var FIELDS_COMMENT_KEY = 'comment'
var FIELDS_USERNAME_KEY = 'username'
var reloadPage = require('../get/article-details')
var regexPattern = new RegExp(/\/details\/(\d+)\/comment/)

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

  return day + '/' + month + '/' + year + " " + hour + ":" + min + ":" + sec;
}

function addComment (req, res, fields, articles, articleIndex, isReload) {
  var commentText = fields[FIELDS_COMMENT_KEY][0]
  var username = fields[FIELDS_USERNAME_KEY][0]

  if (commentText === '' || username === '') {
    res.writeHead(404)
    res.write('Comment should have non empty content and username')
    res.end()
    return
  }

  var comment = {
    'text': commentText,
    'username': username,
    'date': getDateTime()
  }
  var article = articles[articleIndex]
  article.comments[article.comments.length] = comment;

  req.pathName = '/details/' + articleIndex
  var isReload = true
  reloadPage(req, res, articles, isReload)
}

module.exports = function (req, res, fields, articles, isReload) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  var match = req.pathName.match(regexPattern)

  if (match !== null) {
    var articleIndex = parseInt(match[1])
    var article = articles[articleIndex]
    addComment(req, res, fields, articles, articleIndex, isReload)
  } else {
    return true
  }
}


