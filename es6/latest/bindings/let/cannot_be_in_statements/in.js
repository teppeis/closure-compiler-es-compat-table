// bindings / let / cannot be in statements
module.exports = function() {
  let bar = 1;
  if(true) let baz = 1;
  return false;
};

// EXPECT: 4: ERROR - Block-scoped declaration not directly within block: baz
