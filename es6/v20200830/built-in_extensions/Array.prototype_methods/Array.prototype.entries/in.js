// built-in extensions / Array.prototype methods / Array.prototype.entries
module.exports = () => {
  var assert = require('assert');
  var iter = ['a', 'b'].entries();
  assert.deepEqual(iter.next(), {value: [0, 'a'], done: false});
  assert.deepEqual(iter.next(), {value: [1, 'b'], done: false});
  assert.deepEqual(iter.next(), {value: undefined, done: true});
  return true;
};
