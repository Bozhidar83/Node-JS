// this module creates the HTML page for our todo-comments page, which shows the comments of a todo
var fs = require('fs')
var TODO_COMMENTS_KEY = 'comments'
var COMMENT_DATE_KEY = 'date'
var COMMENT_COMMENT_KEY = 'comment'

function createHTML (todo) {
  // creates a simple HTML showing the comments on this particular TODO
  var body = ''
  var todoComments = todo[TODO_COMMENTS_KEY]  // array of comment objects

  for (var i in todoComments) {
    var comment = todoComments[i]
    body += '<p>Comment at ' + comment[COMMENT_DATE_KEY] + '<br>- ' + comment[COMMENT_COMMENT_KEY] + '</p>'
  }

  return '<!DOCTYPE html><html><header></header><body>' + body + '</body></html>'
}

function saveHTML (todo, todoIndex) {
  // this module saves the HTML and returns the path to it
  var commentsPageDir = './details/' + todoIndex + '/' + todoIndex + 'comments.html'  // ex: /details/0/0comments.html
  var folderDir = './details' + todoIndex + '/' // the folder we're going to be storing the html file in

  if (!fs.existsSync(folderDir)) {
    fs.mkdirSync(folderDir)
  }
  fs.writeFileSync(commentsPageDir, createHTML(todo))  // save the html file

  return commentsPageDir
}

module.exports = saveHTML
