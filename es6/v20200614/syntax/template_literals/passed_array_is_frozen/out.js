var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
var $jscomp$templatelit$1399764858$0 = $jscomp.createTemplateTagFirstArg(["foo", "bar", "baz"]);
module.exports = function() {
  var a = $jscomp$templatelit$1399764858$0;
  return Object.isFrozen(a) && Object.isFrozen(a.raw);
};

