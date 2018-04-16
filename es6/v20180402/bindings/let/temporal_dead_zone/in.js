// bindings / let / temporal dead zone
module.exports = () => {
  var passed = (function(){ try {  qux; } catch(e) { return true; }}());
  function fn() { passed &= qux === 456; }
  let qux = 456;
  fn();
  return passed;

};