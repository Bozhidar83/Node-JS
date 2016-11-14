/* this module returns an array of all our POST request handlers */
var receiveAddTodo = require('./POST/receive-add-todo/index')
var modifyTodo = require('./POST/modify-todo/index')

module.exports =
[
  receiveAddTodo,
  modifyTodo
]

