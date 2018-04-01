// built-in extensions / function "name" property / function expressions
module.exports = function() {
  return function foo() {}.name === "foo" && function() {}.name === "";
};
