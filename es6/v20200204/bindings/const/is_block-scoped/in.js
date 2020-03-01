// bindings / const / is block-scoped
module.exports = () => {
  const bar = 123;
  { const bar = 456; }
  return bar === 123;

};