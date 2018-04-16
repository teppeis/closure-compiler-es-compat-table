// built-in extensions / Array.prototype methods / Array.prototype.copyWithin
module.exports = () => {
  var assert = require('assert');
  assert.deepEqual(
    [1, 2, 3, 4, 5].copyWithin(),
    [1, 2, 3, 4, 5]
  );
  assert.deepEqual(
    [1, 2, 3, 4, 5].copyWithin(2),
    [1, 2, 1, 2, 3]
  );
  assert.deepEqual(
    [1, 2, 3, 4, 5].copyWithin(-2),
    [1, 2, 3, 1, 2]
  );
  assert.deepEqual(
    [1, 2, 3, 4, 5].copyWithin(1, 3),
    [1, 4, 5, 4, 5]
  );
  assert.deepEqual(
    [1, 2, 3, 4, 5].copyWithin(1, 3, 4),
    [1, 4, 3, 4, 5]
  );
  return true;
};
