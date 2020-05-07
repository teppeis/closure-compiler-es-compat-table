module.exports = function() {
  var a = function(a, b) {
  };
  return Object.getOwnPropertyDescriptor(a, "length").configurable ? (Object.defineProperty(a, "length", {value:1}), 1 === a.length) : !1;
};

