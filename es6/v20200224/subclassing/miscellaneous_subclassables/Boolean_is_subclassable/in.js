// subclassing / miscellaneous subclassables / Boolean is subclassable
module.exports = () => {
  class C extends Boolean {}
  var c = new C(true);
  return c instanceof Boolean
&& c instanceof C
&& c === true;

};