module.exports = function() {
  'use strict';
  const baz = 1;
  const foo = 1;
  foo = 2;
  return false;
};

// EXPECT: 6: ERROR - Constant reassigned: foo
