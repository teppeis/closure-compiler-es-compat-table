// bindings / const / scope shadow resolution (strict mode)
module.exports = () => {
  'use strict';
  try {
    { const bar = 456; }
    const bar = 123;
    return bar === 123;
  } catch(e) {
    return false;
  }

};