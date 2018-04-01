var $jscomp$templatelit$0 = ["foo", "bar\n", ""];
$jscomp$templatelit$0.raw = ["foo", "bar\\n", ""];
module.exports = function() {
  var a = $jscomp$templatelit$0;
  return a instanceof Array && "foo" === a[0] && "bar\n" === a[1] && "foo" === a.raw[0] && "bar\\n" === a.raw[1] && !0;
};

