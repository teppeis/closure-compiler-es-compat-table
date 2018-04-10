// bindings / const / cannot be in statements
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  const bar = 1;
  try {
    Function("if(true) const baz = 1;")();
  } catch(e) {
    return true;
  }

};