// built-in extensions / function "name" property / variables (function)
module.exports = function() {
  var foo = function() {};
  var bar = function baz() {};
  return foo.name === "foo" && bar.name === "baz";

};