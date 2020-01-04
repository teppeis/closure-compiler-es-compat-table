module.exports = function() {
  function a(a) {
    var b = function() {
    };
    Object.setPrototypeOf ? Object.setPrototypeOf(b, a) : b.__proto__ = a;
    b = Function.prototype.bind.call(b, null);
    return Object.getPrototypeOf(b) === a;
  }
  return a(Function.prototype) && a({}) && a(null);
};

