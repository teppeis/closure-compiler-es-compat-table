// bindings / const / redefining a const is an error
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  const baz = 1;
  try {
    Function("const foo = 1; foo = 2;")();
  } catch(e) {
    return true;
  }

};