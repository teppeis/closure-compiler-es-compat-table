// bindings / const / temporal dead zone
module.exports = () => {
  var passed = (function(){ try { qux; } catch(e) { return true; }}());
  function fn() { passed &= qux === 456; }
  const qux = 456;
  fn();
  return passed;

};