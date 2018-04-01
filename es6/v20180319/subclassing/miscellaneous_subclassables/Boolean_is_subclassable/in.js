// subclassing / miscellaneous subclassables / Boolean is subclassable
module.exports = function() {
  class C extends Boolean {}
  var c = new C(true);
  return c instanceof Boolean && c instanceof C && c == true;
};
