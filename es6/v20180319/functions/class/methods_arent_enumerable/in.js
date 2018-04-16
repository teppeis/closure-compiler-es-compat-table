// functions / class / methods aren't enumerable
module.exports = () => {
  class C {
    foo() {}
    static bar() {}
  }
  return !C.prototype.propertyIsEnumerable("foo") && !C.propertyIsEnumerable("bar");

};