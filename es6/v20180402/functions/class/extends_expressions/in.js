// functions / class / extends expressions
module.exports = () => {
  var B;
  class C extends (B = class {}) {}
  return new C() instanceof B
&& B.isPrototypeOf(C);

};