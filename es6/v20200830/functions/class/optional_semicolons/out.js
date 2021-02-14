module.exports = function() {
  var a = function() {
  };
  a.prototype.method = function() {
    return 2;
  };
  a.prototype.method2 = function() {
    return 2;
  };
  a.prototype.method3 = function() {
    return 2;
  };
  return "function" === typeof a.prototype.method && "function" === typeof a.prototype.method2 && "function" === typeof a.prototype.method3;
};

