var expect = require('chai').expect;
var answer = require('../lib/answer');

describe('answer', function () {
  it('default rule', function () {
    var conv = [
      {
        in: 'hello',
        out: 'world'
      }
    ];
    var ans = new answer.Answer(conv);
    expect(ans.to('hello')).to.eql('world');
  });
  it('should use customized rule', function () {
    var conv = [
      {
        in: {
          op: 'version'
        },
        out: {
          op: 'out',
          payload: {
            op: 'version'
          }
        }
      }
    ];
    var ans = new answer.Answer(conv);
    ans.match = function sameOp(a, b) {
      if ('op' in a && 'op' in b) {
        return a.op === b.op;
      } else {
        return false;
      }
    };
    expect(ans.to({
      op: 'version',
      payload: 'does not matter'
    })).to.eql(conv[0].out);
  });
});
