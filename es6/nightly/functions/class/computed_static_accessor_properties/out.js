var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var a = 0; a < b.length; ++a) {
    var c = b[a];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
module.exports = function() {
  var b = !1, a = function() {
  };
  $jscomp.global.Object.defineProperty(a, "foo", {configurable:!0, enumerable:!0, get:function() {
    return "foo";
  }});
  $jscomp.global.Object.defineProperty(a, "bar", {configurable:!0, enumerable:!0, set:function(c) {
    b = c;
  }});
  a.bar = !0;
  return "foo" === a.foo && b;
};

