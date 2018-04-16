// subclassing / miscellaneous subclassables / Number is subclassable
module.exports = () => {
  class C extends Number {}
  var c = new C(6);
  return c instanceof Number
&& c instanceof C
&& +c === 6;

};