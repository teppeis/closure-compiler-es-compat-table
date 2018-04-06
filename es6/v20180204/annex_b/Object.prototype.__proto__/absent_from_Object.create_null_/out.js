module.exports = function() {
  var a = Object.create(null), b = {};
  a.__proto__ = b;
  return Object.getPrototypeOf(a) !== b;
};

