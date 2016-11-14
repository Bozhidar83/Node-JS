/* this module handles GET requests to the homepage, effectively displaying our homepage */
var url = require('url')
var HOMEPAGE_PATHNAME = '/'
var showHomePage = require('./show-home-page')

module.exports = function(req, res)  {
  req.pathName = req.pathName || url.parse(req.url).pathname
  if (req.pathName === HOMEPAGE_PATHNAME) {
    showHomePage(res)
  } else {
    return true
  }
}
