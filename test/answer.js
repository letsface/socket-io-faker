var expect = require('chai').expect;
var answer = require('../lib/answer');
var rules = require('./fixtures/rules.json');

describe('answer', function () {
  it('should process data', function (done) {
    var ans = new answer.Answer(rules);
    var version = {
      op: 'version',
      payload: 'v1'
    };
    ans.process('connected', 'api', version, function (err, out, newState) {
      expect(err).to.be.a('null');
      expect(newState).to.eql('versioned');
      done();
    });
  });
  it('should check state', function (done) {
    var ans = new answer.Answer(rules);
    var login = {
      op: 'login',
      payload: {}
    };
    ans.process('connected', 'api', login, function (err, out, newState) {
      var dummy = expect(err).to.exist;
      dummy = expect(out).to.not.exist;
      done();
    });
  });
});
