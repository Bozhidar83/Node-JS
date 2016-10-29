var favicon = require('./favicon')
var homePage = require('./home-page')
var staticFiles = require('./static-files')
var addImage = require('./add-image')
var imageDetails = require('./image-details')
var detailsPage = require('./details-page')
var statusHeader = require('./status-header')
var downloadImage = require('./download-image.js')

module.exports = [
  favicon,
  statusHeader,
  downloadImage,
  homePage,
  addImage,
  detailsPage,
  imageDetails,
  staticFiles
]
