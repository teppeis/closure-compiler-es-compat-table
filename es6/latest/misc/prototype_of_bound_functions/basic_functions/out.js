module.exports = function() {
  function b(c) {
    var a = function() {
    };
    Object.setPrototypeOf ? Object.setPrototypeOf(a, c) : a.__proto__ = c;
    a = Function.prototype.bind.call(a, null);
    return Object.getPrototypeOf(a) === c;
  }
  return b(Function.prototype) && b({}) && b(null);
};

