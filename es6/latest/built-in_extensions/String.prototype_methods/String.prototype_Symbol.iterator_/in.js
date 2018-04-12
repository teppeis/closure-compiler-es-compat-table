// built-in extensions / String.prototype methods / String.prototype[Symbol.iterator]
module.exports = function() {
  var assert = require('assert');
  var iter = 'abc'[Symbol.iterator]();
  assert.deepEqual(iter.next(), {value: 'a', done: false});
  assert.deepEqual(iter.next(), {value: 'b', done: false});
  assert.deepEqual(iter.next(), {value: 'c', done: false});
  // end.value doesn't exist
  var end = iter.next();
  return end.done === true;
};
