module.exports = function() {
  var c = {}, d = {}, e = {}, b = 0;
  c[Symbol.toPrimitive] = function(a) {
    b += "number" === a;
    return 0;
  };
  d[Symbol.toPrimitive] = function(a) {
    b += "string" === a;
    return 0;
  };
  e[Symbol.toPrimitive] = function(a) {
    b += "default" === a;
    return 0;
  };
  0 <= c;
  d in {};
  0 == e;
  return 3 === b;
};

