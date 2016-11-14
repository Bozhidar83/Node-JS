/* this module handles GET requests to the page that lets the user add a TODO */
var url = require('url')
var CREATE_TASK_PATHNAME = '/create'
var showCreateTaskPage = require('./show-create-task-page')

module.exports = function(req, res) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  if (req.pathName === CREATE_TASK_PATHNAME) {
    showCreateTaskPage(res)
  } else {
    return true
  }
}
