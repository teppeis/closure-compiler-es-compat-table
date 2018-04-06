module.exports = function() {
  var a = {};
  a.__proto__ = Array.prototype;
  return a instanceof Array;
};

