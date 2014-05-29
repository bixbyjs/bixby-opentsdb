module.exports = function opentsdb(id) {
  var map = {
    'database': './database',
    'boot/connection': './boot/connection'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};
