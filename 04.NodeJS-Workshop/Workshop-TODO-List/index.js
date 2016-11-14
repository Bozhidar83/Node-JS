var http = require('http')
var multiparty = require('multiparty')
var getHandlers = require('./handlers/get-handlers')
var postHandlers = require('./handlers/post-handlers')
var port = 9999
var todos = []  // array that will hold our TODO objects


http.createServer(function(req, res) {
  if (req.method === 'GET') {
    // iterate through the handlers, when we get to the correct one we break the for loop
    for (var handler of getHandlers) {
      var toContinue = handler(req, res, todos)
      if (!toContinue) {
        break
      }
    }
  } else if (req.method === 'POST') {
    // parse the data and find the appropriate handler to deal with it
    var form = new multiparty.Form()
    form.parse(req, function(err, fields, files) {
      if (err) console.log(err)
      for (var handler of postHandlers) {
        var toContinue = handler(req, res, fields, files, todos)
        if (!toContinue) {
          break
        }
      }
    })
  }
}).listen(port)


console.log('Server listening on port: ' + port)
