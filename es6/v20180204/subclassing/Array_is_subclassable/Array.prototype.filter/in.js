// subclassing / Array is subclassable / Array.prototype.filter
module.exports = () => {
  class C extends Array {}
  var c = new C();
  return c.filter(Boolean) instanceof C;

};