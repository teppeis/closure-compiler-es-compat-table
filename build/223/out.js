module.exports = function() {
  var a = {}, b = new Map;
  b.set(a, 123);
  return b.has(a) && 123 === b.get(a);
};

