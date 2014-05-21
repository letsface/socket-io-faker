var _ = require('lodash');

var Answer = exports.Answer = function Answer(conversation) {
  this.rules = conversation || [];
};

Answer.prototype.load = function (conversation) {
  this.rules = conversation;
};

// default match function
Answer.prototype.match = function (a, b) {
  return _.isEqual(a, b);
};

// get answer to a question
Answer.prototype.to = function (msg) {
  for (var i = 0; i < this.rules.length; i++) {
    var rule = this.rules[i];
    if (this.match(rule.in, msg)) {
      return rule.out;
    }
  }
};
