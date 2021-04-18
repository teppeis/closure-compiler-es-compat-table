// subclassing / miscellaneous subclassables / Error is subclassable
module.exports = () => {
  class C extends Error {}
  var c = new C();
  return c instanceof Error
&& c instanceof C
&& Object.prototype.toString.call(c) === "[object Error]";

};