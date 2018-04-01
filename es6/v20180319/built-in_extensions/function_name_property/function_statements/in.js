// built-in extensions / function "name" property / function statements
module.exports = function() {
  function foo() {}
  return foo.name === "foo" && function() {}.name === "";
};
