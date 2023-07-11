module.exports = function() {
  for (var a = [], b = {$jscomp$loop$prop$i$252810614$2:0}; 2 > b.$jscomp$loop$prop$i$252810614$2; b = {$jscomp$loop$prop$i$252810614$2:b.$jscomp$loop$prop$i$252810614$2}, b.$jscomp$loop$prop$i$252810614$2++) {
    a.push(function(d) {
      return function() {
        return d.$jscomp$loop$prop$i$252810614$2;
      };
    }(b));
  }
  b = 0 === a[0]() && 1 === a[1]();
  a = [];
  var c = {}, e;
  for (e in{a:1, b:1}) {
    c = {$jscomp$loop$prop$i$252810614$0$252810614$4:c.$jscomp$loop$prop$i$252810614$0$252810614$4}, c.$jscomp$loop$prop$i$252810614$0$252810614$4 = e, a.push(function(d) {
      return function() {
        return d.$jscomp$loop$prop$i$252810614$0$252810614$4;
      };
    }(c));
  }
  return b &= "a" === a[0]() && "b" === a[1]();
};

