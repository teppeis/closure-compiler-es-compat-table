module.exports = function() {
  var b = [], a = {}, c;
  for (c in{a:1, b:1}) {
    a.$jscomp$loop$prop$i$1 = c, b.push(function(a) {
      return function() {
        return a.$jscomp$loop$prop$i$1;
      };
    }(a)), a = {$jscomp$loop$prop$i$1:a.$jscomp$loop$prop$i$1};
  }
  return "a" === b[0]() && "b" === b[1]();
};

