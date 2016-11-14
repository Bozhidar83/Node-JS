/* this module modifies a TODO task, changing it's state and possibly adding a comment to it */
var FIELDS_COMMENT_KEY = 'comment'
var FIELDS_STATE_KEY = 'state'

var reloadPage = require('../../GET/details-page/show-details-page')

function getCurrentDate () {
  // returns the current date as a string
  // ex: 18:36	08/10/2016
  var today = new Date()
  var hh = today.getHours()
  var min = today.getMinutes()
  var dd = today.getDate()
  var mm = today.getMonth() + 1  // January is 0!
  var yyyy = today.getFullYear()

  if (dd < 10) {  // add 0 in front of the day if needed
    dd = '0' + dd
  }

  if (mm < 10) {  // add 0 in front of the month if needed
    mm = '0' + mm
  }

  return hh + ':' + min + '\t' + dd + '/' + mm + '/' + yyyy
}

function getOppositeState (state) {
  if (state === 'pending') {
    return 'done'
  } else {
    return 'pending'
  }
}

function modifyTodo (res, todos, todoIndex, fields) {
  // this function modifies our TODO, changing it's state and possibly adding a comment
  var comment = fields[FIELDS_COMMENT_KEY]
  var state = fields[FIELDS_STATE_KEY][0]
  if (comment !== 'Enter comment here...' && comment !== '') {
    // user has posted a comment
    var commentDate = getCurrentDate()
    var commentObject = {'comment': comment, 'date': commentDate}

    todos[todoIndex].comments.push(commentObject)  // add the comment to the array of comments
    // Reload details page
    reloadPage(res, todos[todoIndex], true)  // true because we want to reload the page
  }
  todos[todoIndex].state = getOppositeState(state)
}

module.exports = modifyTodo
