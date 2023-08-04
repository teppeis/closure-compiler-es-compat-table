module.exports = function() {
  for (var a = [], b = {i$jscomp$3:0}; 2 > b.i$jscomp$3; b = {i$jscomp$3:b.i$jscomp$3}, b.i$jscomp$3++) {
    a.push(function(d) {
      return function() {
        return d.i$jscomp$3;
      };
    }(b));
  }
  b = 0 === a[0]() && 1 === a[1]();
  a = [];
  var c = {}, e;
  for (e in{a:1, b:1}) {
    c = {i$jscomp$4:c.i$jscomp$4}, c.i$jscomp$4 = e, a.push(function(d) {
      return function() {
        return d.i$jscomp$4;
      };
    }(c));
  }
  return b &= "a" === a[0]() && "b" === a[1]();
};

