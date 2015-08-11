module.exports = function() {
  var b = {}, c = {}, a = new Map([[b, 123], [c, 456]]);
  return a.has(b) && 123 === a.get(b) && a.has(c) && 456 === a.get(c);
};

