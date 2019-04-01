// bindings / let / scope shadow resolution (strict mode)
module.exports = () => {
  'use strict';
  try {
    { let bar = 456; }
    let bar = 123;
    return bar === 123;
  } catch(e) {
    return false;
  }

};