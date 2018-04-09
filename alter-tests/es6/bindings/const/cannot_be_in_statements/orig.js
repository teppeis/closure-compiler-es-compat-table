// bindings / const / cannot be in statements
module.exports = function() {
  const bar = 1;
  try {
    Function("if(true) const baz = 1;")();
  } catch(e) {
    return true;
  }

};