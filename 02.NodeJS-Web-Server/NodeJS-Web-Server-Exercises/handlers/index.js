var favicon = require('./favicon')
var statusPage = require('./status-header')
var homePage = require('./home-page')
var addImage = require('./add-image')
var detailsPage = require('./details-page')
var imageDetails = require('./image-details')
var staticFiles = require('./static-files')

module.exports = [
    favicon,
    statusPage,
    homePage,
    addImage,
    detailsPage,
    imageDetails,
    staticFiles
  ]

