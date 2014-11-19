/**
 * Module dependencies.
 */
var telnet = require('./adapters/telnet')
  , bootable = require('bootable');


exports = module.exports = function(logger, settings) {
  var options = settings.toObject();
  var client = new telnet.Client();
  
  // Augument with bootable functionality.
  client = bootable(client);
  client.phase(require('./init/connect')(logger, options));
  
  return client;
}

exports['@singleton'] = true;
exports['@require'] = [ 'logger', 'settings' ];
