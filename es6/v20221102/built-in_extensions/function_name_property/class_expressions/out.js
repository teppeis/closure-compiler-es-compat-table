module.exports = function() {
  var a;
  if (a = "foo" === function() {
  }.name) {
    a = function() {
    }, a.name = function() {
    }, a = "function" === typeof a.name;
  }
  return a;
};

