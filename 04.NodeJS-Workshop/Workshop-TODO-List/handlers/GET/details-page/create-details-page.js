/* this module creates the HTML page that displays a specific TODO task and it's properties' */
var fs = require('fs')
var DETAILS_PAGE_DIR = './handlers/GET/details-page/details-page.html'
// the keys for our todo object
var TODO_TITLE_KEY = 'title'
var TODO_DESCRIPTION_KEY = 'description'
var TODO_STATE_KEY = 'state'
var TODO_INDEX_KEY = 'index'
var TODO_COMMENTS_KEY = 'comments'

var PENDING_PARAGRAPH_TEXT = 'PENDING...'
var CHANGE_TO_PENDING_BUTTON_TEXT = 'Change to pending...'
var DONE_PARAGRAPH_TEXT = 'DONE'
var DONE_BUTTON_TEXT = 'DONE!'

function getTodoState (todo) {
  // gets the state of TODO task to be shown on the page
  var stateParagraphText = ''
  var todoState = todo[TODO_STATE_KEY]

  if (todoState === 'pending') {
    stateParagraphText = PENDING_PARAGRAPH_TEXT
  } else {
    stateParagraphText = DONE_PARAGRAPH_TEXT
  }

  return stateParagraphText
}

function getButtonText (todo) {
  // returns the appropriate button text for the TODO's current state
  var buttonText = ''
  var todoState = todo[TODO_STATE_KEY]

  if (todoState === 'pending') {
    buttonText = DONE_BUTTON_TEXT
  } else {
    buttonText = CHANGE_TO_PENDING_BUTTON_TEXT
  }

  return buttonText
}
function createHTML (todo, reload) {
  // this function creates the html that displays information about a TODO
  var body = ''
  // TODO Title and Description
  body += '<h1>' + todo[TODO_TITLE_KEY] + '</h1>'
  body += '<p>' + todo[TODO_DESCRIPTION_KEY] + '</p>'

  // the TODO's state. It is interchangeable
  body += '<p id="stateParagraph">' + getTodoState(todo) + '</p>'

  // add an image if there is one
  if (todo.imagePath) {
    body += '<img src="' + todo.imagePath + '" align="left">'
  }

  // add comments if there are any
  var todoComments = todo[TODO_COMMENTS_KEY]
  for (var i in todoComments) {
    var comment = todoComments[i]
    body += '<p>Comment at ' + comment.date + '<br>- ' + comment.comment + '</p>'
  }

  body += '<form id="stateForm" method="POST" action="/" enctype="multipart/form-data">'
  // add the TODO's state input, this is read later so that it can be converted to the opposite state once the user wants to change it
  body += '<input type="hidden" name="state" id="state" value="' + todo[TODO_STATE_KEY] + '">'
  // add the TODO's index
  body += '<input type="hidden" name="todoIndex" id="todoIndex" value="' + todo[TODO_INDEX_KEY] + '">'
  // the text area for the ability to add a comment to a TODO
  body += '<textarea rows="4" cols="50" name="comment">Enter comment here...</textarea>'
  // The button that changes the TODO's state and a comment the user has given
  body += '<button type="submit" onclick="changeState(true);" id="changeStateButton">' + getButtonText(todo) + '</button>'
  // in-html javascript script to change the displayed state and button text when the state is changed.
  body += '<script>'
  if (!reload) {  // this function should be called only on the initial creation
    body += 'changeState(false);'  // call the function on HTML load in case the TODO's state has been previously changed
  }
  body += 'function changeState(toSubmit){'
  body += 'state = document.getElementById("stateParagraph").innerHTML;'
  body += 'if (state === "PENDING...") {'
  body += 'document.getElementById("stateParagraph").innerHTML = "' + DONE_PARAGRAPH_TEXT + '!";'  // change state paragraph
  body += 'document.getElementById("changeStateButton").innerHTML = "Change to pending";'  // change button text
  body += 'document.getElementById("state").value = "done";'  // change the state's value so that we can read it later in the post request
  body += 'if (toSubmit) {'
  body += 'document.getElementById("stateForm").submit();'
  body += '}} else {'
  body += 'document.getElementById("stateParagraph").innerHTML = "' + PENDING_PARAGRAPH_TEXT + '";'  // change state paragraph
  body += 'document.getElementById("changeStateButton").innerHTML = "DONE";'  // change button text
  body += 'document.getElementById("state").value = "pending";'  // change the state's value so that we can read it later in the post request
  body += 'if (toSubmit) {'
  body += 'document.getElementById("stateForm").submit();'
  body += '}'
  body += '}'
  body += '}'
  body += '</script>'
  // END OF in-html javascript script to change the displayed state and button text when the state is changed.
  body += '</form>'

  return '<!DOCTYPE html><html><header></header><body>' + body + '</body></html>'
}

function saveHTML (todo, reload) {
  // this function saves the dynamically-created HTML and returns it's path
  var html = createHTML(todo, reload)

  fs.writeFileSync(DETAILS_PAGE_DIR, html)
}

module.exports = saveHTML
