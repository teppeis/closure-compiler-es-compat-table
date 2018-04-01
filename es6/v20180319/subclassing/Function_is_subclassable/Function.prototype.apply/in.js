// subclassing / Function is subclassable / Function.prototype.apply
module.exports = function() {
  class C extends Function {}
  var c = new C("x", "return this.bar + x;");
  return c.apply({ bar: 1 }, [2]) === 3;
};
