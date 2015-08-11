module.exports = function() {
  var a = function() {
  };
  a.prototype.method = function() {
    return 2;
  };
  return "function" === typeof a.prototype.method && 2 === (new a).method();
};

