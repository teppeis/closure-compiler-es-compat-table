var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
module.exports = function() {
  var a = !1, b = function() {
  };
  $jscomp.global.Object.defineProperties(b, {foo:{configurable:!0, enumerable:!0, get:function() {
    return "foo";
  }}, bar:{configurable:!0, enumerable:!0, set:function(c) {
    a = c;
  }}});
  b.bar = !0;
  return "foo" === b.foo && a;
};

