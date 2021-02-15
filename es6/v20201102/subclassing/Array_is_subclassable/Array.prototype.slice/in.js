// subclassing / Array is subclassable / Array.prototype.slice
module.exports = () => {
  class C extends Array {}
  var c = new C();
  c.push(2,4,6);
  return c.slice(1,2) instanceof C;

};