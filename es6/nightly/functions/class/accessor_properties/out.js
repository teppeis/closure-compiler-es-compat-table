var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(b) {
  return "object" == typeof globalThis ? globalThis : "object" == typeof window ? window : "object" == typeof self ? self : "undefined" != typeof global && null != global ? global : b;
};
$jscomp.global = $jscomp.getGlobal(this);
module.exports = function() {
  var b = !1, a = function() {
  };
  $jscomp.global.Object.defineProperties(a.prototype, {foo:{configurable:!0, enumerable:!0, get:function() {
    return "foo";
  }}, bar:{configurable:!0, enumerable:!0, set:function(a) {
    b = a;
  }}});
  (new a).bar = !0;
  return "foo" === (new a).foo && b;
};

