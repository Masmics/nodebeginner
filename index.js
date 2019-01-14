var server = require('./server');
var router = require('./router');

//**both of the following are function names**
server.start(router.route);



