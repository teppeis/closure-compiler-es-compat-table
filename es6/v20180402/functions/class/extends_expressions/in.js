// functions / class / extends expressions
module.exports = function() {
  var B;
  class C extends (B = class {}) {}
  return new C() instanceof B && B.isPrototypeOf(C);
};
