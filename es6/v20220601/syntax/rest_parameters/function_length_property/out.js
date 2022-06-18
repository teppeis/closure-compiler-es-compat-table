var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getRestArguments = function() {
  for (var b = Number(this), c = [], a = b; a < arguments.length; a++) {
    c[a - b] = arguments[a];
  }
  return c;
};
module.exports = function() {
  return 1 === function(b) {
  }.length && 0 === function() {
  }.length;
};

