// built-in extensions / function "name" property / class expressions
module.exports = () => {
  return class foo {}.name === "foo" &&
typeof class bar { static name() {} }.name === "function";

};