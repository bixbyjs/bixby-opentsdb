var EventEmitter = require('events').EventEmitter
  , net = require('net')
  , util = require('util')


function Client() {
  EventEmitter.call(this);
}

util.inherits(Client, EventEmitter);

Client.prototype.connect = function(port, host) {
  this._socket = new net.Socket();
  this._socket.on('connect', this.emit.bind(this, 'connect'));
  this._socket.on('close', this.emit.bind(this, 'close'));
  this._socket.on('error', this.emit.bind(this, 'error'));
  this._socket.connect(port, host);
}

Client.prototype.put = function(metric, timestamp, value, tags, cb) {
  if (typeof tags == 'function') {
    cb = tags;
    tags = undefined;
  }
  
  var cmd = ['put', metric, timestamp, value];
  if (typeof tags == 'string') {
    cmd.push(tags);
  } else if (typeof tags == 'object') {
    Object.keys(tags).forEach(function(key) {
      cmd.push(key + '=' + tags[key]);
    });
  }
  
  cmd = cmd.join(' ') + '\n';
  this._socket.write(cmd, cb);
}


module.exports = Client;
