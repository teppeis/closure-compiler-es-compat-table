// built-ins / Symbol / global symbol registry
module.exports = function() {
  var symbol = Symbol.for('foo');
  return Symbol.for('foo') === symbol &&
Symbol.keyFor(symbol) === 'foo';

};