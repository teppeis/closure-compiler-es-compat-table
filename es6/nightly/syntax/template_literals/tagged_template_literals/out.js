var $jscomp$templatelit$m1673232998$0 = $jscomp.createTemplateTagFirstArgWithRaw(["foo", "bar\n", ""], ["foo", "bar\\n", ""]), $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
module.exports = function() {
  var a = $jscomp$templatelit$m1673232998$0;
  return a instanceof Array && "foo" === a[0] && "bar\n" === a[1] && "foo" === a.raw[0] && "bar\\n" === a.raw[1] && !0;
};

