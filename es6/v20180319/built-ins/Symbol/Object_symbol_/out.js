module.exports = function() {
  var b = Symbol(), a = Object(b);
  return "object" === typeof a && a instanceof Symbol && a == b && a !== b && a.valueOf() === b;
};

