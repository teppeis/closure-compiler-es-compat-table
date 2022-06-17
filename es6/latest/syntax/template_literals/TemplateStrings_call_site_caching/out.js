var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
var $jscomp$templatelit$1427238459$0 = $jscomp.createTemplateTagFirstArg(["foo"]), $jscomp$templatelit$1427238459$1 = $jscomp.createTemplateTagFirstArg(["foo"]);
module.exports = function() {
  var a = $jscomp$templatelit$1427238459$0, b = $jscomp$templatelit$1427238459$1;
  return a === $jscomp$templatelit$1427238459$0 && a !== b;
};

