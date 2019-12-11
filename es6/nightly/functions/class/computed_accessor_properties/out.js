var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
module.exports = function() {
  var a = !1, b = function() {
  }, c = {};
  $jscomp.global.Object.defineProperties(b.prototype, (c.foo = {configurable:!0, enumerable:!0, get:function() {
    return "foo";
  }}, c.bar = {configurable:!0, enumerable:!0, set:function(b) {
    a = b;
  }}, c));
  (new b).bar = !0;
  return "foo" === (new b).foo && a;
};

