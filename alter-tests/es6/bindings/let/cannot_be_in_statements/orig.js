// bindings / let / cannot be in statements
module.exports = function() {
  throw new Error('eval() and Function() cannot be transpiled');
  let bar = 1;
  try {
    Function("if(true) let baz = 1;")();
  } catch(e) {
    return true;
  }

};