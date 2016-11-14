var fs = require('fs')
var url = require('url')
var ALL_ARTICLES_PAGE_PATH = '/all'
var ARTICLES_DETAILS_PAGE_DIR = './article-details.html'
var ARTICLE_TITLE_KEY = 'title'
var ARTICLE_DESCRIPTION_KEY = 'description'
var ARTICLE_INDEX_KEY = 'index'
var ARTICLE_DATEOFCREATION_KEY = 'creationDate'
var ARTICLE_VIEWS_KEY = 'views'
var ARTICLE_STATE_KEY = 'state'
var ARTICLE_STATE_DELETED = 'DELETED'
var ARTICLE_STATE_VISIBLE = 'VISIBLE'
var BUTTON_TEXT_DELETE = 'DELETE'
var BUTTON_TEXT_UNDELETE = 'UNDELETE'
var regexPattern = new RegExp(/\/details\/(\d+)/)

function getArticleState (article) {
  var articleParagraphText = ''

  var articleState = article[ARTICLE_STATE_KEY]
  if (articleState === ARTICLE_STATE_VISIBLE) {
    articleParagraphText = ARTICLE_STATE_VISIBLE
  } else {
    articleParagraphText = ARTICLE_STATE_DELETED
  }
  return articleParagraphText;
}

function changeButtonText (article) {
  var buttonText = ''
  var articleState = article[ARTICLE_STATE_KEY]

  if (articleState === 'VISIBLE') {
    buttonText = BUTTON_TEXT_DELETE
  } else {
    buttonText = BUTTON_TEXT_UNDELETE
  }

  return buttonText;
}

function createHTML (article, reload) {
  var body = ''
  body += '<h1>ARTICLE DETAILS PAGE</h1>'
  body += '<hr />'
  body += '<br />'
  body += '<br />'
  body += '<h1>' + article[ARTICLE_TITLE_KEY] + '</h1>'
  body += '<p>' + article[ARTICLE_DESCRIPTION_KEY] + '</p>'

  body += '<p id="stateParagraph">' + getArticleState(article) + '</p>'

  body += '<p id="viewsParagraph">Total views: ' + article[ARTICLE_VIEWS_KEY] + '</p>'

  body += '<form id="stateForm" method="POST" action="/" enctype="multipart/form-data">'
  body += '<input type="hidden" name="state" id="state" value="' + article[ARTICLE_STATE_KEY] + '">'
  body += '<input type="hidden" name="articleIndex" id="articleIndex" value="' + article[ARTICLE_INDEX_KEY] + '">'
  body += '<button type="submit" onclick="changeState(true)" id="changeStateButton">' + changeButtonText(article) + '</button>'
  body += '<script>'
  if (!reload) {  // this function should be called only on the initial creation
    body += 'changeState(false);'  // call the function on HTML load in case the ARTICLE's state has been previously changed
  }
  body += 'function changeState(toSubmit){'
  body += 'state = document.getElementById("stateParagraph").innerHTML;'
  body += 'if (state === "VISIBLE") {'
  body += 'document.getElementById("stateParagraph").innerHTML = "' + ARTICLE_STATE_VISIBLE + '";'  // change state paragraph
  body += 'document.getElementById("changeStateButton").innerHTML = "' + BUTTON_TEXT_DELETE + '";'  // change button text
  body += 'document.getElementById("state").value = "' + ARTICLE_STATE_VISIBLE + '";'  // change the state's value so that we can read it later in the post request
  body += 'if (toSubmit) {'
  body += 'document.getElementById("stateForm").submit();'
  body += '}} else {'
  body += 'document.getElementById("stateParagraph").innerHTML = "' + ARTICLE_STATE_DELETED + '";'  // change state paragraph
  body += 'document.getElementById("changeStateButton").innerHTML = "' + BUTTON_TEXT_UNDELETE + '";'  // change button text
  body += 'document.getElementById("state").value = "' + BUTTON_TEXT_DELETE + '";'  // change the state's value so that we can read it later in the post request
  body += 'if (toSubmit) {'
  body += 'document.getElementById("stateForm").submit();'
  body += '}'
  body += '}'
  body += '}'
  body += '</script>'
  body += '</form>'

  body += '<br />'
  body += '<br />'
  body += '<a href="/all">Back to all articles</a>'
  article[ARTICLE_VIEWS_KEY]++

  return '<!DOCTYPE html><html><head><title>Article Details</title></head><body style="background: red">' + body + '</body></html>'
}

function saveHTML (article, reload) {
  var html = createHTML(article, reload)

  fs.writeFileSync(ARTICLES_DETAILS_PAGE_DIR, html)
}

module.exports = saveHTML