// syntax / new.target / in constructors
module.exports = () => {
  var passed = false;
  new function f() {
    passed = (new.target === f);
  }();
  (function() {
    passed &= (new.target === undefined);
  }());
  return passed;

};