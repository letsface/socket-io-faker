var expect = require('chai').expect;
var recorder = require('../lib/recorder');

describe('recorder', function() {
  describe('normal conversation', function() {
    var rec = new recorder.Recorder();
    it('should record original message', function() {
      rec. in ('api', 'hello');
      rec.out('api', 'world');
      expect(rec.records).to.eql([{
        event: 'api',
        direction: 'in',
        data: 'hello'
      }, {
        event: 'api',
        direction: 'out',
        data: 'world'
      }]);
    });
    it('should pair conversation', function() {
      var conv = rec.conversation();
      expect(conv).to.eql([{ in : {
          event: 'api',
          data: 'hello',
          direction: 'in'
        },
        out: {
          event: 'api',
          data: 'world',
          direction: 'out'
        }
      }]);
    });
  });
  describe('in without out', function() {
    var rec = new recorder.Recorder();
    it('should create new conversation', function() {
      rec.in ('api', 'hello1');
      rec.in ('api', 'hello2');
      var conv = rec.conversation();
      expect(conv).to.eql([{
        in : {
          event: 'api',
          data: 'hello1',
          direction: 'in'
        }
      }, {
        in : {
          event: 'api',
          data: 'hello2',
          direction: 'in'
        }
      }]);
    });
  });
  describe('out without in', function() {
    var rec = new recorder.Recorder();
    it('should ignore unpaired out', function() {
      rec.in ('api', 'hello');
      rec.out('api', 'world');
      rec.out('api', 'bye');
      var conv = rec.conversation();
      expect(conv).to.eql([{
        in : {
          event: 'api',
          direction: 'in',
          data: 'hello'
        },
        out: {
          event: 'api',
          direction: 'out',
          data: 'world'
        }
      }]);
    });
  });
});
