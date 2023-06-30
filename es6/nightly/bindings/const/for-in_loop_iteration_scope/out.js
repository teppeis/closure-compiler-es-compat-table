module.exports = function() {
  var b = [], a = {}, c;
  for (c in{a:1, b:1}) {
    a.$jscomp$loop$prop$i$m1091534668$1 = c, b.push(function(d) {
      return function() {
        return d.$jscomp$loop$prop$i$m1091534668$1;
      };
    }(a)), a = {$jscomp$loop$prop$i$m1091534668$1:a.$jscomp$loop$prop$i$m1091534668$1};
  }
  return "a" === b[0]() && "b" === b[1]();
};

