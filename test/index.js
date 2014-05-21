var expect = require('chai').expect,
    socketIoFaker = require('..');

describe('socket-io-faker', function() {
  it('should say hello', function(done) {
    expect(socketIoFaker()).to.equal('Hello, world');
    done();
  });
});
