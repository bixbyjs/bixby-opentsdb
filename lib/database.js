var telnet = require('telnet-client');

exports = module.exports = function(logger) {
  var connection = new telnet();
  return connection;
}

exports['@singleton'] = true;
exports['@require'] = [ 'logger' ];
