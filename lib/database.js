var telnet = require('./adapters/telnet');

exports = module.exports = function(logger) {
  var client = new telnet.Client();
  return client;
}

exports['@singleton'] = true;
exports['@require'] = [ 'logger' ];
