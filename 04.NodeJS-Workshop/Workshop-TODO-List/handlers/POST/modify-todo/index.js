/* this module routes a POST request to modify a TODO task to the modify-todo.js file */
var modifyTodo = require('./modify-todo')
var FIELDS_TODOINDEX_KEY = 'todoIndex'

module.exports = function(req, res, fields, files, todos) {
  if (fields.todoIndex) {
    // the user wants to change the state of a TODO (and possibly add a comment about it)
    var todoIndex = fields[FIELDS_TODOINDEX_KEY]
    todoIndex = parseInt(todoIndex)  // convert  it to an int
    modifyTodo(res, todos, todoIndex, fields)
  } else {
    return true
  }
}
