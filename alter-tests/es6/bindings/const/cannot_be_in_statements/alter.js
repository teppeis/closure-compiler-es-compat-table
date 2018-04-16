// bindings / const / cannot be in statements
module.exports = () => {
  const bar = 1;
  if (true) const baz = 1;
  return false;
};

// EXPECT: 4: ERROR - Block-scoped declaration not directly within block: baz
