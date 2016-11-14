// this module creates a TODO object and adds it to our globally-used todos array of TODO objects
var saveImage = require('./save-image')
var reloadPage = require('../../GET/create-task/show-create-task-page')

var FIELDS_TODONAME_KEY = 'todoname'
var FIELDS_TODO_DESCRIPTION_KEY = 'tododesc'
var DEFAULT_TODO_STATE = 'pending'

function addTodo (res, todos, fields, files) {
  var todoTitle = fields[FIELDS_TODONAME_KEY]
  var todoDescription = fields[FIELDS_TODO_DESCRIPTION_KEY]
  var todoState = DEFAULT_TODO_STATE
  var todoComments = [] // array that will hold separate comment objects
  var todoIndex = todos.length  // if we have 5 objects, the 6th's index will be exactly 5 (the length of the array)
  var imagePath = ''
  var image = files.image[0]  // a object holding the file's information. If there is no file, the originalFilename will be ''

  if (todoTitle.length === 0 || todoDescription.length === 0) {
    // Invalid data
    res.writeHead(404)
    res.write('The title and description of a TODO cannot be empty!')
    res.end()
    return
  }

  if (image.originalFilename) {  // if there is an image, save it
    saveImage(image.path, todoIndex, todos)
  }

  // create TODO object
  var todo = {'title': todoTitle, 'description': todoDescription, 'state': todoState, 'index': todoIndex, 'comments': todoComments, 'imagePath': imagePath}
  // save the TODO object to the array
  todos[todoIndex] = todo
  reloadPage(res)
}

module.exports = addTodo
