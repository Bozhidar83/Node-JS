/* this module creates the HTML page that displays the total number of our TODO tasks and comments */
var fs = require('fs')
var STATS_PAGE_DIR = './handlers/GET/statistics-page/statistics-page.html'
var TODO_COMMENTS_KEY = 'comments'

function countTodoComments (todos) {
  // this function returns the total number of TODO comments
  var todoCommentsCount = 0

  for (var idx in todos) {
    todoCommentsCount += todos[idx][TODO_COMMENTS_KEY].length
  }

  return todoCommentsCount
}

function createHTML (todos) {
  var body = ''

  body += '<h1>' + 'Total number of TODO tasks added: ' + todos.length + '</h1>'
  body += '<h1>' + 'Total number of TODO comments added: ' + countTodoComments(todos) + '</h1>'

  return '<!DOCTYPE html><html><header></header><body>' + body + '</body></html>'
}

function saveHTML (todos) {
  // this function saves the dynamically-created HTML
  var html = createHTML(todos)

  fs.writeFileSync(STATS_PAGE_DIR, html)
}

module.exports = saveHTML
