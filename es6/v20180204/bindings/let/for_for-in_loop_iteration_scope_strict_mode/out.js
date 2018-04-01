module.exports = function() {
  for (var a = [], b = {i:0}; 2 > b.i; b = {i:b.i}, b.i++) {
    a.push(function(a) {
      return function() {
        return a.i;
      };
    }(b));
  }
  b = 0 === a[0]() && 1 === a[1]();
  a = [];
  var c = {}, d;
  for (d in{a:1, b:1}) {
    c.i$0 = d, a.push(function(a) {
      return function() {
        return a.i$0;
      };
    }(c)), c = {i$0:c.i$0};
  }
  return b &= "a" === a[0]() && "b" === a[1]();
};

