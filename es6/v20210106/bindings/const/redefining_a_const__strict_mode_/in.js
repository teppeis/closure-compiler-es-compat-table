// bindings / const / redefining a const (strict mode)
module.exports = () => {
  'use strict';
  const baz = 1;
  const foo = 1;
  foo = 2;
  return false;
};

// EXPECT: 6: ERROR - [JSC_REASSIGNED_CONSTANT] Constant reassigned: foo
