var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
module.exports = function() {
  return "foo" === "" + {toString:function() {
    return "foo";
  }, valueOf:function() {
    return "bar";
  }};
};

