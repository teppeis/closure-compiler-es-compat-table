var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
module.exports = function() {
  var a = !1, b = function() {
  };
  $jscomp.global.Object.defineProperties(b, {foo:{configurable:!0, enumerable:!0, get:function() {
    return "foo";
  }}, bar:{configurable:!0, enumerable:!0, set:function(b) {
    a = b;
  }}});
  b.bar = !0;
  return "foo" === b.foo && a;
};

