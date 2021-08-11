module.exports = function() {
  var a = function() {
  };
  a.prototype.foo = function() {
  };
  return "foo" === (new a()).foo.name;
};

