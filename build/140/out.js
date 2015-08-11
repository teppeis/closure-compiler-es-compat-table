module.exports = function() {
  var a = function() {
  };
  a.prototype.foo = function() {
  };
  a.bar = function() {
  };
  return !a.prototype.propertyIsEnumerable("foo") && !a.propertyIsEnumerable("bar");
};

