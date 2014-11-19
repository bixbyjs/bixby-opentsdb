exports = module.exports = function(logger, options) {
  options = options || {};

  return function connect(done) {
    if (!options.host) { throw new Error('Invalid configuration of OpenTSDB: missing host'); }
    
    options.port = options.port || 4242;
    
    this.on('connect', function() {
      logger.debug('Connected to OpenTSDB %s:%d', options.host, options.port);
      return done();
    });
    
    this.on('close', function(error) {
      logger.error('OpenTSDB connection closed');
      process.exit(-1);
    });
    
    this.on('error', function(error) {
      logger.error('Unexpected error from OpenTSDB: %s', error.message);
      logger.error(error.stack);
      throw error;
    });
    
    logger.info('Connecting to OpenTSDB %s:%d', options.host, options.port);
    this.connect(options.port, options.host);
  }
  
};
