// built-in extensions / Array.prototype methods / Array.prototype.values
module.exports = () => {
  var assert = require('assert');
  var iter = ['a', ,'c'].values();
  assert.deepEqual(iter.next(), {value: 'a', done: false});
  assert.deepEqual(iter.next(), {value: undefined, done: false});
  assert.deepEqual(iter.next(), {value: 'c', done: false});
  assert.deepEqual(iter.next(), {value: undefined, done: true});
  return true;
};
