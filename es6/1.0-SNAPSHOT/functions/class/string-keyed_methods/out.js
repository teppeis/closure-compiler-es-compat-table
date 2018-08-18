module.exports = function() {
  var a = function() {
  };
  a.prototype["foo bar"] = function() {
    return 2;
  };
  return "function" === typeof a.prototype["foo bar"] && 2 === (new a)["foo bar"]();
};

