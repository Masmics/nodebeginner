//* url and querystring modules extract parts of the url + parse the querystring for request parameters */

var http = require('http');
var url = require('url');

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
  http.createServer(onRequest).listen(8888);
  console.log('Server has started.');
}
exports.start = start;

