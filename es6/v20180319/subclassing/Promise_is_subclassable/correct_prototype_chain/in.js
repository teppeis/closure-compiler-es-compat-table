// subclassing / Promise is subclassable / correct prototype chain
module.exports = () => {
  class C extends Promise {}
  var c = new C(function(resolve, reject) { resolve("foo"); });
  return c instanceof C && c instanceof Promise && Object.getPrototypeOf(C) === Promise;

};