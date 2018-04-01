// functions / super / super() invokes the correct constructor
module.exports = function() {
  // checks that super() is *not* a synonym of super.constructor()
  var passed;
  class B {
    constructor() {
      passed = true;
    }
  }
  B.prototype.constructor = function() {
    passed = false;
  };
  class C extends B {}
  new C();
  return passed;
};
