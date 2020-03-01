// bindings / let / for-in loop binding shadowing parameter
module.exports = () => {
  function f(e) {
    for (let e in {}) {
      if (e) return false;
    }
    return true;
  }
  return f();
};
