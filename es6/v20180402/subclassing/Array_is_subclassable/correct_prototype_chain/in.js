// subclassing / Array is subclassable / correct prototype chain
module.exports = function() {
  class C extends Array {}
  var c = new C();
  return (
    c instanceof C && c instanceof Array && Object.getPrototypeOf(C) === Array
  );
};
