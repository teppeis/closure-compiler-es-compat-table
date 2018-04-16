// bindings / let / is block-scoped
module.exports = () => {
  let bar = 123;
  { let bar = 456; }
  return bar === 123;

};