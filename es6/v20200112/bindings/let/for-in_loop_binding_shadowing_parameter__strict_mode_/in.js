// bindings / let / for-in loop binding shadowing parameter (strict mode)
module.exports = () => {
  'use strict';
  function f(e) {
    for (let e in {}) {
      if (e) return false;
    }
    return true;
  }
  return f();
};
