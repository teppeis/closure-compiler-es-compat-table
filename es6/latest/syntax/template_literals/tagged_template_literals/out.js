var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
var $jscomp$templatelit$m604112275$0 = $jscomp.createTemplateTagFirstArgWithRaw(["foo", "bar\n", ""], ["foo", "bar\\n", ""]);
module.exports = function() {
  var a = $jscomp$templatelit$m604112275$0;
  return a instanceof Array && "foo" === a[0] && "bar\n" === a[1] && "foo" === a.raw[0] && "bar\\n" === a.raw[1] && !0;
};

