var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
var $jscomp$templatelit$m1982069922$0 = $jscomp.createTemplateTagFirstArg(["a{1}c"]);
module.exports = function() {
  return !Array.isTemplateObject([]) && Array.isTemplateObject($jscomp$templatelit$m1982069922$0);
};

