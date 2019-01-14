//* url and querystring modules extract parts of the url + parse the querystring for request parameters */

var http = require('http');
var url = require('url');
var formidable = require('formidable');
var sys = require('sys');

//**adding handle paramater to start function**
function start(route, handle) {
  function onRequest(request, response) {
    var postData = '';
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');

    request.setEncoding('utf8');

    request.addListener('data', function(postDataChunk) {
      postData += postDataChunk;
      console.log('Recieved POST data chunk ' + postDataChunk + '.');
    });

    request.addListener('end', function() {
      //**passing handle object into route()
      route(handle, pathname, response, postData);
    });
    
  }
  // http.createServer(onRequest).listen(8888);
  // console.log('Server has started.');
  http.createServer(function(req, res) {
    if(req.url == '/u[load' && req.method.toLowerCase() == 'post') {
      var form = new formidable.incomingForm();
      form.parse(req, function(error, fields, files) {
        res.writeHead(200, { 'Content-Type': 'Text/Plain' });
        res.write('received upload: \n\n');
        res.end(sys.inspect({ fields: fields, files: files }));
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': 'Text/html' });
    res.end(
      '<form action="/upload" enctype="multipart/form-data" ' +
      'method="post">' +
      '<input type="text" name="title"><br>' +
      '<input type="file" name="upload" multiple="multiple"><br>' +
      '<input type="submit" value="Upload">' +
      '</form>'
    );
  }).listen(8888);
}
exports.start = start;

