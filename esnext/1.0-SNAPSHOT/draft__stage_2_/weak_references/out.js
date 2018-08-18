module.exports = function() {
  var a = {}, b = System.makeWeakRef(a);
  a = b.get() === a;
  b.clear();
  return a && void 0 === b.get();
};

