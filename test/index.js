var expect = require('chai').expect,
    socketIoFaker = require('..');

describe('socket-io-faker', function() {
  it('should exports', function(done) {
    expect(socketIoFaker).to.have.property('Recorder');
    expect(socketIoFaker).to.have.property('Answer');
    done();
  });
});
