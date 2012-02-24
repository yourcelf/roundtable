var connect = require('connect'),
    sharejs = require('share').server;

var server = connect(
      connect.logger(),
      connect.static(__dirname + '/static')
    );

var options = {db: {type: 'redis'}}; // See docs for options. {type: 'redis'} to enable persistance.

// Attach the sharejs REST and Socket.io interfaces to the server
sharejs.attach(server, options);

server.listen(8000);
console.log('Server running at http://127.0.0.1:8000/');
