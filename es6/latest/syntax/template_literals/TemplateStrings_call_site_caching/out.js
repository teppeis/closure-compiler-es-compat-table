var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
var $jscomp$templatelit$m576234208$0 = $jscomp.createTemplateTagFirstArg(["foo"]), $jscomp$templatelit$m576234208$1 = $jscomp.createTemplateTagFirstArg(["foo"]);
module.exports = function() {
  var a = $jscomp$templatelit$m576234208$0, b = $jscomp$templatelit$m576234208$1;
  return a === $jscomp$templatelit$m576234208$0 && a !== b;
};

