// bindings / let / for-in loop binding shadowing parameter
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  try {
    Function("function f(e) { for (let e in {}) e }");
    return true;
  } catch(e) {
    return false;
  }

};