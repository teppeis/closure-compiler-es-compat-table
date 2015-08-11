module.exports = function() {
  for (var a in{qux:1}) {
    var b = a[1], c = a[2];
    return "q" === a[0] && "u" === b && "x" === c;
  }
};

