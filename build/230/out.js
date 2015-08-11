module.exports = function() {
  var a = new Map;
  a.set(-0, "foo");
  var b;
  a.forEach(function(a, c) {
    b = 1 / c;
  });
  return Infinity === b && "foo" == a.get(0);
};

