// subclassing / Array is subclassable / Array.from
module.exports = function() {
  class C extends Array {}
  return C.from({ length: 0 }) instanceof C;
};
