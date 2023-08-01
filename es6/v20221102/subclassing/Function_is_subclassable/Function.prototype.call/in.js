// subclassing / Function is subclassable / Function.prototype.call
module.exports = () => {
  class C extends Function {}
  var c = new C("x", "return this.bar + x;");
  return c.call({bar:1}, 2) === 3;

};