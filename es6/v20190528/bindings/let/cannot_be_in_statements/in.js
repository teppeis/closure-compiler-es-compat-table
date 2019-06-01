// bindings / let / cannot be in statements
module.exports = () => {
  let bar = 1;
  if(true) let baz = 1;
  return false;
};

// EXPECT: 4: ERROR - [JSC_DECLARATION_NOT_DIRECTLY_IN_BLOCK] Block-scoped declaration not directly within block: baz
