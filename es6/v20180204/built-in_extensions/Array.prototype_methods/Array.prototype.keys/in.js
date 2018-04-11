// built-in extensions / Array.prototype methods / Array.prototype.keys
module.exports = function() {
  var assert = require('assert');
  var iter = ['a', ,'c'].keys();
  assert.deepEqual(iter.next(), {value: 0, done: false});
  assert.deepEqual(iter.next(), {value: 1, done: false});
  assert.deepEqual(iter.next(), {value: 2, done: false});
  assert.deepEqual(iter.next(), {value: undefined, done: true});
  return true;
};
