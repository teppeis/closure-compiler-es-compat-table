module.exports = function() {
  var b = [], a = {}, c;
  for (c in{a:1, b:1}) {
    a = {i$jscomp$3:a.i$jscomp$3}, a.i$jscomp$3 = c, b.push(function(d) {
      return function() {
        return d.i$jscomp$3;
      };
    }(a));
  }
  return "a" === b[0]() && "b" === b[1]();
};

