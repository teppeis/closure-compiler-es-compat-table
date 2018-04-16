// subclassing / Array is subclassable / Array.from
module.exports = () => {
  class C extends Array {}
  return C.from({ length: 0 }) instanceof C;

};