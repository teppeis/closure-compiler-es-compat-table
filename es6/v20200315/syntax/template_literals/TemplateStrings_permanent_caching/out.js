var $jscomp$templatelit$0 = $jscomp.createTemplateTagFirstArg(["foo"]), $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
module.exports = function() {
  var a = $jscomp$templatelit$0, b = new function() {
    return $jscomp$templatelit$0;
  };
  return a === $jscomp$templatelit$0 && a === b;
};

