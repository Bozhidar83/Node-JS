var http = require('http')
var fs = require('fs')
var url = require('url')

var handlers = require('./handlers/index')

var port = 1111;

http.createServer(function (req, res) {
  // if (req.method === 'POST') {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/html'
  //   })
  //   res.write('Hi from POST')
  //   res.end()
  // } else if (req.method === 'GET') {
  //   res.writeHead(500)
  //   res.write('GET IS NOT SUPPORTED')
  //   res.end()

  // var parsedUrl = url.parse(req.url).pathname
  // if (parsedUrl === '/favicon.ico') {
  //   fs.readFile('./favicon.ico', function (err, data) {
  //     if (err) console.log(err)
  //
  //     res.writeHead(200)
  //     res.write(data)
  //     res.end()
  //   })
  // } else if (parsedUrl === '/') {
  //   fs.readFile('./index.html', function (err, data) {
  //     if (err) console.log(err)
  //
  //     res.writeHead(200, {
  //       'Content-Type': 'text/html'
  //     })
  //     res.write(data)
  //     res.end()
  //   })
  // } else {
  //   fs.readFile('.' + parsedUrl, function (err, data) {
  //     if (err) {
  //       res.writeHead(404)
  //       res.write('404 Not Found')
  //       res.end()
  //       return
  //     }
  //
  //     var content = 'text/plain';
  //     if (parsedUrl.endsWith('.css')) {
  //       content = 'text/css';
  //     } else if (parsedUrl.endsWith('.js')) {
  //       content = 'application/javascript'
  //     }
  //
  //     res.writeHead(200, {
  //       'Content-Type': content
  //     })
  //     res.write(data)
  //     res.end()
  //   })
  // }

  // var handlers = [
  //   favicon,
  //   homePage,
  //   staticFiles
  // ]

  for (var handler of handlers) {
    var next = handler(req, res)
    if (!next) {
      break;
    }
  }
}).listen(port)

console.log('Server is running on port: ' + port)