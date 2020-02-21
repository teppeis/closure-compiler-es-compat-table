var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function(a) {
  return a.raw = a;
};
$jscomp.createTemplateTagFirstArgWithRaw = function(a, b) {
  a.raw = b;
  return a;
};
module.exports = function() {
  return "x\ny"[1] === "x\ny"[1] && "x\ny"[1] === "x\ny"[1] && "\n" === "x\ny"[1];
};

