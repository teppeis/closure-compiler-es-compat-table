module.exports = function() {
  var a = function() {
  };
  a.foo = function() {
  };
  return "foo" === a.foo.name;
};

