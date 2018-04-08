module.exports = function() {
  'use strict';
  for (var i = 0 in {}) {}
  return false;
};

// EXPECT: 4: ERROR - Parse error. for-in statement may not have initializer
