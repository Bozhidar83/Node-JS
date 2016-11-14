/* this module shows the user our page that lets you add a TODO task */
var fs = require('fs')
var INDEX_PAGE_DIR = './handlers/GET/create-task/add-todo-task.html'

module.exports = function(res) {
  fs.readFile(INDEX_PAGE_DIR, function(err, data) {
    if (err) console.log(err.message)
    // display our homepage
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(data)
    res.end()
  })
}


