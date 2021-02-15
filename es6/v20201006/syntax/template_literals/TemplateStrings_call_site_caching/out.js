var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
var $jscomp$templatelit$m853912799$0 = $jscomp.createTemplateTagFirstArg(["foo"]), $jscomp$templatelit$m853912799$1 = $jscomp.createTemplateTagFirstArg(["foo"]);
module.exports = function() {
  var a = $jscomp$templatelit$m853912799$0, b = $jscomp$templatelit$m853912799$1;
  return a === $jscomp$templatelit$m853912799$0 && a !== b;
};

