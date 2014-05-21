var Recorder = exports.Recorder = function () {
  this.records = [];
};

Recorder.prototype.in = function (msg) {
  this.push('in', msg);
};

Recorder.prototype.out = function (msg) {
  this.push('out', msg);
};

Recorder.prototype.push = function (type, msg) {
  this.records.push({
    type: type,
    msg: msg
  });
};

// build conversation from records
// new conversation on 'in'
// pair 'out' to last 'in' if not paired
// otherwise it is ignored
Recorder.prototype.conversation = function () {
  // temporary unpaired pair
  var pair;
  return this.records.reduce(function (soFar, record) {
    if (record.type === 'in') {
      if (pair) {
        console.warn('unpaired conversation: ' + JSON.stringify(pair));
      }
      pair = {
        in: record.msg
      };
      soFar.push(pair);
    } else if (record.type === 'out') {
      if (pair) {
        pair.out = record.msg;
        pair = undefined;
      } else {
        console.warn('unpaired out record: ' + JSON.stringify(record));
      }
    } else {
      console.warn('unknown type: ' + record.type);
    }
    return soFar;
  }, []);
};
