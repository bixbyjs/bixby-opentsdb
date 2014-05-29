exports = module.exports = function(db, settings, logger) {

  return function connection(done) {
    var config = settings.get('opentsdb') || {};
    if (!config.host) { throw new Error('Invalid configuration of OpenTSDB: missing host'); }
    
    config.port = config.port || 4242;
    
    db.on('connect', function() {
      logger.debug('Connected to OpenTSDB %s:%d', config.host, config.port);
      return done();
    });
    
    db.on('close', function(error) {
      logger.error('OpenTSDB connection closed');
      process.exit(-1);
    });
    
    db.on('error', function(error) {
      logger.error('Unexpected error from OpenTSDB: %s', error.message);
      logger.error(error.stack);
      throw error;
    });
    
    logger.info('Connecting to OpenTSDB %s:%d', config.host, config.port);
    db.connect(config.port, config.host);
  }

};

exports['@singleton'] = true;
exports['@require'] = ['../database', 'settings', 'logger'];
