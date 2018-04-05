module.exports = function() {
  var b = [], a = {}, c;
  for (c in{a:1, b:1}) {
    a.i = c, b.push(function(a) {
      return function() {
        return a.i;
      };
    }(a)), a = {i:a.i};
  }
  return "a" === b[0]() && "b" === b[1]();
};

