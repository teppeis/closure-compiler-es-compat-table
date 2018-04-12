// built-in extensions / Array.prototype methods / Array.prototype.fill
module.exports = function() {
  var assert = require('assert');
  assert.deepEqual(
    [1, 2, 3].fill(),
    [undefined, undefined, undefined]
  );
  assert.deepEqual(
    [1, 2, 3].fill(4),
    [4, 4, 4]
  );
  assert.deepEqual(
    [1, 2, 3].fill(4, 1),
    [1, 4, 4]
  );
  assert.deepEqual(
    [1, 2, 3].fill(4, 1, 2),
    [1, 4, 3]
  );
  assert.deepEqual(
    [1, 2, 3].fill(4, -3, -2),
    [4, 2, 3]
  );
  return true;
};
