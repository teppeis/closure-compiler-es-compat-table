module.exports = function() {
  var a = function() {
  };
  a.prototype.method = function() {
    return "function" === typeof a;
  };
  var b = a.prototype.method;
  a = void 0;
  return void 0 === a && b();
};

