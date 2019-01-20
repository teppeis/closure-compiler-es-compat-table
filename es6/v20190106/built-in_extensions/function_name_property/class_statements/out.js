module.exports = function() {
  var a = function() {
  };
  a.name = function() {
  };
  return "foo" === function() {
  }.name && "function" === typeof a.name;
};

