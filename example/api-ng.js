/* a fake api-ng
  create conversation rules from recorded messages
  match op only
*/

var Answer = require('..').Answer;
var conv = require('./conversation.json');
var answer = new Answer(conv);

answer.match = function sameOp(a, b) {
  if ('op' in a && 'op' in b) {
    return a.op === b.op;
  } else {
    return false;
  }
};

var port = process.argv[2] || 4444;
var io = require('socket.io').listen(port);

console.log('socket.io server listening on: ' + port);

io.sockets.on('connection', function(socket) {
  socket.on('api', function(data) {
    var ans = answer.to(data);
    if (ans) {
      socket.emit('api', ans);
    } else {
      console.warn('no answer for: ' + JSON.stringify(data));
    }
  });
});
