/* a fake api-ng
  create conversation rules from recorded messages
  match op only
*/

var Answer = require('..').Answer;
var rules = require('./rules.json');
var answer = new Answer(rules);

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
  var state = 'connected'; // simple state machine
  socket.on('api', function(data) {
    answer.process(state, 'api', data, function (err, ans, newState) {
      if (err) {
        socket.emit('api', {
          op: 'err',
          payload: {
            message: err.message,
            name: err.name
          }
        });
        return;
      }
      if (newState) {
        state = newState;
      }
      if (ans) {
        socket.emit(ans.event, ans.data);
      } else {
        console.warn('no answer for: ' + JSON.stringify(data));
      }
    });
  });
  // hard coded repeating publish
  // toggling attended status
  var attended = true;
  setInterval(function() {
    attended = !attended;
    socket.emit('api', {
      op: 'pub',
      payload: {
        "id": 11,
        "alias": "guest1",
        "version": 2,
        "type": "Guest",
        "doc": {
          "firstname": "James",
          "lastname": "Zhu",
          "photo": "upload/photos/2014_3_11/34af3d5e-9d71-454a-af8b-b559aceb03f6.jpg",
          "attended": attended
        },
        "state": "updated",
        "displayName": "James Zhu"
      }
    });
  }, 5000);
});
