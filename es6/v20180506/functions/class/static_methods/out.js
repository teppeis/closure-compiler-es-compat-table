module.exports = function() {
  var a = function() {
  };
  a.method = function() {
    return 3;
  };
  return "function" === typeof a.method && 3 === a.method();
};

