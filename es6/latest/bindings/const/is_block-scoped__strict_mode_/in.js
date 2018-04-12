// bindings / const / is block-scoped (strict mode)
module.exports = function() {
  'use strict';
  const bar = 123;
  { const bar = 456; }
  return bar === 123;

};