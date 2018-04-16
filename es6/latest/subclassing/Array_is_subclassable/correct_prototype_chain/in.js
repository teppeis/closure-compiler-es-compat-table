// subclassing / Array is subclassable / correct prototype chain
module.exports = () => {
  class C extends Array {}
  var c = new C();
  return c instanceof C && c instanceof Array && Object.getPrototypeOf(C) === Array;

};