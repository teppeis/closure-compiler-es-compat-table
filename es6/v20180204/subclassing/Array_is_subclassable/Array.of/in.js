// subclassing / Array is subclassable / Array.of
module.exports = function() {
  class C extends Array {}
  return C.of(0) instanceof C;

};