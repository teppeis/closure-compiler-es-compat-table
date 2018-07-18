// subclassing / Function is subclassable / Function.prototype.bind
module.exports = () => {
  class C extends Function {}
  var c = new C("x", "y", "return this.bar + x + y;").bind({bar:1}, 2);
  return c(6) === 9 && c instanceof C;

};