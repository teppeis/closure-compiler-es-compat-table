var $jscomp$templatelit$1 = $jscomp.createTemplateTagFirstArg(["foo"]), $jscomp$templatelit$0 = $jscomp.createTemplateTagFirstArg(["foo"]), $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
module.exports = function() {
  var a = $jscomp$templatelit$0, b = $jscomp$templatelit$1;
  return a === $jscomp$templatelit$0 && a !== b;
};

