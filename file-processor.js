const EventEmitter = require('events');
const util = require('util');

module.exports = FileProcessor;

/*
FileProcessor Class
  - Reads a stream line-by line

Either handle data event or callback

* callback is optional, 

*/
function FileProcessor(stream, callback) {
  if (!(this instanceof FileProcessor)) { return new FileProcessor(stream, callback); }
  if (stream === '-') { input = process.stdin; }
  if (typeof(stream) === 'string') { stream = require('fs').createReadStream(stream, 'utf8'); }
  // Setup events, and lineReader
  EventEmitter.call(this);
  return require('readline').createInterface({ input: stream })
  .on('line', function (line) {
    if (typeof(callback) === 'function') { return callback(null, line); }
    this.emit('line', line);
  }.bind(this))
  .on('close', function() {
    if (typeof(callback) === 'function') { return callback(null, null); }
    this.emit('close');
  }.bind(this));
}
util.inherits(FileProcessor, EventEmitter);

