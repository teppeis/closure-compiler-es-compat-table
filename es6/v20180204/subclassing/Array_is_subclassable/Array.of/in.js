// subclassing / Array is subclassable / Array.of
module.exports = () => {
  class C extends Array {}
  return C.of(0) instanceof C;

};