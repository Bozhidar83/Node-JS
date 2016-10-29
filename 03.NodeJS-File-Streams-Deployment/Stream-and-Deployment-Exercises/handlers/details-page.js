var url = require('url')
var fs = require('fs')
var detailedPagePath = './details.html'

function buildListingHtml (images) {
  var body = ''

  // create the body
  if (Object.keys(images).length !== 0) {
    for (var imageIndex in images) {
      var imageName = images[imageIndex]
      body += '<div><a href=' + '"/content/images/details/' + imageIndex + '/' + imageIndex + '">' + imageName + '</a></div>'
    }
  } else {
    body += '<div>No images available</div>'
  }

  body += '<br/>' + buildBackButtonHtml()

  return '<!DOCTYPE html><html><header></header><body>' + body + '</body></html>'
};

function buildBackButtonHtml () {
  // returns the html + js for a functioning back button
  return '<button onclick="goBack()">Back</button><script>function goBack() {window.history.back();}</script>'
}

module.exports = function (req, res, images) {
  url.pathName = url.pathName || url.parse(req.url).pathname

  if (req.pathName === '/details') {
    fs.writeFileSync(detailedPagePath, buildListingHtml(images))
    fs.readFile(detailedPagePath, function (err, data) {
      if (err) console.log(err)

      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
