module.exports = function() {
  for (var a = [], b = {$jscomp$loop$prop$i$2:0}; 2 > b.$jscomp$loop$prop$i$2; b = {$jscomp$loop$prop$i$2:b.$jscomp$loop$prop$i$2}, b.$jscomp$loop$prop$i$2++) {
    a.push(function(a) {
      return function() {
        return a.$jscomp$loop$prop$i$2;
      };
    }(b));
  }
  b = 0 === a[0]() && 1 === a[1]();
  a = [];
  var c = {}, d;
  for (d in{a:1, b:1}) {
    c.$jscomp$loop$prop$i$0$4 = d, a.push(function(a) {
      return function() {
        return a.$jscomp$loop$prop$i$0$4;
      };
    }(c)), c = {$jscomp$loop$prop$i$0$4:c.$jscomp$loop$prop$i$0$4};
  }
  return b &= "a" === a[0]() && "b" === a[1]();
};

