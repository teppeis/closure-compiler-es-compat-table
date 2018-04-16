// subclassing / Array is subclassable / length property (accessing)
module.exports = () => {
  class C extends Array {}
  var c = new C();
  var len1 = c.length;
  c[2] = 'foo';
  var len2 = c.length;
  return len1 === 0 && len2 === 3;

};