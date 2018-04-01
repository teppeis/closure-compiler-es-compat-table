// subclassing / Array is subclassable / Array.prototype.filter
module.exports = function() {
  class C extends Array {}
  var c = new C();
  return c.filter(Boolean) instanceof C;
};
