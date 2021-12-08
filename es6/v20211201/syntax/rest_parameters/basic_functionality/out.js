var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getRestArguments = function() {
  for (var c = Number(this), a = [], b = c; b < arguments.length; b++) {
    a[b - c] = arguments[b];
  }
  return a;
};
module.exports = function() {
  return function(c) {
    var a = $jscomp.getRestArguments.apply(1, arguments);
    return a instanceof Array && "bar,baz" === a + "";
  }("foo", "bar", "baz");
};

