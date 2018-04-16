// subclassing / Function is subclassable / correct prototype chain
module.exports = () => {
  class C extends Function {}
  var c = new C("return 'foo';");
  return c instanceof C && c instanceof Function && Object.getPrototypeOf(C) === Function;

};