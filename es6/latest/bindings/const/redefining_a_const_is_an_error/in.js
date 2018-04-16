// bindings / const / redefining a const is an error
module.exports = () => {
  const baz = 1;
  const foo = 1;
  foo = 2;
  return false;
};

// EXPECT: 5: ERROR - Constant reassigned: foo
