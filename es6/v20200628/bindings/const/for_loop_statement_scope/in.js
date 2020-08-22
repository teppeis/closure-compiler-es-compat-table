// bindings / const / for loop statement scope
module.exports = () => {
  const baz = 1;
  for(const baz = 0; false;) {}
  return baz === 1;

};