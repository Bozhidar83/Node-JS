// this module shows the comments of a todo on a single page
var fs = require('fs')
var createHTMLPage = require('./create-todo-comments-page')

function showTodoCommentsPage (res, todo, todoIndex) {
  // this function shows the comments page to the user
  var commentsPageDir = createHTMLPage(todo, todoIndex)  // creates the HTML and returns the path to it

  fs.readFile(commentsPageDir, function(err, data) {
    if (err) {
      console.log(err.message)
    }

    res.writeHead(200)
    res.write(data)
    res.end()
  })
}

module.exports = showTodoCommentsPage
