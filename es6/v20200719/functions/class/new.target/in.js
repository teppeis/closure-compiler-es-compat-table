// functions / class / new.target
module.exports = () => {
  var passed = false;
  new function f() {
    passed = new.target === f;
  }();
  class A {
    constructor() {
      passed &= new.target === B;
    }
  }
  class B extends A {}
  new B();
  return passed;

};