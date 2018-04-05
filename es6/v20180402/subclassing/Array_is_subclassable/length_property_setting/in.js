// subclassing / Array is subclassable / length property (setting)
module.exports = function() {
  class C extends Array {}
  var c = new C();
  c[2] = "foo";
  c.length = 1;
  return c.length === 1 && !(2 in c);
};
