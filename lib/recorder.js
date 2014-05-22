var Recorder = exports.Recorder = function (records) {
  this.records = records || [];
};

Recorder.prototype.in = function (event, data) {
  this.push('in', event, data);
};

Recorder.prototype.out = function (event, data) {
  this.push('out', event, data);
};

Recorder.prototype.push = function (direction, event, data) {
  this.records.push({
    event: event,
    data: data,
    direction: direction
  });
};

// build rules from records
//
// * create new rule for each 'in'
// * pair 'out' to last 'in' if not paired
// * otherwise it is ignored
//
// note states are not supported
Recorder.prototype.buildRules = function () {
  // temporary unpaired pair
  var pair;
  return this.records.reduce(function (soFar, record) {
    if (record.direction === 'in') {
      if (pair) {
        console.warn('unpaired conversation: ' + JSON.stringify(pair));
      }
      pair = {
        in: record
      };
      soFar.push(pair);
    } else if (record.direction === 'out') {
      if (pair) {
        pair.out = record;
        pair = undefined;
      } else {
        console.warn('unpaired out record: ' + JSON.stringify(record));
      }
    } else {
      console.warn('invalid direction: ' + record.direction);
    }
    return soFar;
  }, []);
};
