var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
var $jscomp$templatelit$803190107$0 = $jscomp.createTemplateTagFirstArg(["foo"]), $jscomp$templatelit$803190107$1 = $jscomp.createTemplateTagFirstArg(["foo"]);
module.exports = function() {
  var a = $jscomp$templatelit$803190107$0, b = $jscomp$templatelit$803190107$1;
  return a === $jscomp$templatelit$803190107$0 && a !== b;
};

