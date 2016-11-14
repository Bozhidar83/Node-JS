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

  // add an image if there is one
  if (article.imagePath) {
    body += '<p id="image-container"><img src="' + article.imagePath + '" style="width: 100px;"></p>'
  }

  // CHECK WEATHER REQUEST COMES FROM THE SAME URL
  article[ARTICLE_VIEWS_KEY]++
  if (reload) {
    article[ARTICLE_VIEWS_KEY]--
  }
  //console.log(req.session.lastPage)

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

  // Articles comments
  var comments = article.comments
  for (var comment of comments) {
    body += '<div id="comments" style="border:1px solid blue; border-radius: 10px;">'
    body += '<p>Comment at ' + comment.date + '</p>'
    body += '<p>User: ' + comment.username + '</p>'
    body += '<p>Text: ' + comment.text + '</p>'
    body += '<hr/>'
    body += '</div>'
  }

  // Comment form
  var action = '/details/' + article.index + '/comment'
  body += '<form id="stateForm" method="POST" action="' + action + '" enctype="multipart/form-data">'
  body += '<input type="hidden" name="articleIndex" id="articleIndex" value="' + article[ARTICLE_INDEX_KEY] + '">'
  body += '<textarea rows="4" cols="50" name="comment" placeholder="Enter comment here"></textarea><br/>'
  body += '<input type="text" name="username" placeholder="Username"><br/>'
  body += '<input type="submit" value="Добави">'
  body += '</form>'
  body += '<br />'
  body += '<br />'

  // Back to articles list link
  body += '<a href="/all">Back to all articles</a>'

  // // CHECK WEATHER REQUEST COMES FROM THE SAME URL
  // if (!reload) {
  //   article[ARTICLE_VIEWS_KEY]++
  // }

  return '<!DOCTYPE html><html><head><title>Article Details</title></head><body style="background: red">' + body + '</body></html>'
}

function saveHTML (article, reload) {
  var html = createHTML(article, reload)

  fs.writeFileSync(ARTICLES_DETAILS_PAGE_DIR, html)
}

function showDetailsPage (res, article, reload) {
  saveHTML(article, reload)

  fs.readFile(ARTICLES_DETAILS_PAGE_DIR, function (err, data) {
    if (err) {
      console.log(err)
    }

    res.writeHead(200)
    res.write(data)
    res.end()
  })
}

module.exports = function (req, res, articles, isReload) {
  req.pathName = req.pathName || url.parse(req.url).pathname

  var match = req.pathName.match(regexPattern)

  if (match !== null) {
    var articleIndex = parseInt(match[1])
    var article = articles[articleIndex]
    showDetailsPage(res, article, isReload)
  } else {
    return true
  }
}