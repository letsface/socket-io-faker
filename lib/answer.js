var _ = require('lodash');

var Answer = exports.Answer = function Answer(rules) {
  this.rules = rules || [];
};

Answer.prototype.load = function (rules) {
  this.rules = rules;
};

// process inbound data considering current state
// @param {String} state, current state
// @param {String} event, WebSocket event
// @param {Object} data, WebSocket data
// @param {Function} cb(err, answer, newState)
Answer.prototype.process = function (state, event, data, cb) {
  for (var i = 0; i < this.rules.length; i++) {
    var rule = this.rules[i];
    var inb = rule.in;
    if (inb.event === event && inb.data.op === data.op) {
      if (state === inb.states.pre) {
        var out = rule.out;
        return cb(null, out, inb.states.post);
      } else {
        return cb(new Error('invalid state'));
      }
    }
  }
  return cb(null);
};
