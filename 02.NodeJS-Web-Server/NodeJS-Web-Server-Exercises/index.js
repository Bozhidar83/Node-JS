var http = require('http')
var qs = require('querystring');
var handlers = require('./handlers/index')
var downloadImage = require('./download-image')

var port = 1234
var images = []
var HOME_PAGE_INDEX = 1;

http.createServer(function (req, res) {
  if (req.method === 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6)
        req.connection.destroy();
    });

    req.on('end', function () {
      var post = qs.parse(body);
      // use post['blah'], etc.
      var imageTitle = post['title']
      var imageUrl = post['fileUrl']
      var imageIndex = images.length

      if (imageTitle.length === 0 || imageUrl.length === 0) {
        res.writeHead(404)
        res.write('Image title or url are missing!')
        res.end()
        return
      }

      images[imageIndex] = imageTitle;
      downloadImage(imageUrl, imageTitle, imageIndex)
      handlers[HOME_PAGE_INDEX](req, res);
    });
  } else if (req.method === 'GET') {
    for (var handler of handlers) {
      var next = handler(req, res, images)
      if (!next) {
        break
      }
    }
  }
})
  .listen(port)

console.log('Server is listening on port: ' + port)



