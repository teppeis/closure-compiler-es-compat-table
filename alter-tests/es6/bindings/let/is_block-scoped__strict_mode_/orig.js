// bindings / let / is block-scoped (strict mode)
module.exports = () => {
  'use strict';
  let bar = 123;
  { let bar = 456; }
  return bar === 123;

};