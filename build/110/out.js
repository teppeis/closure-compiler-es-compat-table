module.exports = function() {
  for (var b = [], a = {i:0};2 > a.i;a = {i:a.i}, a.i++) {
    b.push(function(a) {
      return function() {
        return a.i;
      };
    }(a));
  }
  var a = 0 === b[0]() && 1 === b[1](), b = [], c = {i$0:void 0}, d;
  for (d in{a:1, b:1}) {
    c.i$0 = d, b.push(function(a) {
      return function() {
        return a.i$0;
      };
    }(c)), c = {i$0:c.i$0};
  }
  return a &= "a" === b[0]() && "b" === b[1]();
};

