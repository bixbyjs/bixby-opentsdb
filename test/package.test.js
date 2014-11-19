/* global describe, it, expect */

var opentsdb = require('..');

describe('bixby-opentsdb', function() {
  
  it('should export a function', function() {
    expect(opentsdb).to.be.an('function');
  });
  
});
