var $jscomp$templatelit$0 = ["foo", "bar", "baz"];
$jscomp$templatelit$0.raw = ["foo", "bar", "baz"];
module.exports = function() {
  var a = $jscomp$templatelit$0;
  return Object.isFrozen(a) && Object.isFrozen(a.raw);
};

