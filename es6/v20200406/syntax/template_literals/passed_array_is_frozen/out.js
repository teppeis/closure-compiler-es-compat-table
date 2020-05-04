var $jscomp$templatelit$1505295643$0 = $jscomp.createTemplateTagFirstArg(["foo", "bar", "baz"]), $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
module.exports = function() {
  var a = $jscomp$templatelit$1505295643$0;
  return Object.isFrozen(a) && Object.isFrozen(a.raw);
};

