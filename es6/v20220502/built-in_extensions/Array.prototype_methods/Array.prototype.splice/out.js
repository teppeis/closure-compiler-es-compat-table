module.exports = function() {
  if (3 !== [0, 1, 2].splice(0).length) {
    return !1;
  }
  var b = [1, 2], d = b.splice();
  if (2 !== b.length || 0 !== d.length) {
    return !1;
  }
  b = {};
  Array.prototype.splice.call(b, 0, 0, 1);
  if (1 !== b.length) {
    return !1;
  }
  b = function() {
    var a = Array(1e5);
    a[8] = "x";
    a.splice(1, 1);
    for (var c = 0; c < a.length; c += 1) {
      if ("x" === a[c]) {
        return 7 === c;
      }
    }
    return !1;
  }();
  d = function() {
    var a = [];
    a[256] = "a";
    a.splice(257, 0, "b");
    return "a" === a[256];
  }();
  return b && d;
};

