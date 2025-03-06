// Create web server
// Run: node comments.js
// Load: http://localhost:3000

// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var path = url.parse(request.url).pathname;
  switch (path) {
    case '/':
      fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) return send404(response);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data, 'utf8');
        response.end();
      });
      break;
    case '/api/comments':
      if (request.method == 'POST') {
        var body = '';
        request.on('data', function(data) {
          body += data;
        });
        request.on('end', function() {
          var params = qs.parse(body);
          console.log(params);
          response.writeHead(200, {'Content-Type': 'text/html'});
          response.end();
        });
      }
      break;
    default: send404(response);
  }
});

function send404(response){
  response.writeHead(404);
  response.write('404');
  response.end();
}

// Listen on port 3000, IP defaults to