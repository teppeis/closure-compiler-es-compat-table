// subclassing / Function is subclassable / correct prototype chain
module.exports = function() {
  class C extends Function {}
  var c = new C("return 'foo';");
  return (
    c instanceof C &&
    c instanceof Function &&
    Object.getPrototypeOf(C) === Function
  );
};
