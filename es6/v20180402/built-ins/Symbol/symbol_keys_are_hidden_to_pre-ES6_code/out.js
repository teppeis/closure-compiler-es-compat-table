module.exports = function() {
  var a = {}, b = Symbol();
  a[b] = 1;
  for (var c in a) {
  }
  b = !c;
  Object.keys && Object.getOwnPropertyNames && (b &= 0 === Object.keys(a).length && 0 === Object.getOwnPropertyNames(a).length);
  return b;
};

