module.exports = function() {
  var a = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");
  return a && "get" in a && "set" in a && a.configurable && !a.enumerable;
};

