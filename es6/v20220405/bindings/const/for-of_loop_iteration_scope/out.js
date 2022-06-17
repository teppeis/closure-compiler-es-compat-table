var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++],} : {done:!0};
  };
};
$jscomp.arrayIterator = function(a) {
  return {next:$jscomp.arrayIteratorImpl(a)};
};
$jscomp.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
module.exports = function() {
  for (var a = [], b = {}, d = $jscomp.makeIterator(["a", "b"]), c = d.next(); !c.done; b = {$jscomp$loop$prop$i$2:b.$jscomp$loop$prop$i$2}, c = d.next()) {
    b.$jscomp$loop$prop$i$2 = c.value, a.push(function(e) {
      return function() {
        return e.$jscomp$loop$prop$i$2;
      };
    }(b));
  }
  return "a" === a[0]() && "b" === a[1]();
};

