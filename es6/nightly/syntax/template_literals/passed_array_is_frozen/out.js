var $jscomp$templatelit$0 = ["foo", "bar", "baz"];
$jscomp$templatelit$0.raw = $jscomp$templatelit$0.slice();
module.exports = function() {
  var a = $jscomp$templatelit$0;
  return Object.isFrozen(a) && Object.isFrozen(a.raw);
};

