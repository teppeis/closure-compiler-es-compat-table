// built-in extensions / Array.prototype methods / Array.prototype[Symbol.iterator]
module.exports = () => {
  var assert = require('assert');
  var iter = ['a', ,'c'][Symbol.iterator]();
  assert.deepEqual(iter.next(), {value: 'a', done: false});
  assert.deepEqual(iter.next(), {value: undefined, done: false});
  assert.deepEqual(iter.next(), {value: 'c', done: false});
  // end.value doesn't exist
  var end = iter.next();
  return end.done === true;
};
