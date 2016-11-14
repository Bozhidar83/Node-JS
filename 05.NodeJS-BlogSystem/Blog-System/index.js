var http = require('http')
var multiparty = require('multiparty')
var getHandlers = require('./get/index')
var postHandlers = require('./post/index')
var articles = [
  // {
  //   'title': 'asdf',
  //   'description': 'test desc',
  //   'index': 0
  // },
  // {
  //   'title': '32525',
  //   'description': 'kjghjkgl',
  //   'index': 1
  // }
]

var port = 5555

http.createServer(function (req, res) {
  if (req.method === 'GET') {
    for(var handler of getHandlers){
      var next = handler(req, res, articles)
      if (!next) {
        break
      }
    }
  } else if (req.method === 'POST') {
    var form = new multiparty.Form()
    form.parse(req, function (err, fields, files) {
      if (err) console.log(err)

      for(var handler of postHandlers) {
        var next = handler(req, res, fields, articles, files)
        if (!next) {
          break
        }
      }
    })
  }
}).listen(port)

console.log('Server is listening on port: ' + port)