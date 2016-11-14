/* this module returns an array of all our GET request handlers */
var homePage = require('./GET/home-page/index')
var createTodoPage = require('./GET/create-task/index')
var allTodosPage = require('./GET/all-todos/index')
var todoDetailsPage = require('./GET/details-page/index')
var todoCommentsPage = require('./GET/todo-comments/index')
var todoImage = require('./GET/todo-image/index')
var statsPage = require('./GET/statistics-page/index')

module.exports = [
  statsPage,
  todoImage,
  homePage,
  createTodoPage,
  allTodosPage,
  todoCommentsPage,
  todoDetailsPage
]
