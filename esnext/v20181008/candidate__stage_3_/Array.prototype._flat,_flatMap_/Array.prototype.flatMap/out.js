module.exports = function() {
  return "1234" === [{a:1, b:2}, {a:3, b:4}].flatMap(function(a) {
    return [a.a, a.b];
  }).join("");
};

