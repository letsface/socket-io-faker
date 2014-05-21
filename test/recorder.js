var expect = require('chai').expect;
var recorder = require('../lib/recorder');

describe('recorder', function() {
  describe('normal conversation', function() {
    var rec = new recorder.Recorder();
    it('should record original message', function() {
      rec.in('hello');
      rec.out('world');
      expect(rec.records).to.eql([{
        type: 'in',
        msg: 'hello'
      }, {
        type: 'out',
        msg: 'world'
      }]);
    });
    it('should pair conversation', function () {
      var conv = rec.conversation();
      expect(conv).to.eql([{
        in: 'hello',
        out: 'world'
      }]);
    });
  });
  describe('in without out', function () {
    var rec = new recorder.Recorder();
    it ('should create new conversation', function () {
      rec.in('hello1');
      rec.in('hello2');
      var conv = rec.conversation();
      expect(conv).to.eql([{
          in: 'hello1'
        }, {
          in: 'hello2'
        }
      ]);
    });
  });
  describe('out without in', function () {
    var rec = new recorder.Recorder();
    it('should ignore unpaired out', function () {
      rec.in('hello');
      rec.out('world');
      rec.out('bye');
      var conv = rec.conversation();
      expect(conv).to.eql([{
        in: 'hello',
        out: 'world'
      }]);
    });
  });
});
