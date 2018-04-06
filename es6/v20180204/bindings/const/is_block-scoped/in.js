// bindings / const / is block-scoped
module.exports = function() {
  const bar = 123;
  { const bar = 456; }
  return bar === 123;

};