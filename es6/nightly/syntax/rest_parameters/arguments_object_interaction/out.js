var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.getRestArguments = function() {
  for (var a = Number(this), c = [], b = a; b < arguments.length; b++) {
    c[b - a] = arguments[b];
  }
  return c;
};
module.exports = function() {
  return function(a) {
    $jscomp.getRestArguments.apply(1, arguments);
    a = "qux";
    return 3 === arguments.length && "foo" === arguments[0] && "bar" === arguments[1] && "baz" === arguments[2];
  }("foo", "bar", "baz");
};

