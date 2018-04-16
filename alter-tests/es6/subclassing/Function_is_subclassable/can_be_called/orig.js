// subclassing / Function is subclassable / can be called
module.exports = () => {
  class C extends Function {}
  var c = new C("return 'foo';");
  return c() === 'foo';

};